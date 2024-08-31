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

    <div class="scrapbook-page">

      <div class="spectrogram-container" ref="spectrogramContainer">
        <div ref="waveform" id="waveform"></div>
      </div>
      
      <ion-content>
          <div class="birds-section">
            <h2>Possible Birds</h2>
            <div v-for="(bird, index) in possibleBirds" :key="index" class="bird-item">
              {{ bird }}
            </div>
          </div>

      </ion-content>

      <ion-footer class="footer-section">
        <div class="record-button-container">
          <ion-fab-button @click="toggleRecording" class="record-button" size="large">
            <ion-icon :icon="isRecording ? stopCircle : micCircle" class="record-icon"></ion-icon>
          </ion-fab-button>
          <div ref="progress" id="progress">00:00</div>
        </div>
      </ion-footer>
    </div>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonFooter, IonFabButton, IonButton, IonIcon } from '@ionic/vue';
import { micCircle, stopCircle } from 'ionicons/icons';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';


const spectrogramContainer = ref(null);
const waveform = ref(null);
const wavesurfer = ref(null);
const record = ref(null);
const isRecording = ref(false);
const possibleBirds = ref([]);
let scrollingWaveform = true;
let birdInterval = null;

onMounted(() => {
  createWaveSurfer();

  // Get the platform and log it
  const platform = Capacitor.getPlatform();
  console.log(`Running on platform: ${platform}`);
});

onUnmounted(() => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
  }
  clearBirdInterval();
});

function createWaveSurfer() {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
  }

  wavesurfer.value = WaveSurfer.create({
    container: waveform.value,
    sampleRate: 22050, 
    minPxPerSec: 10,
    progressColor: '#5e2f0d',
    height: 0,
    fillParent: true,
    plugins: [
      Spectrogram.create({
        height: 150,
        windowFunc: 'hann',
      }),
    ],
  });

  record.value = wavesurfer.value.registerPlugin(
    RecordPlugin.create({ scrollingWaveform, renderRecordedAudio: false })
  );

  record.value.on('record-end', (blob) => {
    downloadFile(blob)
  });

  record.value.on('deviceError', (code) => {
    console.warn('Device error: ' + code);
  });

  record.value.on('record-progress', (time) => {
    updateProgress(time);
  });
}

function toggleRecording() {
  if (record.value.isRecording()) {
    stopRecording();
  } else {
    startRecording();
  }
}

async function startRecording() {
  possibleBirds.value = []; // Clear the possible birds list
  isRecording.value = true;
  const deviceId = null; // If you want to select a specific mic, set the deviceId
  await record.value.startRecording({ deviceId });

  // TEMP - remove the following line when you're ready to record real birds
  startBirdInterval();
}

function stopRecording() {
  if (record.value.isRecording()) {
    record.value.stopRecording();
  }
  isRecording.value = false;
  clearBirdInterval();
}

function updateProgress(time) {
  const formattedTime = [
    Math.floor((time % 3600000) / 60000), // minutes
    Math.floor((time % 60000) / 1000),    // seconds
  ].map((v) => (v < 10 ? '0' + v : v)).join(':');
  document.querySelector("#progress").textContent = formattedTime;
}


async function downloadFile(blob) {
  const now = new Date();
  const year = now.getFullYear();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const dateTime = `${year}-${day}-${month}_${hours}-${minutes}-${seconds}`;

  if (Capacitor.getPlatform() === 'web') {
    // download wav on web app
    const recordedUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = recordedUrl;
    downloadLink.download = `bird_recording_${dateTime}.webm`;
    downloadLink.click();

  } else {
    // download wav on android/iOS filesystem
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    console.log("blob: ", blob)
    reader.onloadend = async () => {
      const base64data = reader.result;
      console.log("base64data: ", base64data)
      const fileName = `bird_recording_${dateTime}.webm`;
      // const filePath = `Birding Pal/${fileName}`;
      const savedFile = await Filesystem.writeFile({
        path: fileName, // filePath in the future
        data: base64data,
        directory: Directory.Documents,
        encoding: Encoding.UTF8, // optional - utf8 by default
      });
      console.log('savedFile', savedFile);
    };


    // const reader = new FileReader();
    // reader.readAsArrayBuffer(blob);
    // reader.onloadend = async () => {
    //   const arrayBuffer = reader.result;
    //   const base64data = btoa(
    //     new Uint8Array(arrayBuffer)
    //       .reduce((data, byte) => data + String.fromCharCode(byte), '')
    //   );
    //   const fileName = `bird_recording_${dateTime}.wav`;
    //   const savedFile = await Filesystem.writeFile({
    //     path: fileName,
    //     data: base64data,
    //     directory: Directory.Documents,
    //     encoding: Encoding.UTF8, // optional - utf8 by default
    //   });
    //   console.log('savedFile', savedFile);
    // };
  }
}


/* TEMP FUNCTIONS TO TEST BIRDS */

function startBirdInterval() {
  birdInterval = setInterval(() => {
    const newBird = generateFakeBird();
    possibleBirds.value.push(newBird);
  }, 2000); // Add a new bird every 2 seconds
}

function clearBirdInterval() {
  if (birdInterval) {
    clearInterval(birdInterval);
    birdInterval = null;
  }
}

function generateFakeBird() {
  const birdNames = ['Sparrow', 'Robin', 'Blue Jay', 'Cardinal', 'Goldfinch'];
  const randomIndex = Math.floor(Math.random() * birdNames.length);
  return birdNames[randomIndex];
}
</script>

<style scoped>
.scrapbook-theme {
  --ion-background-color: transparent;
  --ion-text-color: #3c2f2f;
}

.scrapbook-page {
  background-image: url('../assets/backgrounds/parchment-paper-tattered3.png');
  background-size: cover;
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

.spectrogram-container {
  width: 100%;
  max-width: 600px;
  height: 150px;
  border: 3px solid #5e2f0d;
  border-radius: 10px;
  background-color: #d2b48c;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  overflow-y: hidden;

  margin-bottom: 20px;
}

.birds-section {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
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
  box-shadow: none;
}

.record-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.record-button {
  --background: #8b4513;
  --background-activated: #5e2f0d;
  --background-hover: #724011;
  width: 80px;
  height: 80px;
}

.record-icon {
  font-size: 48px
}

#progress {
  margin-left: 20px;
  font-size: 1.5em;
  color: #8b4513;
}

ion-title,
ion-back-button {
  color: white;
}

.scrapbook-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  ),
  linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  ),
  linear-gradient(
    to right,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  ),
  linear-gradient(
    to left,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  );
  z-index: 1;
  pointer-events: none;
}
</style>