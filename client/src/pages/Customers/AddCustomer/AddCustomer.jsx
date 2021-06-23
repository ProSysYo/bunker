import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import useInput from '../../../hooks/useInput'
import { addCustomer } from '../../../redux/actions/customer'
import { ActionTypes } from '../../../redux/constants/action-types'

import './AddCustomer.css'

export const AddCustomer = () => {
    const code = useInput("", true)
    const name = useInput("", true)
    const phone = useInput("", true)
    const email = useInput("", true)
    const adress = useInput("", true)

    const dispatch = useDispatch()
    let history = useHistory()

    const customerValidateErrors = useSelector(state => state.customer.customerValidateErrors)
    const isLoading = useSelector(state => state.loading.isLoading)
    const addSuccess = useSelector(state => state.customer.addSuccess)

    useEffect(() => {
        code.setError(customerValidateErrors.code)
        name.setError(customerValidateErrors.namecode)
        phone.setError(customerValidateErrors.phone)
        email.setError(customerValidateErrors.email)
        adress.setError(customerValidateErrors.adress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerValidateErrors])

    useEffect(() => {
        if (addSuccess) {
            history.push({ pathname: '/customers' })
        }
    }, [addSuccess, history])

    useEffect(() => {
        return () => {
            dispatch({ type: ActionTypes.CLEAR_CUSTOMER_VALIDATE_ERRORS });
        }
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!code.value || !name.value || !phone.value || !email.value || !adress.value) {
            return dispatch({ type: ActionTypes.SET_MESSAGE, payload: "Не все поля заполнены" })
        }
        dispatch(addCustomer(code.value, name.value, phone.value, email.value, adress.value))
    }
    return (
        <div className="pageAddCustomer">
            <h2 className="pageAddCustomerTitle">Добавление нового заказчика</h2>

            <form className="formAddCustomer" onSubmit={handleSubmit}>
                <div className="formAddCustomerItem">
                    <label>Код:</label>
                    <div>
                        <input
                            value={code.value}
                            onChange={code.onChange}
                            onBlur={code.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите код заказчика"
                        />
                        {code.error && <p className="formAddCustomerItemError">{code.error}</p>}
                    </div>
                </div>

                <div className="formAddCustomerItem">
                    <label>Имя:</label>
                    <div>
                        <input
                            value={name.value}
                            onChange={name.onChange}
                            onBlur={name.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите имя заказчика"
                        />
                        {name.error && <p className="formAddCustomerItemError">{name.error}</p>}
                    </div>
                </div>

                <div className="formAddCustomerItem">
                    <label>Телефон:</label>
                    <div>
                        <input
                            value={phone.value}
                            onChange={phone.onChange}
                            onBlur={phone.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите телефон заказчика"
                        />
                        {phone.error && <p className="formAddCustomerItemError">{phone.error}</p>}
                    </div>
                </div>

                <div className="formAddCustomerItem">
                    <label>Email:</label>
                    <div>
                        <input
                            value={email.value}
                            onChange={email.onChange}
                            onBlur={email.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите email заказчика"
                        />
                        {email.error && <p className="formAddCustomerItemError">{email.error}</p>}
                    </div>
                </div>

                <div className="formAddCustomerItem">
                    <label>Адрес:</label>
                    <div>
                        <input
                            value={adress.value}
                            onChange={adress.onChange}
                            onBlur={adress.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите адрес заказчика"
                        />
                        {adress.error && <p className="formAddCustomerItemError">{adress.error}</p>}
                    </div>
                </div>

                <button disabled={isLoading} type="submit">Добавить</button>
            </form>
        </div>
    )
}