import {useCallback, useEffect, useState} from 'react'
import {Flex, Text, useToast} from '@sanity/ui'
import {PatchEvent, set, setIfMissing, unset, type ObjectInputProps} from 'sanity'
import {PRESET_COLORS} from '../../constants'
import {isValidHex, hexToRgba, hexToHsl, getGradientString} from '../../utils'
import {CustomInput} from './CustomInput'
import {ModeToggle} from './ModeToggle'
import {Preview} from './Preview'
import {Presets} from './Presets'
import {ValueOutputs} from './ValueOutputs'

type ColorPatch =
  | ReturnType<typeof set>
  | ReturnType<typeof unset>
  | ReturnType<typeof setIfMissing>

export function CustomColorPicker(props: ObjectInputProps) {
  const {value, onChange, elementProps, schemaType} = props
  const toast = useToast()

  const optionsColors = schemaType?.options?.colors
  const colorsList =
    Array.isArray(optionsColors) && optionsColors.length > 0 ? optionsColors : PRESET_COLORS

  const currentHex = value?.hex || ''
  const currentHex2 = value?.hex2 || ''
  const currentIsGradient = value?.isGradient || false
  const currentAngle = value?.angle || 180

  const [localValue, setLocalValue] = useState<string>(currentHex)
  const [localValue2, setLocalValue2] = useState<string>(currentHex2)
  const [isGradient, setIsGradient] = useState<boolean>(currentIsGradient)
  const [angle, setAngle] = useState<number>(currentAngle)

  useEffect(() => {
    setLocalValue(currentHex)
    setLocalValue2(currentHex2)
    setIsGradient(currentIsGradient)
    setAngle(currentAngle)
  }, [currentHex, currentHex2, currentIsGradient, currentAngle])

  useEffect(() => {
    if (
      localValue === currentHex &&
      localValue2 === currentHex2 &&
      isGradient === currentIsGradient &&
      angle === currentAngle
    )
      return

    const timeout = setTimeout(() => {
      if (localValue && !isValidHex(localValue)) return
      if (isGradient && localValue2 && !isValidHex(localValue2)) return

      if (!isGradient && !localValue) {
        onChange(PatchEvent.from(unset()))
        return
      }

      const patches: ColorPatch[] = [
        setIfMissing({_type: 'color'}),
        set(isGradient, ['isGradient']),
      ]
      if (localValue) {
        patches.push(set(localValue, ['hex']))
        patches.push(set(hexToRgba(localValue), ['rgba']))
        patches.push(set(hexToHsl(localValue), ['hsl']))
      } else {
        patches.push(unset(['hex']))
        patches.push(unset(['rgba']))
        patches.push(unset(['hsl']))
      }

      if (isGradient) {
        patches.push(set(angle, ['angle']))

        if (localValue2) {
          patches.push(set(localValue2, ['hex2']))
        } else {
          patches.push(unset(['hex2']))
        }

        if (localValue && localValue2) {
          patches.push(set(getGradientString(angle, localValue, localValue2), ['css']))
        } else {
          patches.push(unset(['css']))
        }
      } else {
        patches.push(unset(['hex2']))
        patches.push(unset(['angle']))
        patches.push(unset(['css']))
      }

      onChange(PatchEvent.from(patches))
    }, 300)

    return () => clearTimeout(timeout)
  }, [
    localValue,
    localValue2,
    isGradient,
    angle,
    currentHex,
    currentHex2,
    currentIsGradient,
    currentAngle,
    onChange,
  ])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.currentTarget.value)
  }, [])

  const handleInput2Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue2(e.currentTarget.value)
  }, [])

  const handleAngleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAngle(Number(e.currentTarget.value))
  }, [])

  const handlePresetClick = useCallback(
    (preset: string | {hex: string; hex2?: string; angle?: number}) => {
      if (typeof preset === 'string') {
        setLocalValue(preset)
        setIsGradient(false)
      } else {
        setLocalValue(preset.hex)
        if (preset.hex2) {
          setLocalValue2(preset.hex2)
          setIsGradient(true)
          if (preset.angle !== undefined) setAngle(preset.angle)
        } else {
          setIsGradient(false)
        }
      }
    },
    [],
  )

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.push({title: `Copied ${label}`, status: 'success'})
    } catch {
      toast.push({title: 'Copy failed', status: 'error'})
    }
  }

  const handleModeChange = useCallback(() => {
    setIsGradient((prev) => !prev)
  }, [])

  return (
    <Flex direction="column" gap={3}>
      {/* Mode Toggle */}
      <ModeToggle isGradient={isGradient} onChange={handleModeChange} />

      {/* Picker + Input */}
      <Flex direction="column" gap={3}>
        {/* Color 1 */}
        <CustomInput
          value={localValue}
          onChange={handleInputChange}
          placeholder="#000000"
          elementProps={elementProps}
        />

        {isGradient && (
          <>
            {/* Color 2 */}
            <CustomInput value={localValue2} onChange={handleInput2Change} placeholder="#000000" />

            {/* Angle Slider */}
            <Flex direction="column" gap={2}>
              <Flex justify="space-between" align="center">
                <Text size={1} weight="semibold" muted>
                  Angle
                </Text>
                <Text size={1} muted>
                  {angle}°
                </Text>
              </Flex>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={handleAngleChange}
                style={{width: '100%', accentColor: 'var(--card-focus-ring-color, #1a0dab)'}}
              />
            </Flex>
          </>
        )}
      </Flex>

      {/* Preview */}
      <Preview
        isGradient={isGradient}
        angle={angle}
        localValue={localValue}
        localValue2={localValue2}
      />

      {/* Presets */}
      <Presets colorsList={colorsList} localValue={localValue} onPresetClick={handlePresetClick} />

      {/* Output Values */}
      <ValueOutputs
        localValue={localValue}
        localValue2={localValue2}
        isGradient={isGradient}
        angle={angle}
        onCopy={copyToClipboard}
      />
    </Flex>
  )
}
