import React from 'react'
import { LinkProps } from './link.types'
import * as S from './link.style'

export const Link: React.FC<LinkProps> = ({ to, children }) => {
    return <S.StyledLink {...{ to }}>{children}</S.StyledLink>
}
