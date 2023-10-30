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
        const abs = {...processData, ...data}
        setProcessData({ ...abs });
        const finalData = { ...abs }
        // console.log('finalData', finalData)
        const nameTitle = finalData.name_title ? finalData.name_title : employeeData.name_title;
        const firstName = finalData.first_name ? finalData.first_name : employeeData.first_name;
        const lastName = finalData.last_name ? finalData.last_name : employeeData.last_name;
        const fullName = `${nameTitle} ${firstName} ${lastName}`;

        const updatedData = {
            'name_title': nameTitle,
            'first_name': firstName,
            'last_name': lastName,
            'full_name': fullName,
            'branch_id': finalData.branch_id ? finalData.branch_id : employeeData.branch_id,
            'department_id': finalData.department_id ? finalData.department_id : employeeData.department_id,
            'section_id': finalData.section_id ? finalData.section_id : employeeData.section_id,
            'employee_grade_id': finalData.employee_grade_id ? finalData.employee_grade_id : employeeData.employee_grade_id,
            'salary_grade_id': finalData.salary_grade_id ? finalData.salary_grade_id : employeeData.salary_grade_id,
            'shift_id': finalData.shift_id ? finalData.shift_id : employeeData.shift_id,
            'status': finalData.status ? finalData.status : employeeData.status,
            'gender': finalData.gender ? finalData.gender : employeeData.gender,
            'employee_type': finalData.employee_type ? finalData.employee_type : employeeData.employee_type,
            'job_code': finalData.job_code ? finalData.job_code : employeeData.job_code,
            'email': finalData.email ? finalData.email : employeeData.email,
            'phone': finalData.phone ? finalData.phone : employeeData.phone,
            'father_name': finalData.father_name ? finalData.father_name : employeeData.father_name,
            'mother_name': finalData.mother_name ? finalData.mother_name : employeeData.mother_name,
            'spouse_name': finalData.spouse_name ? finalData.spouse_name : employeeData.spouse_name,
            'card_no': finalData.card_no ? finalData.card_no : employeeData.card_no,
            'date_of_birth': finalData.date_of_birth ? finalData.date_of_birth : employeeData.date_of_birth,
            'joining_date': finalData.joining_date ? finalData.joining_date : employeeData.joining_date,
            'emp_machine_id': finalData.emp_machine_id ? finalData.emp_machine_id : employeeData.emp_machine_id,
            'website': finalData.website ? finalData.website : employeeData.website,
            'skills': finalData.skills ? finalData.skills : employeeData.skills,
            'contact': finalData.contact,
            'cv': finalData.cv,
            'image': finalData.image,
            'old_cv': employeeData.cv ? employeeData.cv : '',
            'old_image': employeeData.img ? employeeData.img : '',
        }

        const formData = new FormData();

        const appendToFormData = (object, parentKey) => {
            for (let key in object) {
                // console.log(key, object[key]);
                if (key === 'cv' || key === 'image') {
                    if (object[key]) {
                        formData.append(key, object[key][0]);
                    }
                } else if(key === 'contact'){
                    formData.append(key, JSON.stringify(object[key]));
                } else {
                    formData.append(key, object[key]);
                }
            }
        }
        console.log('updatedData',updatedData);

        appendToFormData(updatedData);

        // console.log('updatedData', updatedData)

        // console.log("this is fine", finalData);

        // const formData = new FormData();


        // const appendToFormData = (object, parentKey) => {
        //     // console.log(object, parentKey);
        //     for (let key in object) {
        //         if (object.hasOwnProperty(key)) {
        //             const value = object[key];
        //             const currentKey = parentKey ? `${parentKey}[${key}]` : key;
        //
        //             // console.log(currentKey);
        //             if(currentKey !== "basicInfo[image][0]" && currentKey !== "basicInfo[cv][0]" && currentKey !== "contact"){
        //                 if (typeof value === 'object' && !Array.isArray(value)) {
        //                     appendToFormData(value, currentKey);
        //                 } else if (Array.isArray(value)) {
        //                     value.forEach((item, index) => {
        //                         appendToFormData({ [index]: item }, `${currentKey}[${index}]`);
        //                     });
        //                 } else {
        //                     // console.log(currentKey, value);
        //                     formData.append(currentKey, value);
        //                 }
        //             }else{
        //                 if(currentKey === "contact"){
        //                     console.log("akjsdhfi", currentKey, JSON.stringify(value));
        //                     formData.append(currentKey, JSON.stringify(value));
        //                 }else if(currentKey === "basicInfo[image][0]"){
        //                     formData.append('image', value);
        //                 }else{
        //                     formData.append('cv', value);
        //                 }
        //                 // console.log(value);
        //
        //             }
        //         }
        //     }
        // };


        // console.log(...formData);

        // appendToFormData(finalData);

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