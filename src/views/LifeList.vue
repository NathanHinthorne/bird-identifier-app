<template>
  <ion-page>

    <ion-toolbar>
      <ion-header>
        <ion-title>Life List</ion-title>
        <BirdSearch @search="searchBirds" class="custom-searchbar" />
      </ion-header>
    </ion-toolbar>
        
    <ion-content>
      <BirdList :birds="birds" @selectBird="selectBird" />
    </ion-content>

  </ion-page>
</template>

<script setup>
import BirdList from '../components/BirdList.vue';
import BirdSearch from '../components/BirdSearch.vue';
import { IonContent, IonPage, IonToolbar, IonTitle, IonHeader } from '@ionic/vue';


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
};

const selectBird = (bird) => {
  selectedBird.value = bird;
};
</script>

<style scoped>
.custom-searchbar {
  --background: transparent;
  margin-top: 10px; /* Add margin-top for spacing */
}

ion-toolbar {
  --background: none;
  background: url('../assets/backgrounds/leather-bar.png') no-repeat center center;
  background-size: cover;
  padding: 10px;
}

ion-title {
  color: white;
}
</style>