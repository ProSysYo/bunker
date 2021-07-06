import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { coverActions } from '../../redux/reducers/cover';
import { addCover } from '../../redux/actions/cover';

export const AddCoverForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    const errorsValidate = useSelector(state => state.cover.errors)
    const isLoading = useSelector(state => state.loading.isLoading)

    useEffect(() => {
        if (errorsValidate.name) setError("name", { message: errorsValidate.name })
        if (errorsValidate.type) setError("type", { message: errorsValidate.type })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsValidate])

    useEffect(() => {
        return () => {
            dispatch(coverActions.clearErrors())
        }
    }, [dispatch])

    const onSubmit = (data, e) => {
        e.preventDefault()
        dispatch(addCover(data))
    }
    return (
        <Wrapper>
            <Title>Добавление новой накладки</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <FormItemTitle>Наименование:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("name", { required: "Введите наименование накладки" })}
                            placeholder="Введите наименование накладки"
                        />
                        {errors.name && <FormInputError>{errors.name.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Тип засова:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("type", { required: "Выберите тип накладки" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            <option value="цилиндр">цилиндр</option>
                            <option value="сувальда">сувальда</option>
                            
                        </Select>
                        {errors.type && <FormInputError>{errors.type.message}</FormInputError>}
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