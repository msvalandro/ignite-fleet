import styled, { css } from 'styled-components/native'

export const SignInContainer = styled.ImageBackground`
  padding: 52px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_800};

  flex: 1;
  justify-content: center;
`

export const Title = styled.Text`
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XXXL}px;
    color: ${theme.COLORS.BRAND_LIGHT};
  `}
`

export const Slogan = styled.Text`
  margin-bottom: 32px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`
