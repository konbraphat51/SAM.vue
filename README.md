# SAM.vue
<img width="1009" height="808" alt="image" src="https://github.com/user-attachments/assets/74f78556-0378-4ce4-9ed8-4c26083192d4" />

Self-Assessment Manikin (SAM) Vue 3 component library.

[![npm version](https://badge.fury.io/js/@konbraphat51%2Fsamvue.svg)](https://www.npmjs.com/package/@konbraphat51/samvue)

[**Live Demo**](https://konbraphat51.github.io/SamVueDemo/)

## Installation

```bash
npm install @konbraphat51/samvue
# or
pnpm add @konbraphat51/samvue
# or
yarn add @konbraphat51/samvue
```

## Usage

```vue
<template>
  <SamSelector
    :axes="['arousal', 'valence', 'dominance']"
    displayFormat="nine"
    arousalLegendLeft="Low"
    arousalLegendRight="High"
    valenceLegendLeft="Unpleasant"
    valenceLegendRight="Pleasant"
    dominanceLegendLeft="Controlled"
    dominanceLegendRight="In Control"
    @select="handleSelect"
  />
</template>

<script setup>
import { SamSelector } from '@konbraphat51/samvue'

const handleSelect = (axis, value) => {
  console.log(`Selected ${axis}: ${value}`)
}
</script>
```

> **Note:** CSS is automatically injected when you import the component. No need to import a separate CSS file!

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `axes` | `Array<'arousal' \| 'valence' \| 'dominance'>` | `['arousal', 'valence', 'dominance']` | Which axes to display (can be 1, 2, or all 3) |
| `displayFormat` | `'five' \| 'nine'` | `'nine'` | Display format: `five` shows only images 1,3,5,7,9; `nine` shows all 9 images |
| `arousalLegendLeft` | `string` | `''` | Left legend text for arousal axis (not displayed if empty) |
| `arousalLegendRight` | `string` | `''` | Right legend text for arousal axis (not displayed if empty) |
| `valenceLegendLeft` | `string` | `''` | Left legend text for valence axis (not displayed if empty) |
| `valenceLegendRight` | `string` | `''` | Right legend text for valence axis (not displayed if empty) |
| `dominanceLegendLeft` | `string` | `''` | Left legend text for dominance axis (not displayed if empty) |
| `dominanceLegendRight` | `string` | `''` | Right legend text for dominance axis (not displayed if empty) |

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `select` | `(axis: SamAxis, value: number)` | Emitted when a SAM image is selected |
| `update:arousal` | `(value: number \| null)` | Emitted when arousal value changes |
| `update:valence` | `(value: number \| null)` | Emitted when valence value changes |
| `update:dominance` | `(value: number \| null)` | Emitted when dominance value changes |

## Examples

### Single axis

```vue
<SamSelector
  :axes="['valence']"
  displayFormat="five"
  valenceLegendLeft="😞"
  valenceLegendRight="😊"
/>
```

### Two axes

```vue
<SamSelector
  :axes="['arousal', 'valence']"
  displayFormat="nine"
/>
```

### All three axes with legends

```vue
<SamSelector
  :axes="['arousal', 'valence', 'dominance']"
  displayFormat="nine"
  arousalLegendLeft="Calm"
  arousalLegendRight="Excited"
  valenceLegendLeft="Unpleasant"
  valenceLegendRight="Pleasant"
  dominanceLegendLeft="Submissive"
  dominanceLegendRight="Dominant"
/>
```

## Images

- **Arousal**: 9 levels from calm to excited
- **Valence**: 9 levels from unpleasant to pleasant
- **Dominance**: 9 levels (scaled versions of valence-5 at 0.4×, 0.6×, 0.8×, 0.9×, 1.0×, 1.1×, 1.25×, 1.35×, 1.5×)

Borrowed from [cwi-dis/self-assessment-manikins-svg](https://github.com/cwi-dis/self-assessment-manikins-svg) under the BSD-2 Clause License.

## License

Boost Software License 1.0

Be careful! [The original SVG images](https://github.com/cwi-dis/self-assessment-manikins-svg) are protected under the BSD-2 Clause License.
