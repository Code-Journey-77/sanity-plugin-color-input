import {definePlugin, type PluginOptions} from 'sanity'
import {colorType} from './schemas/colorType'

export interface ColorPickerPluginConfig {
  colors?: (string | {hex: string; hex2?: string; angle?: number})[]
}

export const customColorPicker = (config?: ColorPickerPluginConfig): PluginOptions => {
  const colors = config?.colors

  const customizedColorType = {
    ...colorType,
    options: {
      ...colorType?.options,
      colors: colors,
    },
  }

  return definePlugin(() => {
    return {
      name: 'sanity-plugin-color-input',
      schema: {
        types: [customizedColorType],
      },
    }
  })()
}
