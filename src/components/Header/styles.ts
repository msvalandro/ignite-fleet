import styled, { css } from 'styled-components/native'

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 0 32px 24px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  flex-direction: row;
  justify-content: space-between;

  z-index: 1;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XL}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`
