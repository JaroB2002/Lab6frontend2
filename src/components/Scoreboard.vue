<script setup>
import { ref, reactive, onMounted } from 'vue';

let data = ref([{
    "team": "Wout Van Aert",
    "score": "31"
},
{
    "team": "Mathieu Van Der Poel",
    "score": "1"
}]);

let socket = null;

onMounted( () => {
    socket = new WebSocket('wss://dev5-lab6-backend.onrender.com/primus');

    //listen for new data
    socket.onmessage = function (event) {
        let m = JSON.parse(event.data);
        console.log(m);
        if (m.action === 'updateStats') {
            data.value.push({
                "team": m.team,
                "score": m.score
            });
        }
    };
});
</script>

<template>
    <h1>Scoreboard</h1>
    <ul>
        <li v-for="item in data" :key="item.team">
            {{ item.team }}: {{ item.score }}
        </li>
    </ul>
</template>
  
<style scoped>

  /* Voeg stijlen toe aan je component */
  .scoreboard-list {
    list-style-type: none;
    padding: 0;
  }

  .scoreboard-item {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .team-name {
    font-weight: bold;
    margin-right: 8px;
  }

  .team-score {
    color: #007bff; /* Gebruik een andere kleur naar wens */
  }</style>