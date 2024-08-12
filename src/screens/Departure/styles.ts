import styled, { css } from 'styled-components/native'

export const DepartureContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const Content = styled.View`
  padding: 32px;
  margin-top: 16px;

  flex: 1;
  gap: 16px;
`

export const Message = styled.Text`
  margin: 24px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.WHITE};
  `}
`
