import { TextInput } from 'react-native'
import styled, { css } from 'styled-components/native'

export const LicensePlateInputContainer = styled.View`
  width: 100%;
  padding: 16px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 6px;
`

export const Label = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_300};
  `}
`

export const Input = styled(TextInput)`
  margin-top: 16px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XXXL}px;
    color: ${theme.COLORS.GRAY_200};
  `}
`
