import React from 'react'

import styled from 'styled-components'

export const ItemWithSelect = React.forwardRef(({title, error, items, optionValue, optionName, defaultValue, ...atrs}, ref) => { 
    return (
        <FormItem>
            <FormItemTitle>{title}</FormItemTitle>
            <FormItemInput>
                <Select
                    {...atrs}
                    defaultValue={defaultValue ? defaultValue : ""}
                    ref={ref}
                >
                    <option disabled value=""> --выберите из списка-- </option>
                    {items.length>0 && items.map((item, index) => <option key={item._id ? item._id : index} value={item[optionValue]}>{item[optionName]}</option>)}
                </Select>
                {error && <FormInputError>{error.message}</FormInputError>}
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

const FormInputError = styled.p`
    position: absolute;
    margin-top:60px;
    font-size: 12px;
    color: lightcoral;
`
const Select = styled.select`
    outline: none;
    border: 1px solid rgb(159, 212, 243);
    font-size: 14px;
    padding: 5px 10px 5px 10px;    
    width: 100%;
`