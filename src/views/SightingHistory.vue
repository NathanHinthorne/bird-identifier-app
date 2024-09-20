<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="'Back'"></ion-back-button>
        </ion-buttons>
        <ion-title>Sighting History</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="scrapbook-container">
        <div class="scrapbook-background"></div>
        <div class="scrapbook-content">
          <LoadingAnimation v-if="isLoading" loadingText="Loading sightings..."/>

          <div v-else class="sighting-list">
            <h2>Sightings</h2>
            <div v-for="(sighting, index) in sightings" :key="index" class="sighting-item">
              <div class="sighting-info">
                <div class="sighting-location">{{ sighting.location }}</div>
                <div class="sighting-date">{{ formatDate(sighting.date) }}</div>
              </div>
              <div class="sighting-note">{{ sighting.note }}</div>
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
import { useUserStore } from '../stores/userStore';
import LoadingAnimation from '../components/LoadingAnimation.vue';

const userStore = useUserStore();
const route = useRoute();
const birdName = ref('');
const sightings = ref([]);
const isLoading = ref(true);

onMounted(async () => {
    birdName.value = route.params.birdName;
    sightings.value = await userStore.getBirdSightings(birdName.value);
    isLoading.value = false;
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
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
  padding: 20px;
}

h2 {
  font-family: 'Pacifico', cursive;
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.sighting-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sighting-item {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.sighting-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.sighting-location, .sighting-date {
  font-family: 'Just Another Hand', cursive;
  font-size: 22px;
  color: #444;
}

.sighting-note {
  font-family: 'Just Another Hand', cursive;
  font-size: 28px;
  color: #333;
  line-height: 1.3;
}

@media (max-width: 480px) {
  .sighting-location, .sighting-date {
    font-size: 20px;
  }

  .sighting-note {
    font-size: 24px;
  }
}
</style>