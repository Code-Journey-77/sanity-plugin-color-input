import {Card, Flex, Switch, Label} from '@sanity/ui'

interface ModeToggleProps {
  isGradient: boolean
  onChange: () => void
}

export function ModeToggle({isGradient, onChange}: ModeToggleProps) {
  return (
    <Card padding={3} border radius={3}>
      <Flex align="center" gap={3}>
        <Switch id="gradient-toggle" checked={isGradient} onChange={onChange} />
        <Label htmlFor="gradient-toggle" size={1}>
          Gradient Mode
        </Label>
      </Flex>
    </Card>
  )
}
