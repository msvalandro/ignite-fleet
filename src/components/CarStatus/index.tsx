import { Car, Key } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { CarStatusContainer, Highlight, IconBox, Message } from './styles'

interface CarStatusProps extends TouchableOpacityProps {
  licensePlate?: string
}

export function CarStatus({ licensePlate, ...rest }: CarStatusProps) {
  const { COLORS } = useTheme()

  const Icon = licensePlate ? Car : Key
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : 'Nenhum veículo em uso. '
  const status = licensePlate ? 'chegada' : 'saída'

  return (
    <CarStatusContainer {...rest}>
      <IconBox>
        <Icon size={52} color={COLORS.BRAND_LIGHT} />
      </IconBox>

      <Message>
        {message}

        <Highlight>Clique aqui para registrar a {status}</Highlight>
      </Message>
    </CarStatusContainer>
  )
}
