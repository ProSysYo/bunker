import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form"

import { addModelDoor } from '../../redux/actions/model-door'

import { acSetMessage } from '../../redux/reducers/message'
import { acClearModelDoorValidErrors } from '../../redux/reducers/model-door'

export const AddModelDoorForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()
    const dispatch = useDispatch()    

    const modelDoorValidErrors = useSelector(state => state.modelDoor.modelDoorValidErrors)
    const isLoading = useSelector(state => state.loading.isLoading)    

    useEffect(() => {
        if (modelDoorValidErrors.abbreviation) setError("abbreviation", {message: modelDoorValidErrors.abbreviation})
        if (modelDoorValidErrors.name) setError("name", {message: modelDoorValidErrors.name})
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelDoorValidErrors])

    useEffect(() => {
        return () => {
            dispatch(acClearModelDoorValidErrors())            
        }
    }, [dispatch])

    const onSubmit = (data, e) => {
        e.preventDefault()
        if (!data.abbreviation || !data.name) {
            return dispatch(acSetMessage("Не все поля заполнены"))            
        }
        dispatch(addModelDoor(data.abbreviation, data.name))
    }
    return (
        <Wrapper>
            <Title>Добавление новой модели</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <FormItemTitle>Сокращение:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("abbreviation", { required: "Введите сокращение модели" })}                          
                            placeholder="Введите сокращение модели"
                        />
                        {errors.abbreviation && <FormInputError>{errors.abbreviation.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Наименование:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("name", { required: "Введите наименование модели" })}                        
                            placeholder="Введите наименование модели"
                        />
                        {errors.name && <FormInputError>{errors.name.message}</FormInputError>}
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