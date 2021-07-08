import React from 'react'
import styled from 'styled-components'

export const Home = () => {
    return (
        <>
        <Title>Исправления, которые необходимо внести</Title>
          <ul>
            <li>1. Исправить в замках Цилиндр на цилиндр</li>
            <li>2. В засовах убрать поле type</li>
            <li>3. Добавить поля с оригинальными названиями: Замки, засовы, накладки</li>
          </ul>
        </>
    )
}

const Title = styled.h2`    
    text-align: center;    
`
