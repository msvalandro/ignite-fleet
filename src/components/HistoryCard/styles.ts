import styled, { css } from 'styled-components/native'

export const HistoryCardContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 20px 16px;
  margin-bottom: 12px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 6px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Info = styled.View`
  flex: 1;
`

export const LicensePlate = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
  `}
`

export const Departure = styled.Text`
  margin-top: 4px;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XS}px;
    color: ${theme.COLORS.GRAY_200};
  `}
`
