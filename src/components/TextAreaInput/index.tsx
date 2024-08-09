import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Input, Label, TextAreaInputContainer } from './styles'

interface TextAreaInputProps extends TextInputProps {
  label: string
}

export function TextAreaInput({ label, ...rest }: TextAreaInputProps) {
  const { COLORS } = useTheme()

  return (
    <TextAreaInputContainer>
      <Label>{label}</Label>

      <Input
        placeholderTextColor={COLORS.GRAY_400}
        multiline
        autoCapitalize="sentences"
        {...rest}
      />
    </TextAreaInputContainer>
  )
}
