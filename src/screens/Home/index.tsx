import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { CarStatus } from '../../components/CarStatus'
import { HistoryCard } from '../../components/HistoryCard'
import { HomeHeader } from '../../components/HomeHeader'
import { useQuery, useRealm } from '../../libs/realm'
import { History } from '../../libs/realm/schemas/History'
import { Content, HomeContainer } from './styles'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null)

  const navigation = useNavigation()

  const history = useQuery(History)
  const realm = useRealm()

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      navigation.navigate('arrival', { id: vehicleInUse._id.toString() })
    } else {
      navigation.navigate('departure')
    }
  }

  function fetchVehicleInUse() {
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

  function fetchHistory() {
    const response = history.filtered(
      "status = 'arrival' SORT(created_at DESC)",
    )
    console.log(response)
  }

  useEffect(() => {
    fetchVehicleInUse()
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())

    return () => realm.removeListener('change', fetchVehicleInUse)
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [history])

  return (
    <HomeContainer>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <HistoryCard
          data={{ created: '20/04', licensePlate: 'XXX1212', isSync: true }}
        />
      </Content>
    </HomeContainer>
  )
}
