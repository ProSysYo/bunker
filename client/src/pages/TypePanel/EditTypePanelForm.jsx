import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { typePanelActions } from '../../redux/reducers/type-panel';
import { updateTypePanel } from '../../redux/actions/type-panel';

export const EditTypePanelForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()

    const dispatch = useDispatch()

    const errorsValidate = useSelector(state => state.typePanel.errors)
    const isLoading = useSelector(state => state.loading.isLoading)
    const typePanel = useSelector(state => state.typePanel.typePanel)

    useEffect(() => {
        if (errorsValidate.name) setError("name", { message: errorsValidate.name })        
        if (errorsValidate.thick) setError("tick", { message: errorsValidate.thick })        
        if (errorsValidate.isMilling) setError("isMilling", { message: errorsValidate.isMilling })        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsValidate])

    useEffect(() => {
        return () => {
            dispatch(typePanelActions.clearErrors())
        }
    }, [dispatch])

    const onSubmit = (data, e) => {
        e.preventDefault()
        dispatch(updateTypePanel(typePanel._id, data))
    }
    return (
        <Wrapper>
            <Title>Изменение типа панели</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <FormItemTitle>Наименование:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("name", { required: "Введите наименование" })}
                            placeholder="Введите наименование"
                            defaultValue={typePanel.name}
                        />
                        {errors.name && <FormInputError>{errors.name.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Толщина панели:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("thick", { required: "Выберите толщину панели" })}
                            defaultValue={typePanel.thick}                        
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            <option value="0">0 мм</option>
                            <option value="6">6 мм</option>
                            <option value="10">10 мм</option>
                            <option value="12">12 мм</option>
                            <option value="16">16 мм</option>
                            <option value="22">22 мм</option>
                        </Select>
                        {errors.thick && <FormInputError>{errors.thick.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>
                
                <FormItem>
                    <FormItemTitle>Возможность фрезеровки:</FormItemTitle>
                    <FormItemInput>
                        <InputChecbox
                            {...register("isMilling")}
                            defaultChecked={typePanel.isMilling}                         
                        />
                    </FormItemInput>
                </FormItem>
                <button disabled={isLoading} type="submit">Изменить</button>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;     
    flex-wrap: wrap; 
`

const Title = styled.h2`
    text-align: center;    
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: 90%;
`

const FormItem = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const FormItemTitle = styled.label`
    width: 30%;
    text-align: end;
    padding-right: 10px;
`

const FormItemInput = styled.div`
    width: 70%;    
`

const FormInputError = styled.p`
    position: absolute;
    font-size: 12px;
    color: lightcoral;
`
const InputText = styled.input.attrs(props => ({
    type: 'text'
}))`
    width: 100%; 
`
const InputChecbox = styled.input.attrs(props => ({
    type: 'checkbox'    
}))`
    display: block;
    border-radius: 3px;    
`

const Select = styled.select`
    outline: none;
    border: 1px solid rgb(159, 212, 243);
    font-size: 14px;
    padding: 5px 10px 5px 10px;    
    width: 100%;
`