import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { peepholeLocationActions } from '../../redux/reducers/peephole-location';
import { updatePeepholeLocation } from '../../redux/actions/peephole-location';

export const EditPeepholeLocationForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    const errorsValidate = useSelector(state => state.peepholeLocation.errors)
    const isLoading = useSelector(state => state.loading.isLoading)
    const peepholeLocation = useSelector(state => state.peepholeLocation.peepholeLocation)

    useEffect(() => {
        if (errorsValidate.name) setError("name", { message: errorsValidate.name })        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsValidate])

    useEffect(() => {
        return () => {
            dispatch(peepholeLocationActions.clearErrors())
        }
    }, [dispatch])

    const onSubmit = (data, e) => {
        e.preventDefault()
        dispatch(updatePeepholeLocation(peepholeLocation._id, data))
    }
    return (
        <Wrapper>
            <Title>Изменение расположения цилиндра</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <FormItemTitle>Наименование:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("name", { required: "Введите наименование" })}
                            placeholder="Введите наименование"
                            defaultValue={peepholeLocation.name}
                        />
                        {errors.name && <FormInputError>{errors.name.message}</FormInputError>}
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