<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<template>
  <ion-list>
    <ion-item v-for="bird in birds" :key="bird.id" @click="selectBird(bird)">
      <ion-thumbnail slot="start">
        <img :src="bird.image" alt="Bird Image" />
      </ion-thumbnail>
      <ion-label>
        <h2>{{ bird.name }}</h2>
        <p>{{ bird.description }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup>
  import { IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/vue';

  import { ref, defineEmits, defineProps } from 'vue';

  const emit = defineEmits(['selectBird']);

  const props = defineProps({
    birds: Array
  });

  const selectBird = (bird) => {
    console.log('Selected bird:', bird);
    // emit the selected bird to the parent component
    emit('selectBird', bird);
  };
</script>
