import { Car, Key } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { CarStatusContainer, Highlight, IconBox, Message } from './styles'

interface CarStatusProps {
  licensePlate?: string
}

export function CarStatus({ licensePlate }: CarStatusProps) {
  const { COLORS } = useTheme()

  const Icon = licensePlate ? Key : Car
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : 'Nenhum veículo em uso. '
  const status = licensePlate ? 'chegada' : 'saída'

  return (
    <CarStatusContainer>
      <IconBox>
        <Icon size={32} color={COLORS.BRAND_LIGHT} />
      </IconBox>

      <Message>
        {message}

        <Highlight>Clique aqui para registrar a {status}</Highlight>
      </Message>
    </CarStatusContainer>
  )
}
