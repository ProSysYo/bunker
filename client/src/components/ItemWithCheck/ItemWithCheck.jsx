import React from 'react'

import styled from 'styled-components'

export const ItemWithCheck = React.forwardRef(({title, ...atrs}, ref) => { 
    return (
        <FormItem>
            <FormItemTitle>{title}</FormItemTitle>
            <FormItemInput>
                <InputChecbox {...atrs} ref= {ref}/>                
            </FormItemInput>
        </FormItem>
    )
})

const FormItem = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;    
`
const FormItemTitle = styled.label`
    width: 40%;
    text-align: end;
    padding-right: 10px;
    font-size: 12px;
`

const FormItemInput = styled.div`
    width: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;  
`
const InputChecbox = styled.input.attrs(props => ({
    type: 'checkbox'    
}))`
    display: block;
    border-radius: 3px;    
`