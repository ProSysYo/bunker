import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
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
const typeOtdelka = [
    { _id: 1, name: "нет", type: "все", design: "нет", isInside: true, isOutside: true, isWrap: false, isPatina: false},
    { _id: 2, name: "давление на металле", type: "металл", design: "Д", isInside: false, isOutside: true, isWrap: false, isPatina: false},
    { _id: 3, name: "давл. на мет. с дек. элементами", type: "металл", design: "ДН", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 4, name: "давл. и резка с дек. элементами", type: "металл", design: "ДР", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 5, name: "накладные элменты на металле", type: "металл", design: "Н", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 6, name: "ков. элементы + стеклопакет", type: "металл", design: "КС", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 7, name: "лазер. резка + стеклопакет", type: "металл", design: "ЛС", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 8, name: "стеклопакет", type: "металл", design: "С", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 9, name: "металлофиленки", type: "металл", design: "Ф", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 10, name: "МДФ 6мм лам. б/фр.", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: false, isPatina: false },
    { _id: 11, name: "МДФ 6мм лам. фр.", type: "панель", design: "фрезеровка", isInside: true, isOutside: true, isWrap: true, isPatina: true },
    { _id: 12, name: "МДФ 10мм лам. б/фр.", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: true, isPatina: true },
    { _id: 13, name: "МДФ 10мм лам. фр.", type: "панель", design: "фрезеровка", isInside: true, isOutside: true, isWrap: true, isPatina: true },
    { _id: 14, name: "МДФ 16мм лам. б/фр.", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: true, isPatina: true },
    { _id: 15, name: "МДФ 16мм лам. фр.", type: "панель", design: "фрезеровка", isInside: true, isOutside: true, isWrap: true, isPatina: true },
    { _id: 16, name: "под панель 6мм", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: false, isPatina: false },
    { _id: 17, name: "под панель 10мм", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: false, isPatina: false },
    { _id: 18, name: "под панель 16мм", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: false, isPatina: false },
]

const otdelkas = [
    { _id: 1, name: "нет", design: "нет", isWindow: false },
    { _id: 2, name: "Д1", design: "Д", isWindow: false },
    { _id: 3, name: "Д2", design: "Д", isWindow: false },
    { _id: 4, name: "ДН1", design: "ДН", isWindow: false },
    { _id: 5, name: "ДН2", design: "ДН", isWindow: false },
    { _id: 6, name: "ДР1", design: "ДР", isWindow: false },
    { _id: 7, name: "ДР2", design: "ДР", isWindow: false },
    { _id: 8, name: "Н1", design: "Н", isWindow: false },
    { _id: 9, name: "Н2", design: "Н", isWindow: false },
    { _id: 10, name: "КС1", design: "КС", isWindow: true },
    { _id: 11, name: "КС2", design: "КС", isWindow: true },
    { _id: 12, name: "ЛС46", design: "ЛС", isWindow: true },
    { _id: 13, name: "С1", design: "С", isWindow: true },
    { _id: 14, name: "С2", design: "С", isWindow: true },
    { _id: 15, name: "Ф1", design: "Ф", isWindow: false },
    { _id: 16, name: "Ф2", design: "Ф", isWindow: false },
    { _id: 17, name: "ФЛ-1", design: "фрезеровка", isWindow: false },
    { _id: 18, name: "ФЛ-2", design: "фрезеровка", isWindow: false },
    { _id: 19, name: "КС-1", design: "фрезеровка", isWindow: true },
    { _id: 20, name: "КС-2", design: "фрезеровка", isWindow: true },
]

const patinas = [
    { _id: 1, name: "нет" },
    { _id: 2, name: "коричневая" },
    { _id: 3, name: "черная" },
]



export const AddOrderForm = () => {
    const { register, handleSubmit, setError, formState: { errors }, watch, setValue } = useForm()
    
    

    //Отделка снаружи
    const [currentTypeOtdelkaOutsides, setCurrentTypeOtdelkaOutsides] = useState([])
    const [currentOtdelkaOutsides, setCurrentOtdelkaOutsides] = useState([])
    const [outsideWraps, setOutsideWraps] = useState([])
    const [outsidePatinas, setOutsidePatinas] = useState([])    

    //Отделка внутри
    const [currentTypeOtdelkaInsides, setCurrentTypeOtdelkaInsides] = useState([])
    const [currentOtdelkaInsides, setCurrentOtdelkaInsides] = useState([])
    const [wrapInsides, setWrapInsides] = useState([])
    const [patinaInsides, setPatinaInsides] = useState([])

    //const dispatch = useDispatch()
    const customers = useSelector(state => state.customer.customers)
    const hingeSides = useSelector(state => state.hingeSide.hingeSides)
    const hingeTypes = useSelector(state => state.hingeType.hingeTypes)
    const peepholes = useSelector(state => state.peephole.peepholes)
    const peepholeLocations = useSelector(state => state.peepholeLocation.peepholeLocations)
    const packagings = useSelector(state => state.packaging.packagings)
    const locks = useSelector(state => state.lock.locks)
    const covers = useSelector(state => state.cover.covers)
    const cylinders = useSelector(state => state.cylinder.cylinders)
    const handles = useSelector(state => state.handle.handles)
    const wraps = useSelector(state => state.wrap.wraps)
    const errorsValidate = useSelector(state => state.packaging.errors)
    const typeCanvases = useSelector(state => state.typeCanvas.typeCanvases)

    const fields = watch()

    const [typeCanvas, setTypeCanvas] = useState({})

    //загрузка значений при изменении типа полотна
    useEffect(() => { 
        console.log("dd");           
        setCurrentTypeOtdelkaOutsides(typeOtdelka.filter(item => {
            return (item.type === typeCanvas.trimOutside || item.type === "все") && item.isOutside
        }))
    }, [typeCanvas])    

    const handleTypeCanvas = (e) => {
        const selectedTypeCanvas = typeCanvases.find(item => item.value === e.target.value)
        setTypeCanvas(selectedTypeCanvas)
    }

    //загрузка значений при изменении типа отделки снаружи
    useEffect(() => {
        if (fields.typeOtdelkaOutside) {
            const selectedTypeOtdelkaOutside = currentTypeOtdelkaOutsides.find(item => item.name === fields.typeOtdelkaOutside)            
            
            setCurrentOtdelkaOutsides(otdelkas.filter(item => item.design === selectedTypeOtdelkaOutside.design))            

            if (selectedTypeOtdelkaOutside.isWrap) {
                setOutsideWraps(wraps)  
            } else {
                setOutsideWraps([{name: "нет"}])
            }
                       
            if (selectedTypeOtdelkaOutside.isPatina) {
                setOutsidePatinas(patinas)
            } else {
                setOutsidePatinas([{name: "нет"}])
            }                    
        } else {
            setCurrentOtdelkaOutsides([])
            setOutsideWraps([])
            setOutsidePatinas([])
        }

        setValue("otdelkaOutside", "")
        setValue("outsideWrap", "")
        setValue("outsidePatina", "")

    }, [fields.typeOtdelkaOutside, currentTypeOtdelkaOutsides, setValue, wraps])
    
    


    //регистрация ошибок валидации от сервера
    useEffect(() => {
        if (errorsValidate.customer) setError("customer", { message: errorsValidate.customer })
        if (errorsValidate.typeCanvas) setError("typeCanvas", { message: errorsValidate.typeCanvas })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorsValidate])

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
                                // {...register("typeCanvas", { required: "Выберите модель полотна" })}
                                defaultValue = {typeCanvas.value}
                                onChange={handleTypeCanvas}                               
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
                                title="Тип отделки снаружи"
                                items={currentTypeOtdelkaOutsides}
                                optionValue="name"
                                optionName="name"
                                error={errors.typeOtdelkaOutside}
                                {...register("typeOtdelkaOutside", { required: "Выберите тип отделки снаружи" })}                                
                            />

                            <ItemWithSelect
                                title="Отделка снаружи"
                                items={currentOtdelkaOutsides}
                                optionValue="name"
                                optionName="name"
                                error={errors.otdelkaOutside}
                                {...register("otdelkaOutside", { required: "Выберите отделку снаружи" })}
                            />

                            <ItemWithSelect
                                title="Цвет пленки снаружи"
                                items={outsideWraps}
                                optionValue="name"
                                optionName="name"
                                error={errors.outsideWrap}
                                {...register("outsideWrap", { required: "Выберите цвет пленки снаружи" })}
                            />

                            <ItemWithSelect
                                title="Цвет патины снаружи"
                                items={outsidePatinas}
                                optionValue="name"
                                optionName="name"
                                error={errors.outsidePatina}
                                {...register("outsidePatina", { required: "Выберите цвет пленки снаружи" })}
                            />

                            <ItemWithSelect
                                title="Тип отделки внутри"
                                items={currentTypeOtdelkaInsides}
                                optionValue="name"
                                optionName="name"
                                error={errors.typeOtdeInside}
                                {...register("typeOtdeInside", { required: "Выберите тип отделки внутри" })}
                            />

                            <ItemWithSelect
                                title="Отделка внутри"
                                items={currentOtdelkaInsides}
                                optionValue="name"
                                optionName="name"
                                error={errors.otdelkaInside}
                                {...register("otdelkaInside", { required: "Выберите отделку внутри" })}
                            />

                            <ItemWithSelect
                                title="Цвет пленки внутри"
                                items={wrapInsides}
                                optionValue="name"
                                optionName="name"
                                error={errors.wrapInside}
                                {...register("wrapInside", { required: "Выберите цвет пленки внутри" })}
                            />

                            <ItemWithSelect
                                title="Цвет патины внутри"
                                items={patinaInsides}
                                optionValue="name"
                                optionName="name"
                                error={errors.patinaInside}
                                {...register("patinaInside", { required: "Выберите цвет пленки внутри" })}
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

                        <TabPane key="9" tab={<TabTitle>Еще что то</TabTitle>}>

                        </TabPane>

                        <TabPane key="10" tab={<TabTitle>Доп.</TabTitle>}>
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
                <Group>
                    <span>Основное</span>
                    <label>Заказчик: {fields.customer}</label>
                    <label>Модель полотна: {fields.typeCanvas}</label>
                    <label>Тип открывания: {fields.typeOpening}</label>
                    <label>Двустворчатая: {fields.isDoubleDoor ? "да" : "нет"}</label>
                    <label>Ширина раб. створки: {fields.widthDoubleDoor} мм</label>
                    <label>Толщина полотна: {fields.thicknessCanvas} мм</label>
                    <label>Количество контуров: {fields.countContour}</label>
                    <label>Модель коробки: {fields.modelBox}</label>
                    <label>Высота двери: {fields.height} мм</label>
                    <label>Ширина двери: {fields.width} мм</label>
                </Group>

                <Group>
                    <span>Фурнитура</span>
                    <label>Основной замок: {fields.mainLock}</label>
                    <label>Осн накладка снаружи: {fields.mainCoverOutside}</label>
                    <label>Осн накладка внутри: {fields.mainCoverInside}</label>
                    <label>Осн цилиндр: {fields.mainCylinder}</label>
                    <label>Глазок: {fields.peephole}</label>
                    <label>Расположение глазка: {fields.peepholeLocation}</label>
                    <label>Ручка: {fields.handle}</label>

                    <label>Доп. замок: {fields.optionalLock}</label>
                    <label>Доп накладка снаружи: {fields.optionalCoverOutside}</label>
                    <label>Доп накладка внутри: {fields.optionalCoverInside}</label>
                    <label>Доп цилиндр: {fields.optionalCylinder}</label>
                </Group>                

                <Group>
                    <span>Отделка снаружи</span>
                    <label>Тип отделки снаружи: {fields.typeOtdelkaOutside}</label>
                    <label>Отделка снаружи: {fields.otdelkaOutside}</label>
                    <label>Цвет пленки снаружи: {fields.outsideWrap}</label>
                    <label>Цвет патины снаружи: {fields.outsidePatina}</label>
                </Group>
                
                <Group>
                    <span>Отделка внутри</span>
                    <label>Тип отделки внутри: {fields.typeOtdeInside}</label>
                    <label>Отделка внутри: {fields.otdelkaInside}</label>
                    <label>Цвет пленки внутри: {fields.wrapInside}</label>
                    <label>Цвет патины внутри: {fields.patinaInside}</label>
                </Group>

                <Group>
                    <span>Стеклопакет</span>
                    <label>Вид: </label>
                    <label>Ковка </label>
                    <label>Мовка </label>
                </Group>

                <Group>
                    <span>Петли</span>
                    <label>Сторонность петель: {fields.hingeSide}</label>
                    <label>Сторонность петель: {fields.hingeCount} шт</label>
                    <label>Тип петель: {fields.hingeType}</label>
                </Group>
                
                <Group>
                    <span>Толщина металла</span>
                    <label>Толщина мет. полотна: {fields.metalCanvas} мм</label>
                    <label>Толщина мет. короба: {fields.metalBox} мм</label>
                </Group>                

                <Group>
                    <span>Дополнительные элементы</span>
                    <label>Уши: {fields.ear}</label>
                    <label>Отверстия в коробе: {fields.holeBox}</label>
                    <label>Упаковка: {fields.packaging}</label>
                </Group>

                <Group>
                    <span>Дополнительные элементы</span>
                    <li><label>Уши:</label><label> {fields.ear}</label></li>
                    <li><label>Отверстия в коробе:</label><label> {fields.holeBox}</label></li>
                    <li><label>Упаковка:</label><label> {fields.packaging}</label></li>                    
                </Group>
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
    width: 40%;    
    margin-left:20px;
    flex-wrap: wrap;
    max-height: 80vh;
`
const Group = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
    width: 48%;
    font-size: 11px;
    margin-bottom:10px;
    border: 1px solid #acafaf45;
    border-radius:3px;
    > * {
        margin-left: 5px;
    }
    > span {
        display: block;
        font-weight: bold;
        width: 100%;
        text-align:center;
    }  
`


const TabTitle = styled.span`
    font-size: 11px;   
`