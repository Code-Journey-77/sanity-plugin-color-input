import {Box, Card, Flex, Text} from '@sanity/ui'
import {getGradientString} from '../../utils'

type PresetColor = string | {hex: string; hex2?: string; angle?: number}

interface PresetsProps {
  colorsList: PresetColor[]
  localValue: string
  onPresetClick: (preset: PresetColor) => void
}

export function Presets({colorsList, localValue, onPresetClick}: PresetsProps) {
  return (
    <Card padding={3} border radius={3}>
      <Flex direction="column" gap={3}>
        <Text size={1} weight="semibold" muted>
          Presets
        </Text>
        <Flex wrap="wrap" gap={2}>
          {colorsList.map((color, index) => {
            const isObj = typeof color === 'object'
            const h1 = isObj ? color.hex : color
            const h2 = isObj ? color.hex2 : null
            const ang = isObj ? color.angle || 180 : 180
            const bg = h2 ? getGradientString(ang, h1, h2) : h1
            const isSelected = localValue === h1

            return (
              <Box
                key={index}
                onClick={() => onPresetClick(color)}
                title={h1}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: bg,
                  cursor: 'pointer',
                  border: isSelected
                    ? '2.5px solid var(--card-focus-ring-color, #1a0dab)'
                    : '2px solid var(--card-border-color, #dfe1e5)',
                  boxShadow: isSelected ? '0 0 0 1px white inset' : 'none',
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                }}
              />
            )
          })}
        </Flex>
      </Flex>
    </Card>
  )
}
