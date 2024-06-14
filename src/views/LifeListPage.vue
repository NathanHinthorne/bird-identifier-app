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
        <ion-title>Life List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="bird in birds" :key="bird.id">
          {{ bird.name }}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data() {
    return {
      birds: [] // TODO: Load identified birds
    };
  }
};
</script>