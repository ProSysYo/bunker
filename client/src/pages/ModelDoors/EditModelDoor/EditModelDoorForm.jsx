import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useInput from '../../../hooks/useInput'
import { updateModelDoor } from '../../../redux/actions/model-door'

import { acSetMessage } from '../../../redux/reducers/message'

import './EditModelDoorForm.css'

export const EditModelDoorForm = () => {
    const dispatch = useDispatch()
    const modelDoor = useSelector(state => state.modelDoor.modelDoor)
    const modelDoorValidErrors = useSelector(state => state.modelDoor.modelDoorValidErrors)
    const isLoading = useSelector(state => state.loading.isLoading)

    const abbreviation = useInput(modelDoor.abbreviation, true)
    const name = useInput(modelDoor.name, true)    

    useEffect(() => {
        abbreviation.setError(modelDoorValidErrors.code)
        name.setError(modelDoorValidErrors.name)        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelDoorValidErrors])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!abbreviation.value || !name.value ) {
            return dispatch(acSetMessage("Не все поля заполнены"))            
        }

        const data = {
            id: modelDoor._id,
            abbreviation: abbreviation.value,
            name: name.value            
        }

        dispatch(updateModelDoor(modelDoor._id, data))
    }

    return (
        <div className="editModelDoor">
            <h2 className="editModelDoorTitle">Редактирование модели</h2>

            <form className="formEditModelDoor" onSubmit={handleSubmit}>
                <div className="formEditModelDoorItem">
                    <label>Сокращение:</label>
                    <div>
                        <input
                            value={abbreviation.value}
                            onChange={abbreviation.onChange}
                            onBlur={abbreviation.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите сокращение модели"
                        />
                        {abbreviation.error && <p className="fformEditModelDoorItemError">{abbreviation.error}</p>}
                    </div>
                </div>

                <div className="formEditModelDoorItem">
                    <label>Наименование:</label>
                    <div>
                        <input
                            value={name.value}
                            onChange={name.onChange}
                            onBlur={name.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите наименование модели"
                        />
                        {name.error && <p className="fformEditModelDoorItemError">{name.error}</p>}
                    </div>
                </div>

                <button disabled={isLoading} type="submit">Изменить</button>
            </form>
        </div>
    )
}
