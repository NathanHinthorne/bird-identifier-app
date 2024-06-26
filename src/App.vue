<template>
  <ion-app>
    <Header />
    <ion-content>
      <ion-router-outlet />
    </ion-content>
  </ion-app>
</template>

<script setup>
import axios from 'axios';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/vue';
import Header from './components/Header.vue';
import { onMounted, ref } from 'vue';
import { Geolocation } from '@capacitor/geolocation';

// services 
import { fetchNearbyBirds } from './services/ebirdService';
import { getLocation } from './services/geocodeService';

// stores
import { useLocationStore } from './stores/locationStore';
import { useNearbyBirdsStore } from './stores/nearbyBirdsStore';

const locationStore = useLocationStore();
const nearbyBirdsStore = useNearbyBirdsStore();


const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  return {
    latitude: coordinates.coords.latitude,
    longitude: coordinates.coords.longitude,
  };
};

onMounted(() => {
  getCurrentPosition().then(async (position) => {
    const location = await getLocation(position.latitude, position.longitude);
    locationStore.setLocation(location);

    // trigger another async function to store all nearby birds
    fetchNearbyBirds(location).then((birds) => {
      nearbyBirdsStore.setNearbyBirds(birds);
    });
  });
});

</script>