<template>
    <ion-page>
        <Header />

        <div class="scrapbook-container">
          <div class="scrapbook-background"></div>
          <LoadingAnimation v-if="regionalBirdStore.fetchingBirds" loadingText="Loading..."/>
          
          <div class="button-container" v-else>
            <button class="scrapbook-button sound-button wip" @click="identifyBySound">
              <span>Identify by Sound</span>
              <span class="wip-text">WORK IN PROGRESS</span>
            </button>
            <button class="scrapbook-button image-button" @click="identifyByImage">
              <span>Identify by Description</span>
            </button>
          </div>

          <div class="notice">WORK IN PROGRESS: <br>Currently only includes birds from the state of Washington. This app will soon be expanded to cover the entire U.S.</div>

        </div>
    </ion-page>
</template>

<script setup>
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPage, IonContent, IonIcon } from '@ionic/vue';
import Header from '../components/Header.vue';
import LoadingAnimation from '../components/LoadingAnimation.vue';
import { useRegionalBirdStore } from '../stores/regionalBirdStore';
import { useRouter } from 'vue-router';

const regionalBirdStore = useRegionalBirdStore();
const router = useRouter();

const identifyBySound = () => {
    console.log('Identifying bird by sound...');
    // route to the IdentifyBySound page
    router.push('/identify/sound');
};

const identifyByImage = () => {
    console.log('Identifying bird by description...');
    // route to the IdentifyByDescription page
    router.push('/identify/description');
};
</script>



<style scoped>

.button-container {
    position: absolute;
    bottom: 100px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
}

.scrapbook-button {
    border: none;
    background-color: transparent;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    position: relative;
    transition: transform 0.3s ease;
}

.scrapbook-button:hover {
    transform: scale(1.1);
}

.scrapbook-button span {
    position: absolute;
    bottom: -40px;
    left: 0;
    right: 0;
    max-width: 8em;
    text-align: center;
    font-size: 20px;
    /* font-family: 'Cabin Sketch', bold; */
    font-family: 'Fredericka the Great', bold;
}

.notice {
    position: absolute;
    top: 10%;
    right: 5%;
    left: 5%;
    background-color: #f8d7da; /* Light red background color */
    color: #721c24; /* Dark red text color */
    padding: 10px;
    border-radius: 5px;
    font-size: 1.4em;
    font-family: 'Just Another Hand', cursive;

}


.sound-button {
    width: 170px;
    height: 170px;
    background-image: url('../assets/buttons/bird-sound-traced.png');
    /* pickles
    background-image: url('https://png.pngtree.com/png-clipart/20231022/original/pngtree-pickles-jar-home-picture-image_13190852.png');
    */
    transform: rotate(-3deg);
}

.image-button {
    width: 170px;
    height: 170px;
    background-image: url('../assets/buttons/bird-image-traced-text.png');
    /* pickles
    background-image: url('https://png.pngtree.com/png-clipart/20231022/original/pngtree-pickles-jar-home-picture-image_13190852.png');
    */
    transform: rotate(2deg);
}

.wip {
    opacity: 0.5;
    pointer-events: none;
}

.wip-text {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 12px;
    font-family: 'Just Another Hand', cursive;
}

.scrapbook-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scrapbook-background {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 0;
  background-image: url('../assets/backgrounds/parchment-paper-tattered3.png');
}

.scrapbook-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  ),
  linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  ),
  linear-gradient(
    to right,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  ),
  linear-gradient(
    to left,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  );
  z-index: 1;
  pointer-events: none;
}
/*
  
.scrapbook-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(139, 69, 19, 0.15);
  z-index: 2;
  pointer-events: none;
}
*/
</style>