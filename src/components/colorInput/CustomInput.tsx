import {Box, Flex, TextInput} from '@sanity/ui'
import type {ObjectInputProps} from 'sanity'
import {EditIcon} from '../icons/EditIcon'
import {isValidHex, getContrastColor} from '../../utils'

interface CustomInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  elementProps?: ObjectInputProps['elementProps']
}

export function CustomInput({
  value,
  onChange,
  placeholder = '#000000',
  elementProps,
}: CustomInputProps) {
  return (
    <Flex align="center" gap={3}>
      <Box style={{position: 'relative', width: 40, height: 40, flexShrink: 0}}>
        <Flex
          align="center"
          justify="center"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: value || '#ffffff',
            borderRadius: 4,
            border: '1px solid var(--card-border-color, #dfe1e5)',
            position: 'absolute',
            pointerEvents: 'none',
          }}
        >
          <EditIcon style={{color: getContrastColor(value), fontSize: 18}} />
        </Flex>
        <input
          type="color"
          value={isValidHex(value) ? value : '#000000'}
          onChange={onChange}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
        />
      </Box>

      <Box flex={1}>
        <TextInput {...elementProps} value={value} onChange={onChange} placeholder={placeholder} />
      </Box>
    </Flex>
  )
}
