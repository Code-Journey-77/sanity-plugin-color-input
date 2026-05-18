import {Button, Card, Flex, Text} from '@sanity/ui'
import {hexToRgba, hexToHsl, getGradientString} from '../../utils'

interface ValueOutputsProps {
  localValue: string
  localValue2: string
  isGradient: boolean
  angle: number
  onCopy: (value: string, label: string) => void
}

export function ValueOutputs({
  localValue,
  localValue2,
  isGradient,
  angle,
  onCopy,
}: ValueOutputsProps) {
  const outputs = [
    {label: 'HEX', value: localValue.toUpperCase(), show: true},
    {label: 'HEX 2', value: localValue2.toUpperCase(), show: isGradient},
    {label: 'RGBA', value: hexToRgba(localValue), show: !isGradient},
    {label: 'HSL', value: hexToHsl(localValue), show: !isGradient},
    {
      label: 'CSS Gradient',
      value: getGradientString(angle, localValue, localValue2),
      show: isGradient,
    },
  ]

  return (
    <Card padding={3} border radius={3}>
      <Flex direction="column" gap={3}>
        <Text size={1} weight="semibold" muted>
          Values
        </Text>
        {outputs
          .filter((item) => item.show)
          .map((item) => (
            <Flex key={item.label} justify="space-between" align="center" gap={3}>
              <Flex direction="column" style={{minWidth: 0}}>
                <Text size={0} weight="semibold" muted>
                  {item.label}
                </Text>
                <code
                  style={{
                    fontSize: 12,
                    wordBreak: 'break-all',
                    color: 'var(--card-code-fg-color, inherit)',
                    fontFamily: 'monospace',
                  }}
                >
                  {item.value}
                </code>
              </Flex>
              <Button
                mode="ghost"
                fontSize={1}
                padding={2}
                text="Copy"
                style={{flexShrink: 0}}
                onClick={() => onCopy(item.value, item.label)}
              />
            </Flex>
          ))}
      </Flex>
    </Card>
  )
}
