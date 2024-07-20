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
import BirdList from '../components/BirdList.vue';
import BirdSearch from '../components/BirdSearch.vue';
import { IonContent, IonPage, IonToolbar, IonTitle, IonHeader } from '@ionic/vue';
import { useNearbyBirdsStore } from '../stores/nearbyBirdsStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const nearbyBirdsStore = useNearbyBirdsStore();
const selectedBird = ref(null);
const isLoading = ref(false);

// Use a computed property to reactively get the displayed birds
const displayedBirds = computed(() => nearbyBirdsStore.getDisplayedBirds());

// Load initial birds when the component is mounted
onMounted(async () => {
  isLoading.value = true;
  nearbyBirdsStore.generateInitialBirds();
});

const handleLoadMore = async (event) => {
  isLoading.value = true;
  try {
    await nearbyBirdsStore.generateMoreBirds();
  } finally {
    isLoading.value = false;
    event.target.complete();
    console.log('Done loading!');
  }
};

const searchBirds = async (searchTerm) => {
  isLoading.value = true;
  try {
    await nearbyBirdsStore.applyNewSearch(searchTerm);
  } finally {
    isLoading.value = false;
  }
  selectedBird.value = null;
};

const handleSelectBird = (bird) => {
  selectedBird.value = bird;

  console.log('Selected bird:', bird.comName, bird.id)

  // push to the route
  router.push('/explore/bird-info/' + bird.formattedComName);
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