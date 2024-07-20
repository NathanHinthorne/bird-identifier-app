<template>
  <ion-app>
    <!-- <Header /> -->
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
import { getLocation } from './services/geocodeService';
import { fetchNearbyBirds, fetchBirdNames, fetchBirdDescription } from './services/ebirdService';
import { fetchUserBirdData } from './services/userDataService';

// stores
import { useLocationStore } from './stores/locationStore';
import { useNearbyBirdsStore } from './stores/nearbyBirdsStore';
import { useLifeListStore } from './stores/lifeListStore';

const locationStore = useLocationStore();
const nearbyBirdsStore = useNearbyBirdsStore();
const lifeListStore = useLifeListStore();


const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  return {
    latitude: coordinates.coords.latitude,
    longitude: coordinates.coords.longitude,
  };
};

onMounted(() => {
  getCurrentPosition().then(async (position) => {
    // Step 1: Find location
    const location = await getLocation(position.latitude, position.longitude);
    locationStore.setLocation(location);

    // Step 2: Find species codes of birds around that location
    const speciesCodes = await fetchNearbyBirds(location);

    // Step 3: Translate species codes into the birds' common names
    const speciesNames = await fetchBirdNames(speciesCodes);
    // const formattedSpeciesNames = speciesNames.map((species, index) => {
    //   // Replace spaces with hyphens and convert to lowercase
    //   const underscoreName = species.comName.replace(/\s+/g, '_');

    //   // Remove apostrophes
    //   const noApostropheName = underscoreName.replace(/'/g, '');

    //   return {
    //     id: index + 1,
    //     speciesCode: species.speciesCode,
    //     formattedComName: noApostropheName,
    //   };
    // });

    // Step 4: Make API call to MY BACKEND to obtain images, description, etc. for each bird's common name


    
    const nearbyBirds = speciesNames.map((species, index) => {

      // Replace spaces with hyphens and convert to lowercase
      const underscoreName = species.comName.replace(/\s+/g, '_');

      // Remove apostrophes
      const noApostropheName = underscoreName.replace(/'/g, '');

      const allAboutBirdsLink = `https://www.allaboutbirds.org/guide/${noApostropheName}/overview`;
      // const eBirdLink = `https://ebird.org/species/${species.speciesCode}`;

      return {
        id: index + 1,
        speciesCode: species.speciesCode,
        comName: species.comName,
        formattedComName: noApostropheName,
        sciName: species.sciName,
        smallImg: 'https://www.allaboutbirds.org/guide/assets/photo/303891031-240px.jpg',
        largeImg: 'https://www.allaboutbirds.org/guide/assets/photo/303891031-480px.jpg',
        sound: 'https://www.allaboutbirds.org/guide/assets/sound/535892.mp3',
        shortDescription: "Small, with pink and green iridescent feathers. It is very territorial and will chase away other birds.",
        longDescription: "Anna's Hummingbirds are among the most common hummingbirds along the Pacific Coast, yet they're anything but common in appearance. With their iridescent emerald feathers and sparkling rose-pink throats, they are more like flying jewelry than birds. Though no larger than a ping-pong ball and no heavier than a nickel, Anna's Hummingbirds make a strong impression. In their thrilling courtship displays, males climb up to 130 feet into the air and then swoop to the ground with a curious burst of noise that they produce through their tail feathers.",
        howToFind: "The easiest place to see Anna's Hummingbirds is at a feeder; otherwise keep a sharp eye out near large, colorful blossoms during the spring, especially near eucalyptus trees and cultivated gardens. Look for males are often seen high in the branches of a small tree or bush, singing loudly.",
        map: 'https://www.allaboutbirds.org/guide/assets/photo/31953741-720px.jpg',
        learnMoreLink: allAboutBirdsLink,
      };
    });

    // filter nearbyBirds to exclude hybrids
    const keyWord = "(hybrid)";
    const filteredNearbyBirds = nearbyBirds.filter((bird) => {
      return !bird.comName.includes(keyWord);
    })

    // arrange nearbyBirds in alphabetical order
    const sortedNearbyBirds = filteredNearbyBirds.sort((a, b) => {
      return a.comName.localeCompare(b.comName);
    });

    console.log("finished loading nearby birds");


    // download nearby birds as CSV for testing
    /*
    // Create CSV content
    let csvContent = "formattedComName, comName, sciName, learnMoreLink, habitat\n";
    sortedNearbyBirds.forEach(bird => {
      csvContent += bird.formattedComName + "," + bird.comName + "," + bird.sciName + "," + bird.learnMoreLink + "," + bird.habitat + "\n";
    });

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'nearby_birds.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    */


    // store array of all nearby birds
    nearbyBirdsStore.setBirds(sortedNearbyBirds);


    // // find life list of user
    // const userBirdData = await fetchUserBirdData();
    // console.log(userBirdData);

    // // store user life list
    // lifeListStore.setList(userBirdData);
  });
});
</script>
