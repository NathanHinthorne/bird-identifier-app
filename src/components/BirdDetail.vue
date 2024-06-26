<style scoped>
</style>

<template>
  <!-- <ion-page> -->
    <ion-card v-if="bird">
      <img :src="bird.image" alt="Bird Image" />
      <ion-card-header>
        <ion-card-title>{{ bird.name }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>{{ bird.description }}</p>
      </ion-card-content>
    </ion-card>
  <!-- </ion-page> -->
</template>

<script setup>
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPage } from '@ionic/vue';
  
  const props = defineProps({
    bird: Object
  });
</script>
