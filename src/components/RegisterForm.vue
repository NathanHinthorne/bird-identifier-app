<template>
  <form @submit.prevent="handleSubmit">
    <ion-item>
      <ion-label position="floating">Email</ion-label>
      <ion-input v-model="email" type="email" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Username</ion-label>
      <ion-input v-model="username" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Password</ion-label>
      <ion-input v-model="password" type="password" required></ion-input>
    </ion-item>
    <ion-button expand="block" type="submit">Register</ion-button>
    <ion-button expand="block" fill="clear" @click="$emit('switch-to-login')">
      Already have an account? Login
    </ion-button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const email = ref('');
const username = ref('');
const password = ref('');

const handleSubmit = async () => {
  try {
    await userStore.register(email.value, password.value, username.value);
    // Redirect to home
    router.push({ name: 'Identify' });
  } catch (error) {
    console.error('Registration failed:', error);
    // Show error message to user
  }
};
</script>