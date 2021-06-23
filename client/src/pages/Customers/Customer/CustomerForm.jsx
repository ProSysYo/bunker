import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useInput from '../../../hooks/useInput'
import { ActionTypes } from '../../../redux/constants/action-types'

export const CustomerForm = () => {
    const dispatch = useDispatch()    
    const customer = useSelector(state => state.customer.customer)    
    const isLoading = useSelector(state => state.loading.isLoading)    

    const code = useInput(customer.code, true)
    const name = useInput(customer.name, true)
    const phone = useInput(customer.phone, true)
    const email = useInput(customer.email, true)
    const adress = useInput(customer.adress, true)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!code.value || !name.value || !phone.value || !email.value || !adress.value) {
            return dispatch({ type: ActionTypes.SET_MESSAGE, payload: "Не все поля заполнены" })
        }
        //dispatch(updateCustomer(code.value, name.value, phone.value, email.value, adress.value))
    }
    
    return (
        <div className="pageAddCustomer">
            <h2 className="pageAddCustomerTitle">Редактирование заказчика</h2>

            <form className="formAddCustomer" onSubmit={handleSubmit}>
                <div className="formAddCustomerItem">
                    <label>Код</label>
                    <input
                        value={code.value}
                        onChange={code.onChange}
                        onBlur={code.onBlur}
                        className="formInput"
                        type="text" placeholder="Введите код заказчика"
                    />
                    {code.error && <p className="formAddCustomerItemError">{code.error}</p>}
                </div>

                <div className="formAddCustomerItem">
                    <label>Имя</label>
                    <input
                        value={name.value}
                        onChange={name.onChange}
                        onBlur={name.onBlur}
                        className="formInput"
                        type="text" placeholder="Введите имя заказчика"
                    />
                    {name.error && <p className="formAddCustomerItemError">{name.error}</p>}
                </div>

                <div className="formAddCustomerItem">
                    <label>Телефон</label>
                    <input
                        value={phone.value}
                        onChange={phone.onChange}
                        onBlur={phone.onBlur}
                        className="formInput"
                        type="text" placeholder="Введите телефон заказчика"
                    />
                    {phone.error && <p className="formAddCustomerItemError">{phone.error}</p>}
                </div>

                <div className="formAddCustomerItem">
                    <label>Email</label>
                    <input
                        value={email.value}
                        onChange={email.onChange}
                        onBlur={email.onBlur}
                        className="formInput"
                        type="text" placeholder="Введите email заказчика"
                    />
                    {email.error && <p className="formAddCustomerItemError">{email.error}</p>}
                </div>

                <div className="formAddCustomerItem">
                    <label>Адрес</label>
                    <input
                        value={adress.value}
                        onChange={adress.onChange}
                        onBlur={adress.onBlur}
                        className="formInput"
                        type="text" placeholder="Введите адрес заказчика"
                    />
                    {adress.error && <p className="formAddCustomerItemError">{adress.error}</p>}
                </div>

                <button disabled={isLoading} type="submit">Изменить</button>
            </form>
        </div>
    )
}
