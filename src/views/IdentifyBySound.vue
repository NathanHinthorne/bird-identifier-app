<template>
  <ion-page class="scrapbook-theme">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/identify" text="Back"></ion-back-button>
        </ion-buttons>
        <ion-title>Identify by Sound</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="scrapbook-page">
        <div class="section spectrogram-section">
          <h2>Live Spectrogram</h2>
          <div class="player">
            <div class="background">
              <div class="spectrogram-container" ref="spectrogramContainer">
                <div ref="waveform" id="waveform"></div>
                <div ref="progress" id="progress">00:00</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section birds-section">
          <h2>Possible Birds</h2>
          <div v-for="(bird, index) in possibleBirds" :key="index" class="bird-item">
            {{ bird }}
          </div>
        </div>
      </div>
    </ion-content>

    <ion-footer class="footer-section">
      <ion-toolbar>
        <div class="record-button-container">
          <ion-fab-button @click="toggleRecording" class="record-button" size="large">
            <ion-icon :icon="isRecording ? stopCircle : micCircle" size="large"></ion-icon>
          </ion-fab-button>
          <ion-button id="pause" @click="pauseRecording" style="display: none;">Pause</ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonFooter, IonFabButton, IonButton, IonIcon } from '@ionic/vue';
import { micCircle, stopCircle } from 'ionicons/icons';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js';

const spectrogramContainer = ref(null);
const waveform = ref(null);
const wavesurfer = ref(null);
const record = ref(null);
const isRecording = ref(false);
const possibleBirds = ref([]);
let scrollingWaveform = false;

onMounted(() => {
  createWaveSurfer();
});

onUnmounted(() => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
  }
});

function createWaveSurfer() {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
  }

  wavesurfer.value = WaveSurfer.create({
    container: waveform.value,
    sampleRate: 22050, 
    minPxPerSec: 20,
    progressColor: '#5e2f0d',
    height: 0,
    fillParent: true,
    plugins: [
      Spectrogram.create({
        labels: true,
        height: 250,
        windowFunc: 'hann',
      }),
    ],
  });


  record.value = wavesurfer.value.registerPlugin(
    RecordPlugin.create({ scrollingWaveform, renderRecordedAudio: false })
  );

  record.value.on('record-end', (blob) => {
    const recordedUrl = URL.createObjectURL(blob);
    wavesurfer.value.load(recordedUrl);
  });

  record.value.on('record-progress', (time) => {
    updateProgress(time);
  });
}

function toggleRecording() {
  if (record.value.isRecording() || record.value.isPaused()) {
    stopRecording();
  } else {
    startRecording();
  }
}

async function startRecording() {
  isRecording.value = true;
  const deviceId = null; // If you want to select a specific mic, set the deviceId
  await record.value.startRecording({ deviceId });
  document.querySelector("#pause").style.display = "inline";
}

function stopRecording() {
  if (record.value.isRecording() || record.value.isPaused()) {
    record.value.stopRecording();
    document.querySelector("#pause").style.display = "none";
  }
  isRecording.value = false;
}

function pauseRecording() {
  if (record.value.isPaused()) {
    record.value.resumeRecording();
    document.querySelector("#pause").textContent = "Pause";
  } else {
    record.value.pauseRecording();
    document.querySelector("#pause").textContent = "Resume";
  }
}

function updateProgress(time) {
  const formattedTime = [
    Math.floor((time % 3600000) / 60000), // minutes
    Math.floor((time % 60000) / 1000),    // seconds
  ].map((v) => (v < 10 ? '0' + v : v)).join(':');
  document.querySelector("#progress").textContent = formattedTime;
}
</script>

<style scoped>
.scrapbook-theme {
  --ion-background-color: #f0e6d2;
  --ion-text-color: #3c2f2f;
}

.scrapbook-page {
  background-image: url('../assets/scrapbook-paper-texture.jpg');
  background-size: cover;
  border: 10px solid #8b4513;
  border-image: url('../assets/scrapbook-border.png') 30 round;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.section {
  margin-bottom: 20px;
}

h2 {
  font-family: 'Fredericka the Great', cursive;
  color: #8b4513;
  text-align: center;
}

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

.birds-section {
  flex: 1;
  overflow-y: auto;
}

.bird-item {
  background: rgba(255, 255, 255, 0.7);
  border: 2px dashed #8b4513;
  padding: 10px;
  margin-bottom: 10px;
  font-family: 'Caveat', cursive;
  font-size: 1.2em;
}

.footer-section {
  height: 100px;
}

.record-button-container {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.record-button {
  --background: #8b4513;
  --background-activated: #5e2f0d;
  --background-hover: #724011;
  width: 80px;
  height: 80px;
}

.record-button ion-icon {
  font-size: 48px;
}
</style>
