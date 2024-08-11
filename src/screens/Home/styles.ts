import styled, { css } from 'styled-components/native'

export const HomeContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const Content = styled.View`
  padding: 32px;
  flex: 1;
`

export const Title = styled.Text`
  margin-bottom: 12px;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
  `}
`

export const Label = styled.Text`
  margin-top: 32px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_400};
  `}
`
