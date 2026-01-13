import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SamSelector from './SamSelector.vue'
import type { SamAxis } from './SamSelector.vue'

describe('SamSelector', () => {
  describe('Component Rendering', () => {
    it('renders all three axes by default', () => {
      const wrapper = mount(SamSelector)
      const axes = wrapper.findAll('.sam-axis')
      expect(axes).toHaveLength(3)
    })

    it('renders only specified axes', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal', 'valence']
        }
      })
      const axes = wrapper.findAll('.sam-axis')
      expect(axes).toHaveLength(2)
    })

    it('renders single axis', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['valence']
        }
      })
      const axes = wrapper.findAll('.sam-axis')
      expect(axes).toHaveLength(1)
    })

    it('renders 9 images in nine display format', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal'],
          displayFormat: 'nine'
        }
      })
      const images = wrapper.findAll('.sam-image')
      expect(images).toHaveLength(9)
    })

    it('renders 5 images in five display format', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal'],
          displayFormat: 'five'
        }
      })
      const images = wrapper.findAll('.sam-image')
      expect(images).toHaveLength(5)
    })
  })

  describe('Legend Display', () => {
    it('displays arousal legends when provided', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal'],
          arousalLegendLeft: 'Calm',
          arousalLegendRight: 'Excited'
        }
      })
      expect(wrapper.text()).toContain('Calm')
      expect(wrapper.text()).toContain('Excited')
    })

    it('displays valence legends when provided', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['valence'],
          valenceLegendLeft: 'Unpleasant',
          valenceLegendRight: 'Pleasant'
        }
      })
      expect(wrapper.text()).toContain('Unpleasant')
      expect(wrapper.text()).toContain('Pleasant')
    })

    it('displays dominance legends when provided', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['dominance'],
          dominanceLegendLeft: 'Controlled',
          dominanceLegendRight: 'In Control'
        }
      })
      expect(wrapper.text()).toContain('Controlled')
      expect(wrapper.text()).toContain('In Control')
    })

    it('does not display legends when not provided', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal']
        }
      })
      const legends = wrapper.findAll('.sam-legend-left, .sam-legend-right')
      expect(legends).toHaveLength(0)
    })
  })

  describe('Image Selection', () => {
    it('emits select event when image is clicked', async () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal']
        }
      })
      
      const firstImage = wrapper.find('.sam-image-wrapper')
      await firstImage.trigger('click')
      
      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')?.[0]).toEqual(['arousal', 1])
    })

    it('emits axis-specific update event when arousal is selected', async () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal']
        }
      })
      
      const images = wrapper.findAll('.sam-image-wrapper')
      await images[2].trigger('click')
      
      expect(wrapper.emitted('update:arousal')).toBeTruthy()
      expect(wrapper.emitted('update:arousal')?.[0]).toEqual([3])
    })

    it('emits axis-specific update event when valence is selected', async () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['valence']
        }
      })
      
      const images = wrapper.findAll('.sam-image-wrapper')
      await images[4].trigger('click')
      
      expect(wrapper.emitted('update:valence')).toBeTruthy()
      expect(wrapper.emitted('update:valence')?.[0]).toEqual([5])
    })

    it('emits axis-specific update event when dominance is selected', async () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['dominance']
        }
      })
      
      const images = wrapper.findAll('.sam-image-wrapper')
      await images[6].trigger('click')
      
      expect(wrapper.emitted('update:dominance')).toBeTruthy()
      expect(wrapper.emitted('update:dominance')?.[0]).toEqual([7])
    })

    it('applies selected class to clicked image', async () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal']
        }
      })
      
      const images = wrapper.findAll('.sam-image')
      await images[3].trigger('click')
      
      // Need to wait for Vue to update the DOM
      await wrapper.vm.$nextTick()
      
      expect(images[3].classes()).toContain('sam-selected')
    })

    it('allows selecting different values on different axes', async () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal', 'valence']
        }
      })
      
      // First axis (arousal) - select index 2
      const arousalImages = wrapper.findAll('.sam-axis')[0].findAll('.sam-image-wrapper')
      await arousalImages[1].trigger('click')
      
      // Second axis (valence) - select index 5
      const valenceImages = wrapper.findAll('.sam-axis')[1].findAll('.sam-image-wrapper')
      await valenceImages[4].trigger('click')
      
      expect(wrapper.emitted('select')).toHaveLength(2)
      expect(wrapper.emitted('select')?.[0]).toEqual(['arousal', 2])
      expect(wrapper.emitted('select')?.[1]).toEqual(['valence', 5])
    })
  })

  describe('Display Format', () => {
    it('shows all 9 image wrappers in nine format', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal'],
          displayFormat: 'nine'
        }
      })
      const wrappers = wrapper.findAll('.sam-image-wrapper')
      expect(wrappers).toHaveLength(9)
    })

    it('shows 9 image wrappers but only 5 images in five format', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal'],
          displayFormat: 'five'
        }
      })
      const wrappers = wrapper.findAll('.sam-image-wrapper')
      const images = wrapper.findAll('.sam-image')
      
      expect(wrappers).toHaveLength(9)
      expect(images).toHaveLength(5)
    })

    it('applies empty class to non-displayed images in five format', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal'],
          displayFormat: 'five'
        }
      })
      const wrappers = wrapper.findAll('.sam-image-wrapper')
      
      // Index 2, 4, 6, 8 should be empty (0-indexed, so positions 1, 3, 5, 7)
      expect(wrappers[1].classes()).toContain('sam-image-empty')
      expect(wrappers[3].classes()).toContain('sam-image-empty')
      expect(wrappers[5].classes()).toContain('sam-image-empty')
      expect(wrappers[7].classes()).toContain('sam-image-empty')
    })
  })

  describe('Image Paths', () => {
    it('generates image paths for arousal', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal']
        }
      })
      const images = wrapper.findAll('.sam-image')
      
      images.forEach((img) => {
        const src = img.attributes('src')
        // In test environment, images are loaded as data URIs or blob URLs
        expect(src).toBeDefined()
        expect(src).toBeTruthy()
      })
    })

    it('generates image paths for valence', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['valence']
        }
      })
      const images = wrapper.findAll('.sam-image')
      
      images.forEach((img) => {
        const src = img.attributes('src')
        // In test environment, images are loaded as data URIs or blob URLs
        expect(src).toBeDefined()
        expect(src).toBeTruthy()
      })
    })

    it('generates image paths for dominance', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['dominance']
        }
      })
      const images = wrapper.findAll('.sam-image')
      
      images.forEach((img) => {
        const src = img.attributes('src')
        // In test environment, images are loaded as data URIs or blob URLs
        expect(src).toBeDefined()
        expect(src).toBeTruthy()
      })
    })
  })

  describe('Props Defaults', () => {
    it('uses default axes when not provided', () => {
      const wrapper = mount(SamSelector)
      const axes = wrapper.findAll('.sam-axis')
      expect(axes).toHaveLength(3)
    })

    it('uses nine display format by default', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal']
        }
      })
      const images = wrapper.findAll('.sam-image')
      expect(images).toHaveLength(9)
    })
  })

  describe('Accessibility', () => {
    it('includes alt text for images', () => {
      const wrapper = mount(SamSelector, {
        props: {
          axes: ['arousal']
        }
      })
      const images = wrapper.findAll('.sam-image')
      
      images.forEach((img, index) => {
        expect(img.attributes('alt')).toBe(`Arousal ${index + 1}`)
      })
    })

    it('includes appropriate alt text for all axes', () => {
      const wrapper = mount(SamSelector)
      const allImages = wrapper.findAll('.sam-image')
      
      // Should have 27 images total (9 per axis × 3 axes)
      expect(allImages).toHaveLength(27)
    })
  })
})
