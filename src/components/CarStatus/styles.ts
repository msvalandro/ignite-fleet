import styled, { css } from 'styled-components/native'

export const CarStatusContainer = styled.View`
  width: 100%;
  margin: 32px 0;
  padding: 22px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 6px;

  flex-direction: row;
  align-items: center;
`

export const IconBox = styled.View`
  height: 77px;
  width: 77px;
  margin-right: 12px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  border-radius: 6px;

  justify-content: center;
  align-items: center;
`

export const Message = styled.Text`
  flex: 1;
  text-align: justify;
  textalignvertical: center;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_100};
  `};
`

export const Highlight = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.BRAND_LIGHT};
  `};
`
