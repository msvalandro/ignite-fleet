import { IconProps } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { ButtonIconContainer } from './styles'

export type IconBoxProps = (props: IconProps) => JSX.Element

interface ButtonIconProps extends TouchableOpacityProps {
  icon: IconBoxProps
}

export function ButtonIcon({ icon: Icon, ...rest }: ButtonIconProps) {
  const { COLORS } = useTheme()

  return (
    <ButtonIconContainer activeOpacity={0.7} {...rest}>
      <Icon size={24} color={COLORS.BRAND_MID} />
    </ButtonIconContainer>
  )
}
