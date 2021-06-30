import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form";

import { acClearLockValidErrors } from '../../redux/reducers/lock'

import { acSetMessage } from '../../redux/reducers/message'
import { updateLock } from '../../redux/actions/lock';

export const EditLockForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()    

    const dispatch = useDispatch()

    const lockValidErrors = useSelector(state => state.lock.lockValidErrors)
    const isLoading = useSelector(state => state.loading.isLoading)
    const lock = useSelector(state => state.lock.lock)

    useEffect(() => {
        if (lockValidErrors.name) setError("name", {message: lockValidErrors.name})
        if (lockValidErrors.type) setError("type", {message: lockValidErrors.type})
        if (lockValidErrors.isLatch) setError("isLatch", {message: lockValidErrors.isLatch})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lockValidErrors])

    useEffect(() => {
        dispatch(acClearLockValidErrors())
        return () => {
            dispatch(acClearLockValidErrors())
        }
    }, [dispatch])

    const onSubmit = (data, e) => {
        e.preventDefault()
        if (!data.name || !data.type) {
            return dispatch(acSetMessage("Не все поля заполнены"))
        }
        const updatedLok = {
            id: lock._id,
            name: data.name,
            type: data.type,
            isLatch: data.isLatch     
        }

        dispatch(updateLock(updatedLok.id, updatedLok))
    }
    return (
        <Wrapper>
            <Title>Добавление нового замка</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <FormItemTitle>Наименование:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("name", { required: "Введите наименование замка" })}
                            defaultValue={lock.name}
                            placeholder="Введите наименование замка"
                        />
                        {errors.name && <FormInputError>{errors.name.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Тип:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("type", { required: "Выберите тип замка" })}
                            defaultValue={lock.type}                        
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            <option value="Основной">Основной</option>
                            <option value="Дополнительный">Дополнительный</option>
                            <option value="Двухсистемный">Двухсистемный</option>
                        </Select>
                        {errors.type && <FormInputError>{errors.type.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Засов:</FormItemTitle>
                    <FormItemInput>
                        <InputChecbox
                            {...register("isLatch")}
                            defaultChecked={lock.isLatch}                         
                        />
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

const InputChecbox = styled.input.attrs(props => ({
    type: 'checkbox'    
}))`
    display: block;
    border-radius: 3px;    
`

const Select = styled.select`
    outline: none;
    border: 1px solid rgb(159, 212, 243);
    font-size: 14px;
    padding: 5px 10px 5px 10px;    
    width: 100%;
`