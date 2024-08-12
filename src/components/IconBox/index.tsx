import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { IconBoxContainer, SizeProps } from './styles'

export type IIconBox = (props: IconProps) => JSX.Element

interface IconBoxProps {
  size?: SizeProps
  icon: IIconBox
}

export function IconBox({ size = 'NORMAL', icon: Icon }: IconBoxProps) {
  const iconSize = size === 'NORMAL' ? 24 : 16

  const { COLORS } = useTheme()

  return (
    <IconBoxContainer size={size}>
      <Icon size={iconSize} color={COLORS.BRAND_LIGHT} />
    </IconBoxContainer>
  )
}
