<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="heading">
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <!-- Preferences Section -->
      <ion-list-header>
        <ion-label>Preferences</ion-label>
      </ion-list-header>
      <ion-item>
        <ion-label>Enable Unlockable Puns</ion-label>
        <ion-toggle slot="end"></ion-toggle>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonListHeader, IonToggle } from '@ionic/vue';

</script>

<style scoped>
  .heading {
    --background: var(--ion-color-primary-tint);
  }
</style>