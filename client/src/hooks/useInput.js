import {useState} from 'react'

const useInput = (initial, required) => {
    const [value, setValue] = useState(initial)
    const [error, setError] = useState(null)
    
    return {
        value,
        error,
        setError,
        onChange: e => setValue(e.target.value),
        onBlur: e => {
            if(!e.target.value && required) setError("Поле не должно быть пустым")
            else setError(null)
        }
    }
}

export default useInput