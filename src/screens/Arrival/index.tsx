import { useNavigation, useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { LatLng } from 'react-native-maps'
import { BSON } from 'realm'

import { Button } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Header } from '../../components/Header'
import { Map } from '../../components/Map'
import { getStorageLocation } from '../../libs/async-storage/locationStorage'
import { getLastSyncTimestamp } from '../../libs/async-storage/syncStorage'
import { useObject, useRealm } from '../../libs/realm'
import { History } from '../../libs/realm/schemas/History'
import { stopLocationTask } from '../../tasks/backgroundLocationTask'
import {
  ArrivalContainer,
  AsyncMessage,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'

interface RouteParamsProps {
  id: string
}

export function Arrival() {
  const [dataNotSync, setDataNotSync] = useState(false)
  const [coordinates, setCoordinates] = useState<LatLng[]>([])

  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  const navigation = useNavigation()

  const history = useObject(History, new BSON.UUID(id) as unknown as string)
  const realm = useRealm()

  const title = history?.status === 'departure' ? 'Chegada' : 'Detalhes'

  async function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(history)
    })

    await stopLocationTask()

    navigation.goBack()
  }

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: removeVehicleUsage },
    ])
  }

  async function handleArrivalRegister() {
    try {
      if (!history) {
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo.',
        )
      }

      const locations = await getStorageLocation()

      realm.write(() => {
        history.status = 'arrival'
        history.updated_at = new Date()
        history.coords.push(...locations)
      })

      await stopLocationTask()

      Alert.alert('Chegada', 'Chegada registrada com sucesso!')

      navigation.goBack()
    } catch (error) {
      console.log(error)

      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo.')
    }
  }

  async function updateSyncData() {
    if (!history) {
      return
    }

    const lastSync = await getLastSyncTimestamp()

    setDataNotSync(history.updated_at.getTime() > lastSync)

    const locationsStorage = await getStorageLocation()

    setCoordinates(locationsStorage)
  }

  useEffect(() => {
    updateSyncData()
  }, [])

  return (
    <ArrivalContainer>
      <Header title={title} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{history?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{history?.description}</Description>
      </Content>

      {history?.status === 'departure' && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />

          <Button title="Registrar Chegada" onPress={handleArrivalRegister} />
        </Footer>
      )}

      {dataNotSync && (
        <AsyncMessage>
          Sincroniazação da{' '}
          {history?.status === 'departure' ? 'partida' : 'chegada'} pendente
        </AsyncMessage>
      )}
    </ArrivalContainer>
  )
}
