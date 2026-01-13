import { describe, it, expect } from 'vitest'
import SamSelector, { SamSelector as NamedExport } from './index'
import type { SamAxis, DisplayFormat, SamProps } from './index'

describe('Index Exports', () => {
  it('exports SamSelector as default export', () => {
    expect(SamSelector).toBeDefined()
    expect(typeof SamSelector).toBe('object')
  })

  it('exports SamSelector as named export', () => {
    expect(NamedExport).toBeDefined()
    expect(NamedExport).toBe(SamSelector)
  })

  it('exports type SamAxis', () => {
    // Type-only test - this will fail at compile time if type doesn't exist
    const axis: SamAxis = 'arousal'
    expect(axis).toBe('arousal')
  })

  it('exports type DisplayFormat', () => {
    // Type-only test - this will fail at compile time if type doesn't exist
    const format: DisplayFormat = 'nine'
    expect(format).toBe('nine')
  })

  it('exports type SamProps', () => {
    // Type-only test - this will fail at compile time if type doesn't exist
    const props: SamProps = {
      axes: ['arousal'],
      displayFormat: 'five'
    }
    expect(props.axes).toEqual(['arousal'])
  })
})
