import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {useFormik} from "formik";
import axios from "axios";

function Credit() {
    const formik = useFormik({
        initialValues:{
            fullName: "",
            pasSerNum: "",
            issuedBy:"",
            issuedDate: "",
            regInfo: "",
            age: '',
            criminalRecord: "",
            amount: '',
            target: "",
            employment: "",
            otherCredits: "",
            deposit: "",

        },validationSchema: yup.object({
            fullName: yup.string().required("*").matches(/([А-ЯЁ][а-яё]+[\-\s]?){3,}/, "Не корректно введено Ф.И.О").max(50),
            pasSerNum: yup.string().required("*").matches(/\d{4}\s\d{6}/, "Не корректные данные").max(11, "Не корректные данные"),
            issuedBy: yup.string().min(10, "Слишком коротко").required("*").max(50),
            issuedDate: yup.string().required("*"),
            regInfo: yup.string().required("*").max(50),
            age: yup.number().min(21, "Не подходящий возраст").required("*").max(50),
            criminalRecord: yup.string().required("*").max(50),
            amount: yup.number().required("*").min(0).max(20000000),
            target: yup.string().required("*").max(50),
            employment: yup.string().required("*").max(50),
            otherCredits: yup.string().required("*").max(50),
            deposit: yup.string().required("*").max(50),

        }),
        onSubmit: ({fullName,pasSerNum,issuedBy,issuedDate,regInfo,age,amount,target,employment,otherCredits,deposit}) => {
            const passportData = `${pasSerNum} ${issuedBy} ${issuedDate} ${regInfo}`
            const isOtherCreditsExists = otherCredits == "Да" ? true : false;
            const checkCredit = async () => {
                try {
                    let body = JSON.stringify({
                        fullName:fullName,
                        passport:passportData,
                        age:age,
                        amount:amount,
                        target:target,
                        employment:employment,
                        isOtherCreditsExists : isOtherCreditsExists,
                        deposit: deposit});
                    console.log(body);
                    const response = await axios.post(
                        "/Credit/niggers",
                        {
                            fullName:fullName,
                            passportData:passportData,
                            age:age,
                            amount:amount,
                            target:target,
                            employment:employment,
                            isOtherCreditsExists : isOtherCreditsExists,
                            deposit: deposit
                        }
                    )
                     alert(`${response.data.message} \n ${response.data.summ}`)
                } catch (e) {
                    alert(e);
                }
            }
            checkCredit()
        }
    })

    useEffect(()=> {

    })


    return (
        <div className="position-absolute start-50">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
    <div className="h1">Мгновенный кредит</div>

    <input
    className="input mt-3"
    placeholder="Ф.И.О."
    name="fullName"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.fullName}
    autoComplete="off"
    />

    <div className="text-danger">
        {formik.touched.fullName && formik.errors.fullName ? (
                formik.errors.fullName
            ) : null}
        </div>

        <div className="mt-3">
    <input
        className="input mt-3"
    type="text"
    placeholder="Возраст"
    name="age"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.age}
    autoComplete="off"
        />
        </div>
        <div className="text-danger">
        {formik.touched.age && formik.errors.age ? (
                formik.errors.age
            ) : null}
        </div>
        <div className="horizontal">
    <input
        className="input mt-3"
    type="text"
    placeholder="Серия и номер паспорта"
    name="pasSerNum"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.pasSerNum}
    autoComplete="off"
    />

    <div className="text-danger">
        {formik.touched.pasSerNum && formik.errors.pasSerNum ? (
                formik.errors.pasSerNum
            ) : null}
        </div>

        <input
    className="input mt-3"
    type="text"
    placeholder="Кем выдан"
    name="issuedBy"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.issuedBy}
    autoComplete="off"
    />
    <div className="text-danger">
        {formik.touched.issuedBy && formik.errors.issuedBy ? (
                formik.errors.issuedBy
            ) : null}
        </div>
        </div>
        <div className="horizontal">
    <input
        className="input mt-3"
    type="date"
    placeholder="Дата выдачи"
    name="issuedDate"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.issuedDate}
    autoComplete="off"
    />

    <div className="text-danger">
        {formik.touched.issuedDate && formik.errors.issuedDate ? (
                formik.errors.issuedDate
            ) : null}
        </div>
        <input
    className="input mt-3"
    type="text"
    placeholder="Информация о прописке"
    name="regInfo"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.regInfo}
    autoComplete="off"
    />
    <div className="text-danger">
        {formik.touched.regInfo && formik.errors.regInfo ? (
                formik.errors.regInfo
            ) : null}
        </div>
        </div>
        <select
    className="input mt-3"
    placeholder="Трудоустройство"
    name="employment"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.employment}
    >
    <option value="" label='Статус работы...'> </option>
        <option value="Трудоустроен по трудовому договору">Трудоустроен по трудовому договору</option>
    <option value="Собственное ИП">Собственное ИП</option>
    <option value="Фрилансер">Фрилансер</option>
        <option value="Пенсионер">Пенсионер</option>
        <option value="Безработный">Безработный</option>
        </select>

        <div className="text-danger">
        {formik.touched.employment && formik.errors.employment ? (
                formik.errors.employment
            ) : null}
        </div>
        <input
    className="input mt-3"
    type="text"
    placeholder="Сумма кредита"
    name="amount"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.amount}
    autoComplete="off"
    />

    <div className="text-danger">
        {formik.touched.amount && formik.errors.amount ? (
                formik.errors.amount
            ) : null}
        </div>
        <select
    className="input mt-3"
    placeholder="Цель"
    name="target"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.target}
    >
    <option value="" label="Выберите цель..."></option>
        <option value="Потребительский кредит">Потребительский кредит</option>
    <option value="Недвижимость">Недвижимость</option>
        <option value="Перекредитование">Перекредитование</option>
        </select>

        <div className="text-danger">
        {formik.touched.target && formik.errors.target ? (
                formik.errors.target
            ) : null}
        </div>

        <select
    className="input mt-3"
    placeholder="Сведения о судимости"
    name="criminalRecord"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.criminalRecord}
    >
    <option value="" label="Сведения..."></option>
        <option value="Есть справка об отсутствии судимости">Есть справка об отсутствии судимости</option>
    <option value="Нет справки">Нет справки</option>
    </select>

    <div className="text-danger">
        {formik.touched.criminalRecord && formik.errors.criminalRecord ? (
                formik.errors.criminalRecord
            ) : null}
        </div>

        <select
    className="input  mt-3"
    placeholder="Наличие других кредитов"
    name="otherCredits"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.otherCredits}
    >
    <option value="" label="Наличие других кредитов..."></option>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
        </select>

        <div className="text-danger">
        {formik.touched.otherCredits && formik.errors.otherCredits ? (
                formik.errors.otherCredits
            ) : null}
        </div>

        <select
    className="input mt-3"
    placeholder="Залог"
    name="deposit"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.deposit}
    >
    <option value="" label="Залог..."></option>
        <option value="Недвижимость">Недвижимость</option>
        <option value="Автомобиль">Автомобиль старше 3-х лет</option>
    <option value="Автомобиль">Автомобиль младше 3-х лет</option>
    <option value="Поручительство">Поручительство</option>
        </select>

        <div className="text-danger">
        {formik.touched.deposit && formik.errors.deposit ? (
                formik.errors.deposit
            ) : null}
        </div>

        <button type="submit" className="btn btn-success mt-3 ms-3" onClick={() => {

    }}> Submit
    </button>

    <button type="reset" className="btn btn-warning mt-3 ms-3" onClick={() => {
        formik.resetForm();
    }}> Reset
    </button>

    </form>
    </div>
);
}

export default Credit;