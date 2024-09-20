<template>
<ion-app>
  <ion-content>
    <ion-router-outlet />
  </ion-content>
</ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/vue';
import { onMounted, ref, watch } from 'vue';
import { Geolocation } from '@capacitor/geolocation';

// Splash screen
import { SplashScreen } from '@capacitor/splash-screen';

// services 
import { getLocation } from './services/geocodeService';
import { firestoreService } from './services/firestoreService';

// stores
import { useRegionalBirdStore } from './stores/regionalBirdStore';
import { useSeenBirdStore } from './stores/seenBirdStore';
import { useUserStore } from './stores/userStore';

const regionalBirdStore = useRegionalBirdStore();
const seenBirdStore = useSeenBirdStore();
const userStore = useUserStore();


const getCurrentPosition = async () => {
const coordinates = await Geolocation.getCurrentPosition();
return {
  latitude: coordinates.coords.latitude,
  longitude: coordinates.coords.longitude,
};
};

// Watch for changes in the user's authentication state
watch(
() => userStore.isAuthenticated,
async (isAuthenticated) => {
  if (isAuthenticated) {
    console.log("App.vue noticed user is authenticated, triggering setup...");
    setup();
  }
}
);


onMounted(async () => {
console.log("App mounted");

// Show the splash for an indefinite amount of time
// await SplashScreen.show({
//   autoHide: false,
// });

userStore.init();
});

const setup = async () => {
// Setup a simple data pipeline to process data

// Step 1: Find location with reverse geocoding
const position = await getCurrentPosition();
const location = await getLocation(position.latitude, position.longitude);
userStore.setLocation(location);

// Step 2: Find birds in the region
let regionalBirds = await firestoreService.fetchRegionalBirds(location);

// TEMPORARY:
// check through each bird to see if it's null, then log its index and remove it
regionalBirds.forEach((bird, index) => {
  if (bird.comName === "" || bird.comName === undefined) {
    console.log("null bird at bird index: ", index);
    regionalBirds.splice(index, 1);
  }
});

// sort a-z
// regionalBirds = regionalBirds.sort((a, b) => {
//   return a.comName.localeCompare(b.comName);
// });

// sort by rarity
regionalBirds = regionalBirds.sort((a, b) => {
  return a.rarity - b.rarity;
});

regionalBirdStore.setBirds(regionalBirds);

// Step 3: Find birds that user has seen
  const userBirdNames = Object.keys(userStore.seenBirdNames);

// Step 4: Find birds with given names
// NOTE: after expanding regions, we can't rely on the regionalBirdStore to contain ALL of our seen birds
let userBirds = await firestoreService.fetchBirdsByName(userBirdNames);
// userBirds = userBirds.sort((a, b) => {
//   return a.comName.localeCompare(b.comName);
// });
seenBirdStore.setBirds(userBirds);

console.log("finished loading birds in your region");

// await SplashScreen.hide();
};
</script>
