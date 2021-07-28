import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form";

import { addTypeCanvas } from '../../redux/actions/type-canvas';
import { typeCanvasActions } from '../../redux/reducers/type-canvas';

export const AddTypeCanvasForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()    

    const dispatch = useDispatch()

    const typeCanvasValidErrors = useSelector(state => state.typeCanvas.typeCanvasValidErrors)
    const isLoading = useSelector(state => state.loading.isLoading)

    useEffect(() => {
        if (typeCanvasValidErrors.value) setError("value", {message: typeCanvasValidErrors.value})
        if (typeCanvasValidErrors.description) setError("description", {message: typeCanvasValidErrors.description})
        if (typeCanvasValidErrors.trimOutside) setError("trimOutside", {message: typeCanvasValidErrors.trimOutside})
        if (typeCanvasValidErrors.trimInside) setError("trimInside", {message: typeCanvasValidErrors.trimInside})
        if (typeCanvasValidErrors.insulation) setError("insulation", {message: typeCanvasValidErrors.insulation})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeCanvasValidErrors])

    useEffect(() => {        
        return () => {
            dispatch(typeCanvasActions.clearErrors())
        }
    }, [dispatch])

    const onSubmit = (data, e) => {
        e.preventDefault()        
        dispatch(addTypeCanvas(data))
    }
    return (
        <Wrapper>
            <Title>Добавление нового типа полотна</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <FormItemTitle>Сокращенное значение:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("value", { required: "Введите сокращенное значение" })}
                            placeholder="Введите сокращенное значение"
                        />
                        {errors.value && <FormInputError>{errors.value.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Описание:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("description", { required: "Введите описание" })}
                            placeholder="Введите описание"
                        />
                        {errors.description && <FormInputError>{errors.description.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Отделка снаружи:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("trimOutside", { required: "Выберите тип отделки снаружи" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="металл">металл</option>
                            <option value="панель">панель</option>
                        </Select>
                        {errors.trimOutside && <FormInputError>{errors.trimOutside.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Отделка внутри:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("trimInside", { required: "Выберите тип отделки внутри" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="металл">металл</option>
                            <option value="панель">панель</option>
                        </Select>
                        {errors.trimInside && <FormInputError>{errors.trimInside.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Тип утеплителя:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("insulation", { required: "Выберите тип утеплителя" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="пенопласт">пенопласт</option>
                            <option value="базальт">базальт</option>
                        </Select>
                        {errors.insulation && <FormInputError>{errors.insulation.message}</FormInputError>}
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