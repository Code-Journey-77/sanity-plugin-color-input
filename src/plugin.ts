import {definePlugin, type PluginOptions} from 'sanity'
import {colorType} from './schemas/colorType'
import {type PresetColor} from './utils'

export interface ColorPickerPluginConfig {
  colors?: PresetColor[]
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
