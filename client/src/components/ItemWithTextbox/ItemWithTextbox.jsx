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
    width: 100%;
    position: relative;
    margin-bottom: 25px;
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

const FormInputError = styled.p`
    position: absolute;
    margin-top:65px;
    font-size: 12px;
    color: lightcoral;
`
const InputText = styled.input.attrs(props => ({
    type: 'text'
}))`    
       
`