import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { CarStatus } from '../../components/CarStatus'
import { HomeHeader } from '../../components/HomeHeader'
import { useQuery } from '../../libs/realm'
import { History } from '../../libs/realm/schemas/History'
import { Content, HomeContainer } from './styles'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null)

  const navigation = useNavigation()

  const history = useQuery(History)

  function handleRegisterMovement() {
    navigation.navigate('departure')
  }

  function fetchVehicle() {
    try {
      const vehicle = history.filtered("status = 'departure'")[0]

      setVehicleInUse(vehicle)
    } catch (error) {
      console.log(error)

      Alert.alert(
        'Veículo em uso',
        'Não foi possível carregar o veículo em uso.',
      )
    }
  }

  useEffect(() => {
    fetchVehicle()
  }, [])

  return (
    <HomeContainer>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </HomeContainer>
  )
}
