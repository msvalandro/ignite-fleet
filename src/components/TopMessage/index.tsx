import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'

import { IconBoxProps } from '../ButtonIcon'
import { Title, TopMessageContainer } from './styles'

interface TopMessageProps {
  title: string
  icon?: IconBoxProps
}

export function TopMessage({ title, icon: Icon }: TopMessageProps) {
  const { COLORS } = useTheme()

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 5

  return (
    <TopMessageContainer style={{ paddingTop }}>
      {Icon && <Icon size={18} color={COLORS.GRAY_100} />}

      <Title>{title}</Title>
    </TopMessageContainer>
  )
}
