import { Car, FlagCheckered } from 'phosphor-react-native'

import { ILocationInfo, LocationInfo } from '../LocationInfo'
import { Line, LocationsContainer } from './styles'

interface LocationsProps {
  departure: ILocationInfo
  arrival: ILocationInfo
}

export function Locations({ departure, arrival }: LocationsProps) {
  return (
    <LocationsContainer>
      <LocationInfo
        icon={Car}
        label={departure.label}
        description={departure.description}
      />

      <Line />

      <LocationInfo
        icon={FlagCheckered}
        label={arrival.label}
        description={arrival.description}
      />
    </LocationsContainer>
  )
}
