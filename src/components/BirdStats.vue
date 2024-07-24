<template>
  <div class="bird-stats">
    <div v-for="(stat, index) in stats" :key="index" class="stat-container">
      <span class="stat-label">{{ stat.label }}</span>
      <div class="stat-bar">
        <div v-for="i in maxRectangles" :key="i" 
            :class="['stat-rectangle', i <= (stat.value / 5) * maxRectangles ? 'filled' : 'empty']">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  stats: {
    type: Array,
    required: true
  }
});

const maxRectangles = 5;
</script>

<style scoped>
.stats-section {
  margin-bottom: 30px;
}

.bird-stats {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stat-container {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-family: 'Just Another Hand', cursive;
  font-size: 26px;
  color: #333;
  margin-bottom: 5px;
}

.stat-bar {
  display: flex;
  justify-content: space-between;
  height: 30px;
  background-color: #f0e6d2;
  border: 2px solid #8b4513;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 5px;
}

.stat-rectangle {
  width: 60px;
  height: 20px;
  margin: auto 2px;
  border-radius: 3px;
}

.stat-rectangle.filled {
  background-color: #8b4513;
}

.stat-rectangle.empty {
  background-color: transparent;
  border: 1px solid #8b4513;
}

/* Override styles on smaller screens */
@media (max-width: 480px) {
  .stat-label {
    font-size: 24px;
  }

  .stat-bar {
    height: 25px;
  }

  .stat-rectangle {
    height: 15px;
  }
}
</style>