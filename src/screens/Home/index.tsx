import { CarStatus } from '../../components/CarStatus'
import { Header } from '../../components/Header'
import { Content, HomeContainer } from './styles'

export function Home() {
  return (
    <HomeContainer>
      <Header />

      <Content>
        <CarStatus />
      </Content>
    </HomeContainer>
  )
}
