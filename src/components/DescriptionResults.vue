<template>
  <div class="bird-results">
    <h2>Identification Results</h2>
    <p v-if="birds.length === 0">No birds match your description. Try adjusting your criteria.</p>
    <IDBirdList v-else :birds="birds" @select-bird="handleSelectBird" />
    <ion-button @click="$emit('reset')">Start Over</ion-button>
  </div>
</template>

<script setup>
import { IonButton } from '@ionic/vue';
import IDBirdList from './IDBirdList.vue';

defineProps({
  birds: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['select-bird', 'reset']);

function handleSelectBird(bird) {
  emit('select-bird', bird);
}
</script>

<style scoped>
.bird-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h2 {
  font-family: 'Fredericka the Great', cursive;
  color: #8b4513;
  margin-bottom: 20px;
}

ion-button {
  margin-top: 20px;
  --background: #8b4513;
  --background-activated: #5e2f0d;
  --background-hover: #724011;
  --color: white;
}
</style>