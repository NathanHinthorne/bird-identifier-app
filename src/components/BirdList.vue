<template>
  <div class="scrapbook-container">
    <div class="scrapbook-background"></div>
    
    <div class="scrapbook-content">
      <ion-list>
        <ion-item v-for="bird in birds" :key="bird.id" @click="selectBird(bird)"
                  :class="{ 'bird-selected': selectedBirdId && selectedBirdId === bird.id }">
          <div class="bird-entry">
            <div class="bird-image-container" :style="{ '--rotation': randomRotation() }">
              <div class="bird-image-tape" :style="{ '--tape-rotation': randomTapeRotation() }"></div>
              <div class="bird-image-frame">
                <img :src="bird.smallImg" :alt="bird.comName" class="bird-image" />
              </div>
              <p class="bird-image-caption" >{{ bird.comName }}</p>
            </div>
            <div class="bird-description-container">
              <p class="bird-description">{{ bird.shortDescription }}</p>
            </div>
          </div>
        </ion-item>

        <template v-for="i in 4" :key="i">
          <ion-item v-if="isLoading">
            <div class="bird-entry skeleton">
              <div class="bird-image-container" :style="{ '--rotation': randomRotation() }">
                <div class="bird-image-tape skeleton-tape" :style="{ '--tape-rotation': randomTapeRotation() }"></div>
                <div class="bird-image-frame">
                  <div class="bird-image skeleton-image"></div>
                </div>
                <div class="bird-image-caption skeleton-caption"></div>
              </div>
            </div>
          </ion-item>
        </template>
      </ion-list>

      <ion-infinite-scroll @ionInfinite="loadMoreBirds">
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more birds...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { IonList, IonItem, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';

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
  emit('loadMoreBirds', event);
};

const randomRotation = () => {
  return `${Math.random() * 6 - 3}deg`; // Random rotation between -3 and 3 degrees
};

const randomTapeRotation = () => {
  return `${Math.random() * 20 - 10}deg`; // Random rotation between -10 and 10 degrees
};
</script>

<style scoped>

.scrapbook-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scrapbook-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/backgrounds/parchment-paper.jpg');
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.scrapbook-content {
  position: relative;
  height: 100%;
  overflow-y: auto;
  z-index: 1;
  padding: 20px;
}

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

.bird-image-container {
  position: relative;
  flex-shrink: 0;
  margin-right: 20px;
  transform: rotate(var(--rotation));
  transition: transform 0.3s ease;
  width: 170px;
}

.bird-image-frame {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(208, 208, 208, 0.5);
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.bird-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 1px solid rgba(224, 224, 224, 0.5);
}

.bird-image-tape {
  position: absolute;
  width: 80px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.6);
  top: -15px;
  left: 50%;
  transform: translateX(-50%) rotate(var(--tape-rotation));
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.bird-image-caption {
  text-align: center;
  margin-top: 10px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  color: #333;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.7);
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

.bird-image-container:hover {
  animation: subtle-sway 3s ease-in-out infinite;
}

@keyframes subtle-sway {
  0% { transform: rotate(var(--rotation)); }
  50% { transform: rotate(calc(var(--rotation) + 2deg)); }
  100% { transform: rotate(var(--rotation)); }
}

.bird-selected {
  animation: birdClickAnimation 0.5s ease;
}

@keyframes birdClickAnimation {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Enhanced Skeleton styles */
.skeleton .bird-image-frame {
  background-color: rgba(240, 240, 240, 0.5);
}

.skeleton-image {
  width: 150px;
  height: 150px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeletonLoading 1.5s infinite;
}

.skeleton-caption {
  width: 80%;
  height: 14px;
  margin: 10px auto 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeletonLoading 1.5s infinite;
}

.skeleton-tape {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeletonLoading 1.5s infinite;
}

@keyframes skeletonLoading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
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

  .bird-image-container {
    width: 120px;
    margin-right: 10px;
  }

  .bird-image, .skeleton-image {
    width: 100px;
    height: 100px;
  }

  .bird-description {
    font-size: 16px;
    padding: 8px;
  }

  .bird-image-caption, .skeleton-caption {
    font-size: 12px;
  }
}
</style>