import { useNavigation, useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import { Alert } from 'react-native'
import { BSON } from 'realm'

import { Button } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Header } from '../../components/Header'
import { useObject, useRealm } from '../../libs/realm'
import { History } from '../../libs/realm/schemas/History'
import {
  ArrivalContainer,
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
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  const navigation = useNavigation()

  const history = useObject(History, new BSON.UUID(id) as unknown as string)
  const realm = useRealm()

  const title = history?.status === 'departure' ? 'Chegada' : 'Detalhes'

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(history)
    })

    navigation.goBack()
  }

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: removeVehicleUsage },
    ])
  }

  function handleArrivalRegister() {
    try {
      if (!history) {
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo.',
        )
      }

      realm.write(() => {
        history.status = 'arrival'
        history.updated_at = new Date()
      })

      Alert.alert('Chegada', 'Chegada registrada com sucesso!')

      navigation.goBack()
    } catch (error) {
      console.log(error)

      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo.')
    }
  }

  return (
    <ArrivalContainer>
      <Header title={title} />

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
    </ArrivalContainer>
  )
}
