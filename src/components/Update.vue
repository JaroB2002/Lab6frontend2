<script setup>
import { ref, reactive, onMounted } from 'vue';

let teams = reactive(["Wout Van Aert", "Mathieu Van Der Poel", "Tom Pidcock"]);
let selectedTeam = ref(null);

let score = ref(null);

let socket = null;

onMounted(() => {
    socket = new WebSocket('wss://backendsocks.onrender.com/primus');
});

const updateStats = () => {
    let m = {
        "action": "updateStats",
        "team": selectedTeam.value,
        "score": score.value
    };

    socket.send(JSON.stringify(m));
};

</script>

<template>
    <h1>Update stats</h1>
    <label for="teamSelect">Select Team:</label>
    <select v-model="selectedTeam" id="teamSelect">
        <option v-for="team in teams" :key="team" :value="team">{{ team }}</option>
    </select>
    <input type="text" v-model="score">
    <button @click="updateStats">Update</button>
</template>
  
<style scoped>
  h1 {
    color: #2c3e50; /* Donkerblauwe tekstkleur */
    font-size: 28px; /* Grotere lettergrootte */
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-top: 15px; /* Iets meer ruimte boven het label */
    color: #3498db; /* Blauwe tekstkleur voor labels */
    font-weight: bold; /* Vetgedrukte tekst */
  }

  select, input {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #bdc3c7; /* Lichtgrijze rand */
    border-radius: 5px; /* Afgeronde hoeken */
  }

  button {
    background-color: #2ecc71; /* Groene achtergrondkleur */
    color: white;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Vloeiende overgang van kleur */
  }

  button:hover {
    background-color: #27ae60; /* Donkerdere groene kleur bij hover */
  }
</style>
