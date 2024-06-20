<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<template>
  <ion-item>
    <ion-input v-model="searchTerm" placeholder="Search for birds..."></ion-input>
    <ion-button @click="searchBirds">Search</ion-button>
  </ion-item>
</template>

<script setup>
  import { IonItem, IonInput, IonButton } from '@ionic/vue';

  import { ref, defineEmits, defineProps } from 'vue';

  const searchTerm = ref('');

  const emit = defineEmits(['search']);

  const props = defineProps({
    birds: Array
  });

  const searchBirds = () => {
    // Replace this with actual search logic
    console.log(`Searching for birds...`);
    emit('search', searchTerm.value);
  };
</script>
