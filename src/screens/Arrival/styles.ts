import styled, { css } from 'styled-components/native'

export const ArrivalContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const Content = styled.View`
  flex-grow: 1;
  padding: 32px;
`

export const Label = styled.Text`
  margin-top: 32px;
  margin-bottom: 5px;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_300};
  `}
`

export const LicensePlate = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XXXL}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`

export const Description = styled.Text`
  text-align: justify;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`

export const Footer = styled.View`
  width: 100%;
  margin-top: 32px;

  flex-direction: row;
  gap: 16px;
`
