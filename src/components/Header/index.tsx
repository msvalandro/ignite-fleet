import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'

import { HeaderContainer, Title } from './styles'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { goBack } = useNavigation()

  const { COLORS } = useTheme()

  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 42

  return (
    <HeaderContainer style={{ paddingTop }}>
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <ArrowLeft size={24} weight="bold" color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>

      <Title>{title}</Title>
    </HeaderContainer>
  )
}
