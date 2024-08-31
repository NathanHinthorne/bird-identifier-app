<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ isLogin ? 'Login' : 'Register' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="scrapbook-container">
        <div class="scrapbook-background">
          <img :src="inkSplotch" class="ink-splotch ink-splotch-1" />
          <img :src="inkSplotch" class="ink-splotch ink-splotch-2" />
          <img :src="inkSplotch" class="ink-splotch ink-splotch-3" />
          <img :src="pen" class="pen" />
        </div>
        <login-form v-if="isLogin" @switch-to-register="isLogin = false" />
        <register-form v-else @switch-to-login="isLogin = true" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

import inkSplotch from '../assets/decorations/ink-splotch.png';
import pen from '../assets/decorations/pen.png';

const isLogin = ref(true);
</script>

<style scoped>
.scrapbook-container {
  position: relative;
  width: 100%;
  min-height: 100%; /* Ensure the container can expand */
  overflow: hidden;
}

.scrapbook-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/backgrounds/parchment-paper.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1; /* put this 1 layer behind the content */
}

.ink-splotch {
  position: absolute;
  width: 100px; /* Adjust size as needed */
  height: auto;
}

.ink-splotch-1 {
  top: 10%;
  left: 60%;
}

.ink-splotch-2 {
  top: 70%;
  left: 10%;
}

.ink-splotch-3 {
  top: 85%;
  left: 80%;
}

.pen {
  position: absolute;
  bottom: 10%;
  right: -20%;
  width: 70vw; /* Adjust size as needed */
  height: auto;
  transform: rotate(-20deg); /* Adjust rotation as needed */
}
</style>