import styled, { css } from 'styled-components/native'

export type SizeProps = 'SMALL' | 'NORMAL'

interface IconBoxContainerProps {
  size: SizeProps
}

const variantSizeStyles = (size: SizeProps) =>
  ({
    SMALL: css`
      height: 32px;
      width: 32px;
    `,
    NORMAL: css`
      height: 46px;
      width: 46px;
    `,
  })[size]

export const IconBoxContainer = styled.View<IconBoxContainerProps>`
  margin-right: 12px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 6px;

  justify-content: center;
  align-items: center;

  ${({ size }) => variantSizeStyles(size)}
`
