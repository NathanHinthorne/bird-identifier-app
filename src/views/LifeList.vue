<template>
  <ion-page>
    <ion-toolbar>
      <ion-header>
        <ion-title>Life List</ion-title>
        <BirdSearch @search="searchBirds" class="custom-searchbar" />
      </ion-header>
    </ion-toolbar>

    <div class="scrapbook-container">
      <div class="scrapbook-background"></div>
          
      <ion-content class="scrapbook-content">
        <LoadingAnimation v-if="seenBirdStore.fetchingBirds" loadingText="Loading birds..."/>
        <template v-if="!seenBirdStore.fetchingBirds" >
          <BirdBattlerAd v-if="userStore.settings.showBirdBattlerAd" :canRemove="true"/>
          <BirdList
            v-if="displayedBirds.length > 0"
            :birds="displayedBirds" 
            :isLoading="isLoading"
            @selectBird="handleSelectBird" 
            @loadMoreBirds="handleLoadMore" 
          />
          <p v-else class="no-birds-message">No birds here. Try spotting some!</p>
        </template>
      </ion-content>
    </div>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import BirdList from '../components/BirdList.vue';
import BirdSearch from '../components/BirdSearch.vue';
import LoadingAnimation from '../components/LoadingAnimation.vue';
import BirdBattlerAd from '../components/BirdBattlerAd.vue';
import { IonContent, IonPage, IonToolbar, IonTitle, IonHeader } from '@ionic/vue';
import { useSeenBirdStore } from '../stores/seenBirdStore';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();

const router = useRouter();

const seenBirdStore = useSeenBirdStore();
const selectedBird = ref(null);
const isLoading = ref(false);

const displayedBirds = computed(() => seenBirdStore.getDisplayedBirds());

const allBirdsLoaded = computed(() => seenBirdStore.allBirdsLoaded());

onMounted(async () => {
  isLoading.value = true;
  seenBirdStore.generateInitialBirds();
});

const handleLoadMore = async (event) => {
  if (!allBirdsLoaded.value) {
    event.target.complete();
    return;
  }

  isLoading.value = true;
  try {
    await seenBirdStore.generateMoreBirds();
  } finally {
    isLoading.value = false;
    event.target.complete();
    console.log('Done loading!');
  }
};

const searchBirds = async (searchTerm) => {
  isLoading.value = true;
  try {
    await seenBirdStore.applyNewSearch(searchTerm);
  } finally {
    isLoading.value = false;
  }
  selectedBird.value = null;
};

const handleSelectBird = (bird) => {
  selectedBird.value = bird;
  router.push('/life-list/bird-info/' + bird.formattedComName);
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
  background-image: url('@/assets/backgrounds/parchment-paper.jpg');
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.scrapbook-content {
  --background: transparent;  
  position: relative; 
  height: 100%; 
  z-index: 1;
} 

.custom-searchbar {
  --background: transparent;
  margin-top: 10px;
}

.no-birds-message {
  font-family: "Just Another Hand", cursive;
  font-size: 2em;
  text-align: center;
  margin-top: 50px;
}
</style>