<template>
  <ion-header>
    <ion-toolbar>
      <!-- <ion-title>Birding Pal</ion-title> -->
       <div class="logoContainer">
         <img :src="logo" class="logo" alt="Birding Pal logo" />
         <img :src="logoText" alt="Birding Pal logo text" />
       </div>

      <!-- <div class="credits"> 
        <ion-text color="primary">Developed by Nathan Hinthorne</ion-text>
      </div> -->
    </ion-toolbar>
  </ion-header>
</template>

<script setup>
import { IonHeader, IonToolbar, IonTitle, IonText } from '@ionic/vue';
import logo from '../assets/app/logo2.png';
import logoText from '../assets/misc/logoText.png';
</script>

<style scoped>
  ion-title {
    font-size: 1.5rem;
    color: black;
    text-align: left;
  }

  ion-toolbar {
    --background: var(--ion-background-color);
  }

  img {
    width: 10rem;
    margin: 0.5rem;
  }

  ion-text {
    font-size: 0.8rem;
    font-style: italic;
  }

  .logoContainer {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
  }

  .logo {
     width: 4rem;
   }

  .credits {
    display: flex;
    justify-content: right;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
