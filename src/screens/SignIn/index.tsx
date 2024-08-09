import backgroundImg from '../../assets/background.png'
import { SignInContainer, Slogan, Title } from './styles'

export function SignIn() {
  return (
    <SignInContainer source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>Gestão de uso de veículos</Slogan>
    </SignInContainer>
  )
}
