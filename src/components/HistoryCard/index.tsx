import { Check, ClockClockwise } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Departure, HistoryCardContainer, Info, LicensePlate } from './styles'

export interface IHistoryCard {
  id: string
  licensePlate: string
  created: string
  isSync: boolean
}
interface HistoryCardProps extends TouchableOpacityProps {
  data: IHistoryCard
}

export function HistoryCard({ data, ...rest }: HistoryCardProps) {
  const { COLORS } = useTheme()

  return (
    <HistoryCardContainer activeOpacity={0.7} {...rest}>
      <Info>
        <LicensePlate>{data.licensePlate}</LicensePlate>

        <Departure>{data.created}</Departure>
      </Info>

      {data.isSync ? (
        <Check size={24} color={COLORS.BRAND_LIGHT} />
      ) : (
        <ClockClockwise size={24} color={COLORS.GRAY_400} />
      )}
    </HistoryCardContainer>
  )
}
