import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import { Content, DepartureContainer } from './styles'

export function Departure() {
  return (
    <DepartureContainer>
      <Header title="Saída" />

      <Content>
        <LicensePlateInput label="Placa do veículo" placeholder="BRA1234" />

        <TextAreaInput
          label="Finalidade"
          placeholder="Vou utilizar o veículo para..."
        />

        <Button title="Registrar Saída" />
      </Content>
    </DepartureContainer>
  )
}
