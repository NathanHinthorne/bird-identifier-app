<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/life-list"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ bird.comName }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="scrapbook-container">
        <div class="scrapbook-background"></div>
        <div class="scrapbook-content">
          <div class="bird-info-card">
            <!-- <BirdImage :imageUrl="bird.maleBreedingPhoto" :birdName="bird.comName" /> -->
            <LargeBirdImage :imageUrl="bird.previewPhoto" :birdName="bird.comName" />
            <div class="bird-details">
              <div class="bird-section stats-section">
                <div class="section-header">
                  <img src="../assets/ui/paper-piece-long-dark-tape.png" alt="Paper tape" class="section-header-bg">
                  <h3>Stats</h3>
                </div>
                <BirdStats :stats="stats" />
              </div>
              
              <div class="bird-section">
                <div class="section-header">
                  <img src="../assets/ui/paper-piece-long-dark-tape.png" alt="Paper tape" class="section-header-bg">
                  <h3>Description</h3>
                </div>
                <p>{{ bird.longDesc }}</p>
              </div>
              
              <div class="bird-section">
                <div class="section-header">
                  <img src="../assets/ui/paper-piece-long-dark-tape.png" alt="Paper tape" class="section-header-bg">
                  <h3>How to Find</h3>
                </div>
                <p>{{ bird.howToFind }}</p>
              </div>

              <div class="bird-section">
                <div class="section-header">
                  <img src="../assets/ui/paper-piece-long-dark-tape.png" alt="Paper tape" class="section-header-bg">
                  <h3>Listen</h3>
                </div>
                <AudioPlayer :audioSrc="bird.sound" :label="bird.comName" />
              </div>
              
              <div class="bird-section">
                <div class="section-header">
                  <img src="../assets/ui/paper-piece-long-dark-tape.png" alt="Paper tape" class="section-header-bg">
                  <h3>Learn More</h3>
                </div>
                <p>Find out more about the {{ bird.comName }} on the <a :href="bird.learnMoreLink" target="_blank" rel="noopener noreferrer">All About Birds</a> website.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons } from '@ionic/vue';
import { useRegionalBirdStore } from '../stores/regionalBirdStore';
import AudioPlayer from '../components/AudioPlayer.vue';
import LargeBirdImage from '../components/LargeBirdImage.vue';
import BirdStats from '../components/BirdStats.vue';

const route = useRoute();
const regionalBirdStore = useRegionalBirdStore();
const bird = ref({});

const stats = ref([
  { label: 'Attack', value: 2 },
  { label: 'Defense', value: 2 },
  { label: 'Speed', value: 5 },
  { label: 'Intelligence', value: 3 },
]);

onMounted(async () => {
  const birdName = route.params.birdName;
  bird.value = await regionalBirdStore.getBirdByName(birdName);
});
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
}

.bird-info-card {
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}


.bird-details {
  font-family: 'Just Another Hand', cursive;
  color: #444;
  font-size: 28px; 
  line-height: 1.2;
  transform: scale(1);
  transform-origin: left top;
}

.bird-details h2 {
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
}

.bird-section {
  background-color: rgba(255, 255, 255, 0.25);
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
  font-family: 'Just Another Hand', cursive;
  font-size: 26px;
  line-height: 1.4;
  font-weight: normal;
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

ion-toolbar {
  --background: none;
  background: url('../assets/backgrounds/leather-bar.png') no-repeat center center;
  background-size: cover;
  padding: 10px;
}

ion-title {
  color: white;
}

.section-header {
  position: relative;
  margin-bottom: 15px;
}

.section-header-bg {
  width: 100%;
  height: auto;
}

.section-header h3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 5px 10px;
  font-family: 'Just Another Hand', cursive;
  font-size: 32px;
  font-weight: bold;
  color: #333;
  text-align: center;
  width: 100%;
}


/* Override styles on smaller screens */
@media (max-width: 480px) {
  .bird-details h2 {
    font-size: 26px;
  }

  .bird-section h3 {
    font-size: 26px;
  }

  .bird-section p {
    font-size: 24px;
  }

  .learn-more-btn {
    font-size: 14px;
    padding: 8px 16px;
  }

  .section-header h3 {
    font-size: 28px;
  }
}


</style>