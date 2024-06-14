<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Identify</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Upload a Bird Image</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <input type="file" accept="image/*" @change="identifyBird" />
        </ion-card-content>
      </ion-card>

      <transition name="fade">
      <ion-card v-if="identifiedBird">
        <ion-card-header>
          <ion-card-title>Identified Bird</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{ identifiedBird }}
        </ion-card-content>
      </ion-card>
      </transition>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data() {
    return {
      identifiedBird: null
    };
  },
  methods: {
    identifyBird(event) {
      // TODO: Implement bird identification logic
    }
  }
};
</script>