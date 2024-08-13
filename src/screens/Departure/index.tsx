import { useNavigation } from '@react-navigation/native'
import { useUser } from '@realm/react'
import {
  LocationAccuracy,
  LocationObject,
  LocationObjectCoords,
  LocationSubscription,
  requestBackgroundPermissionsAsync,
  useForegroundPermissions,
  watchPositionAsync,
} from 'expo-location'
import { Car } from 'phosphor-react-native'
import { useEffect, useRef, useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { Loading } from '../../components/Loading'
import { LocationInfo } from '../../components/LocationInfo'
import { Map } from '../../components/Map'
import { TextAreaInput } from '../../components/TextAreaInput'
import { useRealm } from '../../libs/realm'
import { History } from '../../libs/realm/schemas/History'
import { startLocationTask } from '../../tasks/backgroundLocationTask'
import { getAddressLocation } from '../../utils/getAddressLocation'
import { licensePlateValidate } from '../../utils/licensePlateValidate'
import { openSettings } from '../../utils/openSettings'
import { Content, DepartureContainer, Message, MessageContent } from './styles'

const keyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position'

export function Departure() {
  const [licensePlate, setLicensePlate] = useState('')
  const [description, setDescription] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const [currentAddress, setCurrentAddress] = useState<string | null>(null)
  const [currentCoordinates, setCurrentCoordinates] =
    useState<LocationObjectCoords | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)

  const user = useUser()
  const realm = useRealm()

  const navigation = useNavigation()

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions()

  const licensePlateRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)

  async function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()

        return Alert.alert(
          'Placa inválida',
          'A placa é inválida. Por favor, informe a placa correta do veículo.',
        )
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus()

        return Alert.alert(
          'Finalidade',
          'Por favor, informe a finalidade da utilização do veículo.',
        )
      }

      if (!currentCoordinates?.latitude && !currentCoordinates?.longitude) {
        return Alert.alert(
          'Localização',
          'Não foi possível obter a localização atual. Tente novamente!',
          [{ text: 'Abrir configurações', onPress: openSettings }],
        )
      }

      setIsRegistering(true)

      const backgroundPermissions = await requestBackgroundPermissionsAsync()

      if (!backgroundPermissions.granted) {
        setIsRegistering(false)

        return Alert.alert(
          'Localização',
          'É necessário permitir que o App tenha acesso a localização em segundo plano.',
        )
      }

      await startLocationTask()

      realm.write(() => {
        realm.create(
          'History',
          History.generate({
            user_id: user!.id,
            license_plate: licensePlate.toUpperCase(),
            description,
            coords: [
              {
                latitude: currentCoordinates.latitude,
                longitude: currentCoordinates.longitude,
                timestamp: new Date().getTime(),
              },
            ],
          }),
        )
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso.')

      navigation.goBack()
    } catch (error) {
      console.log(error)

      Alert.alert('Erro', 'Não foi possível registrar a saída do veículo.')

      setIsRegistering(false)
    }
  }

  async function fetchLocationData(location: LocationObject) {
    try {
      setCurrentCoordinates(location.coords)

      const address = await getAddressLocation(location.coords)

      if (address) {
        setCurrentAddress(address)
      }
    } finally {
      setIsLoadingLocation(false)
    }
  }

  useEffect(() => {
    requestLocationForegroundPermission()
  }, [])

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return
    }

    let subscription: LocationSubscription

    watchPositionAsync(
      { accuracy: LocationAccuracy.High, timeInterval: 1000 },
      fetchLocationData,
    ).then((response) => (subscription = response))

    return () => {
      subscription?.remove()
    }
  }, [locationForegroundPermission?.granted])

  if (!locationForegroundPermission?.granted) {
    return (
      <DepartureContainer>
        <Header title="Saída" />

        <MessageContent>
          <Message>
            Você precisa permitir que o aplicativo tenha acesso a localização
            para utilizar essa funcionalidade. Por favor, acesse as
            configurações do seu dispositivo para conceder essa permissão ao
            aplicativo.
          </Message>

          <Button title="Abrir configurações" onPress={openSettings} />
        </MessageContent>
      </DepartureContainer>
    )
  }

  if (isLoadingLocation) {
    return <Loading />
  }

  return (
    <DepartureContainer>
      <Header title="Saída" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={keyboardAvoidingViewBehavior}
      >
        <ScrollView>
          {currentCoordinates && <Map coordinates={[currentCoordinates]} />}

          <Content>
            {currentAddress && (
              <LocationInfo
                label="Localização atual"
                description={currentAddress}
                icon={Car}
              />
            )}

            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button
              title="Registrar Saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </DepartureContainer>
  )
}
