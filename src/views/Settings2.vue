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
          <ion-toggle slot="end" checked="true"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>Enable Music</ion-label>
          <ion-toggle slot="end" checked="true"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>Enable Sound Effects</ion-label>
          <ion-toggle slot="end" checked="true"></ion-toggle>
        </ion-item>

        <!-- Account Section -->
        <ion-list>
          <ion-list-header>
            <ion-label>Account</ion-label>
          </ion-list-header>
          <ion-item>
            <ion-textarea 
            :readonly="!isEditing" 
            :fill="isEditing ? 'outline' : 'solid'"
            label="Email" 
            label-placement="floating" 
            placeholder="Enter your email" 
            value="Bostick732@gmail.com">
          </ion-textarea>
          </ion-item>
          <ion-item>
            <ion-textarea 
            :readonly="!isEditing" 
            :fill="isEditing ? 'outline' : 'solid'"
            label="Username" 
            label-placement="floating" 
            placeholder="Enter your username" 
            value="Kenny Bostick">
          </ion-textarea>
          </ion-item>
          <ion-item>
            <ion-textarea 
            :readonly="!isEditing" 
            :fill="isEditing ? 'outline' : 'solid'"
            label="Password" 
            label-placement="floating" 
            placeholder="Enter your password" 
            value="password123">
          </ion-textarea>
          </ion-item>
        </ion-list>
        <ion-button @click="toggleEdit">{{ isEditing ? 'Save' : 'Edit' }}</ion-button>

      </ion-content>
    </div>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonListHeader, IonList, IonButton, IonTextarea, IonToggle  } from '@ionic/vue';

const isEditing = ref(false);

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
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