<template>
  <ion-page>
    
    <ion-toolbar>
      <ion-header>
        <ion-title>Explore Birds</ion-title>
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
import { useRegionalBirdStore } from '@/stores/regionalBirdStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const regionalBirdStore = useRegionalBirdStore();
const selectedBird = ref(null);
const isLoading = ref(false);

// Use a computed property to reactively get the displayed birds
const displayedBirds = computed(() => regionalBirdStore.getDisplayedBirds());

// Load initial birds when the component is mounted
onMounted(async () => {

  isLoading.value = true;
  regionalBirdStore.generateInitialBirds();
});

const handleLoadMore = async (event) => {
  isLoading.value = true;
  try {
    await regionalBirdStore.generateMoreBirds();
  } finally {
    isLoading.value = false;
    event.target.complete();
    console.log('Done loading!');
  }
};

const searchBirds = async (searchTerm) => {
  isLoading.value = true;
  try {
    await regionalBirdStore.applyNewSearch(searchTerm);
  } finally {
    isLoading.value = false;
  }
  selectedBird.value = null;
};

const handleSelectBird = (bird) => {
  selectedBird.value = bird;

  // push to the route
  router.push('/explore/bird-info/' + bird.formattedComName);
};
</script>

<style scoped>

.custom-searchbar {
  --background: transparent;
  margin-top: 10px; /* Add margin-top for spacing */
}


</style>