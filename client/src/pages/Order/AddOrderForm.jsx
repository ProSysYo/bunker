import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form";

export const AddOrderForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()


    const dispatch = useDispatch()
    const customers = useSelector(state => state.customer.customers)
    const typeCanvases = useSelector(state => state.typeCanvas.typeCanvases)
    const hingeSides = useSelector(state => state.hingeSide.hingeSides)
    const hingeTypes = useSelector(state => state.hingeType.hingeTypes)
    const peepholes = useSelector(state => state.peephole.peepholes)
    const peepholeLocations = useSelector(state => state.peepholeLocation.peepholeLocations)
    const errorsValidate = useSelector(state => state.packaging.errors)

    useEffect(() => {
        if (errorsValidate.customer) setError("customer", { message: errorsValidate.customer })
        if (errorsValidate.typeCanvas) setError("typeCanvas", { message: errorsValidate.typeCanvas })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsValidate])

    useEffect(() => {
        return () => {

        }
    }, [dispatch])

    const onSubmit = (data, e) => {
        e.preventDefault()

    }
    return (
        <Wrapper>
            <FormWrap>
            {/* <Title>Новый заказ</Title> */}
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Заказчик */}
                <FormItem>
                    <FormItemTitle>Заказчик:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("customer", { required: "Выберите заказчика" })}
                            defaultValue=""
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            {customers.map(customer => <option key={customer._id} value={customer.code}>{customer.name}</option>)}
                        </Select>
                        {errors.customer && <FormInputError>{errors.customer.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                {/* Модель полотна */}
                <FormItem>
                    <FormItemTitle>Модель полотна:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("typeCanvas", { required: "Выберите модель полотна" })}
                            defaultValue=""
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            {typeCanvases.map(type => <option key={type._id} value={type.value}>{type.description}</option>)}
                        </Select>
                        {errors.typeCanvas && <FormInputError>{errors.typeCanvas.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                {/* Тип открывания */}
                <FormItem>
                    <FormItemTitle>Тип открывания:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("typeOpening", { required: "Выберите тип открывания" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="наружного">наружного</option>
                            <option value="внутреннего">внутреннего</option>
                        </Select>
                        {errors.typeOpening && <FormInputError>{errors.typeOpening.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                {/* Двустворчатая */}
                <FormItem>
                    <FormItemTitle>Двустворчатая:</FormItemTitle>
                    <FormItemInput>
                        <InputChecbox
                            {...register("isDoubleDoor")}                           
                        />                        
                    </FormItemInput>
                </FormItem>

                {/* Двустворчатая рабочая створка*/}
                <FormItem>
                    <FormItemTitle>Ширина створки:</FormItemTitle>
                    <FormItemInput>                        
                        <InputText
                            {...register("widthDoubleDoor", { required: "Введите ширину створки" })}
                            placeholder="Ширина створки"
                        />
                    </FormItemInput>
                </FormItem>

                {/* Толщина полотна */}
                <FormItem>
                    <FormItemTitle>Толщина полотна:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("thicknessCanvas", { required: "Выберите толщину полотна" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="60">60 мм</option>
                            <option value="70">70 мм</option>
                            <option value="80">80 мм</option>
                            <option value="90">90 мм</option>
                            <option value="100">100 мм</option>
                        </Select>
                        {errors.thicknessCanvas && <FormInputError>{errors.thicknessCanvas.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                {/* Модель коробки */}
                <FormItem>
                    <FormItemTitle>Модель коробки:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("modelBox", { required: "Выберите модель короба" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="О">открытая</option>
                            <option value="З">закрытая</option>
                            <option value="ЗУ">закрытая утепленная</option>                            
                        </Select>
                        {errors.modelBox && <FormInputError>{errors.modelBox.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                {/* Толщина металла полотна*/}
                <FormItem>
                    <FormItemTitle>Толщина мет. полотна:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("metalCanvas", { required: "Выберите толщину металла полотна" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="1">1 мм</option>
                            <option value="1,2">1,2 мм</option>
                            <option value="1,4">1,4 мм</option>                            
                        </Select>
                        {errors.metalCanvas && <FormInputError>{errors.metalCanvas.message}</FormInputError>}
                    </FormItemInput>                    
                </FormItem>

                {/* Толщина металла короба*/}
                <FormItem>                    
                    <FormItemTitle>Толщина мет. короба:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("metalBox", { required: "Выберите толщину металла короба" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="1">1 мм</option>
                            <option value="1,2">1,2 мм</option>
                            <option value="1,4">1,4 мм</option>                            
                        </Select>
                        {errors.metalBox && <FormInputError>{errors.metalBox.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>
                
                {/* Высота двери */}
                <FormItem>
                    <FormItemTitle>Высота:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("height", { required: "Введите высоту" })}
                            placeholder="Высота двери"
                        />
                        {errors.height && <FormInputError>{errors.height.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                {/* Ширина двери */}
                <FormItem> 
                    <FormItemTitle>Ширина:</FormItemTitle>
                    <FormItemInput>
                        <InputText
                            {...register("width", { required: "Введите ширину" })}
                            placeholder="Ширина двери"
                        />
                        {errors.width && <FormInputError>{errors.width.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>
                {/* Сторонность петель */}
                <FormItem>
                    <FormItemTitle>Сторонность петель:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("hingeSide", { required: "Выберите сторонность петель" })}
                            defaultValue=""
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            {hingeSides.map(item => <option key={item._id} value={item.name}>{item.name}</option>)}
                        </Select>
                        {errors.hingeSide && <FormInputError>{errors.hingeSide.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                 {/* Количество петель */}
                 <FormItem>
                    <FormItemTitle>Количество петель:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("hingeCount", { required: "Выберите количество петель" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="2">2 шт</option>
                            <option value="3">3 шт</option>                            
                        </Select>
                        {errors.hingeCount && <FormInputError>{errors.hingeCount.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                {/* Тип петель */}
                <FormItem>
                    <FormItemTitle>Тип петель:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("hingeType", { required: "Выберите тип петель" })}
                            defaultValue=""
                        >
                            <option disabled value=""> --выберите из списка-- </option>
                            {hingeTypes.map(item => <option key={item._id} value={item.name}>{item.name}</option>)}
                        </Select>
                        {errors.hingeType && <FormInputError>{errors.hingeType.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                {/* Глазок */}
                <FormItem>
                    <FormItemTitle>Глазок:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("peephole", { required: "Выберите глазок" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            {peepholes.map(item => <option key={item._id} value={item.name}>{item.name}</option>)}                         
                        </Select>
                        {errors.peephole && <FormInputError>{errors.peephole.message}</FormInputError>}
                    </FormItemInput>                   
                </FormItem>

                {/* Глазок расположение*/}
                <FormItem>                    
                    <FormItemTitle>Расположение глазка:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("peepholeLocation", { required: "Выберите расположение глазка" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            {peepholeLocations.map(item => <option key={item._id} value={item.name}>{item.name}</option>)}                           
                        </Select>
                        {errors.peepholeLocation && <FormInputError>{errors.peepholeLocation.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>

                {/* Уши */}
                <FormItem>
                    <FormItemTitle>Уши:</FormItemTitle>
                    <FormItemInput>
                        <Select
                            {...register("ear", { required: "Выберите уши" })}
                            defaultValue=""                         
                        >
                            <option disabled value=""> --выберите из списка-- </option>                            
                            <option value="нет">нет</option>
                            <option value="80x40x6шт">80x40x6шт</option>
                            <option value="100x40x6шт">100x40x6шт</option>                            
                        </Select>
                        {errors.ear && <FormInputError>{errors.ear.message}</FormInputError>}
                    </FormItemInput>
                </FormItem>


                <button type="submit">Добавить</button>
            </Form>
            </FormWrap>
            <Basket>
                <div>
                    <label>Заказчик: </label>
                    <label>ООО Чампион</label>
                </div>
                <div>
                    <label>Модель полотна: </label>
                    <label>металл-металл</label>
                </div>
                <div>
                    <label>Тип открывания: </label>
                    <label>наружного</label>
                </div>
            </Basket>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;    
    justify-content: space-between;
    margin-top: 50px;    
`

const Title = styled.h2`
    text-align: center;    
`
const FormWrap = styled.div`    
    width: 50%;    
    max-height:80vh;
    overflow-y: auto;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-right: 20px;    
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
    display: flex;
    flex-direction: row;
    align-items: center;  
`

const FormInputError = styled.p`
    position: absolute;
    margin-top:65px;
    font-size: 12px;
    color: lightcoral;
`
const InputText = styled.input.attrs(props => ({
    type: 'text'
}))`    
       
`
const Select = styled.select`
    outline: none;
    border: 1px solid rgb(159, 212, 243);
    font-size: 14px;
    padding: 5px 10px 5px 10px;    
    width: 100%;
`
const Basket = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
    width: 40%;
    font-size: 12px;
`

const InputChecbox = styled.input.attrs(props => ({
    type: 'checkbox'    
}))`
    display: block;
    border-radius: 3px;    
`