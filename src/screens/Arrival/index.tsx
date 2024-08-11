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

  return (
    <ArrivalContainer>
      <Header title="Chegada" />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{history?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{history?.description}</Description>

        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />

          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </ArrivalContainer>
  )
}
