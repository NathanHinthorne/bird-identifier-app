<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="scrapbook-container">
        <div class="scrapbook-background"></div>
        
        <div class="scrapbook-content">
            <!-- Preferences Section -->
            <div class="scrapbook-section">
              <div class="scrapbook-section-title">Preferences</div>
              <div class="scrapbook-section-content">
                <ion-item>
                  <ion-label>Show Game Info</ion-label>
                  <input type="checkbox" v-model="userStore.settings.showGameInfo" @change="saveSettings" class="custom-checkbox">
                </ion-item>
                <ion-item>
                  <ion-label>Enable Music</ion-label>
                  <input type="checkbox" v-model="userStore.settings.enableMusic" @change="saveSettings" class="custom-checkbox">
                </ion-item>
                <ion-item>
                  <ion-label>Enable Sound Effects</ion-label>
                  <input type="checkbox" v-model="userStore.settings.enableSoundEffects" @change="saveSettings" class="custom-checkbox">
                </ion-item>
              </div>
            </div>

            <!-- Account Section -->
            <div class="scrapbook-section">
              <div class="scrapbook-section-title">Account</div>
              <div class="scrapbook-section-content">
                <ion-item>
                  <ion-label>Email</ion-label>
                  <div>{{ email }}</div>
                </ion-item>
                <ion-item>
                  <ion-label>Username</ion-label>
                  <div>{{ username }}</div>
                </ion-item>
                <div class="button-container">
                  <button @click="showChangeUsernameModal">Change Username</button>
                  <button @click="showChangePasswordModal">Change Password</button>
                  <button @click="logout">Logout</button>
                </div>
                <!-- <div class="button-container">
                  <button class="warn-button" @click="deleteAccount">Delete Account</button>
                </div> -->
              </div>
            </div>
        </div>
      </div>
    </ion-content>

    <!-- Change Username Modal -->
    <ion-modal :is-open="isChangeUsernameModalOpen" @ionModalDidDismiss="handleModalDismiss('username')">
      <ion-header>
        <ion-toolbar>
          <ion-title>Change Username</ion-title>
          <ion-buttons slot="start">
            <ion-button class="close-button" @click="isChangeUsernameModalOpen = false">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div class="scrapbook-container">
          <div class="scrapbook-background"></div>
            <div class="scrapbook-section-content">
            <ion-item>
              <ion-label position="stacked">New Username</ion-label>
              <ion-input v-model="newUsername"></ion-input>
            </ion-item>
            </div>
          <div class="button-container">
            <button @click="changeUsername">Change Username</button>
          </div>
        </div>
      </ion-content>
    </ion-modal>

    <!-- Change Password Modal -->
    <ion-modal :is-open="isChangePasswordModalOpen" @ionModalDidDismiss="handleModalDismiss('password')">
      <ion-header>
        <ion-toolbar>
          <ion-title>Change Password</ion-title>
          <ion-buttons slot="start">
            <ion-button class="close-button" @click="isChangePasswordModalOpen = false">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div class="scrapbook-container">
          <div class="scrapbook-background"></div>
          <div class="scrapbook-section-content">
            <ion-item>
              <ion-label position="stacked">New Password</ion-label>
              <ion-input v-model="newPassword" type="password"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Confirm New Password</ion-label>
              <ion-input v-model="confirmPassword" type="password"></ion-input>
            </ion-item>
          </div>
          <div class="button-container">
            <button @click="changePassword">Change Password</button>
          </div>
        </div>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, 
  IonLabel, IonInput, IonButton, IonModal, IonButtons, IonBackButton
} from '@ionic/vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const username = ref('');
// const email = computed(() => {
//   return userStore.user.email;
// })
// const username = computed(() => {
//   return userStore.user.displayName || '';
// })
const isChangeUsernameModalOpen = ref(false);
const isChangePasswordModalOpen = ref(false);
const newUsername = ref('');
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

const showChangeUsernameModal = () => {
  isChangeUsernameModalOpen.value = true;
};

const changeUsername = async () => {
  try {
    await userStore.updateUsername(newUsername.value);
    username.value = newUsername.value;
    isChangeUsernameModalOpen.value = false;
    // Show success message
  } catch (error) {
    console.error('Error updating username:', error);
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

const handleModalDismiss = (modalType) => {
  if (modalType === 'username') {
    isChangeUsernameModalOpen.value = false;
  } else if (modalType === 'password') {
    isChangePasswordModalOpen.value = false;
  }
};

const deleteAccount = async () => {

  console.log("YOU'VE DELETED YOUR WHOLE ACCOUNT!! OH NO")
  // try {
  //   await userStore.deleteAccount();
  //   router.push('/auth');
  // } catch (error) {
  //   console.error('Error deleting account:', error);
  //   // Show error message
  // }
};
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
  z-index: 0;
}

.scrapbook-content {
  --background: transparent;  
  position: relative; 
  min-height: 100%; /* Ensure the content can expand */
  z-index: 1;
} 

.scrapbook-section {
  margin-bottom: 20px;
  padding: 20px; /* Increased padding for extra spacing */
  background-image: url('../assets/containers/paper-piece-square.png');
  background-size: cover;
  height: auto; /* Ensure the section can expand */
}

.scrapbook-section-title {
  font-size: 1.5em;
  font-weight: bold;
  color: #444;
  font-family: 'Pacifico', cursive;
  margin: 10px 0;
  position: relative;
  padding-left: 30px;
  background-size: 20px;
}

.scrapbook-section-content {
  padding: 10px;
  background: transparent;
  border-radius: 5%;

  font-size: 1.2em;
  font-family: 'Just Another Hand';
}

ion-item {
  margin-bottom: 15px; /* Adjusted margin for better spacing */
  --background: transparent; /* Make ion-item background transparent */
}

ion-input {
  --background: rgba(255, 255, 255, 0.2); /* Slightly transparent background for input */
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 5px; /* Added margin-top for more space */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
}

ion-toggle {
  --background: transparent; /* Make toggle background transparent */
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 10px;
}

.button-container button {
  background-color: #5e2f0d;
  color: #f0e6d2;
  border: none;
  border-radius: 5%;
  height: 40px;
  font-size: 1.2em;
  font-family: 'Just Another Hand', cursive;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  margin-right: 10px;
  padding: 0 5px;
}

.button-container button:hover {
  background-color: #7a3d10;
}

.warn-button {
  background-color: #c0392b !important;  /* Red */
}


.close-button {
    font-family: 'Fredericka the Great', cursive;
    color: white;
}

.custom-checkbox {
  appearance: none;
  width: 25px;
  height: 25px;
  background-color: #fff;
  border: 2px solid #444;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
}

.custom-checkbox:checked {
  background-color: #5e2f0d;
}

.custom-checkbox:checked::after {
  content: '✔';
  color: #f0e6d2;
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

ion-modal {
  --background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px); /* Adds a blur effect to the modal background */
}
</style>