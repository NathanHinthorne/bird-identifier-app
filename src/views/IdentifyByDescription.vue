<template>
  <ion-page class="scrapbook-theme">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/identify" text="Back"></ion-back-button>
        </ion-buttons>
        <ion-title>Identify by Description</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <div class="scrapbook-page" v-if="!showBirdResults">
        <div class="step-tracker">{{ currentQuestionIndex + 1 }}/{{ questions.length }}</div>
        <div class="question-container">
          <h2>{{ currentQuestion.title }}</h2>

          <ion-content class="ion-padding">
            <div :class="['options-container', `${currentQuestion.id}-options`]">
              <div v-for="option in currentQuestion.options" :key="option.value" 
              :class="['option-item', `${currentQuestion.id}-option`, { 'selected': isOptionSelected(option.value) }]"
              @click="selectOption(option.value)">
                <template v-if="currentQuestion.id === 'size'">
                  <img :src="option.image" :alt="option.label" class="option-image" :style="{ width: option.width, height: option.height }">
                  <span class="option-label">
                    <div>{{ option.size }}</div>
                    <div>{{ option.reference }}</div>
                  </span>
                </template>
                <template v-else-if="currentQuestion.id === 'habitat'">
                  <img :src="option.image" :alt="option.label" class="option-image">
                  <span class="option-label">{{ option.label }}</span>
                </template>
                <template v-else-if="currentQuestion.id === 'colors'">
                  <div class="color-swatch" :style="{ backgroundColor: option.color }"></div>
                  <span class="option-label">{{ option.label }}</span>
                </template>
              </div>
            </div>
          </ion-content>
        </div>

        <ion-footer class="footer-section">
          <div class="navigation-buttons">
            <ion-button @click="previousQuestion" :disabled="currentQuestionIndex === 0">
              Previous
            </ion-button>
            <ion-button @click="nextQuestion" :disabled="!isCurrentQuestionAnswered">
              {{ currentQuestionIndex === questions.length - 1 ? 'Identify' : 'Next' }}
            </ion-button>
          </div>
        </ion-footer>
      </div>

    <div class="scrapbook-page" v-if="showBirdResults">
        <h2>Identification Results</h2>
        <p v-if="filteredBirds.length === 0">No birds match your description. Try adjusting your criteria.</p>
        <IDBirdList 
          :birds="filteredBirds"
          @selectBird="handleSelectBird" 
          @birdID="handleIdentifyBird"
        />
        <!-- <ion-button @click="resetIdentification">Start Over</ion-button> -->

        <SightingNote 
          v-if="showNote"
          @cancel="handleCancelNote"
          @submit="handleSubmitNote"
        />
    </div>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonFooter, IonButton } from '@ionic/vue';
import { useRegionalBirdStore } from '../stores/regionalBirdStore';
import IDBirdList from '../components/IDBirdList.vue';
import SightingNote from '../components/SightingNote.vue';
import { useRouter } from 'vue-router';

import sparrow from '../assets/bird-sizes/sparrow.png';
import robin from'../assets/bird-sizes/robin.png';
import crow from '../assets/bird-sizes/crow.png';
import goose from '../assets/bird-sizes/goose.png';
import eagle from '../assets/bird-sizes/eagle.png';

import urban from '../assets/habitats/urban2.jpg';
import forest from '../assets/habitats/forest2.jpg';
import wetland from '../assets/habitats/wetlands2.jpg';
import coastline from '../assets/habitats/coastline.jpg';
import grassland from '../assets/habitats/grassland1.jpg';
import mountainous from '../assets/habitats/mountainous1.jpg';

const regionalBirdStore = useRegionalBirdStore();
const router = useRouter();

const questions = [
  {
    id: 'size',
    title: 'Size',
    description: 'What is the approximate size of the bird?',
    options: [
      { value: 'tiny', size: 'Tiny', reference: '(sparrow-sized)', image: sparrow, width: '30px', height: '30px' },
      { value: 'small', size: 'Small', reference: '(robin-sized)', image: robin, width: '40px', height: '40px' },
      { value: 'medium', size: 'Medium', reference: '(crow-sized)', image: crow, width: '50px', height: '50px' },
      { value: 'large', size: 'Large', reference: '(goose-sized)', image: goose, width: '60px', height: '60px' },
      { value: 'very-large', size: 'Very Large', reference: '(eagle-sized)', image: eagle, width: '70px', height: '70px' },
    ],
  },
  {
    id: 'colors',
    title: 'Main Colors',
    description: 'What are the main colors of the bird? (Select all that apply)',
    options: [
      { value: 'brown', label: 'Brown', color: '#5e2f0d' },
      { value: 'black', label: 'Black', color: '#000000' },
      { value: 'white', label: 'White', color: '#FFFFFF' },
      { value: 'gray', label: 'Gray', color: '#808080' },
      { value: 'yellow', label: 'Yellow', color: '#FFFF00' },
      { value: 'red', label: 'Red', color: '#FF0000' },
      { value: 'blue', label: 'Blue', color: '#0000FF' },
      { value: 'green', label: 'Green', color: '#008000' },
      { value: 'orange', label: 'Orange', color: '#FFA500' },
      { value: 'purple', label: 'Purple', color: '#800080' },
    ],
    multiSelect: true,
  },
  {
    id: 'habitat',
    title: 'Habitat',
    description: 'In what habitat did you see the bird?',
    options: [
      { value: 'urban', label: 'Urban area', image: urban },
      { value: 'forest', label: 'Forest', image: forest },
      { value: 'wetland', label: 'Wetland', image: wetland },
      { value: 'coastline', label: 'Coastline', image: coastline },
      { value: 'grassland', label: 'Grassland', image: grassland },
      { value: 'mountainous', label: 'Mountainous area', image: mountainous },
    ],
  },
];

const currentQuestionIndex = ref(0);
const answers = ref({});
const showBirdResults = ref(false);
const showNote = ref(false);
const filteredBirds = ref([]);
const selectedBird = ref(null);
const identifiedBird = ref(null);

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);

const isCurrentQuestionAnswered = computed(() => {
  const currentAnswer = answers.value[currentQuestion.value.id];
  return currentQuestion.value.multiSelect ? currentAnswer && currentAnswer.length > 0 : !!currentAnswer;
});

function selectOption(value) {
  if (currentQuestion.value.multiSelect) {
    if (!answers.value[currentQuestion.value.id]) {
      answers.value[currentQuestion.value.id] = [];
    }
    const index = answers.value[currentQuestion.value.id].indexOf(value);
    if (index > -1) {
      answers.value[currentQuestion.value.id].splice(index, 1);
    } else {
      answers.value[currentQuestion.value.id].push(value);
    }
  } else {
    answers.value[currentQuestion.value.id] = value;
  }
}

function isOptionSelected(value) {
  const currentAnswer = answers.value[currentQuestion.value.id];
  return currentQuestion.value.multiSelect
    ? currentAnswer && currentAnswer.includes(value)
    : currentAnswer === value;
}

function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
}

function nextQuestion() {
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++;
  } else {
    filterBirds();
  }
}

function filterBirds() {
  console.log('Bird identification data:', answers.value);

  const allBirds = regionalBirdStore.getAllBirds();
  
  filteredBirds.value = allBirds.filter(bird => {
    const sizeMatch = bird.size === answers.value.size;
    const colorMatch = answers.value.colors.some(color => bird.maleColors.includes(color));
    const habitatMatch = bird.habitats.includes(answers.value.habitat);
    
    return sizeMatch && colorMatch && habitatMatch;
  });

  showBirdResults.value = true;
}

const handleSelectBird = (bird) => {
  selectedBird.value = bird;

  // push to the route
  router.push('/explore/bird-info/' + bird.formattedComName);
};

const handleIdentifyBird = (bird) => {
  identifiedBird.value = bird;

  showNote.value = true;
};

const handleCancelNote = () => {
  showNote.value = false;
}

const handleSubmitNote = (noteText) => {
  showNote.value = false;

  // put note text alongside bird in seenBirdNames in user db
}

function resetIdentification() {
  showBirdResults.value = false;
  currentQuestionIndex.value = 0;
  answers.value = {};
  filteredBirds.value = [];
}
</script>

<style scoped>
.scrapbook-theme {
  --ion-background-color: transparent;
  --ion-text-color: #3c2f2f;
}

.scrapbook-page {
  background-image: url('../assets/backgrounds/parchment-paper-tattered3.png');
  background-size: cover;
  border-image: url('../assets/scrapbook-border.png') 30 round;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

h2 {
  font-family: 'Fredericka the Great', cursive;
  color: #8b4513;
  text-align: center;
}

p {
  font-family: 'Just Another Hand', cursive;
  font-size: 1.8em;
  text-align: center;
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin: 0 auto;
  max-width: 90%;
  /*
  max-height: 105%; 
  overflow-y: auto; 
  */
}
.size-options {
  flex-direction: row;
  align-items: flex-end;
}

.option-item {
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid transparent;
}

.option-item:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

.option-item.selected {
  border-color: #8b4513;
  background: rgba(139, 69, 19, 0.1);
}

.option-image {
  object-fit: contain;
  margin-bottom: 10px;
}

.color-swatch {
  width: 2.5em;
  height: 2.5em;
  margin-bottom: 10px;
}

.option-label {
  /*
  font-family: 'Caveat', cursive;
  font-size: 0.8em;
  */

  font-family: 'Just Another Hand', cursive;
  font-size: 1.2em;
  text-align: center;
}

.colors-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.habitat-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.footer-section {
  height: 50px;
  box-shadow: none;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  /* remove margin on top */
  margin-top: 0;
  padding-top: 0;
}

.bird-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}


ion-button {
  --background: #8b4513;
  --background-activated: #5e2f0d;
  --background-hover: #724011;
  --color: white;
}

.step-tracker {
  position: absolute;
  top: 80px;
  right: 15px;
  color: white;
  font-family: 'Fredericka the Great', cursive;
  font-size: 1.2em;
  background-color: rgba(139, 69, 19, 0.7);
  padding: 5px 10px;
  border-radius: 15px;
}

ion-content {
  --overflow: hidden;
}


.scrapbook-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  ),
  linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  ),
  linear-gradient(
    to right,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  ),
  linear-gradient(
    to left,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 5%
  );
  z-index: 1;
  pointer-events: none;
}

</style>