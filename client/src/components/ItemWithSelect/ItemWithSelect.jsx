import React from 'react'

import styled from 'styled-components'

export const ItemWithSelect = React.forwardRef(({ title, error, items, optionValue, optionName, defaultValue, ...atrs }, ref) => {

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
                    {items.length > 0 && items.map((item, index) => {
                        return <option
                            key={item._id ? item._id : index}
                            value={optionValue ? item[optionValue] : item}
                        >
                            {optionName ? item[optionName] : item}
                        </option>
                    })}
                </Select>
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
`
const FormItemTitle = styled.label`    
    text-align: start;
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
const Select = styled.select`
    outline: none;
    border: 1px solid rgb(159, 212, 243);
    font-size: 14px;
    padding: 5px 10px 5px 10px;    
    width: 100%;
`