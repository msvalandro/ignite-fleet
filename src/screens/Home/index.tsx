import { useNavigation } from '@react-navigation/native'

import { CarStatus } from '../../components/CarStatus'
import { Header } from '../../components/Header'
import { Content, HomeContainer } from './styles'

export function Home() {
  const navigation = useNavigation()

  function handleRegisterMovement() {
    navigation.navigate('departure')
  }

  return (
    <HomeContainer>
      <Header />

      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </HomeContainer>
  )
}
