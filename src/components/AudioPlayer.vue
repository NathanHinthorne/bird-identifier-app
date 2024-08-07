<template>
  <div class="player">
    <div class="background">
      <div class="controls">
        <button @click="togglePlay" :class="{ 'playing': isPlaying }">
          <ion-icon :icon="isPlaying ? pause : play"></ion-icon>
        </button>
      </div>
      <div class="spectrogram-container" ref="spectrogramContainer">
        <div ref="waveform"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { IonIcon } from '@ionic/vue';
import { play, pause } from 'ionicons/icons';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js';

const props = defineProps({
  audioSrc: {
    type: String,
    required: true
  },
});

const isPlaying = ref(false);
const spectrogramContainer = ref(null);
const waveform = ref(null);
const wavesurfer = ref(null);

onMounted(() => {
  wavesurfer.value = WaveSurfer.create({
    container: waveform.value,
    sampleRate: 22050,
    minPxPerSec: 100, 
    progressColor: '#5e2f0d',
    height: 0,
    fillParent: true,
    dragToSeek: true,
    plugins: [
      Spectrogram.create({
        labels: true,
        height: 250,
        windowFunc: 'hann',
      }),
    ],
  });

  wavesurfer.value.load(props.audioSrc);

  wavesurfer.value.on('audioprocess', updateScroll);
  wavesurfer.value.on('seek', updateScroll);

  wavesurfer.value.on('finish', () => {
    isPlaying.value = false;
    wavesurfer.value.pause();
  });

  console.log('Audio player with spectrogram mounted. WaveSurfer:', wavesurfer.value);
});

onUnmounted(() => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
  }
});

watch(() => props.audioSrc, (newSrc) => {
  if (wavesurfer.value) {
    wavesurfer.value.load(newSrc);
    isPlaying.value = false;
  }
});

const togglePlay = () => {
  if (wavesurfer.value) {
    wavesurfer.value.playPause();
    isPlaying.value = !isPlaying.value;
  }
};

const updateScroll = () => {
  if (spectrogramContainer.value && waveform.value) {
    const progress = wavesurfer.value.getCurrentTime() / wavesurfer.value.getDuration();
    const containerWidth = spectrogramContainer.value.clientWidth;
    const waveformWidth = waveform.value.scrollWidth;
    const scrollPosition = (waveformWidth * progress) - (containerWidth / 2);
    spectrogramContainer.value.scrollLeft = Math.max(0, scrollPosition);
  }
};
</script>

<style scoped>
.player {
  background-color: #8b4513;
  border: 2px solid #5e2f0d;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.background {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #d2b48c;
  border-radius: 8px;
  padding: 15px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

.controls {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.controls button {
  background-color: #5e2f0d;
  color: #f0e6d2;
  border: none;
  border-radius: 20%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.controls button:hover {
  background-color: #7a3d10;
}

.controls button.playing {
  background-color: #7a3d10;
}

.spectrogram-container {
  width: 100%;
  max-width: 600px;
  height: 250px;
  border: 2px solid #5e2f0d;
  border-radius: 10px;
  background-color: #d2b48c;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  overflow-y: hidden;
}
</style>