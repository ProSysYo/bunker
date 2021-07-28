import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form";

export const AddOrderForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    const errorsValidate = useSelector(state => state.packaging.errors)
    const isLoading = useSelector(state => state.loading.isLoading)

    useEffect(() => {
        if (errorsValidate.customer) setError("customer", { message: errorsValidate.customer })
        if (errorsValidate.typeCanvas) setError("typeCanvas", { message: errorsValidate.typeCanvas })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsValidate])

    useEffect(() => {
        return () => {
            
        }
    }, [dispatch])

    const onSubmit = (data, e) => {
        e.preventDefault()
        
    }
    return (
        <Wrapper>
            <Title>Добавление новой упаковки</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <FormItemTitle>Заказчик:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("customer", { required: "Выберите заказчика" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="металл">D001</option>
                            <option value="панель">D002</option>
                        </Select>
                        {errors.customer && <FormInputError>{errors.customer.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Модель полотна:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("typeCanvas", { required: "Выберите модель полотна" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="металл">металл-металл</option>
                            <option value="панель">панель-панель</option>
                        </Select>
                        {errors.typeCanvas && <FormInputError>{errors.typeCanvas.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <button disabled={isLoading} type="submit">Добавить</button>
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
const Select = styled.select`
    outline: none;
    border: 1px solid rgb(159, 212, 243);
    font-size: 14px;
    padding: 5px 10px 5px 10px;    
    width: 100%;
`