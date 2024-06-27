<template>
  <ion-list>
    <ion-item v-for="bird in birds" :key="bird.id" @click="selectBird(bird)">
      <ion-thumbnail slot="start">
        <img :src="bird.smallImg" alt="Bird Image" />
      </ion-thumbnail>
      <ion-label>
        <h2>{{ bird.comName }}</h2>
        <p>{{ bird.description }}</p>
      </ion-label>
    </ion-item>
  </ion-list>

  <ion-infinite-scroll @ionInfinite="loadMoreBirds">
    <ion-infinite-scroll-content loading-spinner="null">
      <template v-if="isLoading">
        <ion-list>
          <ion-item>
            <ion-thumbnail slot="start">
              <ion-skeleton-text :animated="true"></ion-skeleton-text>
            </ion-thumbnail>
            <ion-label>
              <h3>
                <ion-skeleton-text :animated="true" style="width: 80%;"></ion-skeleton-text>
              </h3>
              <p>
                <ion-skeleton-text :animated="true" style="width: 60%;"></ion-skeleton-text>
              </p>
              <p>
                <ion-skeleton-text :animated="true" style="width: 30%;"></ion-skeleton-text>
              </p>
            </ion-label>
          </ion-item>
        </ion-list>
      </template>
    </ion-infinite-scroll-content>
  </ion-infinite-scroll>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { IonList, IonItem, IonThumbnail, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent, IonSkeletonText } from '@ionic/vue';

const emit = defineEmits(['selectBird', 'loadMoreBirds']);

const props = defineProps({
  birds: Array
});

const isLoading = ref(false);

const selectBird = (bird) => {
  // console.log('Selected bird:', bird);

  // emit the selected bird to the parent component
  emit('selectBird', bird);
};

const loadMoreBirds = async (event) => {
  console.log('Loading more birds...')

  // Set isLoading to true to indicate loading is in progress
  isLoading.value = true;

  // Emit the event to the parent component for actual data loading
  emit('loadMoreBirds', event);

  // Complete the infinite scroll action
  event.target.complete();

  // Set isLoading to false as loading is complete
  isLoading.value = false;
};
</script>
