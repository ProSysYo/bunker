import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { Tabs } from 'antd'
import { ItemWithSelect } from '../../components/ItemWithSelect/ItemWithSelect';
import { ItemWithCheck } from '../../components/ItemWithCheck/ItemWithCheck';
import { ItemWithTextbox } from '../../components/ItemWithTextbox/ItemWithTextbox';
import { ItemBasket } from '../../components/ItemBasket/ItemBasket';

const { TabPane } = Tabs

const typeOpenings = [{ _id: 1, name: "наружного" }, { _id: 2, name: "внутреннего" }]
//const thicknessCanvases = [{ _id: 1, name: "60" }, { _id: 2, name: "70" }, { _id: 3, name: "80" }, { _id: 4, name: "90" }, { _id: 5, name: "100" }]
const modelBoxes = [{ _id: 1, name: "открытая" }, { _id: 2, name: "закрытая" }, { _id: 3, name: "закрытая утепленная" }]
const metalCanvases = [{ _id: 1, value: "1" }, { _id: 2, value: "1,2" }, { _id: 3, value: "1,4" }]
const metalBoxes = [{ _id: 1, value: "1" }, { _id: 2, value: "1,2" }, { _id: 3, value: "1,4" }]
const hingeCounts = [{ _id: 1, value: "2" }, { _id: 2, value: "3" }]
//const allContours = [{ _id: 1, value: "1" }, { _id: 2, value: "2" }, { _id: 3, value: "3" }]
const ears = [{ _id: 1, name: "нет" }, { _id: 2, name: "80x40x6шт" }, { _id: 3, name: "100x40x8шт" }]
const holeBoxes = [{ _id: 1, name: "нет" }, { _id: 2, name: "10мм 6шт" }, { _id: 3, name: "10мм 8шт" }]

const typeCanvases = [
    { _id: 1, value: "ММ", description: "металл-металл", trimOutside: "металл", trimInside: "металл", contours: [1, 2, 3], doorThicks: [60, 70, 80, 90, 100] },
    { _id: 2, value: "МП", description: "металл-панель", trimOutside: "металл", trimInside: "панель", contours: [1, 2, 3], doorThicks: [60, 70, 80] },
    { _id: 3, value: "ПП", description: "панель-панель", trimOutside: "панель", trimInside: "панель", contours: [2, 3], doorThicks: [90, 100] },
]

const typeDecorations = [
    { _id: 1, name: "нет", type: "все", design: "нет", isInside: true, isOutside: true, isWrap: false, isPatina: false },
    { _id: 2, name: "давление на металле", type: "металл", design: "Д", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 3, name: "давл. на мет. с дек. элементами", type: "металл", design: "ДН", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 4, name: "давл. и резка с дек. элементами", type: "металл", design: "ДР", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 5, name: "накладные элменты на металле", type: "металл", design: "Н", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 6, name: "ков. элементы + стеклопакет", type: "металл", design: "КС", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 7, name: "лазер. резка + стеклопакет", type: "металл", design: "ЛС", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 8, name: "стеклопакет", type: "металл", design: "С", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 9, name: "металлофиленки", type: "металл", design: "Ф", isInside: false, isOutside: true, isWrap: false, isPatina: false },
    { _id: 10, name: "МДФ 6мм лам. б/фр.", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: true, isPatina: true },
    { _id: 11, name: "МДФ 6мм лам. фр.", type: "панель", design: "фрезеровка", isInside: true, isOutside: true, isWrap: true, isPatina: true },
    { _id: 12, name: "МДФ 10мм лам. б/фр.", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: true, isPatina: true },
    { _id: 13, name: "МДФ 10мм лам. фр.", type: "панель", design: "фрезеровка", isInside: true, isOutside: true, isWrap: true, isPatina: true },
    { _id: 14, name: "МДФ 16мм лам. б/фр.", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: true, isPatina: true },
    { _id: 15, name: "МДФ 16мм лам. фр.", type: "панель", design: "фрезеровка", isInside: true, isOutside: true, isWrap: true, isPatina: true },
    { _id: 16, name: "под панель 6мм", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: false, isPatina: false },
    { _id: 17, name: "под панель 10мм", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: false, isPatina: false },
    { _id: 18, name: "под панель 16мм", type: "панель", design: "нет", isInside: true, isOutside: true, isWrap: false, isPatina: false },
]

const decorations = [
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

const locks = [
    { _id: 1, name: "Г12.11с", type: "сувальда", isLatch: "", insertPlace: "основной" },
    { _id: 2, name: "Г12.12ц", type: "цилиндр", isLatch: "", insertPlace: "основной" },
    { _id: 3, name: "Кале 5566ц", type: "цилиндр", isLatch: "", insertPlace: "дополнительный" },
    { _id: 4, name: "Кале 6643с", type: "сувальда", isLatch: "", insertPlace: "дополнительный" },
]

export const OrderForm = () => {
    const { register, handleSubmit, setError, formState: { errors }, watch, setValue } = useForm()
    const order = {
        typeCanvas: "МП",
        countContour: 3,
        typeDecorationOutside: "стеклопакет",
        decorationOutside: "С2",
        doorThick: 70,
        wrapOutside: "нет",
        patinaOutside: "нет",
        typeDecorationInside: "МДФ 10мм лам. фр.",
        decorationInside: "ФЛ-1",
        wrapInside: "голден оак",
        patinaInside: "коричневая"

    }

    // const order = {
    //     typeCanvas: "",
    //     countContour: "",
    //     typeDecorationOutside: "",
    //     decorationOutside: "",
    //     doorThick: "",
    //     patinaOutside: "",
    // }

    //Количество контуров
    const [currentContours, setCurrentContours] = useState([])
    const [doorThicks, setDoorThicks] = useState([])

    //Отделка снаружи
    const [typeDecorationsOutside, setTypeDecorationsOutside] = useState([])
    const [decorationsOutside, setDecorationsOutside] = useState([])
    const [wrapsOutside, setWrapsOutside] = useState([])
    const [patinasOutside, setPatinasOutside] = useState([])

    //Отделка внутри
    const [typeDecorationsInside, setTypeDecorationsUnside] = useState([])
    const [decorationsInside, setDecorationsInside] = useState([])
    const [wrapsInside, setWrapsInside] = useState([])
    const [patinasInside, setPatinasInside] = useState([])

    //const dispatch = useDispatch()
    const customers = useSelector(state => state.customer.customers)
    const hingeSides = useSelector(state => state.hingeSide.hingeSides)
    const hingeTypes = useSelector(state => state.hingeType.hingeTypes)
    const peepholes = useSelector(state => state.peephole.peepholes)
    const peepholeLocations = useSelector(state => state.peepholeLocation.peepholeLocations)
    const packagings = useSelector(state => state.packaging.packagings)
    //const locks = useSelector(state => state.lock.locks)
    const covers = useSelector(state => state.cover.covers)
    const cylinders = useSelector(state => state.cylinder.cylinders)
    const handles = useSelector(state => state.handle.handles)
    const wraps = useSelector(state => state.wrap.wraps)
    //const errorsValidate = useSelector(state => state.packaging.errors)
    //const typeCanvases = useSelector(state => state.typeCanvas.typeCanvases)

    const fields = watch()

    //Начальная загрузка
    useEffect(() => {
        const loadFields = async () => {
            // await loadTypeDecorationOutsides(order.typeCanvas)
            // await loadCountContours(order.typeCanvas)
            await setValue("typeCanvas", order.typeCanvas)
            await setValue("countContour", order.countContour)
            await setValue("doorThick", order.doorThick)
            await setValue("typeDecorationOutside", order.typeDecorationOutside)
            await setValue("decorationOutside", order.decorationOutside)
            await setValue("wrapOutside", order.wrapOutside)
            await setValue("patinaOutside", order.patinaOutside)
            await setValue("typeDecorationInside", order.typeDecorationInside)
            await setValue("decorationInside", order.decorationInside)
            await setValue("wrapInside", order.wrapInside)
            await setValue("patinaInside", order.patinaInside)
        }
        loadFields()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //при изменении типа полотна
    useEffect(() => {
        if (fields.typeCanvas) {
            const selectedTypeCanvas = typeCanvases.find(item => item.value === fields.typeCanvas)

            let contours = []
            let thicks = []
            let typesOutside = []
            let typesInside = []

            if (selectedTypeCanvas) {
                contours = selectedTypeCanvas.contours
                thicks = selectedTypeCanvas.doorThicks
                typesOutside = typeDecorations.filter(item => item.type === selectedTypeCanvas.trimOutside || item.type === "все")
                typesInside = typeDecorations.filter(item => item.type === selectedTypeCanvas.trimInside || item.type === "все")
            }
            setCurrentContours(contours)
            setDoorThicks(thicks)
            setTypeDecorationsOutside(typesOutside)
            setTypeDecorationsUnside(typesInside)
        }
    }, [fields.typeCanvas, setValue])

    //при изменении количества контуров
    useEffect(() => {
        if (fields.countContour) {
            const searchCountContour = currentContours.find(item => Number(item) === Number(fields.countContour))

            if (searchCountContour) {
                setValue("countContour", fields.countContour)
            } else {
                setValue("countContour", "")
            }
        }
    }, [fields.countContour, setValue, currentContours])

    //при изменении толщины полотна
    useEffect(() => {
        if (fields.doorThick) {
            const searchThick = doorThicks.find(item => Number(item) === Number(fields.doorThick))

            if (searchThick) {
                setValue("doorThick", fields.doorThick)
            } else {
                setValue("doorThick", "")
            }
        }
    }, [fields.doorThick, setValue, doorThicks])

    //при изменении типа отделки снаружи
    useEffect(() => {
        let currentDecorations = []
        let currentWraps = []
        let currentPatinas = []
        if (fields.typeDecorationOutside) {
            const searchTypeDecoration = typeDecorationsOutside.find(item => item.name === fields.typeDecorationOutside)

            if (searchTypeDecoration) {
                setValue("typeDecorationOutside", fields.typeDecorationOutside)
                currentDecorations = decorations.filter(item => item.design === searchTypeDecoration.design)
                if (searchTypeDecoration.isWrap) {
                    currentWraps = wraps
                } else {
                    currentWraps = [{ name: "нет" }]
                }
                if (searchTypeDecoration.isPatina) {
                    currentPatinas = patinas
                } else {
                    currentPatinas = [{ name: "нет" }]
                }
            } else {
                setValue("typeDecorationOutside", "")
            }
        }
        setDecorationsOutside(currentDecorations)
        setWrapsOutside(currentWraps)
        setPatinasOutside(currentPatinas)

    }, [fields.typeDecorationOutside, setValue, typeDecorationsOutside, wraps])

    //при изменении отделки снаружи
    useEffect(() => {
        if (fields.decorationOutside) {
            const searchDecoration = decorationsOutside.find(item => item.name === fields.decorationOutside)

            if (searchDecoration) {
                setValue("decorationOutside", fields.decorationOutside)
            } else {
                setValue("decorationOutside", "")
            }
        }
    }, [fields.decorationOutside, setValue, decorationsOutside])
    
    //при изменении пленки снаружи
    useEffect(() => {
        if (fields.wrapOutside) {
            const searchWrap = wrapsOutside.find(item => item.name === fields.wrapOutside)

            if (searchWrap) {
                setValue("wrapOutside", fields.wrapOutside)
            } else {
                setValue("wrapOutside", "")
            }
        }
    }, [fields.wrapOutside, setValue, wrapsOutside])

    //при изменении патины снаружи
    useEffect(() => {
        if (fields.patinaOutside) {
            const searchPatina = patinasOutside.find(item => item.name === fields.patinaOutside)

            if (searchPatina) {
                setValue("patinaOutside", fields.patinaOutside)
            } else {
                setValue("patinaOutside", "")
            }
        }
    }, [fields.patinaOutside, setValue, patinasOutside])

    //при изменении типа отделки внутри
    useEffect(() => {        
        let currentDecorations = []
        let currentWraps = []
        let currentPatinas = []
        if (fields.typeDecorationInside) {            
            const searchTypeDecoration = typeDecorationsInside.find(item => item.name === fields.typeDecorationInside)

            if (searchTypeDecoration) {
                setValue("typeDecorationInside", fields.typeDecorationInside)
                currentDecorations = decorations.filter(item => item.design === searchTypeDecoration.design)
                if (searchTypeDecoration.isWrap) {
                    currentWraps = wraps
                } else {
                    currentWraps = [{ name: "нет" }]
                }
                if (searchTypeDecoration.isPatina) {
                    currentPatinas = patinas
                } else {
                    currentPatinas = [{ name: "нет" }]
                }
            } else {
                setValue("typeDecorationInside", "")
            }
        }
        setDecorationsInside(currentDecorations)
        setWrapsInside(currentWraps)
        setPatinasInside(currentPatinas)        
    }, [fields.typeDecorationInside, setValue, typeDecorationsInside, wraps])
   
    //при изменении отделки внутри
    useEffect(() => {        
        if (fields.decorationInside) {
            const searchDecoration = decorationsInside.find(item => item.name === fields.decorationInside)

            if (searchDecoration) {
                setValue("decorationInside", fields.decorationInside)
            } else {
                setValue("decorationInside", "")
            }
        }
    }, [fields.decorationInside, setValue, decorationsInside])

    //при изменении пленки внутри
    useEffect(() => {        
        if (fields.wrapInside) {
            const searchWrap = wrapsInside.find(item => item.name === fields.wrapInside)

            if (searchWrap) {
                setValue("wrapInside", fields.wrapInside)
            } else {
                setValue("wrapInside", "")
            }
        }
    }, [fields.wrapInside, setValue, wrapsInside])

    //при изменении патины внутри
    useEffect(() => {
        if (fields.patinaInside) {
            const searchPatina = patinasInside.find(item => item.name === fields.patinaInside)

            if (searchPatina) {
                setValue("patinaInside", fields.patinaInside)
            } else {
                setValue("patinaInside", "")
            }
        }
    }, [fields.patinaInside, setValue, patinasInside])

    const onSubmit = (data, e) => {
        e.preventDefault()
    }
    return (
        <Wrapper>
            <FormWrap>
                {/* <Title>Новый заказ</Title> */}
                <Form onSubmit={handleSubmit(onSubmit)}>                    
                    <StyledTabs defaultActiveKey="1" tabPosition="top" size="small">
                        <TabPane key="1" tab={<TabTitle>Основное</TabTitle>}>
                            <div>
                                <FormItem>
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
                                        defaultValue={order.typeCanvas}
                                        {...register("typeCanvas", { required: "Выберите модель полотна" })}

                                    />
                                </FormItem>

                                <FormItem>
                                    <ItemWithSelect
                                        title="Количество контуров:"
                                        items={currentContours}
                                        error={errors.countContour}
                                        {...register("countContour", { required: "Выберите количество конутров" })}
                                    />

                                    <ItemWithSelect
                                        title="Толщина полотна:"
                                        items={doorThicks}
                                        error={errors.doorThick}
                                        {...register("doorThick", { required: "Выберите толщину полотна" })}
                                    />
                                </FormItem>

                                <FormItem>
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
                                </FormItem>


                                <FormItem>
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
                                </FormItem>

                                <FormItem>
                                    <ItemWithCheck
                                        title="Двустворчатая"
                                        {...register("isDoubleDoor")}
                                    />

                                    <ItemWithTextbox
                                        title="Ширина створки:"
                                        placeholder="Введите ширину"
                                        disabled={!fields.isDoubleDoor}
                                        error={errors.widthDoubleDoor}
                                        {...register("widthDoubleDoor", { required: "Введите ширину створки" })}
                                    />
                                </FormItem>

                            </div>


                        </TabPane>

                        <TabPane key="2" tab={<TabTitle>Фурнитура</TabTitle>}>
                            <FormItem>
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
                            </FormItem>
                                
                            <FormItem>
                                <ItemWithSelect
                                    title="Ручка:"
                                    items={handles}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.handle}
                                    {...register("handle", { required: "Выберите ручку" })}
                                />
                            </FormItem>
                            
                            <FormItem>
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
                            </FormItem>
                            
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
                            <FormItem>
                                <ItemWithSelect
                                    title="Тип отделки снаружи"
                                    items={typeDecorationsOutside}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.typeDecorationOutside}
                                    {...register("typeDecorationOutside", { required: "Выберите тип отделки снаружи" })}
                                />

                                <ItemWithSelect
                                    title="Отделка снаружи"
                                    items={decorationsOutside}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.decorationOutside}
                                    {...register("decorationOutside", { required: "Выберите отделку снаружи" })}
                                />
                            </FormItem>
                            
                            <FormItem>
                                <ItemWithSelect
                                    title="Цвет пленки снаружи"
                                    items={wrapsOutside}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.wrapOutside}
                                    {...register("wrapOutside", { required: "Выберите цвет пленки снаружи" })}
                                />

                                <ItemWithSelect
                                    title="Цвет патины снаружи"
                                    items={patinasOutside}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.patinaOutside}
                                    {...register("patinaOutside", { required: "Выберите цвет патины снаружи" })}
                                />
                            </FormItem>
                            
                            <FormItem>
                                <ItemWithSelect
                                    title="Тип отделки внутри"
                                    items={typeDecorationsInside}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.typeDecorationInside}
                                    {...register("typeDecorationInside", { required: "Выберите тип отделки внутри" })}
                                />

                                <ItemWithSelect
                                    title="Отделка внутри"
                                    items={decorationsInside}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.decorationInside}
                                    {...register("decorationInside", { required: "Выберите отделку внутри" })}
                                />
                            </FormItem>
                            
                            <FormItem>
                                <ItemWithSelect
                                    title="Цвет пленки внутри"
                                    items={wrapsInside}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.wrapInside}
                                    {...register("wrapInside", { required: "Выберите цвет пленки внутри" })}
                                />

                                <ItemWithSelect
                                    title="Цвет патины внутри"
                                    items={patinasInside}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.patinaInside}
                                    {...register("patinaInside", { required: "Выберите цвет пленки внутри" })}
                                />
                            </FormItem>
                            
                        </TabPane>

                        <TabPane key="6" tab={<TabTitle>Металл</TabTitle>}>
                            <FormItem>
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
                            </FormItem>
                            
                        </TabPane>

                        <TabPane key="7" tab={<TabTitle>Петли</TabTitle>}>
                            <FormItem>
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
                            </FormItem>
                            
                            <FormItem>
                                <ItemWithSelect
                                    title="Тип петель:"
                                    items={hingeTypes}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.hingeType}
                                    {...register("hingeType", { required: "Выберите тип петель" })}
                                />
                            </FormItem>
                            
                        </TabPane>

                        <TabPane key="8" tab={<TabTitle>Стеклопакет</TabTitle>}>
                        </TabPane>

                        <TabPane key="9" tab={<TabTitle>Доп.</TabTitle>}>
                            <FormItem>
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
                            </FormItem>

                            <FormItem>
                                <ItemWithSelect
                                    title="Упаковка:"
                                    items={packagings}
                                    optionValue="name"
                                    optionName="name"
                                    error={errors.packaging}
                                    {...register("packaging", { required: "Выберите упаковку" })}
                                />
                            </FormItem>
                            

                            
                        </TabPane>
                    </StyledTabs>
                    <FormItem>
                        <button type="submit">Добавить</button>
                        <button >Сохранить как шаблон</button>
                        <button >Загрузить шаблон</button>
                    </FormItem>
                </Form>
                
            </FormWrap>
            <Basket>
                <Group>
                    <span>Основное</span>
                    <ItemBasket title="Заказчик" value={fields.customer} />
                    <ItemBasket title="Модель полотна" value={fields.typeCanvas} />
                    <ItemBasket title="Количество контуров" value={fields.countContour} />
                    <ItemBasket title="Толщина полотна" value={fields.doorThick} />
                    <ItemBasket title="Двустворчатая" value={fields.isDoubleDoor ? "да" : "нет"} />
                    <ItemBasket title="Ширина раб. створки" value={fields.widthDoubleDoor} />
                    <ItemBasket title="Тип открывания" value={fields.typeOpening} />
                    <ItemBasket title="Модель коробки" value={fields.modelBox} />
                    <ItemBasket title="Высота двери" value={fields.height} />
                    <ItemBasket title="Ширина двери" value={fields.width} />
                </Group>

                <Group>
                    <span>Фурнитура</span>
                    <ItemBasket title="Основной замок" value={fields.mainLock} />
                    <ItemBasket title="Осн накладка снаружи" value={fields.mainCoverOutside} />
                    <ItemBasket title="Осн накладка внутри" value={fields.mainCoverInside} />
                    <ItemBasket title="Осн цилиндр" value={fields.mainCylinder} />
                    <ItemBasket title="Глазок" value={fields.peephole} />
                    <ItemBasket title="Расположение глазка" value={fields.peepholeLocation} />
                    <ItemBasket title="Ручка" value={fields.handle} />
                    <ItemBasket title="Доп. замок" value={fields.optionalLock} />
                    <ItemBasket title="Доп накладка снаружи" value={fields.optionalCoverOutside} />
                    <ItemBasket title="Доп накладка внутри" value={fields.optionalCoverInside} />
                    <ItemBasket title="Доп цилиндр" value={fields.optionalCylinder} />
                </Group>

                <Group>
                    <span>Отделка снаружи</span>
                    <ItemBasket title="Тип отделки снаружи" value={fields.typeDecorationOutside} />
                    <ItemBasket title="Отделка снаружи" value={fields.decorationOutside} />
                    <ItemBasket title="Цвет пленки снаружи" value={fields.wrapOutside} />
                    <ItemBasket title="Цвет патины снаружи" value={fields.patinaOutside} />
                </Group>

                <Group>
                    <span>Отделка внутри</span>
                    <ItemBasket title="Тип отделки внутри" value={fields.typeDecorationInside} />
                    <ItemBasket title="Отделка внутри" value={fields.decorationInside} />
                    <ItemBasket title="Цвет пленки внутри" value={fields.wrapInside} />
                    <ItemBasket title="Цвет патины внутри" value={fields.patinaInside} />
                </Group>

                <Group>
                    <span>Стеклопакет</span>
                    <ItemBasket title="Вид" value="" />
                    <ItemBasket title="Ковка" value="" />
                </Group>

                <Group>
                    <span>Петли</span>
                    <ItemBasket title="Сторонность петель" value={fields.hingeSide} />
                    <ItemBasket title="Количество петель" value={fields.hingeCount} />
                    <ItemBasket title="Тип петель" value={fields.hingeType} />
                </Group>

                <Group>
                    <span>Толщина металла</span>
                    <ItemBasket title="Толщина мет. полотна" value={fields.metalCanvas} />
                    <ItemBasket title="Толщина мет. короба" value={fields.metalBox} />
                </Group>

                <Group>
                    <span>Дополнительные элементы</span>
                    <ItemBasket title="Уши" value={fields.ear} />
                    <ItemBasket title="Отверстия в коробе" value={fields.holeBox} />
                    <ItemBasket title="Упаковка" value={fields.packaging} />
                </Group>
            </Basket>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;    
    justify-content: center;   
    margin-top: 50px;
        
`

// const Title = styled.h2`
//     text-align: center;    
// `
const FormWrap = styled.div`    
    width: 50%;    
    height:60vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    margin-left:100px;
    
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;    
    margin-right: 20px;
    height:100%;   
`

const FormItem = styled.div`    
    position: relative;    
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: flex-start;
    
    > * {
        margin-left: 20px;        
    } 
`

const Basket = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
    width: 50%;    
    margin-left:20px;
    flex-wrap: wrap;
    max-height: 70vh;
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

const StyledTabs = styled(Tabs)`
    height: 100%;
`