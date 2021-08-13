import React from 'react'

import styled from 'styled-components'

export const ItemBasket = ({title, value}) => { 
    return (
        <div>
            <Item value={value}>{title}: </Item><label>{value}</label>
        </div>
    )
}

const Item = styled.label`
    transition: 0.5s linear;
    ${({ value }) => !value && `
        color: #7775f1;    
    `}
  `;