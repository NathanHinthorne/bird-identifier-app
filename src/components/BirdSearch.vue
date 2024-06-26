<template>
  <ion-item>
    <ion-searchbar class="rounded" v-model="searchTerm" placeholder="Search for birds..." @ionInput="searchBirds" show-clear-button="always"> </ion-searchbar>
  </ion-item>
</template>

<script setup>
import { IonItem, IonSearchbar } from '@ionic/vue';
import { ref } from 'vue';

const searchTerm = ref('');

const emit = defineEmits(['search']);

const searchBirds = () => {
  // Replace this with actual search logic
  console.log(`Searching for birds...`);
  emit('search', searchTerm.value);
};
</script>


<style scoped>
.rounded {
  --border-radius: 20px;
}

/* make searchbar clear button visible */
ion-searchbar>>>.searchbar-clear-icon {
    color: var(--ion-color-secondary-contrast)
}

</style>