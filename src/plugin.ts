import {definePlugin, type PluginOptions} from 'sanity'
import {colorType} from './schemas/colorType'
import {type PresetColor} from './utils'

export interface ColorPickerPluginConfig {
  colors?: PresetColor[]
  disablePresets?: boolean
  disableCopyValues?: boolean
}

export const customColorPicker = (config?: ColorPickerPluginConfig): PluginOptions => {
  const {colors, disablePresets, disableCopyValues} = config || {}

  const customizedColorType = {
    ...colorType,
    options: {
      ...colorType?.options,
      ...(colors !== undefined && {colors}),
      ...(disablePresets !== undefined && {disablePresets}),
      ...(disableCopyValues !== undefined && {disableCopyValues}),
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
