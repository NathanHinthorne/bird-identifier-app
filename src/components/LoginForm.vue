<template>
  <form @submit.prevent="handleSubmit">
    <ion-item>
      <ion-label position="floating">Email</ion-label>
      <ion-input v-model="email" type="email" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Password</ion-label>
      <ion-input v-model="password" type="password" required></ion-input>
    </ion-item>
    <ion-button expand="block" type="submit">Login</ion-button>
    <ion-button expand="block" fill="clear" @click="$emit('switch-to-register')">
      Don't have an account? Register
    </ion-button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  try {
    await userStore.login(email.value, password.value);
    // Redirect to home or dashboard
  } catch (error) {
    console.error('Login failed:', error);
    // Show error message to user
  }
};
</script>