import { useApp, useUser } from '@realm/react'
import { Power } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import theme from '../../theme'
import { Greeting, HeaderContainer, Message, Name, Picture } from './styles'

export function Header() {
  const user = useUser()
  const app = useApp()

  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 32

  function handleLogout() {
    app.currentUser?.logOut()
  }

  return (
    <HeaderContainer style={{ paddingTop }}>
      <Picture
        source={{ uri: user?.profile?.pictureUrl }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />

      <Greeting>
        <Message>Olá,</Message>

        <Name>{user?.profile?.name}</Name>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </HeaderContainer>
  )
}
