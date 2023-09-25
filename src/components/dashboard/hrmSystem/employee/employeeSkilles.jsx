import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import AddDepartmentModal from "../../../common/modal/Form/AddDepartmentModal";
import Select from "../../../common/modal/Select";
import AddSectionModal from "../../../common/modal/Form/AddSectionModal";
import Input from "../../../common/modal/Input";

const EmployeeContact = () => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const EmployeeContactInformation = data => {
        console.log(data);
        reset();
    }

    // console.log(contact);
    return (
        <>
            <form onSubmit={handleSubmit(EmployeeContactInformation)} className="mt-3">
                <div className="form-group mb-0">
                    <label htmlFor="exampleFormControlTextarea4">
                        Skills*
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea4"
                        rows="5"
                        {...register("address", {required: true})}
                    ></textarea>
                    {errors.address && <span>This field is required</span>}
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mt-2" style={{ marginBottom: "30px"}} type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default EmployeeContact;