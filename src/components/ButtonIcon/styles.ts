import styled from 'styled-components/native'

export const ButtonIconContainer = styled.TouchableOpacity`
  height: 56px;
  width: 56px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  border-radius: 6px;

  align-items: center;
  justify-content: center;
`
