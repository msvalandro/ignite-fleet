import { useNavigation } from '@react-navigation/native'
import { useUser } from '@realm/react'
import dayjs from 'dayjs'
import { CloudArrowUp } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import Toast from 'react-native-toast-message'

import { CarStatus } from '../../components/CarStatus'
import { HistoryCard, IHistoryCard } from '../../components/HistoryCard'
import { HomeHeader } from '../../components/HomeHeader'
import { TopMessage } from '../../components/TopMessage'
import {
  getLastSyncTimestamp,
  saveLastSyncTimestamp,
} from '../../libs/async-storage/syncStorage'
import { useQuery, useRealm } from '../../libs/realm'
import { History } from '../../libs/realm/schemas/History'
import { Content, HomeContainer, Label, Title } from './styles'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null)
  const [vehicleHistory, setVehicleHistory] = useState<IHistoryCard[]>([])

  const [percentageToSync, setPercentageToSync] = useState<string | null>(null)

  const navigation = useNavigation()

  const history = useQuery(History)
  const realm = useRealm()
  const user = useUser()

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

  async function fetchHistory() {
    try {
      const response = history.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      )

      const lastSync = await getLastSyncTimestamp()

      const formattedHistory = response.map((item) => ({
        id: item._id.toString(),
        licensePlate: item.license_plate,
        created: dayjs(item.created_at).format(
          '[Saída em] DD/MM/YYYY [às] HH:mm',
        ),
        isSync: lastSync > item.updated_at.getTime(),
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

  async function progressNotification(
    transferred: number,
    transferable: number,
  ) {
    const percentage = (Number(transferred) / Number(transferable)) * 100

    if (percentage === 100) {
      await saveLastSyncTimestamp()
      await fetchHistory()

      setPercentageToSync(null)

      Toast.show({ type: 'info', text1: 'Todos os dados estão sincronizados.' })
    }

    if (percentage < 100) {
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`)
    }
  }

  useEffect(() => {
    fetchVehicleInUse()
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse)
      }
    }
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [history])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historyByUserQuery = realm
        .objects('History')
        .filtered(`user_id = '${user.id}'`)

      mutableSubs.add(historyByUserQuery, { name: 'history_by_user' })
    })
  }, [realm])

  useEffect(() => {
    const syncSession = realm.syncSession

    if (!syncSession) {
      return
    }

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification,
    )

    return () => {
      syncSession.removeProgressNotification(progressNotification)
    }
  }, [])

  return (
    <HomeContainer>
      {percentageToSync && (
        <TopMessage title={percentageToSync} icon={CloudArrowUp} />
      )}

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
