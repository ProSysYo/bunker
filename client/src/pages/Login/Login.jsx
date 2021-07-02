import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useForm } from "react-hook-form"

import { login } from '../../redux/actions/auth'
import { acClearLoginValidateErrors } from '../../redux/reducers/auth'

export const Login = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm({mode: 'onBlur'})

    const dispatch = useDispatch()
    const loginValidateErrors = useSelector(state => state.auth.loginValidateErrors)
    const isLoading = useSelector(state => state.loading.isLoading)

    useEffect(() => {
        return () => {
            dispatch(acClearLoginValidateErrors())
        }
    }, [dispatch])

    useEffect(() => {
        if (loginValidateErrors.username) setError("username", {message: loginValidateErrors.username})
        if (loginValidateErrors.password) setError("password", {message: loginValidateErrors.password})        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginValidateErrors])

    const onSubmit = (data, e) => {
        e.preventDefault()
        dispatch(login(data.username, data.password))
    }

    return (
        <Wrapper>
            <Title>Вход в аккаунт</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <InputText
                        {...register("username", { required: "Введите имя пользователя" })}
                        placeholder="Введите пользователя"
                    />
                    {errors.username && <FormInputError>{errors.username.message}</FormInputError>}
                </FormItem>
                <FormItem>
                    <InputPassword
                        {...register("password", { required: "Введите пароль" })}
                        placeholder="Введите пароль"
                    />
                    {errors.password && <FormInputError>{errors.password.message}</FormInputError>}
                </FormItem>

                <button disabled={isLoading} type="submit">Войти</button>
                <FormLink to="/registration">
                    <span>У вас нет аккаунта?</span>
                </FormLink>
            </Form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30vh;
    flex-direction: column;
    border-radius: 5px;
    border-bottom: 1px solid rgb(159, 212, 243);
    border-top: 1px solid rgb(159, 212, 243);
    width: 400px;
`

const Title = styled.h2`
    text-align: center;    
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px 0 10px 0;
    align-items: center;
    width: 100%;
    > * {
        margin-bottom: 10px;
    }
`
const FormItem = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const InputText = styled.input.attrs(props => ({
    type: 'text'
}))`
    width: 100%; 
`
const InputPassword = styled.input.attrs(props => ({
    type: 'password'
}))`
    width: 100%; 
`
const FormInputError = styled.p`
    position: absolute;
    margin-top: 60px;
    font-size: 12px;
    color: lightcoral;
`
const FormLink = styled(Link)`
    text-align: center;    
`
