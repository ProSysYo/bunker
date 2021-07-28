import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form"

import { updateCustomer } from '../../redux/actions/customer'
import { customerActions } from '../../redux/reducers/customer'

export const EditCustomerForm = () => {    
    const { register, handleSubmit, setError, formState: { errors } } = useForm()

    const dispatch = useDispatch()    

    const customer = useSelector(state => state.customer.customer)
    const customerValidateErrors = useSelector(state => state.customer.customerValidateErrors)
    const isLoading = useSelector(state => state.loading.isLoading)    

    useEffect(() => {
        if (customerValidateErrors.code) setError("code", {message: customerValidateErrors.code})
        if (customerValidateErrors.name) setError("name", {message: customerValidateErrors.name})
        if (customerValidateErrors.phone) setError("phone", {message: customerValidateErrors.phone})
        if (customerValidateErrors.email) setError("email", {message: customerValidateErrors.email})
        if (customerValidateErrors.adress) setError("adress", {message: customerValidateErrors.adress})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerValidateErrors])

    useEffect(() => {
        return () => {
            dispatch(customerActions.clearErrors())            
        }
    }, [dispatch])

    const onSubmit = (data, e) => {
        e.preventDefault()        

        dispatch(updateCustomer(customer._id, data))
    }
    return (
        <Wrapper>
            <Title>Редактирование заказчика</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <FormItemTitle>Код:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("code", { required: "Введите код заказчика" })}
                            placeholder="Введите код заказчика"
                            defaultValue={customer.code}
                        />
                        {errors.code && <FormInputError>{errors.code.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Имя:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("name", { required: "Введите имя заказчика" })}
                            placeholder="Введите имя заказчика"
                            defaultValue={customer.name}
                        />
                        {errors.name && <FormInputError>{errors.name.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Телефон:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("phone", { required: "Введите телефон заказчика" })}
                            placeholder="Введите телефон заказчика"
                            defaultValue={customer.phone}
                        />
                        {errors.phone && <FormInputError>{errors.phone.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Email:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("email", { required: "Введите email заказчика" })}
                            placeholder="Введите email заказчика"
                            defaultValue={customer.email}
                        />
                        {errors.email && <FormInputError>{errors.email.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Адрес:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("adress", { required: "Введите адрес заказчика" })}
                            placeholder="Введите адрес заказчика"
                            defaultValue={customer.adress}
                        />
                        {errors.adress && <FormInputError>{errors.adress.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <button disabled={isLoading} type="submit">Изменить</button>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;     
    flex-wrap: wrap; 
`
const Title = styled.h2`
    text-align: center;    
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: 90%;
`
const FormItem = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const FormItemTitle = styled.label`
    width: 30%;
    text-align: end;
    padding-right: 10px;
`
const FormItemInput = styled.div`
    width: 70%;    
`

const FormInputError = styled.p`
    position: absolute;
    font-size: 12px;
    color: lightcoral;
`
const InputText = styled.input.attrs(props => ({
    type: 'text'    
}))`
    width: 100%; 
`