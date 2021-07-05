import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { acClearPadColorValidErrors } from '../../redux/reducers/pad-color';
import { addPadColor } from '../../redux/actions/pad-color';

export const AddPadColorForm= () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()    

    const dispatch = useDispatch()

    const padColorValidErrors = useSelector(state => state.padColor.padColorValidErrors)
    const isLoading = useSelector(state => state.loading.isLoading)

    useEffect(() => {
        if (padColorValidErrors.shortName) setError("shortName", {message: padColorValidErrors.shortName})
        if (padColorValidErrors.fullName) setError("fullName", {message: padColorValidErrors.fullName})        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [padColorValidErrors])

    useEffect(() => {        
        return () => {
            dispatch(acClearPadColorValidErrors())
        }
    }, [dispatch])

    const onSubmit = (data, e) => {
        e.preventDefault()        
        dispatch(addPadColor(data))
    }
    return (
        <Wrapper>
            <Title>Добавление нового цвета накладки</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <FormItemTitle>Сокращение цвета:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("shortName", { required: "Введите сокращенное значение" })}
                            placeholder="Введите сокращенное значение"
                        />
                        {errors.shortName && <FormInputError>{errors.shortName.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Цвет:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("fullName", { required: "Введите цвет" })}
                            placeholder="Введите цвет"
                        />
                        {errors.fullName && <FormInputError>{errors.fullName.message}</FormInputError>}
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
