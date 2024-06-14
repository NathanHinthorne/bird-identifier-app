<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="identify" href="/identify">
          <ion-icon :icon="mic" />
          <ion-label>Identify</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="life-list" href="/life-list">
          <ion-icon :icon="book" />
          <ion-label>Life List</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="js">
  import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';

  import { home, mic, book } from 'ionicons/icons';

  export default {
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
    data() {
      return {
        home,
        mic,
        book,
      };
    },
  };
</script>