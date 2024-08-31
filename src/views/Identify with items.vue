<template>
    <ion-page>
        <Header />

        <div class="scrapbook-container">
            <!-- <div class="corner-image top-left"></div>
            <div class="corner-image top-right"></div>
            <div class="corner-image bottom-left"></div>
            <div class="corner-image bottom-right"></div> -->
            <div class="scrapbook-background"></div>

        <!-- "identify a bird" section -->
         <!-- @click="identifyBySound" -->
         <!-- @click="identifyByImage" -->
          
            <div class="button-container">
                <button class="scrapbook-button sound-button" @click="identifyBySound">
                    <span>Identify by Sound</span>
                </button>
                <button class="scrapbook-button image-button" @click="identifyByImage">
                    <span>Identify by Image</span>
                </button>
            </div>
            <!-- <div id="bird-shadows-frame"></div>
            <div id="bird-feather-frame"></div>
            <div id="field-guide-frame"></div>
            <div id="map-frame"></div> -->


        </div>
    </ion-page>
</template>

<script setup>
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPage, IonContent, IonIcon } from '@ionic/vue';
import Header from '../components/Header.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const identifyBySound = () => {
    console.log('Identifying bird by sound...');
    // route to the IdentifyBySound page
    router.push('/identify/sound');
};

const identifyByImage = () => {
    console.log('Identifying bird by image...');
    // route to the IdentifyByImage page
    router.push('/identify/image');
};
</script>



<style scoped>

.button-container {
    position: absolute;
    top: 100px;
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
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    color: #4a4a4a;
    font-weight: bold;
    font-size: 14px;
    text-shadow: 1px 1px 2px white;
}

.sound-button {
    width: 170px;
    height: 170px;
    background-image: url('../assets/buttons/bird-sound-traced.png');
    transform: rotate(-3deg);
}

.image-button {
    width: 150px;
    height: 150px;
    background-image: url('../assets/buttons/bird-image-traced-text.png');
    transform: rotate(2deg);
}

#bird-shadows-frame {
    position: absolute;
    width: 120px;
    height: 120px;
    bottom: 7%;
    left: 60%;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1;
    transform: rotate(2deg);
    background-image: url('../assets/ui/bird-shadows-frame.png');
}

#map-frame {
    position: absolute;
    width: 120px;
    height: 120px;
    bottom: 20%;
    right: 10%;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1;
    transform: rotate(-4deg);
    background-image: url('../assets/ui/map-frame.png');
}

#bird-feather-frame {
    position: absolute;
    width: 120px;
    height: 120px;
    bottom: 17%;
    left: 25%;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1;
    transform: rotate(-2deg);
    background-image: url('../assets/ui/bird-feather-frame.png');
}

#field-guide-frame {
    position: absolute;
    width: 120px;
    height: 120px;
    bottom: 25%;
    left: 18%;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1;
    transform: rotate(4deg);
    background-image: url('../assets/ui/field-guide-frame.png');
}


.corner-image {
  position: absolute;
  width: 70px;
  height: 70px;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 1;
  background-image: url('../assets/backgrounds/scrapbook-corner.png');
}

.top-left {
  top: 10px;
  left: 10px;
  transform: rotate(0deg);
}

.top-right {
  top: 10px;
  right: 10px;
  transform: rotate(90deg);
}

.bottom-left {
  bottom: 10px;
  left: 10px;
  transform: rotate(270deg);
}

.bottom-right {
  bottom: 10px;
  right: 10px;
  transform: rotate(180deg);
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
  background-image: url('../assets/backgrounds/parchment-paper-tattered2.png');
  /*background-image: url('../assets/backgrounds/parchment-paper-wrinkled.jpg'); */
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
  pointer-events: none; /* Ensure the overlay does not interfere with interactions */
}
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
</style>