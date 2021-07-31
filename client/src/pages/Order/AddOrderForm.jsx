import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { Tabs } from 'antd'
import { ItemWithSelect } from '../../components/ItemWithSelect/ItemWithSelect';
import { ItemWithCheck } from '../../components/ItemWithCheck/ItemWithCheck';
import { ItemWithTextbox } from '../../components/ItemWithTextbox/ItemWithTextbox';

const { TabPane } = Tabs

const typeOpenings = [{ _id: 1, name: "наружного" }, { _id: 2, name: "внутреннего" }]
const thicknessCanvases = [{ _id: 1, name: "60" }, { _id: 2, name: "70" }, { _id: 3, name: "80" }, { _id: 4, name: "90" }, { _id: 5, name: "100" }]
const modelBoxes = [{ _id: 1, name: "открытая" }, { _id: 2, name: "закрытая" }, { _id: 3, name: "закрытая утепленная" }]
const metalCanvases = [{ _id: 1, value: "1" }, { _id: 2, value: "1,2" }, { _id: 3, value: "1,4" }]
const metalBoxes = [{ _id: 1, value: "1" }, { _id: 2, value: "1,2" }, { _id: 3, value: "1,4" }]
const hingeCounts = [{ _id: 1, value: "2" }, { _id: 2, value: "3" }]
const countContours = [{ _id: 1, value: "1" }, { _id: 2, value: "2" }, { _id: 3, value: "3" }]
const ears = [{ _id: 1, name: "нет" }, { _id: 2, name: "80x40x6шт" }, { _id: 3, name: "100x40x8шт" }]
const holeBoxes = [{ _id: 1, name: "нет" }, { _id: 2, name: "10мм 6шт" }, { _id: 3, name: "10мм 8шт" }]
const otdelkaOutsides = [
    { _id: 1, name: "нет", type: "металл + панель"},     
    { _id: 2, name: "давление на металле", type: "металл"}, 
    { _id: 3, name: "давл. на мет. с дек. элементами", type: "металл"},
    { _id: 4, name: "давл. и резка с дек. элементами", type: "металл"},
    { _id: 5, name: "накладные элменты на металле", type: "металл"},
    { _id: 6, name: "ков. элементы, лаз. резка, стеклопакеты", type: "металл + панель"},
    { _id: 7, name: "металлофиленки", type: "металл"},
    { _id: 8, name: "панель из массива дуба", type: "панель" },
    { _id: 9, name: "сборная ламинир. панель" , type: "панель"},
    { _id: 10, name: "панель фрезер. ламинир." , type: "панель"},
    { _id: 11, name: "панель фрезер. крашеная" , type: "панель"},
    { _id: 12, name: "панель фрезер. шпонированная" , type: "панель"},
    { _id: 13, name: "панель с эл. нержавеющей стали" , type: "панель"},
    { _id: 14, name: "панель с объемным декором" , type: "панель"},
    { _id: 15, name: "панель с зераклом или стеклом" , type: "панель"},
]



export const AddOrderForm = () => {
    const { register, handleSubmit, setError, formState: { errors }, watch } = useForm()
    const [filterOtdelkaOutsides, setFilterOtdelkaOutsides] = useState([])

    const dispatch = useDispatch()
    const customers = useSelector(state => state.customer.customers)
    const typeCanvases = useSelector(state => state.typeCanvas.typeCanvases)
    const hingeSides = useSelector(state => state.hingeSide.hingeSides)
    const hingeTypes = useSelector(state => state.hingeType.hingeTypes)
    const peepholes = useSelector(state => state.peephole.peepholes)
    const peepholeLocations = useSelector(state => state.peepholeLocation.peepholeLocations)
    const packagings = useSelector(state => state.packaging.packagings)
    const locks = useSelector(state => state.lock.locks)
    const covers = useSelector(state => state.cover.covers)
    const cylinders = useSelector(state => state.cylinder.cylinders)
    const handles = useSelector(state => state.handle.handles)
    const typePanels = useSelector(state => state.typePanel.typePanels)
    const errorsValidate = useSelector(state => state.packaging.errors)

    const fields = watch()

    useEffect(() => {
        if (errorsValidate.customer) setError("customer", { message: errorsValidate.customer })
        if (errorsValidate.typeCanvas) setError("typeCanvas", { message: errorsValidate.typeCanvas })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsValidate])

    useEffect(() => {
        return () => {

        }
    }, [dispatch])

    useEffect(() => {
        if (fields.typeCanvas) {
            const selectedTypeCanvas = typeCanvases.find(item => item.value === fields.typeCanvas)            
            setFilterOtdelkaOutsides(otdelkaOutsides.filter(it => it.type.includes(selectedTypeCanvas.trimOutside)))
        }
        
    }, [typeCanvases, fields.typeCanvas])

    const onSubmit = (data, e) => {
        e.preventDefault()
    }
    return (
        <Wrapper>
            <FormWrap>
                {/* <Title>Новый заказ</Title> */}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem>
                        <button type="submit">Добавить</button>
                        <button >Сохранить как шаблон</button>
                        <button >Загрузить шаблон</button>
                    </FormItem>
                    <Tabs defaultActiveKey="1" tabPosition="top" size="small">
                        <TabPane key="1" tab={<TabTitle>Основное</TabTitle>}>
                            <ItemWithSelect
                                title="Заказчик:"
                                items={customers}
                                optionValue="code"
                                optionName="name"
                                error={errors.customer}
                                {...register("customer", { required: "Выберите заказчика" })}
                            />
                            <ItemWithSelect
                                title="Модель полотна:"
                                items={typeCanvases}
                                optionValue="value"
                                optionName="description"
                                error={errors.typeCanvas}
                                {...register("typeCanvas", { required: "Выберите модель полотна" })}
                            />
                            <ItemWithSelect
                                title="Количество контуров:"
                                items={countContours}
                                optionValue="value"
                                optionName="value"
                                error={errors.countContour}
                                {...register("countContour", { required: "Выберите количество конутров" })}
                            />

                            <ItemWithSelect
                                title="Толщина полотна:"
                                items={thicknessCanvases}
                                optionValue="name"
                                optionName="name"
                                error={errors.thicknessCanvas}
                                {...register("thicknessCanvas", { required: "Выберите толщину полотна" })}
                            />

                            <ItemWithCheck
                                title="Двустворчатая:"
                                {...register("isDoubleDoor")}
                            />

                            <ItemWithTextbox
                                title="Ширина створки:"
                                placeholder="Введите ширину"
                                disabled={!fields.isDoubleDoor}
                                error={errors.widthDoubleDoor}
                                {...register("widthDoubleDoor", { required: "Введите ширину створки" })}
                            />


                            <ItemWithSelect
                                title="Тип открывания:"
                                items={typeOpenings}
                                optionValue="name"
                                optionName="name"
                                error={errors.typeOpening}
                                {...register("typeOpening", { required: "Выберите тип открывания" })}
                            />


                            <ItemWithSelect
                                title="Модель коробки:"
                                items={modelBoxes}
                                optionValue="name"
                                optionName="name"
                                error={errors.modelBox}
                                {...register("modelBox", { required: "Выберите модель короба" })}
                            />

                            <ItemWithTextbox
                                title="Высота:"
                                placeholder="Введите высоту"
                                error={errors.height}
                                {...register("height", { required: "Введите высоту" })}
                            />

                            <ItemWithTextbox
                                title="Ширина:"
                                placeholder="Введите ширину"
                                error={errors.width}
                                {...register("width", { required: "Введите ширину" })}
                            />

                        </TabPane>

                        <TabPane key="2" tab={<TabTitle>Фурнитура</TabTitle>}>
                            <ItemWithSelect
                                title="Основной замок:"
                                items={locks}
                                optionValue="name"
                                optionName="name"
                                error={errors.mainLock}
                                {...register("mainLock", { required: "Выберите основной замок" })}
                            />

                            <ItemWithSelect
                                title="Основной цилиндр:"
                                items={cylinders}
                                optionValue="name"
                                optionName="name"
                                error={errors.mainCylinder}
                                {...register("mainCylinder", { required: "Выберите осн цилиндр" })}
                            />

                            <ItemWithSelect
                                title="Ручка:"
                                items={handles}
                                optionValue="name"
                                optionName="name"
                                error={errors.handle}
                                {...register("handle", { required: "Выберите ручку" })}
                            />

                            <ItemWithSelect
                                title="Доп. замок:"
                                items={locks}
                                optionValue="name"
                                optionName="name"
                                error={errors.optionalLock}
                                {...register("optionalLock", { required: "Выберите дополнительный замок" })}
                            />

                            <ItemWithSelect
                                title="Доп. цилиндр:"
                                items={cylinders}
                                optionValue="name"
                                optionName="name"
                                error={errors.optionalCylinder}
                                {...register("optionalCylinder", { required: "Выберите дополнительный цилиндр" })}
                            />
                            <FormItem>
                                <ItemWithSelect
                                    title="Глазок:"
                                    items={peepholes}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.peephole}
                                    {...register("peephole", { required: "Выберите глазок" })}
                                />

                                <ItemWithSelect
                                    title="Расположение глазка:"
                                    items={peepholeLocations}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.peepholeLocation}
                                    {...register("peepholeLocation", { required: "Выберите расположение глазка" })}
                                />
                            </FormItem>

                            <FormItem>
                                <ItemWithSelect
                                    title="Осн накладка снаружи:"
                                    items={covers}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.mainCoverOutside}
                                    {...register("mainCoverOutside", { required: "Выберите осн накладку снаружи" })}
                                />

                                <ItemWithSelect
                                    title="Осн накладка внутри:"
                                    items={covers}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.mainCoverInside}
                                    {...register("mainCoverInside", { required: "Выберите осн накладку внутри" })}
                                />
                            </FormItem>

                            <FormItem>
                                <ItemWithSelect
                                    title="Доп накладка снаружи:"
                                    items={covers}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.optionalCoverOutside}
                                    {...register("optionalCoverOutside", { required: "Выберите доп накладку снаружи" })}
                                />
                                <ItemWithSelect
                                    title="Доп. накладка внутри:"
                                    items={covers}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.optionalCoverInside}
                                    {...register("optionalCoverInside", { required: "Выберите доп накладку внутри" })}
                                />
                            </FormItem>

                        </TabPane>

                        <TabPane key="4" tab={<TabTitle>Отделка</TabTitle>}>
                            <ItemWithSelect
                                title="Отделки снаружи"
                                items={filterOtdelkaOutsides}
                                optionValue="name"
                                optionName="name"
                                error={errors.otdelkaOutside}
                                {...register("otdelkaOutside", { required: "Выберите отделку снаружи" })}
                            />

                            <ItemWithSelect
                                title="Тип панели снаружи"
                                items={typePanels}
                                optionValue="name"
                                optionName="name"
                                error={errors.typePanelOutside}
                                {...register("typePanelOutside", { required: "Выберите тип панели снаружи" })}
                            />

                            <ItemWithSelect
                                title="Фрезеровка панели снаружи"
                                items={typePanels}
                                optionValue="name"
                                optionName="name"
                                error={errors.millingPanelOutside}
                                {...register("millingPanelOutside", { required: "Выберите фрезеровку панели снаружи" })}
                            />
                        </TabPane>

                        <TabPane key="6" tab={<TabTitle>Металл</TabTitle>}>
                            <ItemWithSelect
                                title="Толщина мет. полотна:"
                                items={metalCanvases}
                                optionValue="value"
                                optionName="value"
                                error={errors.metalCanvas}
                                {...register("metalCanvas", { required: "Выберите толщину металла полотна" })}
                            />

                            <ItemWithSelect
                                title="Толщина мет. короба:"
                                items={metalBoxes}
                                optionValue="value"
                                optionName="value"
                                error={errors.metalBox}
                                {...register("metalBox", { required: "Выберите толщину металла короба" })}
                            />
                        </TabPane>

                        <TabPane key="7" tab={<TabTitle>Петли</TabTitle>}>
                            <ItemWithSelect
                                title="Сторонность петель:"
                                items={hingeSides}
                                optionValue="name"
                                optionName="name"
                                error={errors.hingeSide}
                                {...register("hingeSide", { required: "Выберите сторонность петель" })}
                            />

                            <ItemWithSelect
                                title="Количество петель:"
                                items={hingeCounts}
                                optionValue="value"
                                optionName="value"
                                error={errors.hingeCount}
                                {...register("hingeCount", { required: "Выберите количество петель" })}
                            />

                            <ItemWithSelect
                                title="Тип петель:"
                                items={hingeTypes}
                                optionValue="name"
                                optionName="name"
                                error={errors.hingeType}
                                {...register("hingeType", { required: "Выберите тип петель" })}
                            />
                        </TabPane>

                        <TabPane key="8" tab={<TabTitle>Стеклопакет</TabTitle>}>

                        </TabPane>

                        <TabPane key="9" tab={<TabTitle>Дополнительно</TabTitle>}>
                            <ItemWithSelect
                                title="Упаковка:"
                                items={packagings}
                                optionValue="name"
                                optionName="name"
                                error={errors.packaging}
                                {...register("packaging", { required: "Выберите упаковку" })}
                            />

                            <ItemWithSelect
                                title="Уши:"
                                items={ears}
                                optionValue="name"
                                optionName="name"
                                error={errors.ear}
                                {...register("ear", { required: "Выберите уши" })}
                            />

                            <ItemWithSelect
                                title="Отверстия в коробе:"
                                items={holeBoxes}
                                optionValue="name"
                                optionName="name"
                                error={errors.holeBox}
                                {...register("holeBox", { required: "Выберите отверстия в коробе" })}
                            />
                        </TabPane>
                    </Tabs>
                </Form>
            </FormWrap>
            <Basket>
                {fields.customer && <label>Заказчик: {fields.customer}</label>}
                {fields.typeCanvas && <label>Модель полотна: {fields.typeCanvas}</label>}
                {fields.typeOpening && <label>Тип открывания: {fields.typeOpening}</label>}
                {fields.isDoubleDoor && <label>Двустворчатая: да</label>}
                {fields.widthDoubleDoor && <label>Ширина раб. створки: {fields.widthDoubleDoor} мм</label>}
                {fields.thicknessCanvas && <label>Толщина полотна: {fields.thicknessCanvas} мм</label>}
                {fields.countContour && <label>Количество контуров: {fields.countContour}</label>}
                {fields.modelBox && <label>Модель коробки: {fields.modelBox}</label>}
                {fields.height && <label>Высота двери: {fields.height} мм</label>}
                {fields.width && <label>Ширина двери: {fields.width} мм</label>}

                {fields.mainLock && <label>Основной замок: {fields.mainLock}</label>}
                {fields.mainCoverOutside && <label>Осн накладка снаружи: {fields.mainCoverOutside}</label>}
                {fields.mainCoverInside && <label>Осн накладка внутри: {fields.mainCoverInside}</label>}
                {fields.mainCylinder && <label>Осн цилиндр: {fields.mainCylinder}</label>}
                {fields.peephole && <label>Глазок: {fields.peephole}</label>}
                {fields.peepholeLocation && <label>Расположение глазка: {fields.peepholeLocation}</label>}
                {fields.handle && <label>Ручка: {fields.handle}</label>}

                {fields.optionalLock && <label>Доп. замок: {fields.optionalLock}</label>}
                {fields.optionalCoverOutside && <label>Доп накладка снаружи: {fields.optionalCoverOutside}</label>}
                {fields.optionalCoverInside && <label>Доп накладка внутри: {fields.optionalCoverInside}</label>}
                {fields.optionalCylinder && <label>Доп цилиндр: {fields.optionalCylinder}</label>}

                {fields.otdelkaOutside && <label>Отделки снаружи: {fields.otdelkaOutside}</label>}

                {fields.hingeSide && <label>Сторонность петель: {fields.hingeSide}</label>}
                {fields.hingeCount && <label>Сторонность петель: {fields.hingeCount} шт</label>}
                {fields.hingeType && <label>Тип петель: {fields.hingeType}</label>}

                {fields.metalCanvas && <label>Толщина мет. полотна: {fields.metalCanvas} мм</label>}
                {fields.metalBox && <label>Толщина мет. короба: {fields.metalBox} мм</label>}

                {fields.ear && <label>Уши: {fields.ear}</label>}
                {fields.holeBox && <label>Отверстия в коробе: {fields.holeBox}</label>}
                {fields.packaging && <label>Упаковка: {fields.packaging}</label>}
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

// const Title = styled.h2`
//     text-align: center;    
// `
const FormWrap = styled.div`    
    width: 60%;    
    max-height:80vh;
    overflow-y: auto;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-right: 20px;
    width: 100%;
    > * {
        width: 100%;
    }    
`

const FormItem = styled.div`
    width: 100%;
    position: relative;    
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: flex-start;   
`

const Basket = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
    width: 30%;
    font-size: 12px;
`

const TabTitle = styled.span`
    font-size: 12px;
`