import React from 'react'
import useInput from '../../../hooks/useInput'

import './AddCustomer.css'

export const AddCustomer = () => {
    const code = useInput("", true)
    const name = useInput("", true)
    const phone = useInput("", true)
    const email = useInput("", true)
    const adress = useInput("", true)    
    
    const handleSubmit = (e) => {
        e.preventDefault()               
    }

    return (
        <div className="pageAddCustomer">
            <h2 className="pageAddCustomerTitle">Добавление нового заказчика</h2>

            <form className="formAddCustomer" onSubmit={handleSubmit}>                
                <label>Код</label>
                <input
                    {...code}                    
                    className="formInput"
                    type="text" placeholder="Введите код заказчика"
                    onInvalid={()=> console.log("fdf")}
                />
                <p className=""></p>

                <label>Имя</label>
                <input
                    {...name}                    
                    className="formInput"
                    type="text" placeholder="Введите имя заказчика"
                />
                <p className=""></p>

                <label>Телефон</label>
                <input   
                    {...phone}                 
                    className="formInput"
                    type="text" placeholder="Введите телефон заказчика"
                />
                <p className=""></p>

                <label>Email</label>
                <input
                    {...email}                   
                    className="formInput"
                    type="text" placeholder="Введите email заказчика"
                />
                <p className=""></p>

                <label>Адрес</label>
                <input
                    {...adress}                     
                    className="formInput"
                    type="text" placeholder="Введите адрес заказчика"
                />
                <p className=""></p>

                <button type="submit">Зарегистрировать</button>

            </form>
        </div>
    )
}

