<template>
  <div class="scrapbook-loader">
    <div class="cloud cloud1">
      <div class="cloud-part"></div>
      <div class="cloud-part"></div>
      <div class="cloud-part"></div>
    </div>
    <div class="cloud cloud2">
      <div class="cloud-part"></div>
      <div class="cloud-part"></div>
      <div class="cloud-part"></div>
    </div>
    <div class="cloud cloud3">
      <div class="cloud-part"></div>
      <div class="cloud-part"></div>
      <div class="cloud-part"></div>
    </div>
    <div class="loading-text">{{ props.loadingText }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  loadingText: String 
});
</script>

<style scoped>
.scrapbook-loader {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f0e8d8;
  overflow: hidden;
}

.cloud {
  position: absolute;
  opacity: 0.8;
}

.cloud-part {
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
}

.cloud1 {
  width: 100px;
  height: 60px;
  top: 20%;
  left: -100px;
  animation: moveCloud 15s linear infinite;
}

.cloud2 {
  width: 120px;
  height: 70px;
  top: 50%;
  left: -120px;
  animation: moveCloud 20s linear infinite;
}

.cloud3 {
  width: 80px;
  height: 50px;
  top: 70%;
  left: -80px;
  animation: moveCloud 17s linear infinite;
}

.cloud-part:nth-child(1) {
  width: 100%;
  height: 100%;
  top: 20%;
  left: 0;
}

.cloud-part:nth-child(2) {
  width: 60%;
  height: 60%;
  top: 0;
  left: 20%;
}

.cloud-part:nth-child(3) {
  width: 70%;
  height: 70%;
  top: 10%;
  right: 0;
}

.loading-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Just Another Hand', cursive;
  font-size: 24px;
  color: #7c6e5c;
}

@keyframes moveCloud {
  0% { left: -120px; }
  100% { left: calc(100% + 120px); }
}
</style>