<template>
  <ion-list>
    <ion-item v-for="bird in birds" :key="bird.id" @click="selectBird(bird)"
              :class="{ 'bird-selected': selectedBirdId && selectedBirdId === bird.id }">
      <div class="bird-entry">
        <SmallBirdImage :imageUrl="bird.previewPhoto" :birdName="bird.comName" :inGame="bird.inGame" />
        <div class="bird-description-container">
          <p class="bird-description">{{ bird.shortDesc }}</p>
        </div>
      </div>
    </ion-item>

    <!-- <ion-item v-if="isLoading" v-for="i in 2" :key="i">
      <div class="bird-entry skeleton">
        <SmallBirdImage isSkeleton />
      </div>
    </ion-item> -->
  </ion-list>

  <ion-infinite-scroll @ionInfinite="loadMoreBirds" threshold="100px">
    <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more birds...">
    </ion-infinite-scroll-content>
  </ion-infinite-scroll>
</template>

<script setup>
import { ref } from 'vue';
import { IonList, IonItem, IonInfiniteScroll, IonInfiniteScrollContent, IonContent } from '@ionic/vue';
import SmallBirdImage from '../components/SmallBirdImage.vue';

const emit = defineEmits(['selectBird', 'loadMoreBirds']);

const props = defineProps({
  birds: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const selectedBirdId = ref(null);

const selectBird = (bird) => {
  selectedBirdId.value = bird.id;
  emit('selectBird', bird);
};

const loadMoreBirds = async (event) => {
  console.log('Loading more birds...');
  emit('loadMoreBirds', event);
};

const ionInfinite = (event) => {
  loadMoreBirds();
  setTimeout(() => event.target.complete(), 500);
};

</script>

<style scoped>

.bird-entry {
  display: flex;
  align-items: flex-start;
  margin-bottom: 40px;
  padding: 15px;
  transition: all 0.3s ease;
}

.bird-entry:hover {
  transform: translateY(-5px);
}

.bird-description-container {
  flex-grow: 1;
  padding: 5px;
  min-width: 0;
}

.bird-description {
  font-family: 'Pacifico', cursive;
  font-size: 18px;
  color: #444;
  line-height: 1.4;
  padding: 10px;
  border-radius: 5px;
  transform: rotate(1deg);
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.bird-selected {
  animation: birdClickAnimation 0.5s ease;
}

@keyframes birdClickAnimation {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}


/* Ionic overrides */
ion-item {
  --background: transparent;
  --border-color: transparent;
}

ion-list {
  background: transparent;
}

@media (max-width: 480px) {
  .bird-entry {
    flex-direction: row;
    align-items: flex-start;
  }

  .bird-description {
    font-size: 16px;
    padding: 8px;
  }
}
</style>