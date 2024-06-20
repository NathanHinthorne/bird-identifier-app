<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<!-- 
LifeList page will be similar to Explore page, except
for WHERE it's getting its bird data from, as well as slight UI
differences.
-->

<template>
  <ion-page>

    <ion-content>
      <BirdSearch @search="searchBirds" />
      <BirdList :birds="birds" @selectBird="selectBird" />
      <BirdDetail v-if="selectedBird" :bird="selectedBird" />
    </ion-content>

  </ion-page>
</template>

<script setup>
  import BirdDetail from '../components/BirdDetail.vue'
  import BirdList from '../components/BirdList.vue';
  import BirdSearch from '../components/BirdSearch.vue';
  import { IonContent, IonPage } from '@ionic/vue';


  import { ref } from 'vue';

  const birds = ref([]);
  const selectedBird = ref(null);

  const searchBirds = (searchTerm) => {
    // Mock data for demonstration
    const mockBirds = [
      { id: 1, name: 'Northern Cardinal', description: 'A small red bird.', image: 'path/to/cardinal.jpg' },
      { id: 2, name: 'Blue Jay', description: 'A blue bird with a distinctive crest.', image: 'path/to/bluejay.jpg' },
      { id: 3, name: 'American Robin', description: 'A common bird with a red breast.', image: 'path/to/robin.jpg' },
    ];

    birds.value = mockBirds.filter(bird => bird.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const selectBird = (bird) => {
    selectedBird.value = bird;
  };
</script>
