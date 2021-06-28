import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useInput from '../../../hooks/useInput'
import { addModelDoor } from '../../../redux/actions/model-door'

import { acSetMessage } from '../../../redux/reducers/message'
import { acClearModelDoorValidErrors } from '../../../redux/reducers/model-door'

import './AddModelDoor.css'

export const AddModelDoor = () => {
    const abbreviation = useInput("", true)
    const name = useInput("", true)

    const dispatch = useDispatch()    

    const modelDoorValidErrors = useSelector(state => state.modelDoor.modelDoorValidErrors)
    const isLoading = useSelector(state => state.loading.isLoading)    

    useEffect(() => {
        if (modelDoorValidErrors.abbreviation) abbreviation.setError(modelDoorValidErrors.abbreviation)
        if (modelDoorValidErrors.name) name.setError(modelDoorValidErrors.name)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelDoorValidErrors])

    useEffect(() => {
        return () => {
            dispatch(acClearModelDoorValidErrors())            
        }
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!abbreviation.value || !name.value) {
            return dispatch(acSetMessage("Не все поля заполнены"))            
        }
        dispatch(addModelDoor(abbreviation.value, name.value))
    }
    return (
        <div className="addModelDoor">
            <h2 className="ddModelDoorTitle">Добавление новой модели</h2>

            <form className="formAddModelDoor" onSubmit={handleSubmit}>
                <div className="formAddModelDoorItem">
                    <label>Сокращение:</label>
                    <div>
                        <input
                            value={abbreviation.value}
                            onChange={abbreviation.onChange}
                            onBlur={abbreviation.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите сокращение модели"
                        />
                        {abbreviation.error && <p className="formAddModelDoorItemError">{abbreviation.error}</p>}
                    </div>
                </div>

                <div className="formAddModelDoorItem">
                    <label>Наименование:</label>
                    <div>
                        <input
                            value={name.value}
                            onChange={name.onChange}
                            onBlur={name.onBlur}
                            className="formInput"
                            type="text" placeholder="Введите наименование модели"
                        />
                        {name.error && <p className="formAddModelDoorItemError">{name.error}</p>}
                    </div>
                </div>

                <button disabled={isLoading} type="submit">Добавить</button>
            </form>
        </div>
    )
}