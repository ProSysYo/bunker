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
const typeOtdelkaOutsides = [
    { _id: 1, name: "нет", type: "все", design: "нет" },
    { _id: 2, name: "давление на металле", type: "металл", design: "Д" },
    { _id: 3, name: "давл. на мет. с дек. элементами", type: "металл", design: "ДН" },
    { _id: 4, name: "давл. и резка с дек. элементами", type: "металл", design: "ДР" },
    { _id: 5, name: "накладные элменты на металле", type: "металл", design: "Н" },
    { _id: 6, name: "ков. элементы + стеклопакет", type: "металл", design: "КС" },
    { _id: 7, name: "лазер. резка + стеклопакет", type: "металл", design: "ЛС" },
    { _id: 8, name: "стеклопакет", type: "металл", design: "С" },
    { _id: 9, name: "металлофиленки", type: "металл", design: "Ф" },
    { _id: 10, name: "МДФ 6мм лам. б/фр.", type: "панель", design: "нет" },
    { _id: 11, name: "МДФ 6мм лам. фр.", type: "панель", design: "фрезеровка" },
    { _id: 12, name: "МДФ 10мм лам. б/фр.", type: "панель", design: "нет" },
    { _id: 13, name: "МДФ 10мм лам. фр.", type: "панель", design: "фрезеровка" },
    { _id: 14, name: "МДФ 16мм лам. б/фр.", type: "панель", design: "нет" },
    { _id: 15, name: "МДФ 16мм лам. фр.", type: "панель", design: "фрезеровка" },
    { _id: 16, name: "под панель 6мм", type: "панель", design: "нет" },
    { _id: 17, name: "под панель 10мм", type: "панель", design: "нет" },
    { _id: 18, name: "под панель 16мм", type: "панель", design: "нет" },
]

const otdelkaOutsides = [
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
    const [filterTypeOtdelkaOutsides, setFilterTypeOtdelkaOutsides] = useState([])
    const [filterOtdelkaOutsides, setFilterOtdelkaOutsides] = useState([])
    const [currentOutsideWraps, setCurrentOutsideWraps] = useState([])
    const [currentOusidePatinas, setCurrentOusidePatinas] = useState([])

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
    
    useEffect(() => {
        if (fields.typeCanvas) {
            //ищем выбранную модель полотна
            const selectedTypeCanvas = typeCanvases.find(item => item.value === fields.typeCanvas)

            //фильтруем типы отделок снаружи, доступные выбранной модели полотна            
            setFilterTypeOtdelkaOutsides(typeOtdelkaOutsides.filter(item => item.type === selectedTypeCanvas.trimOutside || item.type === "все"))
            setValue("typeOtdelkaOutside", "")//Сбрасываем выбор типа отделки снаружи

            setFilterOtdelkaOutsides([]) //обнуляем список отделок снаружи           
            setValue("otdelkaOutside", "") //обнуляем выбранную отделку снаружи

            //если снаружи выбранной модели полотна ПАНЕЛЬ
            if (selectedTypeCanvas.trimOutside === "панель") {
                setCurrentOutsideWraps(wraps)//загружаем список пленок снаружи                
                setValue("outsideWrap", "")//обнуляем выбранную пленку снаружи

                setCurrentOusidePatinas(patinas)//загружаем список патин снаружи                
                setValue("outsidePatina", "")//обнуляем выбранную патину снаружи
            } else {
                setCurrentOutsideWraps(wraps.filter(item => item.name === "нет"))//пленки для металла не доступны, оставляем в пленках только НЕТ
                setValue("outsideWrap", "нет") //устанавливаем пленке снаружи значение НЕТ               

                setCurrentOusidePatinas(patinas.filter(item => item.name === "нет"))//патины для металла не доступны, оставляем в списке патин только НЕТ                
                setValue("outsidePatina", "нет")//устанавливаем патине снаружи значение НЕТ
            }
        }
    }, [typeCanvases, fields.typeCanvas, setValue, wraps]) //при измененении полотна

    
    useEffect(() => {
        if (fields.typeOtdelkaOutside) {
            const selectedTypeOtdelkaOutside = filterTypeOtdelkaOutsides.find(item => item.name === fields.typeOtdelkaOutside)
            setFilterOtdelkaOutsides(otdelkaOutsides.filter(item => item.design === selectedTypeOtdelkaOutside.design))
            setValue("otdelkaOutside", "")//обнуляем выбранную отделку снаружи
        }
    }, [fields.typeOtdelkaOutside, filterTypeOtdelkaOutsides, setValue]) //при изменении типа отделки снаружи


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
                                title="Тип отделки снаружи"
                                items={filterTypeOtdelkaOutsides}
                                optionValue="name"
                                optionName="name"
                                error={errors.typeOtdelkaOutside}
                                {...register("typeOtdelkaOutside", { required: "Выберите тип отделки снаружи" })}
                            />

                            <ItemWithSelect
                                title="Отделка снаружи"
                                items={filterOtdelkaOutsides}
                                optionValue="name"
                                optionName="name"
                                error={errors.otdelkaOutside}
                                {...register("otdelkaOutside", { required: "Выберите отделку снаружи" })}
                            />

                            <ItemWithSelect
                                title="Цвет пленки снаружи"
                                items={currentOutsideWraps}
                                optionValue="name"
                                optionName="name"
                                error={errors.outsideWrap}
                                {...register("outsideWrap", { required: "Выберите цвет пленки снаружи" })}
                            />

                            <ItemWithSelect
                                title="Цвет патины снаружи"
                                items={currentOusidePatinas}
                                optionValue="name"
                                optionName="name"
                                error={errors.outsidePatina}
                                {...register("outsidePatina", { required: "Выберите цвет пленки" })}
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
                <span>-----------Основное-----------</span>
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
                
                <br />
                <span>----------Фурнитура-----------</span>
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

                <br />
                <span>------Отделка снаружи-------</span>
                {fields.typeOtdelkaOutside && <label>Тип отделки снаружи: {fields.typeOtdelkaOutside}</label>}
                {fields.otdelkaOutside && <label>Отделка снаружи: {fields.otdelkaOutside}</label>}
                {fields.outsideWrap && <label>Цвет пленки снаружи: {fields.outsideWrap}</label>}
                {fields.outsidePatina && <label>Цвет патины снаружи: {fields.outsidePatina}</label>}

                <br />
                <span>-----------Петли-----------</span>
                {fields.hingeSide && <label>Сторонность петель: {fields.hingeSide}</label>}
                {fields.hingeCount && <label>Сторонность петель: {fields.hingeCount} шт</label>}
                {fields.hingeType && <label>Тип петель: {fields.hingeType}</label>}
                
                <br />
                <span>-----------Толщина металла--------</span>
                {fields.metalCanvas && <label>Толщина мет. полотна: {fields.metalCanvas} мм</label>}
                {fields.metalBox && <label>Толщина мет. короба: {fields.metalBox} мм</label>}

                <br />
                <span>---------Дополнительные элементы-----------</span>
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
    font-size: 10px;
`

const TabTitle = styled.span`
    font-size: 11px;
`