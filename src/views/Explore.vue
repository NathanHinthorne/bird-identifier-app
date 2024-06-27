<!-- 
Explore page will be similar to LifeList page, except
for WHERE it's getting its bird data from, as well as slight UI
differences.
-->

<template>
  <ion-page>

    <ion-toolbar class="heading">
      <ion-title>Explore Birds</ion-title>
    </ion-toolbar>
        
    <ion-content>
      <BirdSearch class="heading" @search="searchBirds" @loadMoreBirds="loadMoreBirds" />
      <BirdList :birds="birds" @selectBird="selectBird" />

      <!-- take out this line after transitioning from bird detail being a card
       to bird detail being an entire page -->
      <BirdDetail v-if="selectedBird" :bird="selectedBird" /> 
    </ion-content>
    
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import BirdDetail from '../components/BirdDetail.vue'
import BirdList from '../components/BirdList.vue';
import BirdSearch from '../components/BirdSearch.vue';
import { IonContent, IonPage, IonToolbar, IonTitle } from '@ionic/vue';
import { useNearbyBirdsStore } from '../stores/nearbyBirdsStore';

const nearbyBirdsStore = useNearbyBirdsStore();
const selectedBird = ref(null);
const defaultBirds = nearbyBirdsStore.getDisplayedBirds();
const birds = ref(defaultBirds);

const loadMoreBirds = async () => {
  nearbyBirdsStore.generateMoreBirds();
  birds.value = nearbyBirdsStore.getDisplayedBirds();
};

const searchBirds = (searchTerm) => {
  // refresh the list of birds from the store
  nearbyBirdsStore.applyNewSearch(searchTerm);
  birds.value = nearbyBirdsStore.getDisplayedBirds();

  // erase selected bird when searching
  selectedBird.value = null;
};

const selectBird = (bird) => {
  selectedBird.value = bird;
};
</script>

<style scoped>
  .heading {
    --background: var(--ion-color-primary-tint);
  }
</style>
