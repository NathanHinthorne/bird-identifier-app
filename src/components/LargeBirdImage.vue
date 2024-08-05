<template>
  <div class="bird-image-container" :style="{ '--rotation': randomRotation() }">
    <div class="bird-image-tape" :style="{ '--tape-rotation': randomTapeRotation() }"></div>
    <div class="bird-image-frame">
      <img :src="imageUrl" :alt="birdName" class="bird-image" />
    </div>
    <p class="bird-image-caption">{{ birdName }}</p>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  birdName: {
    type: String,
    required: true
  }
});

const randomRotation = () => `${Math.random() * 6 - 3}deg`;
const randomTapeRotation = () => `${Math.random() * 20 - 10}deg`;

onMounted(() => {
  console.log('LargeBirdImage mounted with props:', props);
});

</script>

<style scoped>
.bird-image-container {
  position: relative;
  margin-bottom: 20px;
  transform: rotate(var(--rotation));
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.bird-image-frame {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(208, 208, 208, 0.5);
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.bird-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border: 1px solid rgba(224, 224, 224, 0.5);
}

.bird-image-tape {
  position: absolute;
  width: 80px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.6);
  top: -15px;
  left: 50%;
  transform: translateX(-50%) rotate(var(--tape-rotation));
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.bird-image-caption {
  text-align: center;
  margin-top: 10px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  color: #333;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px;
  border-radius: 5px;
}

/* Override styles on smaller screens */
@media (max-width: 480px) {
  .bird-image-container {
    max-width: 200px;
  }
}
</style>