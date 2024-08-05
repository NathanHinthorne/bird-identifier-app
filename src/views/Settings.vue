<template>
  <ion-page>
    <div class="scrapbook-container">
      <div class="scrapbook-background"></div>

      <ion-header>
        <ion-toolbar>
          <ion-title>Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <!-- Preferences Section -->
        <div class="scrapbook-section">
          <div class="scrapbook-section-title">Preferences</div>
          <ion-item>
            <ion-label>Enable Unlockable Puns</ion-label>
            <ion-toggle v-model="userStore.settings.enablePuns" @ionChange="saveSettings"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-label>Enable Music</ion-label>
            <ion-toggle v-model="userStore.settings.enableMusic" @ionChange="saveSettings"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-label>Enable Sound Effects</ion-label>
            <ion-toggle v-model="userStore.settings.enableSoundEffects" @ionChange="saveSettings"></ion-toggle>
          </ion-item>
        </div>

        <!-- Account Section -->
        <div class="scrapbook-section">
          <div class="scrapbook-section-title">Account</div>
          <ion-item>
            <ion-label>Email</ion-label>
            <ion-input v-model="email" readonly></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Username</ion-label>
            <ion-input v-model="username"></ion-input>
          </ion-item>
          <ion-button expand="block" @click="updateUsername">Update Profile</ion-button>
          <ion-button expand="block" @click="showChangePasswordModal">Change Password</ion-button>
          <ion-button expand="block" color="danger" @click="logout">Logout</ion-button>
        </div>
      </ion-content>
    </div>

    <!-- Change Password Modal -->
    <ion-modal :is-open="isChangePasswordModalOpen">
      <ion-header>
        <ion-toolbar>
          <ion-title>Change Password</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="isChangePasswordModalOpen = false">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="floating">New Password</ion-label>
          <ion-input v-model="newPassword" type="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Confirm New Password</ion-label>
          <ion-input v-model="confirmPassword" type="password"></ion-input>
        </ion-item>
        <ion-button expand="block" @click="changePassword">Change Password</ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, 
  IonLabel, IonToggle, IonInput, IonButton, IonModal, IonButtons 
} from '@ionic/vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const username = ref('');
const isChangePasswordModalOpen = ref(false);
const newPassword = ref('');
const confirmPassword = ref('');

onMounted(async () => {
  if (userStore.isAuthenticated) {
    await userStore.pullSettings();
    email.value = userStore.user.email;
    username.value = userStore.user.displayName || '';
  } else {
    router.push('/auth');
  }
});

const saveSettings = async () => {
  await userStore.saveSettings();
};

const updateUsername = async () => {
  try {
    await userStore.updateUsername(username.value);
    // Show success message
  } catch (error) {
    console.error('Error updating profile:', error);
    // Show error message
  }
};

const showChangePasswordModal = () => {
  isChangePasswordModalOpen.value = true;
};

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    // Show error: passwords don't match
    return;
  }
  try {
    await userStore.updatePassword(newPassword.value);
    isChangePasswordModalOpen.value = false;
    // Show success message
  } catch (error) {
    console.error('Error changing password:', error);
    // Show error message
  }
};

const logout = async () => {
  await userStore.logout();
  router.push('/auth');
};
</script>

<style scoped>
.scrapbook-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scrapbook-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/backgrounds/parchment-paper.jpg');
  background-size: cover;
  background-position: center;
  z-index: 0;
}

ion-header {
  --background: none;
}

ion-toolbar {
  background: url('../assets/backgrounds/leather-bar.png') no-repeat center center;
  background-size: cover;
}

ion-title {
  color: white;
  font-family: 'Homemade Apple', cursive; /* Example of a handwritten font */
}

ion-content {
  background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent background */
  backdrop-filter: blur(5px); /* Adds a blur effect to the background */
}

.scrapbook-section {
  margin-bottom: 20px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9); /* Slightly transparent background for sections */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
}

.scrapbook-section-title {
  font-size: 1.2em;
  font-weight: bold;
  color: #444;
  font-family: 'Homemade Apple', cursive; /* Example of a handwritten font */
  margin-bottom: 10px;
  position: relative;
  padding-left: 30px;
  background: url('../assets/backgrounds/sticky-note.png') no-repeat left center;
  background-size: 20px;
}

ion-item {
  margin-bottom: 15px; /* Adjusted margin for better spacing */
}

ion-label {
  color: #666;
}

ion-input {
  --padding-start: 10px;
  --padding-end: 10px;
  --background: #f9f9f9;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 5px; /* Added margin-top for more space */
}

ion-button {
  --background: var(--ion-color-primary);
  --color: white;
  --border-radius: 5px;
  font-size: 1.2em;
  --padding-start: 20px; /* Add padding to the left */
  --padding-end: 20px;   /* Add padding to the right */
  --padding-top: 15px;   /* Add padding to the top */
  --padding-bottom: 15px; /* Add padding to the bottom */
  
  /* Center the button */
  margin: 0 auto;
  display: block;
}

ion-modal {
  --background: rgba(255, 255, 255, 0.9); /* Slightly transparent background for modal */
  backdrop-filter: blur(5px); /* Adds a blur effect to the modal background */
}
</style>
