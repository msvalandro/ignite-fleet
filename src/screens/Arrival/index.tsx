import { useRoute } from '@react-navigation/native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
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

  return (
    <ArrivalContainer>
      <Header title="Chegada" />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>XXX0000</LicensePlate>

        <Label>Finalidade</Label>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
          sed!
        </Description>

        <Footer>
          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </ArrivalContainer>
  )
}
