import { useNavigation } from '@react-navigation/native'

import { CarStatus } from '../../components/CarStatus'
import { HomeHeader } from '../../components/HomeHeader'
import { Content, HomeContainer } from './styles'

export function Home() {
  const navigation = useNavigation()

  function handleRegisterMovement() {
    navigation.navigate('departure')
  }

  return (
    <HomeContainer>
      <HomeHeader />

      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </HomeContainer>
  )
}
