<template>
  <div class="vintage-player">
    <div class="tape-deck">
      <div class="tape-label">{{ label }}</div>
      <div class="tape-controls">
        <button @click="togglePlay" :class="{ 'playing': isPlaying }">
          <ion-icon :icon="isPlaying ? pause : play"></ion-icon>
        </button>
        <div class="progress-bar" @click="seek" ref="progressBar">
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
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { IonIcon } from '@ionic/vue';
import { play, pause } from 'ionicons/icons';

const props = defineProps({
  audioSrc: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

const audio = ref(null);
const isPlaying = ref(false);
const progress = ref(0);
const leftReelRotation = ref(0);
const rightReelRotation = ref(0);
const progressBar = ref(null);

onMounted(() => {
  audio.value = new Audio(props.audioSrc);
  audio.value.addEventListener('timeupdate', updateProgress);
  audio.value.addEventListener('ended', onEnded);
  audio.value.addEventListener('canplay', onCanPlay);
});

onUnmounted(() => {
  if (audio.value) {
    audio.value.removeEventListener('timeupdate', updateProgress);
    audio.value.removeEventListener('ended', onEnded);
    audio.value.removeEventListener('canplay', onCanPlay);
    audio.value.pause();
  }
});

watch(() => props.audioSrc, (newSrc) => {
  if (audio.value) {
    audio.value.src = newSrc;
    isPlaying.value = false;
    progress.value = 0;
  }
});

const togglePlay = async () => {
  if (!audio.value) return;

  try {
    if (audio.value.paused) {
      await audio.value.play();
      isPlaying.value = true;
    } else {
      audio.value.pause();
      isPlaying.value = false;
    }
  } catch (error) {
    console.error('Error toggling play:', error);
    isPlaying.value = false;
  }
};

const updateProgress = () => {
  if (audio.value && audio.value.duration) {
    progress.value = (audio.value.currentTime / audio.value.duration) * 100;
    leftReelRotation.value += isPlaying.value ? 5 : 0;
    rightReelRotation.value -= isPlaying.value ? 5 : 0;
  }
};

const seek = (event) => {
  if (!audio.value || !progressBar.value) return;

  const rect = progressBar.value.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  const newTime = percent * audio.value.duration;

  if (isFinite(newTime)) {
    audio.value.currentTime = newTime;
    updateProgress();
  }
};

const onEnded = () => {
  isPlaying.value = false;
  progress.value = 0;
};

const onCanPlay = () => {
  updateProgress();
};
</script>

<style scoped>
/* Include the styles for the vintage player from the original component */
</style>

<style scoped>
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


</style>