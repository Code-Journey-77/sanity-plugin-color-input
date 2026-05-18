import {Box, Card, Flex, Text} from '@sanity/ui'
import {getGradientString} from '../../utils'

interface PreviewProps {
  isGradient: boolean
  angle: number
  localValue: string
  localValue2: string
}

export function Preview({isGradient, angle, localValue, localValue2}: PreviewProps) {
  return (
    <Card padding={3} border radius={3}>
      <Flex direction="column" gap={3}>
        <Text size={1} weight="semibold" muted>
          Preview
        </Text>
        <Box
          style={{
            height: 100,
            width: '100%',
            borderRadius: 8,
            background: isGradient
              ? getGradientString(angle, localValue, localValue2)
              : localValue || 'transparent',
            border: '1px solid var(--card-border-color, #dfe1e5)',
          }}
        />
      </Flex>
    </Card>
  )
}
