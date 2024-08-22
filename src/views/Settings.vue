<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="scrapbook-container">
        <div class="scrapbook-background"></div>

        <div class="scrapbook-content">
          <!-- Preferences Section -->
          <div class="scrapbook-section">
            <div class="scrapbook-section-title">Preferences</div>
            <div class="scrapbook-section-content">
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
          </div>

          <!-- Account Section -->
          <div class="scrapbook-section">
            <div class="scrapbook-section-title">Account</div>
            <div class="scrapbook-section-content">
              <ion-item>
                <ion-label>Email</ion-label>
                <ion-input v-model="email" readonly></ion-input>
              </ion-item>
              <ion-item>
                <ion-label>Username</ion-label>
                <ion-input v-model="username"></ion-input>
              </ion-item>
              <div class="button-container">
                <button @click="updateUsername">Update Profile</button>
                <button @click="showChangePasswordModal">Change Password</button>
                <button @click="logout">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

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

.scrapbook-content {
  --background: transparent;  
  position: relative; 
  height: auto; 
  overflow-y: auto;
  padding-bottom: 120px;
  z-index: 1;
} 

ion-toolbar {
  --background: none;
  background: url('../assets/backgrounds/leather-bar.png') no-repeat center center;
  background-size: cover;
  padding: 10px;
}

ion-title {
  color: white;
  /* font-family: 'Just Another Hand', cursive; */
}

.scrapbook-section {
  margin-bottom: 20px;
  padding: 20px; /* Increased padding for extra spacing */
  background-image: url('../assets/ui/paper-piece-square.png');
  background-size: cover;
}

.scrapbook-section-title {
  font-size: 2em;
  font-weight: bold;
  color: #444;
  font-family: 'Just Another Hand';
  margin-bottom: 10px;
  position: relative;
  padding-left: 30px;
  background: url('../assets/backgrounds/sticky-note.png') no-repeat left center;
  background-size: 20px;
}

.scrapbook-section-content {
  padding: 10px;
  background: transparent;
  border-radius: 10px;
}

ion-item {
  margin-bottom: 15px; /* Adjusted margin for better spacing */
  --background: transparent; /* Make ion-item background transparent */
}

ion-label {
  color: #444; /* Ensure label text is visible */
}

ion-input {
  --background: transparent; /* Make input background transparent */
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 5px; /* Added margin-top for more space */
}

ion-toggle {
  --background: transparent; /* Make toggle background transparent */
}

.button-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.button-container button {
  background-color: #5e2f0d;
  color: #f0e6d2;
  border: none;
  border-radius: 20%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  font-family: 'Just Another Hand', cursive;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* add spacing between buttons */
  margin-right: 10px;
}

.button-container button:hover {
  background-color: #7a3d10;
}

ion-modal {
  --background: rgba(255, 255, 255, 0.9); /* Slightly transparent background for modal */
  backdrop-filter: blur(5px); /* Adds a blur effect to the modal background */
}
</style>