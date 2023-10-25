import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "../../../../../axios";
import Swal from "sweetalert2";

const EmployeeContact = ({setProcessData, setIconWithTab, processData, employeeData, toggle}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();

    // console.log("skills",employeeData?.skills)
    // useEffect(() => {
    //     reset()
    // }, [employeeData]);
    const EmployeeSkillesInformation = data => {
        setProcessData({ ...processData, skill: data });
        const finalData = { ...processData, skill: data }

        // console.log("this is fine", finalData);

        const formData = new FormData();


        const appendToFormData = (object, parentKey) => {
            // console.log(object, parentKey);
            for (let key in object) {
                if (object.hasOwnProperty(key)) {
                    const value = object[key];
                    const currentKey = parentKey ? `${parentKey}[${key}]` : key;

                    // console.log(currentKey);
                    if(currentKey !== "basicInfo[image][0]" && currentKey !== "basicInfo[cv][0]" && currentKey !== "contact"){
                        if (typeof value === 'object' && !Array.isArray(value)) {
                            appendToFormData(value, currentKey);
                        } else if (Array.isArray(value)) {
                            value.forEach((item, index) => {
                                appendToFormData({ [index]: item }, `${currentKey}[${index}]`);
                            });
                        } else {
                            // console.log(currentKey, value);
                            formData.append(currentKey, value);
                        }
                    }else{
                        if(currentKey === "contact"){
                            console.log("akjsdhfi", currentKey, JSON.stringify(value));
                            formData.append(currentKey, JSON.stringify(value));
                        }else if(currentKey === "basicInfo[image][0]"){
                            formData.append('image', value);
                        }else{
                            formData.append('cv', value);
                        }
                        // console.log(value);

                    }
                }
            }
        };


        // console.log(...formData);

        const processed = appendToFormData(finalData);

        axios.patch(`/hrm-system/employee/${employeeData?.id}`, formData)
            .then(info => {
                if (info?.status == 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // console.log("got the result",info);
                }
                toggle()
                // navigate("/dashboard/hrm/employee");
            })
            .catch(e => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message}`,
                })
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit(EmployeeSkillesInformation)} className="mt-3">
                <div className="form-group mb-0">
                    <label htmlFor="exampleFormControlTextarea4">
                        Skills
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea4"
                        rows="5"
                        {...register("skills")}
                        defaultValue={employeeData?.skills}
                    ></textarea>

                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mt-2"
                            style={{width: "max-content", marginLeft: "auto", marginBottom: "30px"}}
                            type="submit">
                        Update
                    </button>
                </div>
            </form>
        </>
    );
};

export default EmployeeContact;