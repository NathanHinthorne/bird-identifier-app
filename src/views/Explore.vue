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
      <BirdSearch @search="searchBirds" class="heading" />
      <BirdList :birds="birds" @selectBird="selectBird" />

      <!-- take out this line after transitioning from bird detail being a card
       to bird detail being an entire page -->
      <BirdDetail v-if="selectedBird" :bird="selectedBird" /> 
    </ion-content>
    
  </ion-page>
</template>

<script setup>
import BirdDetail from '../components/BirdDetail.vue'
import BirdList from '../components/BirdList.vue';
import BirdSearch from '../components/BirdSearch.vue';
import { IonContent, IonPage, IonToolbar, IonTitle } from '@ionic/vue';

import { ref } from 'vue';

const birds = ref([]);
const selectedBird = ref(null);

const searchBirds = (searchTerm) => {
  // Mock data for demonstration
  const mockBirds = [
    { id: 1, name: 'Northern Cardinal', description: 'A small red bird.', image: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/385850851/480' },
    { id: 2, name: 'Blue Jay', description: 'A blue bird with a distinctive crest.', image: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/311635911/1800' },
    { id: 3, name: 'American Robin', description: 'A common bird with a red breast.', image: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/303441381/1800' },
  ];

  birds.value = mockBirds.filter(bird => bird.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
