<template>
  <ion-page>
    <ion-tabs>

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

        <!-- Add more ion-tab-button components for other tabs as needed -->

      </ion-tab-bar>

    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { compassOutline, bookOutline, search } from 'ionicons/icons';
</script>