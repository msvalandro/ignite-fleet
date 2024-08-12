import { Dimensions } from 'react-native'
import styled, { css } from 'styled-components/native'

const { width } = Dimensions.get('window')

export const TopMessageContainer = styled.View`
  width: ${width}px;
  padding-bottom: 5px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};

  position: absolute;
  z-index: 1;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  margin-left: 4px;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`
