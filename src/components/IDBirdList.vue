<template>
  <div class="id-bird-list">
    <ion-content class="bird-list-content">
      <div class="bird-grid">
        <div 
          v-for="bird in birds" 
          :key="bird.formattedComName" 
          class="bird-item"
        >
          <div class="bird-image-wrapper" @click="selectBird(bird)">
            <SmallBirdImage :imageUrl="bird.previewPhoto" :birdName="bird.comName" :inGame="bird.inGame" />
          </div>
          <div class="button-wrapper">
            <button class="bird-button" @click.stop="birdID(bird)">This is my bird!</button>
          </div>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { IonContent } from '@ionic/vue';
import SmallBirdImage from '../components/SmallBirdImage.vue';

const emit = defineEmits(['selectBird', 'birdID']);

const props = defineProps({
  birds: {
    type: Array,
    required: true
  }
});

const selectedBird = ref(null);
const identifiedBird = ref(null);

const selectBird = (bird) => {
  console.log("You selected a", bird.comName);
  selectedBird.value = bird.formattedComName;
  emit('selectBird', bird);
};


const birdID = (bird) => {
  console.log("You identified a", bird.comName);
  identifiedBird.value = bird; 
  emit('birdID', bird);
  setTimeout(() => {
    identifiedBird.value = null;
  }, 2000);
};
</script>

<style scoped>
.id-bird-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bird-list-content {
  --background: transparent;
  position: relative;
  height: 100%;
  z-index: 1;
}

.bird-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 10px;
}

.bird-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border: 2px solid rgba(212,195,163, 0.5);
  background-color: rgba(249,243,230, 0.5);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.bird-item:hover {
  transform: translateY(-5px);
}

.bird-item.pulse {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(124, 179, 66, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(124, 179, 66, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(124, 179, 66, 0);
  }
}

.bird-image-wrapper {
  margin-bottom: 15px;
  cursor: pointer;
}

.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.bird-button {
  background-color: #7cb342;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 25px;
  font-size: 16px;
  font-family: 'Just Another Hand', cursive;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.bird-button::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
  z-index: -1;
  filter: blur(5px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.bird-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.bird-button:hover::before {
  opacity: 1;
}

.bird-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>