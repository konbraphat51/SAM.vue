<template>
  <div class="sam-container">
    <!-- Arousal axis -->
    <div v-if="axes.includes('arousal')" class="sam-axis">
      <div class="sam-legend-left" v-if="arousalLegendLeft">{{ arousalLegendLeft }}</div>
      <div class="sam-images">
        <div
          v-for="index in displayIndices"
          :key="`arousal-${index}`"
          :class="['sam-image-wrapper', { 'sam-image-empty': !shouldShowImage(index) }]"
          @click="() => selectValue('arousal', index)"
        >
          <img
            v-if="shouldShowImage(index)"
            :src="getImagePath('arousal', index)"
            :alt="`Arousal ${index}`"
            :class="['sam-image', { 'sam-selected': selectedValues.arousal === index }]"
          />
        </div>
      </div>
      <div class="sam-legend-right" v-if="arousalLegendRight">{{ arousalLegendRight }}</div>
    </div>

    <!-- Valence axis -->
    <div v-if="axes.includes('valence')" class="sam-axis">
      <div class="sam-legend-left" v-if="valenceLegendLeft">{{ valenceLegendLeft }}</div>
      <div class="sam-images">
        <div
          v-for="index in displayIndices"
          :key="`valence-${index}`"
          :class="['sam-image-wrapper', { 'sam-image-empty': !shouldShowImage(index) }]"
          @click="() => selectValue('valence', index)"
        >
          <img
            v-if="shouldShowImage(index)"
            :src="getImagePath('valence', index)"
            :alt="`Valence ${index}`"
            :class="['sam-image', { 'sam-selected': selectedValues.valence === index }]"
          />
        </div>
      </div>
      <div class="sam-legend-right" v-if="valenceLegendRight">{{ valenceLegendRight }}</div>
    </div>

    <!-- Dominance axis -->
    <div v-if="axes.includes('dominance')" class="sam-axis">
      <div class="sam-legend-left" v-if="dominanceLegendLeft">{{ dominanceLegendLeft }}</div>
      <div class="sam-images">
        <div
          v-for="index in displayIndices"
          :key="`dominance-${index}`"
          :class="['sam-image-wrapper', { 'sam-image-empty': !shouldShowImage(index) }]"
          @click="() => selectValue('dominance', index)"
        >
          <img
            v-if="shouldShowImage(index)"
            :src="getImagePath('dominance', index)"
            :alt="`Dominance ${index}`"
            :class="['sam-image', { 'sam-selected': selectedValues.dominance === index }]"
          />
        </div>
      </div>
      <div class="sam-legend-right" v-if="dominanceLegendRight">{{ dominanceLegendRight }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export type SamAxis = 'arousal' | 'valence' | 'dominance'
export type DisplayFormat = 'five' | 'nine'

export interface SamProps {
  axes?: SamAxis[]
  displayFormat?: DisplayFormat
  arousalLegendLeft?: string
  arousalLegendRight?: string
  valenceLegendLeft?: string
  valenceLegendRight?: string
  dominanceLegendLeft?: string
  dominanceLegendRight?: string
}

const props = withDefaults(defineProps<SamProps>(), {
  axes: () => ['arousal', 'valence', 'dominance'],
  displayFormat: 'nine',
  arousalLegendLeft: '',
  arousalLegendRight: '',
  valenceLegendLeft: '',
  valenceLegendRight: '',
  dominanceLegendLeft: '',
  dominanceLegendRight: ''
})

export interface SamEmits {
  (e: 'select', axis: SamAxis, value: number): void
  (e: 'update:arousal', value: number | null): void
  (e: 'update:valence', value: number | null): void
  (e: 'update:dominance', value: number | null): void
}

const emit = defineEmits<SamEmits>()

const selectedValues = ref<Record<SamAxis, number | null>>({
  arousal: null,
  valence: null,
  dominance: null
})

const displayIndices = computed(() => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9]
})

const shouldShowImage = (index: number): boolean => {
  if (props.displayFormat === 'nine') {
    return true
  }
  // five format: show only 1, 3, 5, 7, 9
  return [1, 3, 5, 7, 9].includes(index)
}

const getImagePath = (axis: SamAxis, index: number): string => {
  // Images are bundled with the library in the images/{axis}/ directory
  // This uses Vite's import.meta.url to resolve the path at build time
  return new URL(`../images/${axis}/${axis}-${index}.svg`, import.meta.url).href
}

const selectValue = (axis: SamAxis, index: number) => {
  selectedValues.value[axis] = index
  emit('select', axis, index)
  
  // Emit axis-specific update events
  if (axis === 'arousal') {
    emit('update:arousal', index)
  } else if (axis === 'valence') {
    emit('update:valence', index)
  } else if (axis === 'dominance') {
    emit('update:dominance', index)
  }
}
</script>

<style scoped>
.sam-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.sam-axis {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sam-legend-left,
.sam-legend-right {
  min-width: 100px;
  text-align: center;
  font-size: 0.9rem;
  color: #333;
}

.sam-images {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
}

.sam-image-wrapper {
  flex: 1;
  max-width: 80px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.sam-image-wrapper:hover:not(.sam-image-empty) {
  transform: scale(1.1);
}

.sam-image-empty {
  cursor: default;
}

.sam-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: border-color 0.2s;
}

.sam-image.sam-selected {
  border-color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.1);
}
</style>
