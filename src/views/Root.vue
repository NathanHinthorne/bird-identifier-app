<template>
  <ion-page>
    <ion-tabs @ionTabsDidChange="handleTabChange">

      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="identify" href="/identify">
          <ion-icon :icon="search"></ion-icon>
          <ion-label>Identify</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="life-list" href="/life-list">
          <ion-icon :icon="bookOutline"></ion-icon>
          <ion-label>Life List</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="explore" href="/explore">
          <ion-icon :icon="compassOutline"></ion-icon>
          <ion-label>Explore</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon :icon="settingsOutline"></ion-icon>
          <ion-label>Settings</ion-label>
        </ion-tab-button>

        <!-- Add more ion-tab-button components for other tabs as needed -->

      </ion-tab-bar>

    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { compassOutline, bookOutline, search, settingsOutline } from 'ionicons/icons';

// Reactive property to track the active tab
const activeTab = ref('identify'); // Default

const handleTabChange = (event) => {
  activeTab.value = event.tab;
  console.log(`Current tab: ${activeTab.value}`);

  // apply css class to the active tab
  // and remove it from the other tabs

  // Get all tab buttons
  const tabButtons = document.querySelectorAll('ion-tab-button');

  // Loop through tab buttons
  tabButtons.forEach((button) => {
    const icon = button.querySelector('ion-icon');
    const label = button.querySelector('ion-label');

    if (button.tab === activeTab.value) {
      button.classList.add('active-tab');
      icon.classList.add('active-info');
      label.classList.add('active-info');
    } else {
      button.classList.remove('active-tab');
      icon.classList.remove('active-info');
      label.classList.remove('active-info');
    }
  });

}

</script>

<style scoped>

/* WHEN NOT ACTIVE */ 
ion-tab-button {
  background-color: var(--ion-color-secondary);
}
ion-tab-button * {
  font-weight: normal;
  color: var(--ion-color-secondary-contrast);
}


.active-tab {
  background-color: var(--ion-color-primary);
}
.active-info {
  font-weight: bold;
  color: var(--ion-color-primary-contrast);
}


</style>