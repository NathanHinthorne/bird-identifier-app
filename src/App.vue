<template>
  <ion-app>
    <Header />
    <ion-content>
      <ion-router-outlet />
    </ion-content>
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/vue';
import Header from './components/Header.vue';
import { onMounted, ref } from 'vue';
import { Geolocation } from '@capacitor/geolocation';

// services 
import { fetchNearbyBirds, fetchBirdNames, fetchBirdPhotos, fetchBirdDescription } from './services/ebirdService';
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
    // store location
    const location = await getLocation(position.latitude, position.longitude);
    locationStore.setLocation(location);

    // find species codes
    const speciesCodes = await fetchNearbyBirds(location);

    // find scientific name and common name for each species code
    const speciesNames = await fetchBirdNames(speciesCodes);

    // find small and large images for each species code
    // const imgGroups = await fetchBirdPhotos(speciesCodes);
    
    // create array of bird objects with this structure { id, speciesCode, comName, sciName, smallImg, largeImg, link }
    const nearbyBirds = speciesNames.map((species, index) => {
      // const { smallImg, largeImg } = imgGroups[index];

      // Replace spaces with hyphens and convert to lowercase
      const formattedName = species.comName.replace(/\s+/g, '_').toLowerCase();
      const allAboutBirdsLink = `https://www.allaboutbirds.org/guide/${formattedName}/overview`;

      // const eBirdLink = `https://ebird.org/species/${species.speciesCode}`;

      return {
        id: index + 1,
        speciesCode: species.speciesCode,
        comName: species.comName,
        sciName: species.sciName,
        smallImg: '',
        largeImg: '',
        description: '',
        learnMoreLink: allAboutBirdsLink,
      };
    });

    // filter nearbyBirds to exclude hybrids
    const keyWord = "(hybrid)";
    const filteredNearbyBirds = nearbyBirds.filter((bird) => {
      return !bird.comName.includes(keyWord);
    })


    // for first 5 birds, find description
    // for (let i = 0; i < 5; i++) {
    //   const description = await fetchBirdDescription(nearbyBirds[i].comName);
    //   nearbyBirds[i].description = description;
    // }

    // print first 5 birds
    console.log("first 5 birds", nearbyBirds.slice(0, 5));

    // store array of all nearby birds
    nearbyBirdsStore.setBirds(filteredNearbyBirds);
  });
});
</script>
