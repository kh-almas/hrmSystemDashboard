import React, {useEffect, useState} from "react";
import Breadcrumb from "../../common/breadcrumb";
import {Link, useNavigate} from "react-router-dom";
import Select from "../../common/modal/Select";
import {useForm} from "react-hook-form";
import GetAllBranch from "../../common/Query/hrm/GetAllBranch";
import GetAllDesignation from "../../common/Query/hrm/GetAllDesignation";
import GetAllDepartment from "../../common/Query/hrm/GetAllDepartment";
import axios from "../../../axios";
import Swal from "sweetalert2";

const EditEmploySetup = () => {
    const [branch, setBranch] = useState();
    const [designation, setDesignation] = useState();
    const [department, setDepartment] = useState();
    const navigate = useNavigate();
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = GetAllBranch();
    const [allDesignationStatus, allDesignationReFetch, allDesignation, allDesignationError] = GetAllDesignation();
    const [allDepartmentStatus, allDepartmentReFetch, allDepartment, allDepartmentError] = GetAllDepartment();

    console.log(designation);
    useEffect(() => {
        setBranch([]);
        allBranch?.data?.body?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setBranch(prevBranch => [...prevBranch, set_data]);
        })
    }, [allBranch])

    useEffect(() => {
        setDesignation([]);
        allDesignation?.data?.body?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setDesignation(prevDesignation => [...prevDesignation, set_data]);
        })
    }, [allDesignation])

    useEffect(() => {
        setDepartment([]);
        allDepartment?.data?.body?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setDepartment(prevDepartment => [...prevDepartment, set_data]);
        })
    }, [allDepartment])
    const onSubmit = data => {
        data.status = "Active";
        axios.post('/hrm-system/employee', data)
            .then(info => {
                if(info?.status == 200)
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })

                }
                navigate("/dashboard/hrm/employee");
            })
            .catch(e => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`,
                })
            })
    };



    return (
        <div>
            <Breadcrumb parent="HRM System" title="Add Employee" id="#EMP0000001"/>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-sm-12 col-xl-6">
                        <div className="card" style={{height: "450px"}}>
                            <div className="card-header">
                                <h4>Personal Detail</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1">Name*</label>
                                            <input
                                                className="form-control"
                                                id="exampleFormControlInput1"
                                                required={true}
                                                type="text"
                                                placeholder="accountant"
                                                {...register("name", {required: true})}
                                            />
                                            {errors.name && <span>This field is required</span>}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword2">Phone*</label>
                                            <input
                                                className="form-control"
                                                required={true}
                                                type="number"
                                                placeholder="Phone"
                                                {...register("phone", {required: true})}
                                            />
                                            {errors.phone && <span>This field is required</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-t-15">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1">Date of Birth*</label>
                                            <input
                                                className="form-control"
                                                id="exampleFormControlInput1"
                                                required={true}
                                                type="date"
                                                placeholder="accountant"
                                                {...register("date_of_birth", {required: true})}
                                            />
                                            {errors.date_of_birth && <span>This field is required</span>}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">Gender*</label>
                                        <select className="form-control digits" id="exampleFormControlSelect9"
                                                defaultValue="1" {...register("gender", {required: true})}>
                                            <option>{"Select an option"}</option>
                                            <option value={"Male"}>{"Male"}</option>
                                            <option value={"Female"}>{"Female"}</option>
                                            <option value={"Others"}>{"Others"}</option>
                                        </select>
                                        {errors.gender && <span>This field is required</span>}
                                    </div>
                                </div>
                                <div className="row m-t-15">
                                    <div className="col">
                                        <div className="form-group mb-0">
                                            <label htmlFor="exampleFormControlTextarea4">
                                                Address*
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea4"
                                                rows="3"
                                                {...register("address", {required: true})}
                                            ></textarea>
                                            {errors.address && <span>This field is required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-xl-6">
                        <div className="card" style={{height: "450px"}}>
                            <div className="card-header">
                                <h4>Company Detail</h4>
                            </div>
                            <div className="card-body">
                                {/*<div className="row">*/}
                                {/*    <div className="col">*/}
                                {/*        <label htmlFor="exampleFormControlInput1">Employee ID</label>*/}
                                {/*        <input*/}
                                {/*            className="form-control"*/}
                                {/*            id="exampleFormControlInput1"*/}
                                {/*            required={true}*/}
                                {/*            type="number"*/}
                                {/*            defaultValue={"#EMP0000001"}*/}
                                {/*            placeholder="#EMP0000001"*/}
                                {/*            {...register("employee_id", {required: true})}*/}
                                {/*        />*/}
                                {/*        {errors.employee_id && <span>This field is required</span>}*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="row m-t-15">
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">Joining Date</label>
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            required={true}
                                            type="date"
                                            {...register("joining_date", {required: true})}
                                        />
                                        {errors.joining_date && <span>This field is required</span>}
                                    </div>
                                    <div className="col">
                                        <div className="col">
                                            <label htmlFor="exampleFormControlInput1">Branch</label>
                                            <select
                                                className="form-control digits"
                                                id="exampleFormControlSelect9"
                                                defaultValue="1"
                                                {...register("branch_id", {required: true})}
                                            >
                                                <option>{"Select an option"}</option>
                                                {
                                                    branch?.map(item =>
                                                        <option value={item?.id}>{item?.value}</option>
                                                    )
                                                }

                                            </select>
                                            {errors.branch && <span>This field is required</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="row m-t-15">
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">Designation</label>
                                        <select
                                            className="form-control digits"
                                            id="exampleFormControlSelect9"
                                            {...register("designation_id", {required: true})}
                                        >
                                            <option>{"Select an option"}</option>
                                            {
                                                designation?.map(item =>
                                                    <option value={item?.id}>{item?.value}</option>
                                                )
                                            }
                                        </select>
                                        {errors.designation && <span>This field is required</span>}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">Department</label>
                                        <select
                                            className="form-control digits"
                                            id="exampleFormControlSelect9"
                                            {...register("department_id", {required: true})}
                                        >
                                            <option>{"Select an option"}</option>
                                            {
                                                department?.map(item =>
                                                    <option value={item?.id}>{item?.value}</option>
                                                )
                                            }
                                        </select>
                                        {errors.department && <span>This field is required</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-xl-6">
                        <div className="card" style={{height: "450px"}}>
                            <div className="card-header">
                                <h4>Document</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-6">
                        <div className="card" style={{height: "450px"}}>
                            <div className="card-header">
                                <h4>Bank Account Detail</h4>
                            </div>
                            <div className="card-body">
                                <div className="row m-t-15">
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">
                                            Account Holder Name
                                        </label>
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            required={true}
                                            type="text"
                                            {...register("account_holder_name", {required: true})}
                                        />
                                        {errors.account_holder_name && <span>This field is required</span>}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">
                                            Account Number
                                        </label>
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            required={true}
                                            type="number"
                                            {...register("account_number", {required: true})}
                                        />
                                        {errors.account_number && <span>This field is required</span>}
                                    </div>
                                </div>
                                <div className="row m-t-15">
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">Bank Name</label>
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            required={true}
                                            type="text"
                                            {...register("bank_name", {required: true})}
                                        />
                                        {errors.bank_name && <span>This field is required</span>}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">
                                            Bank Identifier Code
                                        </label>
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            required={true}
                                            type="number"
                                            {...register("bank_identifier_code", {required: true})}
                                        />
                                        {errors.bank_identifier_code && <span>This field is required</span>}
                                    </div>
                                </div>
                                <div className="row m-t-15">
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">
                                            Branch Location
                                        </label>
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            required={true}
                                            type="text"
                                            {...register("branch_location", {required: true})}
                                        />
                                        {errors.branch_location && <span>This field is required</span>}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">Tax Payer Id</label>
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            required={true}
                                            type="number"
                                            {...register("tax_pay_id", {required: true})}
                                        />
                                        {errors.tax_pay_id && <span>This field is required</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" style={{width: "max-content", marginLeft: "auto", marginBottom: "30px", marginRight: "10px",}} type="submit">
                        Create
                    </button>
                </div>
            </form>

        </div>
    );
};

export default EditEmploySetup;
