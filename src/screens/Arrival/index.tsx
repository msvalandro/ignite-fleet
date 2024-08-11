import { useRoute } from '@react-navigation/native'

import { ArrivalContainer } from './styles'

interface RouteParamsProps {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  return <ArrivalContainer></ArrivalContainer>
}
