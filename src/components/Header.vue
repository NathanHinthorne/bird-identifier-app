<template>
  <ion-header>
    <ion-toolbar>
       <div class="logoContainer">
         <img :src="logo" class="logo" alt="Birding Pal logo" />
          <h1>Birding Pal</h1>
         <!-- <img :src="logoText" alt="Birding Pal logo text" /> -->
       </div>

    </ion-toolbar>
  </ion-header>
</template>

<script setup>
import { IonHeader, IonToolbar, IonTitle, IonText } from '@ionic/vue';
import logo from '../assets/app/play-store-icon.png';
import logoText from '../assets/misc/logoText.png';
</script>

<style scoped>
  h1 {
    font-size: 2.2rem;
    color: white;
    font-family: 'Fredericka the Great', cursive;
    text-align: left;
    margin-left: 0.5rem;
  }

  img {
    width: 10rem;
    margin-top: 0.5rem;
  }

  ion-text {
    font-size: 0.8rem;
    font-style: italic;
  }

  .logoContainer {
    display: flex;
    align-items: center;
  }

  .logo {
     width: 4rem;
   }
</style>
