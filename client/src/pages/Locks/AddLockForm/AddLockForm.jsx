import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useInput from '../../../hooks/useInput'
import { addLock } from '../../../redux/actions/lock'
import { acClearLockValidErrors } from '../../../redux/reducers/lock'


import { acSetMessage } from '../../../redux/reducers/message'


import './AddLockForm.css'

export const AddLockForm = () => {
    const name = useInput("", true)
    const type = useInput("", true)
    const isLatch = useInput(false, true)

    const dispatch = useDispatch()    

    const lockValidErrors = useSelector(state => state.lock.lockValidErrors)
    const isLoading = useSelector(state => state.loading.isLoading)    

    useEffect(() => {
        if (lockValidErrors.name) name.setError(lockValidErrors.name)
        if (lockValidErrors.type) type.setError(lockValidErrors.type)
        if (lockValidErrors.isLatch) isLatch.setError(lockValidErrors.isLatch)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lockValidErrors])

    useEffect(() => {
        return () => {
            dispatch(acClearLockValidErrors())            
        }
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name.value ) {
            return dispatch(acSetMessage("Не все поля заполнены"))            
        }
        console.log(isLatch.value);
        dispatch(addLock(name.value, type.value, isLatch.value))
    }
    return (
        <div className="addModelDoor">
            <h2 className="ddModelDoorTitle">Добавление нового замка</h2>

            <form className="formAddModelDoor" onSubmit={handleSubmit}>
                <div className="formAddModelDoorItem">
                    <label>Наименование:</label>
                    <div>
                        <input
                            value={name.value}
                            onChange={name.onChange}
                            onBlur={name.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите наименование замка"
                        />
                        {name.error && <p className="formAddModelDoorItemError">{name.error}</p>}
                    </div>
                </div>

                <div className="formAddModelDoorItem">
                    <label>Тип:</label>
                    <div>
                        <select
                            value={type.value}
                            onChange={type.onChange}                            
                            className="formInput"
                            type="select"
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            <option value="Основной">Основной</option>
                            <option value="Дополнительный">Дополнительный</option>
                            <option value="Двухсистемный">Двухсистемный</option>
                        </select>
                        {type.error && <p className="formAddModelDoorItemError">{type.error}</p>}
                    </div>
                </div>

                <div className="formAddModelDoorItem">
                    <label>Засов:</label>
                    <div>
                        <input
                            value={isLatch.value}
                            onChange={isLatch.onChange}                            
                            className="formInput"
                            type="checkbox"
                        />
                        {isLatch.error && <p className="formAddModelDoorItemError">{isLatch.error}</p>}
                    </div>
                </div>

                <button disabled={isLoading} type="submit">Добавить</button>
            </form>
        </div>
    )
}