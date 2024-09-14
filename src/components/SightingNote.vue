<template>
  <div class="sighting-note">
    <h2 class="heading">Bird Sighting Note</h2>
    <p class="subheading">
      Describe what you noticed or heard about this bird. This could include
      location, behavior, peculiar features, time of day, or surrounding habitat.
    </p>
    <div class="scrapbook-textbox">
      <textarea
        v-model="note"
        placeholder="Write your bird sighting notes here..."
        @input="updateNote"
      ></textarea>
    </div>
    <div class="button-container">
      <button class="cancel-button" @click="cancelNote">Cancel</button>
      <button class="submit-button" @click="submitNote">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialNote: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:note', 'cancel', 'submit']);

const note = ref(props.initialNote);

const updateNote = () => {
  emit('update:note', note.value);
};

const cancelNote = () => {
  emit('cancel');
};

const submitNote = () => {
  emit('submit', note.value);
};
</script>

<style scoped>
.sighting-note {
  --ion-background-color: transparent;
  --ion-text-color: #3c2f2f;
  background-image: url('../assets/backgrounds/parchment-paper-tan.png');
  background-size: cover;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.heading {
  font-family: 'Fredericka the Great', cursive;
  color: #8b4513;
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

.scrapbook-textbox {
  background-color: rgba(255, 255, 255, 0.6);
  border: 2px solid #8b4513;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 100px;
  background-color: transparent;
  border: none;
  font-family: 'Just Another Hand', cursive;
  font-size: 1.5em;
  line-height: 1.6;
  color: #3c2f2f;
  resize: none; /* Disable resizing */
}

textarea:focus {
  outline: none;
}

textarea::placeholder {
  color: #8b4513;
  opacity: 0.7;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button, .submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-family: 'Just Another Hand', cursive;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button {
  background-color: #ff4136;
  color: white;
}

.submit-button {
  background-color: #2ecc40;
  color: white;
}

.cancel-button:hover {
  background-color: #ff1a1a;
}

.submit-button:hover {
  background-color: #29b339;
}


</style>