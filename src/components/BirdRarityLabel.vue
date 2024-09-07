<template>
  <div class="section-header">
    <span :class="rarityClass">
        <!-- <img :src="featherIcon" alt="Feather Icon" class="feather-icon"> -->
        {{ rarityLabel }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import featherIcon from '../assets/icons/feather1.png';

const props = defineProps({
  rarity: {
    type: Number,
    required: true
  }
});

const rarityLabel = computed(() => {
    switch (props.rarity) {
        case 1:
        return 'Common';
        case 2:
        return 'Uncommon';
        case 3:
        return 'Rare';
        case 4:
        return 'Ultra-Rare';
        default:
        return '';
    }
});

const rarityClass = computed(() => {
    switch (props.rarity) {
        case 1:
        return 'rarity-common';
        case 2:
        return 'rarity-uncommon';
        case 3:
        return 'rarity-rare';
        case 4:
        return 'rarity-ultra-rare';
        default:
        return '';
    }
});
</script>

<style scoped>
.feather-icon {
  width: 1em;
}

.rarity-common {
  background-color: #d4edda;
  color: #155724;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  margin-left: 10px;
}

.rarity-uncommon {
  background-color: #fff3cd;
  color: #856404;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  margin-left: 10px;
}

.rarity-rare {
  background-color: #f8d7da;
  color: #721c24;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  margin-left: 10px;
  box-shadow: 0 0 10px #721c24;
}

.rarity-ultra-rare {
  background-color: #d8b4fe;
  color: #4b0082;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  margin-left: 10px;
  box-shadow: 0 0 10px #4b0082;
  
}

.section-header {
  position: relative;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}




</style>