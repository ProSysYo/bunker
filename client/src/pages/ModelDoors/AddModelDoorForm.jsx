import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form"

import { addModelDoor } from '../../redux/actions/model-door'

import { acClearModelDoorValidErrors } from '../../redux/reducers/model-door'

export const AddModelDoorForm = () => {
    const { register, handleSubmit, setError, formState: { errors }, setValue, watch } = useForm()
    const dispatch = useDispatch()    

    const modelDoorValidErrors = useSelector(state => state.modelDoor.modelDoorValidErrors)
    const isLoading = useSelector(state => state.loading.isLoading)    

    useEffect(() => {
        if (modelDoorValidErrors.abbreviation) setError("abbreviation", {message: modelDoorValidErrors.abbreviation})        
        if (modelDoorValidErrors.trimOutside) setError("trimOutside", {message: modelDoorValidErrors.trimOutside})
        if (modelDoorValidErrors.trimInside) setError("trimInside", {message: modelDoorValidErrors.trimInside})
        if (modelDoorValidErrors.isDoubleDoors) setError("isDoubleDoors", {message: modelDoorValidErrors.isDoubleDoors})
        if (modelDoorValidErrors.insulation) setError("insulation", {message: modelDoorValidErrors.insulation})
        if (modelDoorValidErrors.countContour) setError("countContour", {message: modelDoorValidErrors.countContour})
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelDoorValidErrors])

    useEffect(() => {
        return () => {
            dispatch(acClearModelDoorValidErrors())            
        }
    }, [dispatch])

    const typeCanvas = watch("typeCanvas")
    const countContour = watch("countContour")
    const insulation = watch("insulation")
    const isDoubleDoors = watch("isDoubleDoors")

    useEffect(() => {
        const doubleDoor = isDoubleDoors ? "Д" : ""
        const typeCanvasValue = typeCanvas ? typeCanvas : ""
        const countContourValue = countContour ? countContour : ""
        
        let prefixInsulation
        if (insulation) {
            if (insulation === "пенопласт") prefixInsulation = "_Пена"
            if (insulation === "базальт") prefixInsulation = ""
        } else {
            prefixInsulation = ""
        }

        setValue("abbreviation", `${doubleDoor}${typeCanvasValue}${prefixInsulation}${countContourValue}`)
    },[typeCanvas, countContour, insulation, isDoubleDoors, setValue])

    const onSubmit = (data, e) => {
        e.preventDefault()
        console.log(data);
        dispatch(addModelDoor(data))
    }
    return (
        <Wrapper>
            <Title>Добавление новой модели</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <FormItemTitle>Сокращение:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("abbreviation", { required: "Введите сокращение модели" })}
                                                     
                            placeholder="Введите сокращение модели"
                                                     
                        />
                        {errors.abbreviation && <FormInputError>{errors.abbreviation.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                <FormItem>
                    <FormItemTitle>Тип полотна:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("typeCanvas", { required: "Введите наименование модели" })}                         
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            <option value="ММ">металл-металл</option>
                            <option value="ПП">панель-панель</option>
                            <option value="МП">металл-панель</option>

                        </Select>
                         {errors.typeCanvas && <FormInputError>{errors.typeCanvas.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                
                <FormItem>
                    <FormItemTitle>Отделка снаружи:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("trimOutside", { required: "Выберите тип отделки снаружи" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            <option value="металл">металл</option>
                            <option value="панель">панель</option>                            
                        </Select>
                        {errors.trimOutside && <FormInputError>{errors.trimOutside.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>
                <FormItem>
                    <FormItemTitle>Отделка внутри:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("trimInside", { required: "Выберите тип отделки внутри" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            <option value="металл">металл</option>
                            <option value="панель">панель</option>                            
                        </Select>
                        {errors.trimInside && <FormInputError>{errors.trimInside.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>
                <FormItem>
                    <FormItemTitle>Двустворчатая:</FormItemTitle>
                    <FormItemInput>
                        <InputChecbox
                            {...register("isDoubleDoors")}                           
                        />
                    </FormItemInput>
                </FormItem>
                <FormItem>
                    <FormItemTitle>Тип утеплителя:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("insulation")}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            <option value="пенопласт">пенопласт</option>
                            <option value="базальт">базальт</option>                            
                        </Select>
                        {errors.insulation && <FormInputError>{errors.insulation.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>
                <FormItem>
                    <FormItemTitle>Кол-во контуров:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("countContour", { required: "Выберите количество контуров" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>                          
                        </Select>
                        {errors.countContour && <FormInputError>{errors.countContour.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>
                <button disabled={isLoading} type="submit">Добавить</button>
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
const Select = styled.select`
    outline: none;
    border: 1px solid rgb(159, 212, 243);
    font-size: 14px;
    padding: 5px 10px 5px 10px;    
    width: 100%;
`
const InputChecbox = styled.input.attrs(props => ({
    type: 'checkbox'    
}))`
    display: block;
    border-radius: 3px;    
`