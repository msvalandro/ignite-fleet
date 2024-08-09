import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useState } from 'react'
import { Alert } from 'react-native'

import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button'
import { SignInContainer, Slogan, Title } from './styles'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()

      if (idToken) {
      } else {
        Alert.alert(
          'Entrar',
          'Não foi possível conectar-se a sua conta Google.',
        )
        setIsAuthenticating(false)
      }
    } catch (error) {
      console.log(error)

      Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta Google.')

      setIsAuthenticating(false)
    }
  }

  return (
    <SignInContainer source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </SignInContainer>
  )
}
