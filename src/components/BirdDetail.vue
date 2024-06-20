<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<template>
  <ion-card v-if="bird">
    <img :src="bird.image" alt="Bird Image" />
    <ion-card-header>
      <ion-card-title>{{ bird.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ bird.description }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script setup>
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    bird: Object
  });
</script>
