<template>
  <div class="player">
    <div class="background">
      <p v-if="isLoading">Loading...</p>
      <div class="spectrogram-container" ref="spectrogramContainer" v-show="!isLoading">
        <div ref="waveform"></div>
      </div>
      <div class="progress-bar-container">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          v-model="progress"
          @input="onProgressChange"
          class="progress-bar"
        >
      </div>
      <div class="controls">
        <button @click="rewind" class="control-button">
          <ion-icon :icon="playBack"></ion-icon>
        </button>
        <button @click="togglePlay" :class="{ 'playing': isPlaying }" class="control-button">
          <ion-icon :icon="isPlaying ? pause : play"></ion-icon>
        </button>
        <button @click="fastForward" class="control-button">
          <ion-icon :icon="playForward"></ion-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { IonIcon } from '@ionic/vue';
import { play, pause, playBack, playForward } from 'ionicons/icons';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js';

const props = defineProps({
  audioSrc: {
    type: String,
    required: true
  },
});

const isLoading = ref(true);
const isPlaying = ref(false);
const spectrogramContainer = ref(null);
const waveform = ref(null);
const wavesurfer = ref(null);
const progress = ref(0);

const skipTime = 3; // seconds

onMounted(() => {
  wavesurfer.value = WaveSurfer.create({
    container: waveform.value,
    sampleRate: 22050,
    minPxPerSec: 100, 
    progressColor: '#5e2f0d',
    height: 0,
    fillParent: true,
    dragToSeek: false,
    plugins: [
      Spectrogram.create({
        labels: true,
        height: 150,
        windowFunc: 'hann',
      }),
    ],
  });

  wavesurfer.value.load(props.audioSrc);

  wavesurfer.value.on('ready', () => {
    console.log("WAVESURFER DONE LOADING");
    isLoading.value = false;
  });

  wavesurfer.value.on('audioprocess', () => {
    updateScroll();
    updateProgress();
  });
  wavesurfer.value.on('seek', () => {
    updateScroll();
    updateProgress();
  });

  wavesurfer.value.on('finish', () => {
    isPlaying.value = false;
    wavesurfer.value.pause();
  });
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

const fastForward = () => {
  if (wavesurfer.value) {
    const currentTime = wavesurfer.value.getCurrentTime();
    const duration = wavesurfer.value.getDuration();
    const newTime = Math.min(currentTime + skipTime, duration);
    wavesurfer.value.seekTo(newTime / duration);
  }
};

const rewind = () => {
  if (wavesurfer.value) {
    const currentTime = wavesurfer.value.getCurrentTime();
    const duration = wavesurfer.value.getDuration();
    const newTime = Math.max(currentTime - skipTime, 0);
    wavesurfer.value.seekTo(newTime / duration);
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

const updateProgress = () => {
  if (wavesurfer.value) {
    progress.value = (wavesurfer.value.getCurrentTime() / wavesurfer.value.getDuration()) * 100;
  }
};

const onProgressChange = () => {
  if (wavesurfer.value) {
    wavesurfer.value.seekTo(progress.value / 100);
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
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
}

.control-button {
  background-color: #5e2f0d;
  color: #f0e6d2;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-button:hover {
  background-color: #7a3d10;
}

.control-button.playing {
  background-color: #7a3d10;
}

.spectrogram-container {
  width: 100%;
  max-width: 600px;
  height: 150px;
  background-color: #d2b48c;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  overflow-y: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.progress-bar-container {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.progress-bar {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  background: #d2b48c;
  outline: none;
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

.progress-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #5e2f0d;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  /*
  margin-top: -6px
  */
}

.progress-bar::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #5e2f0d;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  /*
  margin-top: -6px
  */
}
</style>