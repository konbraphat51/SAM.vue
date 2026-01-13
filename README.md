# SAM.vue

Self-Assessment Manikin (SAM) Vue 3 component library.

## Installation

```bash
npm install sam-vue
# or
pnpm add sam-vue
# or
yarn add sam-vue
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
import { SamSelector } from 'sam-vue'
import 'sam-vue/dist/style.css'

const handleSelect = (axis, value) => {
  console.log(`Selected ${axis}: ${value}`)
}
</script>
```

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

## Development

### Setup

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install dependencies
pnpm install
```

### Build

```bash
# Build library for npm
pnpm run build

# Build demo site for GitHub Pages
pnpm run build:demo
```

### Development mode

```bash
pnpm run dev
```

## Demo Site

A live demo is available at: https://konbraphat51.github.io/SAM.vue/

To build and deploy the demo site locally:

```bash
# Build the demo
pnpm run build:demo

# The demo will be built to the `docs` folder
# For GitHub Pages, commit and push the docs folder
```

## Publishing to npm

### First time setup

1. Create an npm account at https://www.npmjs.com/signup if you don't have one

2. Login to npm from command line:
```bash
npm login
```

### Publishing

1. Update version in `package.json` (follow semantic versioning):
```bash
# For patch release (bug fixes)
npm version patch

# For minor release (new features, backward compatible)
npm version minor

# For major release (breaking changes)
npm version major
```

2. Build the library:
```bash
pnpm run build
```

3. Publish to npm:
```bash
npm publish
```

### Publishing updates

1. Make your changes
2. Update version: `npm version patch|minor|major`
3. Build: `pnpm run build`
4. Publish: `npm publish`

### Publishing scoped packages (recommended for first publication)

If the package name `sam-vue` is already taken, you can publish under your npm username:

1. Update `package.json`:
```json
{
  "name": "@your-username/sam-vue"
}
```

2. Publish with public access:
```bash
npm publish --access public
```

## License

MIT
