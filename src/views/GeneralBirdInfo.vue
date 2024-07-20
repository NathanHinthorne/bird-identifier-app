<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/explore"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ bird.comName }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="scrapbook-container">
        <div class="scrapbook-background"></div>
        <div class="scrapbook-content">
          <div class="bird-info-card">
            <div class="bird-image-container" :style="{ '--rotation': randomRotation() }">
              <div class="bird-image-tape" :style="{ '--tape-rotation': randomTapeRotation() }"></div>
              <div class="bird-image-frame">
                <img :src="bird.largeImg" :alt="bird.comName" class="bird-image" />
              </div>
              <p class="bird-image-caption">{{ bird.comName }}</p>
            </div>
            <div class="bird-details">
              <h2>{{ bird.sciName }}</h2>
              <div class="bird-section">
                <h3>Description</h3>
                <p>{{ bird.longDescription }}</p>
              </div>
              <div class="bird-section">
                <h3>How to Find</h3>
                <p>{{ bird.howToFind }}</p>
              </div>
              <div class="bird-section">
                <h3>Listen</h3>
                <div class="vintage-player">
                  <div class="tape-deck">
                    <div class="tape-label">{{ bird.comName }}</div>
                    <div class="tape-controls">
                      <button @click="togglePlay" :class="{ 'playing': isPlaying }">
                        {{ isPlaying ? '❚❚' : '▶' }}
                      </button>
                      <div class="progress-bar" @click="seek">
                        <div class="progress" :style="{ width: `${progress}%` }"></div>
                      </div>
                    </div>
                    <div class="tape-reels">
                      <div class="reel left-reel" :style="{ transform: `rotate(${leftReelRotation}deg)` }">
                        <div class="reel-hole"></div>
                      </div>
                      <div class="tape-window"></div>
                      <div class="reel right-reel" :style="{ transform: `rotate(${rightReelRotation}deg)` }">
                        <div class="reel-hole"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="bird-section">
                <h3>Range Map</h3>
                <img :src="bird.map" alt="Range map" class="range-map" />
              </div> -->
              <div class="bird-section">
                <a :href="bird.learnMoreLink" target="_blank" rel="noopener noreferrer" class="learn-more-btn">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons } from '@ionic/vue';
import { useNearbyBirdsStore } from '../stores/nearbyBirdsStore';

const route = useRoute();
const nearbyBirdsStore = useNearbyBirdsStore();
const bird = ref({});

const audio = ref(null);
const isPlaying = ref(false);
const progress = ref(0);
const leftReelRotation = ref(0);
const rightReelRotation = ref(0);

onMounted(async () => {
  const birdName = route.params.birdName;
  bird.value = await nearbyBirdsStore.getBirdByName(birdName);
  
  audio.value = new Audio(bird.value.sound);
  audio.value.addEventListener('timeupdate', updateProgress);
  audio.value.addEventListener('ended', () => {
    isPlaying.value = false;
    progress.value = 0;
  });
});

onUnmounted(() => {
  if (audio.value) {
    audio.value.removeEventListener('timeupdate', updateProgress);
    audio.value.pause();
  }
});

const togglePlay = () => {
  if (audio.value.paused) {
    audio.value.play();
    isPlaying.value = true;
  } else {
    audio.value.pause();
    isPlaying.value = false;
  }
};

const updateProgress = () => {
  if (audio.value) {
    progress.value = (audio.value.currentTime / audio.value.duration) * 100;
    leftReelRotation.value += isPlaying.value ? 5 : 0;
    rightReelRotation.value -= isPlaying.value ? 5 : 0;
  }
};

const seek = (event) => {
  const percent = event.offsetX / event.target.offsetWidth;
  audio.value.currentTime = percent * audio.value.duration;
  updateProgress();
};

const randomRotation = () => `${Math.random() * 6 - 3}deg`;
const randomTapeRotation = () => `${Math.random() * 20 - 10}deg`;

</script>

<style scoped>
.scrapbook-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scrapbook-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

  /*
  padding: 20px;
  */
}

.bird-info-card {
  /*
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  */
  
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.bird-image-container {
  position: relative;
  margin-bottom: 20px;
  transform: rotate(var(--rotation));
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.bird-image-frame {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(208, 208, 208, 0.5);
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.bird-image {
  width: 100%;
  height: auto;
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
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px;
  border-radius: 5px;
}

.bird-details {
  font-family: 'Just Another Hand', cursive;
  color: #444;

  font-size: 28px; /* Increase this value as needed */
  line-height: 1.2; /* Adjust line height for better readability */
  transform: scale(1); /* This helps with font rendering */
  transform-origin: left top; /* Ensures scaling from top-left corner */
}

.bird-details h2 {
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
}

.bird-section {
  /*
  background-color: rgba(255, 255, 255, 0.7);
  */

  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
}

.bird-section h3 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #333;
}

.bird-section p {
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  line-height: 1.6;
}

.range-map {
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.learn-more-btn {
  display: inline-block;
  background-color: var(--ion-color-primary);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.learn-more-btn:hover {
  background-color: var(--ion-color-primary-shade);
}

audio {
  width: 100%;
  margin-top: 10px;
}

.custom-toolbar {
  --background: var(--ion-color-primary-tint);
}

/* Override element sizes on smaller devices */
@media (max-width: 480px) {
  .bird-image-container {
    max-width: 200px;
  }

  .bird-details h2 {
    font-size: 26px;
  }

  .bird-section h3 {
    font-size: 26px;
  }

  .bird-section p {
    font-size: 14px;
  }

  .learn-more-btn {
    font-size: 14px;
    padding: 8px 16px;
  }
}

/* Tape player for "listen" section */
.vintage-player {
  background-color: #8b4513;
  border: 2px solid #5e2f0d;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.tape-deck {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #d2b48c;
  border-radius: 8px;
  padding: 15px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

.tape-label {
  background-color: #fff;
  color: #333;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tape-controls {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.tape-controls button {
  background-color: #5e2f0d;
  color: #f0e6d2;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.tape-controls button:hover {
  background-color: #7a3d10;
}

.tape-controls button.playing {
  background-color: #7a3d10;
}

.progress-bar {
  flex-grow: 1;
  height: 10px;
  background-color: #a67b5b;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress {
  height: 100%;
  background-color: #5e2f0d;
  transition: width 0.1s linear;
}

.tape-reels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.reel {
  width: 60px;
  height: 60px;
  border: 8px solid #5e2f0d;
  border-radius: 50%;
  position: relative;
  background-color: #8b4513;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 0 5px rgba(0, 0, 0, 0.1);
  flex-shrink: 0; /* Prevent the element from shrinking */
}

.reel::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: #5e2f0d;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.reel::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background-color: #5e2f0d;
  transform-origin: center;
}


.tape-window {
  width: 100px;
  height: 30px;
  background-color: #a67b5b;
  border: 2px solid #5e2f0d;
  border-radius: 4px;
  margin: 0 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

ion-toolbar {
  --background: none;
  background: url('../assets/backgrounds/leather-bar.png') no-repeat center center;
  background-size: cover;
  padding: 10px;
}

ion-title {
  color: white;
}
</style>