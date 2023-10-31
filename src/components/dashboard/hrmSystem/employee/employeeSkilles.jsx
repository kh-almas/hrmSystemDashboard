import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const EmployeeContact = ({setProcessData, setIconWithTab, processData}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();

    const EmployeeSkillesInformation = data => {
        const abs = {...processData, ...data}
        setProcessData({ ...abs });
        const finalData = { ...abs }

        console.log("this is fine", finalData);
        if(
            !finalData.job_code ||
            !finalData.first_name ||
            !finalData.email ||
            !finalData.phone ||
            !finalData.employee_type ||
            !finalData.department_id ||
            !finalData.section_id ||
            !finalData.company_id ||
            !finalData.branch_id ||
            !finalData.shift_id
        ){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Employee ID, First Name, Email, Phone, Employee Type, Company, Department, Section, Branch, Shift is required',
                showConfirmButton: false,
                timer: 3500
            })
        }else {
            const formData = new FormData();

            const appendToFormData = (object, parentKey) => {
                for (let key in object) {
                    if (key === 'cv' || key === 'image') {
                        if (object[key][0]) {
                            formData.append(key, object[key][0]);
                        }
                    } else if(key === 'contact'){
                        formData.append(key, JSON.stringify(object[key]));
                    } else {
                        formData.append(key, object[key]);
                    }
                }
            }
            appendToFormData(finalData);

            axios.post('/hrm-system/employee', formData)
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
                    reset();
                    // navigate("/dashboard/hrm/employee");
                })
                .catch(e => {
                    console.log(e);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `something wrong`,
                    })
                })
        }
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
                    ></textarea>
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mt-2"
                            style={{width: "max-content", marginLeft: "auto", marginBottom: "30px"}}
                            type="submit">
                        Create
                    </button>
                </div>
            </form>
        </>
    );
};

export default EmployeeContact;