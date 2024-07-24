<template>
    <ion-page>
        <Header />

        <div class="scrapbook-container">
            <div class="corner-image top-left"></div>
            <div class="corner-image top-right"></div>
            <div class="corner-image bottom-left"></div>
            <div class="corner-image bottom-right"></div>
            <div class="scrapbook-background"></div>

        <!-- "last bird seen" section -->
        <!-- <ion-card>
            <ion-card-header>
                <ion-card-title>Last Bird Seen</ion-card-title>
            </ion-card-header>
            <ion-card-content class="last-bird-seen">
                <p>Placeholder for last bird seen.</p>
            </ion-card-content>
        </ion-card> -->


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

        </div>
    </ion-page>
</template>

<script setup>
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPage, IonContent, IonIcon } from '@ionic/vue';
import Header from '../components/Header.vue';

// camera and mic icons
import { camera, mic } from 'ionicons/icons';

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
    width: 150px;
    height: 150px;
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
    background-image: url('../assets/ui/paper-piece-square-tape.png');
}

.image-button {
    background-image: url('../assets/ui/paper-piece-square-tape.png');
}

.corner-image {
  position: absolute;
  width: 70px;
  height: 70px;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 1;
}

.top-left {
  top: 0px;
  left: 0px;
  background-image: url('../assets/backgrounds/corner-top-left.png');
}

.top-right {
  top: 0px;
  right: 0px;
  background-image: url('../assets/backgrounds/corner-top-right.png');
}

.bottom-left {
  bottom: 0px;
  left: 0px;
  background-image: url('../assets/backgrounds/corner-bottom-left.png');
}

.bottom-right {
  bottom: 0px;
  right: 0px;
  background-image: url('../assets/backgrounds/corner-bottom-right.png');
}

.scrapbook-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scrapbook-background {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  background-image: url('../assets/backgrounds/scrapbook-bird-lengthened.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 0;
}


/* last bird seen */
.last-bird-seen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 28vh;
    font-size: 1.5rem;
    color: var(--ion-color-secondary-contrast);
    background-color: var(--ion-color-light);
}

ion-icon {
    font-size: 3rem;
}

</style>