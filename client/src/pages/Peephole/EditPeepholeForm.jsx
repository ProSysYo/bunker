import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { peepholeActions } from '../../redux/reducers/peephole';
import { updatePeephole } from '../../redux/actions/peephole';

export const EditPeepholeForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    const errorsValidate = useSelector(state => state.peephole.errors)
    const isLoading = useSelector(state => state.loading.isLoading)
    const peephole = useSelector(state => state.peephole.peephole)

    useEffect(() => {
        if (errorsValidate.name) setError("name", { message: errorsValidate.name })
        if (errorsValidate.type) setError("type", { message: errorsValidate.type })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsValidate])

    useEffect(() => {
        return () => {
            dispatch(peepholeActions.clearErrors())
        }
    }, [dispatch])

    const onSubmit = (data, e) => {
        e.preventDefault()
        dispatch(updatePeephole(peephole._id, data))
    }
    return (
        <Wrapper>
            <Title>Изменение глазка</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <FormItemTitle>Наименование:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("name", { required: "Введите наименование" })}
                            placeholder="Введите наименование"
                            defaultValue={peephole.name}
                        />
                        {errors.name && <FormInputError>{errors.name.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Оригинальное название:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("originalName", { required: "Введите оригинальное название" })}
                            placeholder="Введите оригинальное наименование"
                            defaultValue={peephole.originalName}
                        />
                        {errors.originalName && <FormInputError>{errors.originalName.message}</FormInputError>}
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