<template>
  <form @submit.prevent="handleSubmit">
    <ion-item>
      <ion-label position="stacked">Email</ion-label>
      <ion-input v-model="email" type="email" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Username</ion-label>
      <ion-input v-model="username" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Password</ion-label>
      <ion-input v-model="password" type="password" required></ion-input>
    </ion-item>
    <div class="button-container">
      <button type="submit">Register</button>
      <button fill="clear" @click="$emit('switch-to-login')">
        Already have an account? Login
      </button>
    </div>
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

<style scoped>
ion-input {
  --background: rgba(255, 255, 255, 0.2); /* Slightly transparent background for input */
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 5px; /* Added margin-top for more space */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
}

ion-label {
  font-size: 2.4em !important;
}

.button-container {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  align-items: center; /* Center buttons horizontally */
  width: 100%;
  margin: 20px 10px;
}

.button-container button {
  background-color: #5e2f0d;
  color: #f0e6d2;
  border: none;
  border-radius: 5%;
  height: 40px;
  width: 100%; /* Ensure buttons are of equal width */
  max-width: 300px; /* Optional: Set a max-width for the buttons */
  font-size: 1.4em;
  font-family: 'Just Another Hand', cursive;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px; /* Space between buttons */
  padding: 0 5px;
}

.button-container button:hover {
  background-color: #7a3d10;
}
</style>