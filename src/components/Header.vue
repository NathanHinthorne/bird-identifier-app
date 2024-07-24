<template>
  <ion-header>
    <ion-toolbar>
      <!-- <ion-title>Birding Pal</ion-title> -->
      <img :src="logo" alt="Birding Pal logo" />
      <div class="credits"> 
        <ion-text color="primary">Developed by Nathan Hinthorne</ion-text>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<script setup>
import { IonHeader, IonToolbar, IonTitle, IonText } from '@ionic/vue';
import logo from '../assets/birdingPalLogo3.png'
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

  .credits {
    display: flex;
    justify-content: right;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
    margin-top: -2rem;
  }
</style>
