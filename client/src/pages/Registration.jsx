import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registration } from '../redux/actions/auth'

const Registration = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    return (
        <div className='authorization'>
            <div>Регистрация</div>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Введите пользователя..."/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Введите пароль..."/>
            <button onClick={() => dispatch(registration(username, password))}>Войти</button>
        </div>
    );
}

export default Registration
