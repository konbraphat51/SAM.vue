<template>
  <div class="demo">
    <h1>SAM.vue Demo</h1>
    
    <h2>All three axes (nine display format)</h2>
    <SamSelector
      :axes="['arousal', 'valence', 'dominance']"
      displayFormat="nine"
      arousalLegendLeft="Calm"
      arousalLegendRight="Excited"
      valenceLegendLeft="Unpleasant"
      valenceLegendRight="Pleasant"
      dominanceLegendLeft="Submissive"
      dominanceLegendRight="Dominant"
      @select="handleSelect"
    />
    
    <h2>Valence only (five display format)</h2>
    <SamSelector
      :axes="['valence']"
      displayFormat="five"
      valenceLegendLeft="😞"
      valenceLegendRight="😊"
      @select="handleSelect"
    />
    
    <h2>Arousal and Valence (nine display format)</h2>
    <SamSelector
      :axes="['arousal', 'valence']"
      displayFormat="nine"
      @select="handleSelect"
    />
    
    <div v-if="selections.length > 0" class="selections">
      <h3>Selections:</h3>
      <ul>
        <li v-for="(selection, index) in selections" :key="index">
          {{ selection }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SamSelector from './SamSelector.vue'
import type { SamAxis } from './SamSelector.vue'

const selections = ref<string[]>([])

const handleSelect = (axis: SamAxis, value: number) => {
  selections.value.push(`${axis}: ${value}`)
}
</script>

<style scoped>
.demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
}

h2 {
  color: #666;
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.selections {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.selections h3 {
  margin-top: 0;
}

.selections ul {
  list-style-type: none;
  padding: 0;
}

.selections li {
  padding: 0.5rem;
  background-color: white;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}
</style>
