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
    await userStore.fetchSettings();
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