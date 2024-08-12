import { Description, Info, Label, LocationInfoContainer } from './styles'

export interface LocationInfoProps {
  label: string
  description: string
}

export function LocationInfo({ label, description }: LocationInfoProps) {
  return (
    <LocationInfoContainer>
      <Info>
        <Label numberOfLines={1}>{label}</Label>

        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </LocationInfoContainer>
  )
}
