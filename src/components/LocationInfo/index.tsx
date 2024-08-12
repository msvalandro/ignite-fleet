import { IconBox, IIconBox } from '../IconBox'
import { Description, Info, Label, LocationInfoContainer } from './styles'

export interface ILocationInfo {
  label: string
  description: string
}

interface LocationInfoProps extends ILocationInfo {
  icon: IIconBox
}

export function LocationInfo({ label, description, icon }: LocationInfoProps) {
  return (
    <LocationInfoContainer>
      <IconBox icon={icon} />

      <Info>
        <Label numberOfLines={1}>{label}</Label>

        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </LocationInfoContainer>
  )
}
