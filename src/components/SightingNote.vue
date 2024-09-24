<template>
  <Transition name="slide-up" appear>
    <div class="sighting-note" v-show="isVisible">
      <h2 class="heading">Bird Sighting Note</h2>
      <p class="subheading">
        {{ currentQuestion.subheading }}
      </p>
      <div class="scrapbook-input" :class="{ 'textarea-container': currentQuestionIndex === 0 }">
        <textarea
          v-if="currentQuestionIndex === 0"
          v-model="note"
          :placeholder="currentQuestion.placeholder"
          @input="updateNote"
        ></textarea>
        <input
          v-else-if="currentQuestionIndex === 1"
          v-model="location"
          :placeholder="currentQuestion.placeholder"
          @input="updateLocation"
        />
        <ion-datetime-button
          v-else-if="currentQuestionIndex === 2 && showDateQuestion"
          datetime="date"
          class="date-button"
        ></ion-datetime-button>
        <ion-modal :keep-contents-mounted="true" >
          <ion-datetime
            id="date"
            v-model="date"
            presentation="date"
            @ionChange="updateDate"
          >
        </ion-datetime>
        <div class="bottom-right-section">
          <button @click="confirmDate">Done</button>
        </div>
        </ion-modal>
      </div>
      <div class="button-container">
        <button class="left-button" @click="cancelNote">Cancel</button>
        <button 
          v-if="!isLastQuestion" 
          class="right-button" 
          @click="nextQuestion"
          :disabled="!canProceed"
        >
          Next
        </button>
        <button 
          v-else 
          class="right-button" 
          @click="submitNote"
          :disabled="!canSubmit"
        >
          Submit
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { IonDatetimeButton, IonDatetime, IonModal, IonButton } from '@ionic/vue';

const props = defineProps({
  initialNote: {
    type: String,
    default: ''
  },
  showDateQuestion: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['cancel', 'submit']);

const note = ref(props.initialNote);
const date = ref(new Date().toISOString().slice(0, 10));
const location = ref('');
const isVisible = ref(false);
const currentQuestionIndex = ref(0);

const questions = [
  {
    subheading: 'Describe what you noticed or heard about this bird. This could include behavior, peculiar features, time of day, or surrounding habitat.',
    placeholder: 'Write your bird sighting notes here...'
  },
  {
    subheading: 'Give your location a name.',
    placeholder: 'Enter the location'
  },
  {
    subheading: 'What day did you see the bird on?',
    placeholder: 'Select the date'
  }
];

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);

const isLastQuestion = computed(() => {
  return props.showDateQuestion 
    ? currentQuestionIndex.value === 2 
    : currentQuestionIndex.value === 1;
});

const canProceed = computed(() => {
  if (currentQuestionIndex.value === 0) return note.value.trim() !== '';
  if (currentQuestionIndex.value === 1) return location.value.trim() !== '';
  return true;
});

const canSubmit = computed(() => {
  return note.value.trim() !== '' && location.value.trim() !== '' && 
    (!props.showDateQuestion || date.value !== '');
});

const cancelNote = () => {
  emit('cancel');
};

const submitNote = () => {
  emit('submit', note.value, date.value, location.value,);
};


const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++;
  }
};

const updateNote = (event) => {
  note.value = event.target.value;
};

const updateLocation = (event) => {
  location.value = event.target.value;
};

const updateDate = (event) => {
  date.value = event.detail.value;
};

const confirmDate = () => {
  const modal = document.querySelector('ion-modal');
  if (modal) {
    modal.dismiss();
  } else {
    console.error('No modal found');
  }
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<style scoped>
.sighting-note {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  z-index: 9999;
  width: 85%;
  max-width: 600px;
  background-image: url('../assets/backgrounds/parchment-paper-tan.png');
  background-size: cover;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.heading {
  font-family: 'Fredericka the Great', cursive;
  color: #000000;
  text-align: center;
  margin-bottom: 10px;
}

.subheading {
  font-family: 'Just Another Hand', cursive;
  font-size: 1.8em;
  text-align: center;
  color: #3c2f2f;
  margin-bottom: 20px;
}

.scrapbook-input {
  background-color: rgba(255, 255, 255, 0.4);
  border: 2px solid #8b4513;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.textarea-container {
  height: 200px;
}

textarea {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  font-family: 'Just Another Hand', cursive;
  font-size: 1.5em;
  line-height: 1.6;
  color: #3c2f2f;
  resize: none;
}

textarea:focus, input:focus {
  outline: none;
}

textarea::placeholder, input::placeholder {
  color: #8b4513;
  opacity: 0.7;
}

input {
  width: 100%;
  height: 40px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #8b4513;
  font-family: 'Just Another Hand', cursive;
  font-size: 1.5em;
  color: #3c2f2f;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  background-color: #5e2f0d;
  color: #f0e6d2;
  border: none;
  border-radius: 5%;
  height: 42px;
  font-size: 1.8em;
  font-family: 'Just Another Hand', cursive;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
  padding: 5px 10px;
}

.left-button {
  transform: rotate(-3deg);
}

.right-button {
  transform: rotate(2deg);
}

button:hover {
  background-color: #7a3d10;
}

button:disabled {
  background-color: rgba(139, 69, 19, 0.5);
  color: #f0e6d2;
  cursor: not-allowed;
}

/* styles for ion-datetime-button */
::v-deep .datetime-button {
  background-color: transparent;
  color: #3c2f2f;
  font-family: 'Just Another Hand', cursive;
  font-size: 2em;  /* Increased font size */
  border: none;
  border-bottom: 2px solid #8b4513;
  width: 100%;
  text-align: left;
  padding: 5px 0;
}

::v-deep .datetime-button::part(native) {
  padding: 0;
}

::v-deep ion-modal {
  --background: rgba(0, 0, 0, 0.6);
}

::v-deep ion-datetime {
  --background: #f0e6d2;
  --color: #3c2f2f;
  font-family: 'Just Another Hand', cursive;
  font-size: 1.2em;
}

/* Style for the Done button in the date picker */
.bottom-right-section {
  /* Move to the right, and increase font size. give it a background */
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #f0e6d2;
  border-radius: 10px;
  padding: 10px;
}
/* Animation styles */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.8s cubic-bezier(0.34, 1.00, 0.14, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translate(-50%, 100%);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translate(-50%, -45%);
  opacity: 1;
}
</style>