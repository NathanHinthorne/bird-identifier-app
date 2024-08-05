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
        <ion-list-header>
          <ion-label>Preferences</ion-label>
        </ion-list-header>
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

        <!-- Account Section -->
        <ion-list-header>
          <ion-label>Account</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>Email</ion-label>
          <ion-input v-model="email" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Username</ion-label>
          <ion-input v-model="username"></ion-input>
        </ion-item>
        <ion-button expand="block" @click="updateProfile">Update Profile</ion-button>
        <ion-button expand="block" @click="showChangePasswordModal">Change Password</ion-button>
        <ion-button expand="block" color="danger" @click="logout">Logout</ion-button>
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
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonLabel, IonToggle, IonInput, IonButton, IonListHeader, IonModal, IonButtons
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

const updateProfile = async () => {
  try {
    await userStore.updateProfile(username.value);
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
  background-image: url('../assets/backgrounds/leather-book-back.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  z-index: 0;
}

ion-list-header {
  font-size: 1.2em;
  font-weight: bold;
  color: #444;
  margin-bottom: 10px;
}

ion-item {
  margin-bottom: 20px; /* Increased margin for more space */
}

ion-label {
  color: #666;
}

ion-textarea {
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

ion-toolbar {
  --background: none;
  background: url('../assets/backgrounds/leather-bar.png') no-repeat center center;
  background-size: cover;
  padding: 10px;
}

ion-title {
  color: white;
}
</style>