import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Input, Label, TextAreaInputContainer } from './styles'

interface TextAreaInputProps extends TextInputProps {
  label: string
}

// eslint-disable-next-line react/display-name
const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme()

    return (
      <TextAreaInputContainer>
        <Label>{label}</Label>

        <Input
          ref={ref}
          placeholderTextColor={COLORS.GRAY_400}
          multiline
          autoCapitalize="sentences"
          {...rest}
        />
      </TextAreaInputContainer>
    )
  },
)

export { TextAreaInput }
