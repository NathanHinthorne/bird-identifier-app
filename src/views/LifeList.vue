<template>
  <ion-page>
    
    <ion-toolbar>
      <ion-header>
        <ion-title>Life List</ion-title>
        <BirdSearch @search="searchBirds" class="custom-searchbar" />
      </ion-header>
    </ion-toolbar>
        
    <ion-content>
      <BirdList
        :birds="displayedBirds" 
        :isLoading="isLoading"
        @selectBird="handleSelectBird" 
        @loadMoreBirds="handleLoadMore" 
      />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import BirdList from '@/components/BirdList.vue';
import BirdSearch from '@/components/BirdSearch.vue';
import { IonContent, IonPage, IonToolbar, IonTitle, IonHeader } from '@ionic/vue';
import { useSeenBirdStore } from '@/stores/seenBirdStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const seenBirdStore = useSeenBirdStore();
const selectedBird = ref(null);
const isLoading = ref(false);

// Use a computed property to reactively get the displayed birds
const displayedBirds = computed(() => seenBirdStore.getDisplayedBirds());

// Load initial birds when the component is mounted
onMounted(async () => {
  isLoading.value = true;
  seenBirdStore.generateInitialBirds();
});

const handleLoadMore = async (event) => {
  isLoading.value = true;
  try {
    await seenBirdStore.generateMoreBirds();
  } finally {
    isLoading.value = false;
    event.target.complete();
    console.log('Done loading!');
  }
};

const searchBirds = async (searchTerm) => {
  isLoading.value = true;
  try {
    await seenBirdStore.applyNewSearch(searchTerm);
  } finally {
    isLoading.value = false;
  }
  selectedBird.value = null;
};

const handleSelectBird = (bird) => {
  selectedBird.value = bird;

  // push to the route
  router.push('/life-list/bird-info/' + bird.formattedComName);
};
</script>

<style scoped>
ion-toolbar {
  --background: none;
  background: url('../assets/backgrounds/leather-bar.png') no-repeat center center;
  background-size: cover;
  padding: 10px;
}
ion-title {
  color: white;
}

.custom-searchbar {
  --background: transparent;
  margin-top: 10px; /* Add margin-top for spacing */
}


</style>