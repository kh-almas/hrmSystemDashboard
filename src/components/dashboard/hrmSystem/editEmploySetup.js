import React, {useEffect, useState} from "react";
import Breadcrumb from "../../common/breadcrumb";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "../../../axios";
import {useForm} from "react-hook-form";
import GetAllBranch from "../../common/Query/hrm/GetAllBranch";
import GetAllDesignation from "../../common/Query/hrm/GetAllDesignation";
import GetAllDepartment from "../../common/Query/hrm/GetAllDepartment";
import Swal from "sweetalert2";


const EditEmploySetup = () => {
    const [data, setData] = useState();
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const {id} = useParams();
    const [branch, setBranch] = useState();
    const [designation, setDesignation] = useState();
    const [department, setDepartment] = useState();
    const navigate = useNavigate();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = GetAllBranch();
    const [allDesignationStatus, allDesignationReFetch, allDesignation, allDesignationError] = GetAllDesignation();
    const [allDepartmentStatus, allDepartmentReFetch, allDepartment, allDepartmentError] = GetAllDepartment();


    useEffect(() => {
        axios.get(`/hrm-system/employee/${id}`)
            .then(res => {
                setData(res?.data?.body?.data);
                console.log(res?.data?.body?.data);
            })
            .catch(e => {
                console.log(e);
            })
    }, [id])

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

    const onSubmit = (newData) => {
        console.log(newData)
        const updatedData = {
            'name': newData.name ? newData.name : data.name,
            'phone':newData.phone ? newData.phone : data.phone,
            'date_of_birth':newData.date_of_birth ? newData.date_of_birth : data.date_of_birth,
            'gender':newData.gender ? newData.gender : data.gender,
            'address':newData.address ? newData.address : data.address,
            'joining_date':newData.joining_date ? newData.joining_date : data.joining_date,
            'account_holder_name':newData.account_holder_name ? newData.account_holder_name : data.account_holder_name,
            'account_number':newData.account_number ? newData.account_number : data.account_number,
            'bank_name':newData.bank_name ? newData.bank_name : data.bank_name,
            'bank_identifier_code':newData.bank_identifier_code ? newData.bank_identifier_code : data.bank_identifier_code,
            'branch_location':newData.branch_location ? newData.branch_location : data.branch_location,
            'tax_pay_id':newData.tax_pay_id ? newData.tax_pay_id : data.tax_pay_id,
            'status':newData.status ? newData.status : data.status,
            'branch_id':newData.branch_id ? newData.branch_id : data.branch_id,
            'department_id':newData.department_id ? newData.department_id : data.department_id,
            'designation_id':newData.designation_id ? newData.designation_id : data.designation_id,
        }

        axios.put(`/hrm-system/employee/${data.id}`, updatedData)
            .then(info => {
                console.log(info)
                if(info?.status == 200)
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate("/dashboard/hrm/employee");
                }
            })
            .catch(e => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`
                })
            })
    }

    return (
        <div>
            <Breadcrumb parent="HRM System" title="Edit Employee" id="#EMP0000001"/>
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
                                                defaultValue={data?.name}
                                                type="text"
                                                placeholder="accountant"
                                                {...register("name")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword2">Phone*</label>
                                            <input
                                                className="form-control"
                                                defaultValue={data?.phone}
                                                type="number"
                                                placeholder="Phone"
                                                {...register("phone")}
                                            />
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
                                                defaultValue={data?.date_of_birth}
                                                type="date"
                                                placeholder="accountant"
                                                {...register("date_of_birth")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="col">
                                            <label htmlFor="exampleFormControlInput1">Gender*</label>
                                            <select className="form-control digits" id="exampleFormControlSelect9" {...register("gender")}>
                                                <option value={""}>{"Select an option"}</option>
                                                <option value={"Male"} selected={data?.gender == "Male"}>{"Male"}</option>
                                                <option value={"Female"} selected={data?.gender == "Female"}>{"Female"}</option>
                                                <option value={"Others"} selected={data?.gender == "Others"}>{"Others"}</option>
                                            </select>
                                        </div>
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
                                                defaultValue={data?.address}
                                                {...register("address")}
                                            ></textarea>
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
                                            defaultValue={data?.joining_date}
                                            type="date"
                                            {...register("joining_date")}
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="col">
                                            <label htmlFor="exampleFormControlInput1">Branch</label>
                                            <select
                                                className="form-control digits"
                                                id="exampleFormControlSelect9"
                                                defaultValue="1"
                                                {...register("branch_id")}
                                            >
                                                <option value={""}>{"Select an option"}</option>
                                                {
                                                    branch?.map(item =>
                                                        <option value={item?.id} selected={item?.id == data?.branch_id}>{item?.value}</option>
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
                                            {...register("designation_id")}
                                        >
                                            <option value={""}>{"Select an option"}</option>
                                            {
                                                designation?.map(item =>
                                                    <option value={item?.id} selected={item?.id == data?.designation_id}>{item?.value}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">Department</label>
                                        <select
                                            className="form-control digits"
                                            id="exampleFormControlSelect9"
                                            {...register("department_id")}
                                        >
                                            <option value={""}>{"Select an option"}</option>
                                            {
                                                department?.map(item =>
                                                    <option value={item?.id} selected={item?.id == data?.department_id}>{item?.value}</option>
                                                )
                                            }
                                        </select>
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
                                            defaultValue={data?.account_holder_name}
                                            type="text"
                                            {...register("account_holder_name")}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">
                                            Account Number
                                        </label>
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            defaultValue={data?.account_number}
                                            {...register("account_number")}
                                            type="number"
                                        />
                                    </div>
                                </div>
                                <div className="row m-t-15">
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">Bank Name</label>
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            defaultValue={data?.bank_name}
                                            type="text"
                                            {...register("bank_name")}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">
                                            Bank Identifier Code
                                        </label>
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            defaultValue={data?.bank_identifier_code}
                                            type="number"
                                            {...register("bank_identifier_code")}
                                        />
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
                                            defaultValue={data?.branch_location}
                                            type="text"
                                            {...register("branch_location")}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1">Tax Payer Id</label>
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            defaultValue={data?.tax_pay_id}
                                            type="number"
                                            {...register("tax_pay_id")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{
                            width: "max-content",
                            marginLeft: "auto",
                            marginBottom: "30px",
                            marginRight: "10px",
                        }}
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEmploySetup;
