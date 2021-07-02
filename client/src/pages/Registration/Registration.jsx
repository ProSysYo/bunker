import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { registration } from '../../redux/actions/auth'
import { acClearRegisterValidateErrors } from '../../redux/reducers/auth'

const Registration = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm({mode: 'onBlur'})

    const dispatch = useDispatch()
    const registerValidateErrors = useSelector(state => state.auth.registerValidateErrors)
    const isLoading = useSelector(state => state.loading.isLoading)
    
    useEffect(() => {        
        return () => {
            dispatch(acClearRegisterValidateErrors())            
        }
    }, [dispatch])

    useEffect(() => {
        if (registerValidateErrors.username) setError("username", {message: registerValidateErrors.username})
        if (registerValidateErrors.password) setError("password", {message: registerValidateErrors.password})        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerValidateErrors])

    const onSubmit = (data, e) => {
        e.preventDefault()
        dispatch(registration(data.username, data.password))
    }

    return (
        <Wrapper>
            <Title>Регистрация</Title>
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
                
                <button disabled={isLoading} type="submit">Зарегистрировать</button>  
                <FormLink to="/login">
                    <span>У вас уже есть аккаунт?</span>
                </FormLink>
            </Form>            
        </Wrapper>
    );
}

export default Registration

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