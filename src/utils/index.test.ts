import {describe, it, expect, vi} from 'vitest'
import React from 'react'
import type {ObjectInputProps, ObjectSchemaType} from 'sanity'
import {isValidHex, getContrastColor, hexToRgba, hexToHsl, getGradientString} from './index'
import {CustomInput} from '../components/colorInput/CustomInput'
import {ModeToggle} from '../components/colorInput/ModeToggle'
import {Preview} from '../components/colorInput/Preview'
import {Presets} from '../components/colorInput/Presets'
import {ValueOutputs} from '../components/colorInput/ValueOutputs'
import {CustomColorPicker} from '../components/ColorInput'

describe('Color Utilities', () => {
  describe('isValidHex', () => {
    it('should return true for valid 6-character hex codes', () => {
      expect(isValidHex('#ffffff')).toBe(true)
      expect(isValidHex('#000000')).toBe(true)
      expect(isValidHex('#FF0000')).toBe(true)
      expect(isValidHex('#1a2b3c')).toBe(true)
    })

    it('should return false for invalid hex codes', () => {
      expect(isValidHex('ffffff')).toBe(false)
      expect(isValidHex('#fff')).toBe(false)
      expect(isValidHex('#fffffg')).toBe(false)
      expect(isValidHex('#12345')).toBe(false)
      expect(isValidHex('#1234567')).toBe(false)
    })
  })

  describe('getContrastColor', () => {
    it('should return dark color for light backgrounds', () => {
      expect(getContrastColor('#ffffff')).toBe('rgba(0,0,0,0.6)')
      expect(getContrastColor('#f8f9fa')).toBe('rgba(0,0,0,0.6)')
      expect(getContrastColor('#e9ecef')).toBe('rgba(0,0,0,0.6)')
    })

    it('should return white for dark backgrounds', () => {
      expect(getContrastColor('#000000')).toBe('white')
      expect(getContrastColor('#212529')).toBe('white')
      expect(getContrastColor('#343a40')).toBe('white')
    })

    it('should return default dark color for invalid hex', () => {
      expect(getContrastColor('invalid')).toBe('rgba(0,0,0,0.6)')
      expect(getContrastColor('')).toBe('rgba(0,0,0,0.6)')
      expect(getContrastColor(undefined)).toBe('rgba(0,0,0,0.6)')
    })
  })

  describe('hexToRgba', () => {
    it('should correctly convert valid hex to rgba string', () => {
      expect(hexToRgba('#ff0000')).toBe('rgba(255, 0, 0, 1)')
      expect(hexToRgba('#00ff00')).toBe('rgba(0, 255, 0, 1)')
      expect(hexToRgba('#0000ff')).toBe('rgba(0, 0, 255, 1)')
      expect(hexToRgba('#000000')).toBe('rgba(0, 0, 0, 1)')
      expect(hexToRgba('#ffffff')).toBe('rgba(255, 255, 255, 1)')
    })

    it('should return empty string for invalid hex', () => {
      expect(hexToRgba('invalid')).toBe('')
      expect(hexToRgba('#123')).toBe('')
    })
  })

  describe('hexToHsl', () => {
    it('should correctly convert valid hex to hsl string', () => {
      expect(hexToHsl('#ff0000')).toBe('hsl(0, 100%, 50%)')
      expect(hexToHsl('#00ff00')).toBe('hsl(120, 100%, 50%)')
      expect(hexToHsl('#0000ff')).toBe('hsl(240, 100%, 50%)')
      expect(hexToHsl('#000000')).toBe('hsl(0, 0%, 0%)')
      expect(hexToHsl('#ffffff')).toBe('hsl(0, 0%, 100%)')
    })

    it('should return empty string for invalid hex', () => {
      expect(hexToHsl('invalid')).toBe('')
      expect(hexToHsl('#123')).toBe('')
    })
  })

  describe('getGradientString', () => {
    it('should correctly format a linear gradient string', () => {
      expect(getGradientString(180, '#ff0000', '#0000ff')).toBe(
        'linear-gradient(180deg, #ff0000, #0000ff)',
      )
      expect(getGradientString(45, '#ffffff', '#000000')).toBe(
        'linear-gradient(45deg, #ffffff, #000000)',
      )
      expect(getGradientString(0, '#00ff00', '#ff00ff')).toBe(
        'linear-gradient(0deg, #00ff00, #ff00ff)',
      )
    })

    it('should fall back to transparent for invalid or empty hex values', () => {
      expect(getGradientString(180, '', '#0000ff')).toBe(
        'linear-gradient(180deg, transparent, #0000ff)',
      )
      expect(getGradientString(90, '#ffffff', '')).toBe(
        'linear-gradient(90deg, #ffffff, transparent)',
      )
      expect(getGradientString(45, 'invalid', 'invalid')).toBe(
        'linear-gradient(45deg, transparent, transparent)',
      )
    })
  })

  describe('ColorInput Subcomponents', () => {
    describe('CustomInput', () => {
      it('renders with correct props', () => {
        const onChange = vi.fn()
        const element = React.createElement(CustomInput, {
          value: '#ff0000',
          onChange: onChange,
          placeholder: '#ffffff',
        })
        expect(element.props.value).toBe('#ff0000')
        expect(element.props.placeholder).toBe('#ffffff')
        expect(element.props.onChange).toBe(onChange)
      })
    })

    describe('ModeToggle', () => {
      it('renders with correct gradient checked state', () => {
        const onChange = vi.fn()
        const element = React.createElement(ModeToggle, {
          isGradient: true,
          onChange: onChange,
        })
        expect(element.props.isGradient).toBe(true)
        expect(element.props.onChange).toBe(onChange)
      })
    })

    describe('Preview', () => {
      it('renders with correct preview parameters', () => {
        const element = React.createElement(Preview, {
          isGradient: true,
          angle: 90,
          localValue: '#ff0000',
          localValue2: '#0000ff',
        })
        expect(element.props.isGradient).toBe(true)
        expect(element.props.angle).toBe(90)
        expect(element.props.localValue).toBe('#ff0000')
        expect(element.props.localValue2).toBe('#0000ff')
      })
    })

    describe('Presets', () => {
      it('renders list of presets and handles clicks', () => {
        const onPresetClick = vi.fn()
        const colorsList = ['#ff0000', '#0000ff']
        const element = React.createElement(Presets, {
          colorsList: colorsList,
          localValue: '#ff0000',
          onPresetClick: onPresetClick,
        })
        expect(element.props.colorsList).toEqual(colorsList)
        expect(element.props.localValue).toBe('#ff0000')
        expect(element.props.onPresetClick).toBe(onPresetClick)
      })
    })

    describe('ValueOutputs', () => {
      it('renders correct formats and handle copy triggers', () => {
        const onCopy = vi.fn()
        const element = React.createElement(ValueOutputs, {
          localValue: '#ff0000',
          localValue2: '#0000ff',
          isGradient: true,
          angle: 90,
          onCopy: onCopy,
        })
        expect(element.props.localValue).toBe('#ff0000')
        expect(element.props.localValue2).toBe('#0000ff')
        expect(element.props.isGradient).toBe(true)
        expect(element.props.angle).toBe(90)
        expect(element.props.onCopy).toBe(onCopy)
      })
    })

    describe('CustomInput (Edge Cases)', () => {
      it('should render correctly without elementProps', () => {
        const onChange = vi.fn()
        const element = React.createElement(CustomInput, {
          value: '#123456',
          onChange: onChange,
        })
        expect(element.props.value).toBe('#123456')
        expect(element.props.placeholder).toBeUndefined()
        expect(element.props.elementProps).toBeUndefined()
      })

      it('should render correctly with elementProps', () => {
        const onChange = vi.fn()
        const elementProps: ObjectInputProps['elementProps'] = {
          id: 'sanity-hex-input',
          onFocus: vi.fn(),
          onBlur: vi.fn(),
          ref: React.createRef(),
          'aria-describedby': 'desc',
          style: {},
        }
        const element = React.createElement(CustomInput, {
          value: '#123456',
          onChange: onChange,
          elementProps: elementProps,
        })
        expect(element.props.elementProps).toEqual(elementProps)
      })
    })

    describe('ModeToggle (Edge Cases)', () => {
      it('should render correct state when gradient is false', () => {
        const element = React.createElement(ModeToggle, {
          isGradient: false,
          onChange: vi.fn(),
        })
        expect(element.props.isGradient).toBe(false)
      })
    })

    describe('Preview (Edge Cases)', () => {
      it('should render correctly for solid color preview', () => {
        const element = React.createElement(Preview, {
          isGradient: false,
          angle: 180,
          localValue: '#ff0000',
          localValue2: '',
        })
        expect(element.props.isGradient).toBe(false)
        expect(element.props.localValue).toBe('#ff0000')
      })
    })

    describe('Presets (Edge Cases)', () => {
      it('should handle preset object with custom hex2 and angle', () => {
        const onPresetClick = vi.fn()
        const colorsList = ['#ff0000', {hex: '#ff9a9e', hex2: '#fad0c4', angle: 90}]
        const element = React.createElement(Presets, {
          colorsList: colorsList,
          localValue: '#ff9a9e',
          onPresetClick: onPresetClick,
        })
        expect(element.props.colorsList).toEqual(colorsList)
        expect(element.props.localValue).toBe('#ff9a9e')
      })
    })

    describe('ValueOutputs (Edge Cases)', () => {
      it('should render correctly when isGradient is false', () => {
        const element = React.createElement(ValueOutputs, {
          localValue: '#ff0000',
          localValue2: '',
          isGradient: false,
          angle: 180,
          onCopy: vi.fn(),
        })
        expect(element.props.isGradient).toBe(false)
        expect(element.props.localValue).toBe('#ff0000')
      })
    })
  })

  describe('CustomColorPicker (Main Coordinator Component)', () => {
    it('should initialize correctly with empty values', () => {
      const onChange = vi.fn()
      const element = React.createElement(CustomColorPicker, {
        value: undefined,
        onChange: onChange,
        schemaType: {
          name: 'color',
          title: 'Color',
          type: 'object',
          fields: [],
          options: {
            colors: ['#ff0000'],
          },
        } as unknown as ObjectSchemaType,
      } as unknown as ObjectInputProps)
      expect(element.type).toBe(CustomColorPicker)
      expect(element.props.value).toBeUndefined()
    })

    it('should initialize with initial hex value', () => {
      const onChange = vi.fn()
      const element = React.createElement(CustomColorPicker, {
        value: {hex: '#ff0000', isGradient: false},
        onChange: onChange,
        schemaType: {
          name: 'color',
          title: 'Color',
          type: 'object',
          fields: [],
        } as unknown as ObjectSchemaType,
      } as unknown as ObjectInputProps)
      expect(element.props.value?.hex).toBe('#ff0000')
      expect(element.props.value?.isGradient).toBe(false)
    })
  })
})
