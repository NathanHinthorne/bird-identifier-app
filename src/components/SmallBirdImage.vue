<template>
  <template v-if="!isSkeleton">
    <div class="bird-image-container" :style="{ '--rotation': randomRotation() }">
      <div class="bird-image-tape" :style="{ '--tape-rotation': randomTapeRotation() }"></div>
      <div class="bird-image-frame">
        <div class="bird-image-wrapper">
          <img :src="computedImageUrl" :alt="birdName" class="bird-image" />
          <img v-if="inGame" :src="gameImage" alt="In-game badge" class="in-game-badge" />
        </div>
      </div>
      <p class="bird-image-caption">{{ birdName }}</p>
    </div>
  </template>

  <template v-if="isSkeleton">
    <div class="bird-image-container" :style="{ '--rotation': randomRotation() }">
      <div class="bird-image-tape skeleton-tape" :style="{ '--tape-rotation': randomTapeRotation() }"></div>
      <div class="bird-image-frame">
        <div class="bird-image skeleton-image"></div>
      </div>
      <div class="bird-image-caption skeleton-caption"></div>
    </div>
  </template>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import defaultImage from '../assets/bird-silhouette.png';
import gameImage from '../assets/in-game-badge2.png';

const props = defineProps({
  imageUrl: {
    type: String,
    required: false
  },
  birdName: {
    type: String,
    required: false
  },
  inGame: {
    type: Boolean,
    required: false
  },
  isSkeleton: {
    type: Boolean,
    default: false
  }
});

// provide an alt image in case the imageUrl is blank
const computedImageUrl = computed(() => {
  return props.imageUrl || (props.isSkeleton ? '' : defaultImage);
});

const randomRotation = () => {
  return `${Math.random() * 6 - 3}deg`; // Random rotation between -3 and 3 degrees
};

const randomTapeRotation = () => {
  return `${Math.random() * 20 - 10}deg`; // Random rotation between -10 and 10 degrees
};
</script>

<style scoped>
.bird-image-container {
  position: relative;
  flex-shrink: 0;
  margin-right: 20px;
  transform: rotate(var(--rotation));
  transition: transform 0.3s ease;
  width: 170px;
}

.bird-image-frame {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(208, 208, 208, 0.5);
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.bird-image {
  width: 150px;
  height: 150px;
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
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.7);
}

/* this is used so the badge is latched to the bottom right of the image */
.bird-image-wrapper {
  position: relative;
  display: inline-block;
}


/* In-game badge */
.in-game-badge {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 2em;
  /*
  transform: rotate(-10deg);
  */
}


/* Skeleton styles */
.skeleton .bird-image-frame {
  background-color: rgba(240, 240, 240, 0.5);
}

.skeleton-image {
  width: 150px;
  height: 150px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeletonLoading 1.5s infinite;
}

.skeleton-caption {
  width: 80%;
  height: 14px;
  margin: 10px auto 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeletonLoading 1.5s infinite;
}

.skeleton-tape {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeletonLoading 1.5s infinite;
}

@keyframes skeletonLoading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}


/* Override styles on smaller screens */
@media (max-width: 480px) {
  .bird-image-container {
    width: 120px;
    margin-right: 10px;
  }

  .bird-image,
  .skeleton-image {
    width: 100px;
    height: 100px;
  }

  .bird-image-caption,
  .skeleton-caption {
    font-size: 12px;
  }
}
</style>