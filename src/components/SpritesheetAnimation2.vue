<template>
  <div class="journal-loading" :class="{ 'loaded': isLoaded }">
    <div class="sprite-animation" :style="spriteStyle"></div>
    <!-- <img :src="journalSpriteSheet" class="sprite-animation"></img> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

import journalSpriteSheet from '../assets/backgrounds/journal-spritesheet.png';

const props = defineProps({
  frameCount: {
    type: Number,
    required: true
  },
  frameWidth: {
    type: Number,
    required: true
  },
  frameHeight: {
    type: Number,
    required: true
  },
  animationDuration: {
    type: Number,
    default: 2 // seconds
  }
});

const isLoaded = ref(false);

console.log('Spritesheet:', props.spriteSheetUrl);

const spriteStyle = computed(() => {
  const scale = Math.min(window.innerWidth / props.frameWidth, window.innerHeight / props.frameHeight);
  const style = {
    width: `${props.frameWidth * scale}px`,
    height: `${props.frameHeight * scale}px`,
    backgroundImage: `url(${journalSpriteSheet})`,
    backgroundSize: `${props.frameWidth * props.frameCount * scale}px ${props.frameHeight * scale}px`,
    animation: `playSprite ${props.animationDuration}s steps(${props.frameCount}) forwards`
  };

  console.log('Generated spriteStyle:', style); // Log the generated style object

  return style;
});

const onAnimationEnd = () => {
  isLoaded.value = true;
};

onMounted(() => {
  // setTimeout(onAnimationEnd, props.animationDuration * 1000);
    console.log('spritesheet animation mounted');
});
</script>

<style scoped>
.journal-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.sprite-animation {
  background-repeat: no-repeat;
  background-position: 0 0;
  margin: auto;
}

.loaded .sprite-animation {
  display: none;
}

@keyframes playSprite {
  from { background-position: 0 0; }
  to { background-position: 100% 0; }
}
</style>