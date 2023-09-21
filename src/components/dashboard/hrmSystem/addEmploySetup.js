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
import {Container,Row,Col,Card,CardHeader,CardBody,Nav,NavItem,NavLink,Dropdown,DropdownMenu,DropdownItem,DropdownToggle,TabContent,TabPane} from 'reactstrap'
import Input from "../../common/modal/Input";

const EditEmploySetup = () => {
    const [IconWithTab, setIconWithTab] = useState('1');
    const [branch, setBranch] = useState();
    const [designation, setDesignation] = useState();
    const [department, setDepartment] = useState();
    const navigate = useNavigate();
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    // const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = GetAllBranch();
    // const [allDesignationStatus, allDesignationReFetch, allDesignation, allDesignationError] = GetAllDesignation();
    // const [allDepartmentStatus, allDepartmentReFetch, allDepartment, allDepartmentError] = GetAllDepartment();

    console.log(designation);
    // useEffect(() => {
    //     setBranch([]);
    //     allBranch?.data?.body?.data?.map(item => {
    //         const set_data = {
    //             id: item?.id,
    //             value: item?.name
    //         }
    //         setBranch(prevBranch => [...prevBranch, set_data]);
    //     })
    // }, [allBranch])

    // useEffect(() => {
    //     setDesignation([]);
    //     allDesignation?.data?.body?.data?.map(item => {
    //         const set_data = {
    //             id: item?.id,
    //             value: item?.name
    //         }
    //         setDesignation(prevDesignation => [...prevDesignation, set_data]);
    //     })
    // }, [allDesignation])

    // useEffect(() => {
    //     setDepartment([]);
    //     allDepartment?.data?.body?.data?.map(item => {
    //         const set_data = {
    //             id: item?.id,
    //             value: item?.name
    //         }
    //         setDepartment(prevDepartment => [...prevDepartment, set_data]);
    //     })
    // }, [allDepartment])
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

    const EmployeeInformation = data => {
        console.log(data);
    }



    return (
        <div>
            <Breadcrumb parent="HRM System" title="Add Employee" id="#EMP0000001"/>
            <div>
                <Card>
                    <CardBody>
                        <Nav tabs>
                            <NavItem>
                                <NavLink href="#javascript"  className={IconWithTab === '1' ? 'active' : ''} onClick={() => setIconWithTab('1')}><i className="icofont icofont-ui-home"></i>Basic Information</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#javascript" className={IconWithTab === '2' ? 'active' : ''} onClick={() => setIconWithTab('2')}><i className="icofont icofont-man-in-glasses"></i>Company Information</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#javascript" className={IconWithTab === '3' ? 'active' : ''} onClick={() => setIconWithTab('3')}><i className="icofont icofont-contacts"></i>Contact</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#javascript" className={IconWithTab === '4' ? 'active' : ''} onClick={() => setIconWithTab('4')}><i className="icofont icofont-contacts"></i>Skills</NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={IconWithTab}>
                            <TabPane  className="fade show" tabId="1">
                                <form onSubmit={handleSubmit(EmployeeInformation)} className="mt-3">
                                    <div className="row">
                                        <div className="col">
                                            <div>
                                                <Input
                                                    labelName={"First Name"}
                                                    inputName={"first_name"}
                                                    inputType={"text"}
                                                    placeholder={"Enter your first name"}
                                                    validation={{
                                                        ...register("first_name", { required: true }),
                                                    }}
                                                    error={errors.first_name}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <Input
                                                    labelName={"Last Name"}
                                                    inputName={"last_name"}
                                                    inputType={"text"}
                                                    placeholder={"Enter your last name"}
                                                    validation={{
                                                        ...register("last_name", { required: true }),
                                                    }}
                                                    error={errors.last_name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div>
                                                <Input
                                                    labelName={"Email"}
                                                    inputName={"email"}
                                                    inputType={"email"}
                                                    placeholder={"Enter your email"}
                                                    validation={{
                                                        ...register("email", { required: true }),
                                                    }}
                                                    error={errors.email}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <Input
                                                    labelName={"Phone"}
                                                    inputName={"phone"}
                                                    inputType={"text"}
                                                    placeholder={"Enter your phone number"}
                                                    validation={{
                                                        ...register("phone", { required: true }),
                                                    }}
                                                    error={errors.phone}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div>
                                                <Input
                                                    labelName={"Father Name"}
                                                    inputName={"father_name"}
                                                    inputType={"text"}
                                                    placeholder={"Enter your father name"}
                                                    validation={{
                                                        ...register("father_name", { required: true }),
                                                    }}
                                                    error={errors.father_name}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <Input
                                                    labelName={"Mother Name"}
                                                    inputName={"mother_name"}
                                                    inputType={"text"}
                                                    placeholder={"Enter your last name"}
                                                    validation={{
                                                        ...register("mother_name", { required: true }),
                                                    }}
                                                    error={errors.mother_name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Input
                                            labelName={"Spouse Name"}
                                            inputName={"spouse_name"}
                                            inputType={"text"}
                                            placeholder={"Enter your spouse name"}
                                            validation={{
                                                ...register("spouse_name", { required: true }),
                                            }}
                                            error={errors.mother_name}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <Input
                                                    labelName={"Image"}
                                                    inputName={"img"}
                                                    inputType={"file"}
                                                    validation={{
                                                        ...register("img", { required: true }),
                                                    }}
                                                    error={errors.img}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <Input
                                                    labelName={"CV"}
                                                    inputName={"cv"}
                                                    inputType={"file"}
                                                    validation={{
                                                        ...register("cv", { required: true }),
                                                    }}
                                                    error={errors.cv}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row m-t-15">
                                        <div className="col">
                                            <div>
                                                <Input
                                                    labelName={"Phone"}
                                                    inputName={"date_of_birth"}
                                                    inputType={"date"}
                                                    placeholder={"Date of Birth*"}
                                                    validation={{
                                                        ...register("date_of_birth", { required: true }),
                                                    }}
                                                    error={errors.date_of_birth}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <Select
                                                labelName={"Gander"}
                                                placeholder={"Select an option"}
                                                options={[
                                                    {id: "Male", value: "Male"},
                                                    {id: "Female", value: "Female"},
                                                    {id: "Other", value: "Other"},
                                                ]}
                                                validation={{...register("gander", {required: true})}}
                                                error={errors.gander}
                                            />
                                        </div>
                                    </div>
                                    <div className="row m-t-15">
                                        <div className="col">
                                            <div>
                                                <Input
                                                    labelName={"Website"}
                                                    inputName={"website"}
                                                    inputType={"url"}
                                                    placeholder={"Enter your website url"}
                                                    validation={{
                                                        ...register("website", { required: true }),
                                                    }}
                                                    error={errors.website}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-primary mt-2" style={{width: "max-content", marginLeft: "auto", marginBottom: "30px"}} type="submit">
                                            Create
                                        </button>
                                    </div>
                                </form>
                            </TabPane>
                            <TabPane tabId="2">
                                <p className="mb-0 m-t-30">{"2Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}</p>
                            </TabPane>
                            <TabPane tabId="3">
                                <p className="mb-0 m-t-30">{"3Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}</p>
                            </TabPane>
                            <TabPane tabId="4">
                                <p className="mb-0 m-t-30">{"4Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}</p>
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </div>
            
            {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
            {/*    <div className="row">*/}
            {/*        <div className="col-sm-12 col-xl-6">*/}
            {/*            <div className="card" style={{height: "450px"}}>*/}
            {/*                <div className="card-header">*/}
            {/*                    <h4>Personal Detail</h4>*/}
            {/*                </div>*/}
            {/*                <div className="card-body">*/}
            {/*                    <div className="row">*/}
            {/*                        <div className="col">*/}
            {/*                            <div className="form-group">*/}
            {/*                                <label htmlFor="exampleFormControlInput1">Name*</label>*/}
            {/*                                <input*/}
            {/*                                    className="form-control"*/}
            {/*                                    id="exampleFormControlInput1"*/}
            {/*                                    required={true}*/}
            {/*                                    type="text"*/}
            {/*                                    placeholder="accountant"*/}
            {/*                                    {...register("name", {required: true})}*/}
            {/*                                />*/}
            {/*                                {errors.name && <span>This field is required</span>}*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className="col">*/}
            {/*                            <div className="form-group">*/}
            {/*                                <label htmlFor="exampleInputPassword2">Phone*</label>*/}
            {/*                                <input*/}
            {/*                                    className="form-control"*/}
            {/*                                    required={true}*/}
            {/*                                    type="number"*/}
            {/*                                    placeholder="Phone"*/}
            {/*                                    {...register("phone", {required: true})}*/}
            {/*                                />*/}
            {/*                                {errors.phone && <span>This field is required</span>}*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="row m-t-15">*/}
            {/*                        <div className="col">*/}
            {/*                            <div className="form-group">*/}
            {/*                                <label htmlFor="exampleFormControlInput1">Date of Birth*</label>*/}
            {/*                                <input*/}
            {/*                                    className="form-control"*/}
            {/*                                    id="exampleFormControlInput1"*/}
            {/*                                    required={true}*/}
            {/*                                    type="date"*/}
            {/*                                    placeholder="accountant"*/}
            {/*                                    {...register("date_of_birth", {required: true})}*/}
            {/*                                />*/}
            {/*                                {errors.date_of_birth && <span>This field is required</span>}*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className="col">*/}
            {/*                            <label htmlFor="exampleFormControlInput1">Gender*</label>*/}
            {/*                            <select className="form-control digits" id="exampleFormControlSelect9"*/}
            {/*                                    defaultValue="1" {...register("gender", {required: true})}>*/}
            {/*                                <option>{"Select an option"}</option>*/}
            {/*                                <option value={"Male"}>{"Male"}</option>*/}
            {/*                                <option value={"Female"}>{"Female"}</option>*/}
            {/*                                <option value={"Others"}>{"Others"}</option>*/}
            {/*                            </select>*/}
            {/*                            {errors.gender && <span>This field is required</span>}*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="row m-t-15">*/}
            {/*                        <div className="col">*/}
            {/*                            <div className="form-group mb-0">*/}
            {/*                                <label htmlFor="exampleFormControlTextarea4">*/}
            {/*                                    Address**/}
            {/*                                </label>*/}
            {/*                                <textarea*/}
            {/*                                    className="form-control"*/}
            {/*                                    id="exampleFormControlTextarea4"*/}
            {/*                                    rows="3"*/}
            {/*                                    {...register("address", {required: true})}*/}
            {/*                                ></textarea>*/}
            {/*                                {errors.address && <span>This field is required</span>}*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

            {/*        <div className="col-sm-12 col-xl-6">*/}
            {/*            <div className="card" style={{height: "450px"}}>*/}
            {/*                <div className="card-header">*/}
            {/*                    <h4>Company Detail</h4>*/}
            {/*                </div>*/}
            {/*                <div className="card-body">*/}
            {/*                    /!*<div className="row">*!/*/}
            {/*                    /!*    <div className="col">*!/*/}
            {/*                    /!*        <label htmlFor="exampleFormControlInput1">Employee ID</label>*!/*/}
            {/*                    /!*        <input*!/*/}
            {/*                    /!*            className="form-control"*!/*/}
            {/*                    /!*            id="exampleFormControlInput1"*!/*/}
            {/*                    /!*            required={true}*!/*/}
            {/*                    /!*            type="number"*!/*/}
            {/*                    /!*            defaultValue={"#EMP0000001"}*!/*/}
            {/*                    /!*            placeholder="#EMP0000001"*!/*/}
            {/*                    /!*            {...register("employee_id", {required: true})}*!/*/}
            {/*                    /!*        />*!/*/}
            {/*                    /!*        {errors.employee_id && <span>This field is required</span>}*!/*/}
            {/*                    /!*    </div>*!/*/}
            {/*                    /!*</div>*!/*/}
            {/*                    <div className="row m-t-15">*/}
            {/*                        <div className="col">*/}
            {/*                            <label htmlFor="exampleFormControlInput1">Joining Date</label>*/}
            {/*                            <input*/}
            {/*                                className="form-control"*/}
            {/*                                id="exampleFormControlInput1"*/}
            {/*                                required={true}*/}
            {/*                                type="date"*/}
            {/*                                {...register("joining_date", {required: true})}*/}
            {/*                            />*/}
            {/*                            {errors.joining_date && <span>This field is required</span>}*/}
            {/*                        </div>*/}
            {/*                        <div className="col">*/}
            {/*                            <div className="col">*/}
            {/*                                <label htmlFor="exampleFormControlInput1">Branch</label>*/}
            {/*                                <select*/}
            {/*                                    data-live-search="true"*/}
            {/*                                    className="form-control digits selectpicker"*/}
            {/*                                    id="exampleFormControlSelect9"*/}
            {/*                                    defaultValue="1"*/}
            {/*                                    {...register("branch_id", {required: true})}*/}
            {/*                                >*/}
            {/*                                    <option>{"Select an option"}</option>*/}
            {/*                                    {*/}
            {/*                                        branch?.map(item =>*/}
            {/*                                            <option value={item?.id}>{item?.value}</option>*/}
            {/*                                        )*/}
            {/*                                    }*/}

            {/*                                </select>*/}
            {/*                                {errors.branch && <span>This field is required</span>}*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}

            {/*                    <div className="row m-t-15">*/}
            {/*                        <div className="col">*/}
            {/*                            <label htmlFor="exampleFormControlInput1">Designation</label>*/}
            {/*                            <select*/}
            {/*                                className="form-control digits"*/}
            {/*                                id="exampleFormControlSelect9"*/}
            {/*                                {...register("designation_id", {required: true})}*/}
            {/*                            >*/}
            {/*                                <option>{"Select an option"}</option>*/}
            {/*                                {*/}
            {/*                                    designation?.map(item =>*/}
            {/*                                        <option value={item?.id}>{item?.value}</option>*/}
            {/*                                    )*/}
            {/*                                }*/}
            {/*                            </select>*/}
            {/*                            {errors.designation && <span>This field is required</span>}*/}
            {/*                        </div>*/}
            {/*                        <div className="col">*/}
            {/*                            <label htmlFor="exampleFormControlInput1">Department</label>*/}
            {/*                            <select*/}
            {/*                                className="form-control digits"*/}
            {/*                                id="exampleFormControlSelect9"*/}
            {/*                                {...register("department_id", {required: true})}*/}
            {/*                            >*/}
            {/*                                <option>{"Select an option"}</option>*/}
            {/*                                {*/}
            {/*                                    department?.map(item =>*/}
            {/*                                        <option value={item?.id}>{item?.value}</option>*/}
            {/*                                    )*/}
            {/*                                }*/}
            {/*                            </select>*/}
            {/*                            {errors.department && <span>This field is required</span>}*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="col-sm-12 col-xl-6">*/}
            {/*            <div className="card" style={{height: "450px"}}>*/}
            {/*                <div className="card-header">*/}
            {/*                    <h4>Document</h4>*/}
            {/*                </div>*/}
            {/*                <div className="card-body">*/}
            {/*                    <div className="row">*/}
            {/*                        <div className="col"></div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-sm-12 col-xl-6">*/}
            {/*            <div className="card" style={{height: "450px"}}>*/}
            {/*                <div className="card-header">*/}
            {/*                    <h4>Bank Account Detail</h4>*/}
            {/*                </div>*/}
            {/*                <div className="card-body">*/}
            {/*                    <div className="row m-t-15">*/}
            {/*                        <div className="col">*/}
            {/*                            <label htmlFor="exampleFormControlInput1">*/}
            {/*                                Account Holder Name*/}
            {/*                            </label>*/}
            {/*                            <input*/}
            {/*                                className="form-control"*/}
            {/*                                id="exampleFormControlInput1"*/}
            {/*                                required={true}*/}
            {/*                                type="text"*/}
            {/*                                {...register("account_holder_name", {required: true})}*/}
            {/*                            />*/}
            {/*                            {errors.account_holder_name && <span>This field is required</span>}*/}
            {/*                        </div>*/}
            {/*                        <div className="col">*/}
            {/*                            <label htmlFor="exampleFormControlInput1">*/}
            {/*                                Account Number*/}
            {/*                            </label>*/}
            {/*                            <input*/}
            {/*                                className="form-control"*/}
            {/*                                id="exampleFormControlInput1"*/}
            {/*                                required={true}*/}
            {/*                                type="number"*/}
            {/*                                {...register("account_number", {required: true})}*/}
            {/*                            />*/}
            {/*                            {errors.account_number && <span>This field is required</span>}*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="row m-t-15">*/}
            {/*                        <div className="col">*/}
            {/*                            <label htmlFor="exampleFormControlInput1">Bank Name</label>*/}
            {/*                            <input*/}
            {/*                                className="form-control"*/}
            {/*                                id="exampleFormControlInput1"*/}
            {/*                                required={true}*/}
            {/*                                type="text"*/}
            {/*                                {...register("bank_name", {required: true})}*/}
            {/*                            />*/}
            {/*                            {errors.bank_name && <span>This field is required</span>}*/}
            {/*                        </div>*/}
            {/*                        <div className="col">*/}
            {/*                            <label htmlFor="exampleFormControlInput1">*/}
            {/*                                Bank Identifier Code*/}
            {/*                            </label>*/}
            {/*                            <input*/}
            {/*                                className="form-control"*/}
            {/*                                id="exampleFormControlInput1"*/}
            {/*                                required={true}*/}
            {/*                                type="number"*/}
            {/*                                {...register("bank_identifier_code", {required: true})}*/}
            {/*                            />*/}
            {/*                            {errors.bank_identifier_code && <span>This field is required</span>}*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="row m-t-15">*/}
            {/*                        <div className="col">*/}
            {/*                            <label htmlFor="exampleFormControlInput1">*/}
            {/*                                Branch Location*/}
            {/*                            </label>*/}
            {/*                            <input*/}
            {/*                                className="form-control"*/}
            {/*                                id="exampleFormControlInput1"*/}
            {/*                                required={true}*/}
            {/*                                type="text"*/}
            {/*                                {...register("branch_location", {required: true})}*/}
            {/*                            />*/}
            {/*                            {errors.branch_location && <span>This field is required</span>}*/}
            {/*                        </div>*/}
            {/*                        <div className="col">*/}
            {/*                            <label htmlFor="exampleFormControlInput1">Tax Payer Id</label>*/}
            {/*                            <input*/}
            {/*                                className="form-control"*/}
            {/*                                id="exampleFormControlInput1"*/}
            {/*                                required={true}*/}
            {/*                                type="number"*/}
            {/*                                {...register("tax_pay_id", {required: true})}*/}
            {/*                            />*/}
            {/*                            {errors.tax_pay_id && <span>This field is required</span>}*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <button className="btn btn-primary" style={{width: "max-content", marginLeft: "auto", marginBottom: "30px", marginRight: "10px",}} type="submit">*/}
            {/*            Create*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</form>*/}

        </div>
    );
};

export default EditEmploySetup;
