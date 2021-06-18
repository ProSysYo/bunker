import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { registration } from '../../redux/actions/auth'

import './Registration.css'

const Registration = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const registerValidateErrors = useSelector(state => state.auth.registerValidateErrors)
    const isLoading = useSelector(state => state.loading.isLoading)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registration(username, password))
    }

    return (
        <div className="registration">
            <div className="registrationTitle">Регистрация</div>
            <form className="registrationForm" onSubmit={handleSubmit}>
                <input
                    className="registrationInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" placeholder="Введите пользователя"
                />
                <span className="registrationErrorMessage">{registerValidateErrors?.username}</span>
                <input
                    className="registrationInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" placeholder="Введите пароль"
                />
                <span className="registrationErrorMessage">{registerValidateErrors?.password}</span>
                <button disabled={isLoading} type="submit">Зарегистрировать</button>  
                <Link to="/login" className="toLoginLink">
                    <span>У вас уже есть аккаунт?</span>
                </Link>
            </form>            
        </div>
    );
}

export default Registration
