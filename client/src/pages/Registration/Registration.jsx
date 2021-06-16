import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { registration } from '../../redux/actions/auth'

import './Registration.css'

const Registration = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    return (
        <div className="registration">
            <div className="registrationTitle">Регистрация</div>
            <form className="registrationForm">
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" placeholder="Введите пользователя"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" placeholder="Введите пароль"
                />
                <button
                    onClick={() => dispatch(registration(username, password))}
                    type="submit"
                >
                    Зарегистрировать
                </button>  
                <Link to="/login" className="toLoginLink">
                    <span>У вас уже есть аккаунт?</span>
                </Link>
            </form>            
        </div>
    );
}

export default Registration
