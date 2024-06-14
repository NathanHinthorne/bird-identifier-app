<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Bird Identifier</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Welcome to Bird Identifier</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Start identifying birds by clicking on the Identify tab or view your identified birds in the Life List tab.
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/vue';

  export default {
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  };
</script>