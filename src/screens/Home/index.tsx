import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'

import { CarStatus } from '../../components/CarStatus'
import { HistoryCard, IHistoryCard } from '../../components/HistoryCard'
import { HomeHeader } from '../../components/HomeHeader'
import { useQuery, useRealm } from '../../libs/realm'
import { History } from '../../libs/realm/schemas/History'
import { Content, HomeContainer, Label, Title } from './styles'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null)
  const [vehicleHistory, setVehicleHistory] = useState<IHistoryCard[]>([])

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
    try {
      const response = history.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      )

      const formattedHistory = response.map((item) => ({
        id: item._id.toString(),
        licensePlate: item.license_plate,
        created: dayjs(item.created_at).format(
          '[Saída em] DD/MM/YYYY [às] HH:mm',
        ),
        isSync: false,
      }))

      setVehicleHistory(formattedHistory)
    } catch (error) {
      console.log(error)

      Alert.alert('Histórico', 'Não foi possível carregar o histórico.')
    }
  }

  function handleHistoryDetails(id: string) {
    navigation.navigate('arrival', { id })
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

        <Title>Histórico</Title>

        <FlatList
          data={vehicleHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoryCard
              data={item}
              onPress={() => handleHistoryDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Label>Nenhum veículo utilizado</Label>}
        />
      </Content>
    </HomeContainer>
  )
}
