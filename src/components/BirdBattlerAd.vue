<template>
  <div class="ad-container" :class="{ 'expanded': isExpanded }">
    <div class="ad-content" @click="toggleExpand" v-if="!isExpanded">
      <div class="ad-text">
        <h3>Bird Battler Game</h3>
        <p>Use your Life List birds in epic battles!</p>
      </div>
      <img :src="adImageUrl" :alt="adImageAlt" class="small">
    </div>
    <div v-if="isExpanded" class="expanded-content">
      <button @click.stop="closeAd" class="close-button">✖</button>
      <div class="scrollable-content" ref="scrollableContent" @scroll="handleScroll">
        <div v-show="showScrollIndicator" class="scroll-indicator"></div>
        <img :src="adImageUrl" :alt="adImageAlt" class="large">
        <h2>Bird Battler Game</h2>
        <h2 style="color: green; font-style: italic;">COMING SOON!</h2>
        <p>Use birds from your Life List to engage in fun battles!</p>
        <ul>
          <li>Turn-based strategy game</li>
          <li>Unique abilities for each bird species</li>
          <li>Perform upgrades to create a powerful bird army</li>
        </ul>
        <a href="https://sites.google.com/view/bird-battler/home" target="_blank" rel="noopener noreferrer" class="cta-button">Learn More & Download</a>
        <button v-if="canRemove" @click="neverShowAgain" class="never-show-button">Never Show Again</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import adImageUrl from '../assets/honk-bonk-pink.png';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const isExpanded = ref(false);
const adImageAlt = 'Bird Battler Game Icon';
const scrollableContent = ref(null);
const showScrollIndicator = ref(false);

const props = defineProps({
  canRemove: {
    type: Boolean,
    required: true
  }
});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
  if (isExpanded.value) {
    nextTick(() => {
      checkScrollability();
    });
  }
};

const closeAd = () => {
  isExpanded.value = false;
};

const neverShowAgain = () => {
  userStore.settings.showBirdBattlerAd = false;
  userStore.saveSettings();
  isExpanded.value = false;
};

const checkScrollability = () => {
  if (scrollableContent.value) {
    const { scrollHeight, clientHeight } = scrollableContent.value;
    showScrollIndicator.value = scrollHeight > clientHeight;
  }
};

const handleScroll = () => {
  if (scrollableContent.value) {
    const { scrollTop, scrollHeight, clientHeight } = scrollableContent.value;
    showScrollIndicator.value = scrollTop + clientHeight < scrollHeight - 10; // 10px threshold
  }
};

onMounted(() => {
  window.addEventListener('resize', checkScrollability);
});

</script>

<style scoped>
.ad-container {
  background-color: #f0e8d8;
  border: 2px solid #d4c3a3;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ad-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ad-text {
  flex-grow: 1;
}

.ad-text h3 {
  margin: 0;
  font-size: 18px;
  color: #5a4d3e;
}

.ad-text p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #7c6e5c;
}

img.small {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.expanded {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 70%;
  max-height: 90vh;
  z-index: 1000;
  background-color: #f9f3e6;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.expanded-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.expanded-content ul {
  text-align: left; /* Align the bullet points to the left */
  margin-left: 0; /* Remove default left margin */
  padding-left: 20px; /* Add left padding */
}

/* spacing between each bullet point */
.expanded-content ul li {
  margin-bottom: 10px;
}

.scrollable-content {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

img.large {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 20px;
}

.expanded-content h2 {
  color: #5a4d3e;
  margin-bottom: 10px;
}

.expanded-content p, .expanded-content ul {
  color: #7c6e5c;
  margin-bottom: 15px;
}

.cta-button {
  display: inline-block;
  background-color: #7cb342;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.cta-button:hover {
  background-color: #558b2f;
}

.never-show-button {
  display: inline-block;
  background-color: #d32f2f;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}

.never-show-button:hover {
  background-color: #b71c1c;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: #5a4d3e;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  transition: transform 0.3s ease;
  z-index: 1;
}

.close-button:hover {
  transform: scale(1.1);
}

.scroll-indicator {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #5a4d3e;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}
</style>