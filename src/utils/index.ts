export function isValidHex(hex: string) {
  return /^#([0-9A-F]{6})$/i.test(hex)
}

export function getContrastColor(hex?: string) {
  if (!hex || !isValidHex(hex)) return 'rgba(0,0,0,0.6)'
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? 'rgba(0,0,0,0.6)' : 'white'
}

export function hexToRgba(hex: string) {
  if (!isValidHex(hex)) return ''
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, 1)`
}

export function hexToHsl(hex: string) {
  if (!isValidHex(hex)) return ''

  let r = parseInt(hex.slice(1, 3), 16) / 255
  let g = parseInt(hex.slice(3, 5), 16) / 255
  let b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

export function getGradientString(angle: number, color1: string, color2: string) {
  const c1 = isValidHex(color1) ? color1 : 'transparent'
  const c2 = isValidHex(color2) ? color2 : 'transparent'
  return `linear-gradient(${angle}deg, ${c1}, ${c2})`
}

import type {SchemaType} from 'sanity'

export type PresetColor = string | {hex: string; hex2?: string; angle?: number}

export function resolveOption<T>(
  schemaType: SchemaType | undefined,
  optionName: string,
  defaultValue: T,
): T {
  let currentType: SchemaType | undefined = schemaType
  let depth = 0
  while (currentType && depth < 10) {
    const value = currentType?.options?.[optionName]
    if (value !== undefined) {
      return value as T
    }
    currentType = currentType?.type
    depth++
  }
  return defaultValue
}

export function resolveColors(
  schemaType: SchemaType | undefined,
  fallbackColors: PresetColor[],
): PresetColor[] {
  const colors = resolveOption<PresetColor[] | undefined>(schemaType, 'colors', undefined)
  if (Array.isArray(colors) && colors.length > 0) {
    return colors
  }
  return fallbackColors
}
