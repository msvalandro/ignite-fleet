import { Greeting, HeaderContainer, Message, Name } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <Greeting>
        <Message>Olá,</Message>

        <Name>Matheus</Name>
      </Greeting>
    </HeaderContainer>
  )
}
