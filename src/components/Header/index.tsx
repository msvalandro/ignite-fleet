import { Power } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'

import theme from '../../theme'
import { Greeting, HeaderContainer, Message, Name, Picture } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <Picture
        source={{ uri: 'https://github.com/msvalandro.png' }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />

      <Greeting>
        <Message>Olá,</Message>

        <Name>Matheus</Name>
      </Greeting>

      <TouchableOpacity>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </HeaderContainer>
  )
}
