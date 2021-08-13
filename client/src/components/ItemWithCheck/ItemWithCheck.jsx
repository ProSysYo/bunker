import React from 'react'

import styled from 'styled-components'

export const ItemWithCheck = React.forwardRef(({title, ...atrs}, ref) => { 
    return (
        <FormItem>            
            <FormItemInput>
                <InputChecbox {...atrs} ref= {ref}/>                
            </FormItemInput>
            <FormItemTitle>{title}</FormItemTitle>
        </FormItem>
    )
})

const FormItem = styled.div`    
    position: relative;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
       
`
const FormItemTitle = styled.label`    
    text-align: end;
    padding-left: 10px;
    font-size: 12px;
`

const FormItemInput = styled.div`    
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