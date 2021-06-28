import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useInput from '../../../hooks/useInput'
import { updateCustomer } from '../../../redux/actions/customer'
import { acSetMessage } from '../../../redux/reducers/message'

import './EditCustomerForm.css'

export const EditCustomerForm = () => {
    const dispatch = useDispatch()
    const customer = useSelector(state => state.customer.customer)
    const customerValidateErrors = useSelector(state => state.customer.customerValidateErrors)
    const isLoading = useSelector(state => state.loading.isLoading)

    const code = useInput(customer.code, true)
    const name = useInput(customer.name, true)
    const phone = useInput(customer.phone, true)
    const email = useInput(customer.email, true)
    const adress = useInput(customer.adress, true)

    useEffect(() => {
        code.setError(customerValidateErrors.code)
        name.setError(customerValidateErrors.name)
        phone.setError(customerValidateErrors.phone)
        email.setError(customerValidateErrors.email)
        adress.setError(customerValidateErrors.adress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerValidateErrors])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!code.value || !name.value || !phone.value || !email.value || !adress.value) {
            return dispatch(acSetMessage("Не все поля заполнены"))            
        }

        const data = {
            id: customer._id,
            code: code.value,
            name: name.value,
            phone: phone.value,
            email: email.value,
            adress: adress.value
        }

        dispatch(updateCustomer(customer._id, data))
    }

    return (
        <div className="pageUpdateCustomer">
            <h2 className="pageUpdateCustomerTitle">Редактирование заказчика</h2>

            <form className="formUpdateCustomer" onSubmit={handleSubmit}>
                <div className="formUpdateCustomerItem">
                    <label>Код:</label>
                    <div>
                        <input
                            value={code.value}
                            onChange={code.onChange}
                            onBlur={code.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите код заказчика"
                        />
                        {code.error && <p className="formUpdateCustomerItemError">{code.error}</p>}
                    </div>
                </div>

                <div className="formUpdateCustomerItem">
                    <label>Имя:</label>
                    <div>
                        <input
                            value={name.value}
                            onChange={name.onChange}
                            onBlur={name.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите имя заказчика"
                        />
                        {name.error && <p className="formUpdateCustomerItemError">{name.error}</p>}
                    </div>
                </div>

                <div className="formUpdateCustomerItem">
                    <label>Телефон:</label>
                    <div>
                        <input
                            value={phone.value}
                            onChange={phone.onChange}
                            onBlur={phone.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите телефон заказчика"
                        />
                        {phone.error && <p className="formUpdateCustomerItemError">{phone.error}</p>}
                    </div>
                </div>

                <div className="formUpdateCustomerItem">
                    <label>Email:</label>
                    <div>
                        <input
                            value={email.value}
                            onChange={email.onChange}
                            onBlur={email.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите email заказчика"
                        />
                        {email.error && <p className="formUpdateCustomerItemError">{email.error}</p>}
                    </div>
                </div>

                <div className="formUpdateCustomerItem">
                    <label>Адрес:</label>
                    <div>
                        <input
                            value={adress.value}
                            onChange={adress.onChange}
                            onBlur={adress.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите адрес заказчика"
                        />
                        {adress.error && <p className="formUpdateCustomerItemError">{adress.error}</p>}
                    </div>
                </div>

                <button disabled={isLoading} type="submit">Изменить</button>
            </form>
        </div>
    )
}
