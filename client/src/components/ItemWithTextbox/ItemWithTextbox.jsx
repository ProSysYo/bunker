import React from 'react'

import styled from 'styled-components'

export const ItemWithTextbox = React.forwardRef(({title, placeholder, error, ...atrs}, ref) => { 
    return (
        <FormItem>
            <FormItemTitle>{title}</FormItemTitle>
            <FormItemInput>
                <InputText
                    {...atrs}
                    placeholder={placeholder}
                    ref={ref}
                />
                {error && <FormInputError>{error.message}</FormInputError>}
            </FormItemInput>
        </FormItem>
    )
})

const FormItem = styled.div`    
    position: relative;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`
const FormItemTitle = styled.label`    
    text-align: end;
    padding-right: 10px;
    font-size: 12px;
`

const FormItemInput = styled.div`    
    display: flex;
    flex-direction: row;
    align-items: center;  
`

const FormInputError = styled.p`
    position: absolute;
    margin-top:60px;
    font-size: 12px;
    color: lightcoral;
`
const InputText = styled.input.attrs(props => ({
    type: 'text'
}))`    
       
`