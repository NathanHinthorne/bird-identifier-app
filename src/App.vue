<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script lang="js">
  import { IonApp, IonRouterOutlet } from '@ionic/vue';

  import { defineComponent } from 'vue';

  import TabRoot from './components/TabRoot.vue';

  export default defineComponent({
    name: 'App',
    components: { IonApp, IonRouterOutlet },
  });
</script>