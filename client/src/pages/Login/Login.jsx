import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { login } from '../../redux/actions/auth'
import { acClearLoginValidateErrors } from '../../redux/reducers/auth'

import './Login.css'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const loginValidateErrors = useSelector(state => state.auth.loginValidateErrors)
    const isLoading = useSelector(state => state.loading.isLoading)

    useEffect(() => {        
        return () => {
            dispatch(acClearLoginValidateErrors())            
        }
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }
    
    return (
        <div className="login">
            <div className="loginTitle">Вход в аккаунт</div>
            <form className="loginForm" onSubmit={handleSubmit}>
                <input
                    className="loginInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" placeholder="Введите пользователя"
                />
                <span className="loginErrorMessage">{loginValidateErrors?.username}</span>
                <input
                    className="loginInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" placeholder="Введите пароль"
                />
                <span className="loginErrorMessage">{loginValidateErrors?.password}</span>
                <button disabled={isLoading} type="submit">Войти</button>  
                <Link to="/registration" className="toRegisterLink">
                    <span>У вас нет аккаунта?</span>
                </Link>
            </form>            
        </div>
    );
}

export default Login