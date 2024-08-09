import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Input, Label, LicensePlateInputContainer } from './styles'

interface LicensePlateInputProps extends TextInputProps {
  label: string
}

// eslint-disable-next-line react/display-name
const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme()

    return (
      <LicensePlateInputContainer>
        <Label>{label}</Label>

        <Input
          ref={ref}
          maxLength={7}
          autoCapitalize="characters"
          placeholderTextColor={COLORS.GRAY_400}
          {...rest}
        />
      </LicensePlateInputContainer>
    )
  },
)

export { LicensePlateInput }
