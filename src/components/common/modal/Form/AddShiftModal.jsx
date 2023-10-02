import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import GetAllCompany from "../../Query/hrm/GetAllCompany";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import moment from "moment";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import getAllOrganization from "../../Query/hrm/GetAllOrganization";
import getAllBranch from "../../Query/hrm/GetAllBranch";

const AddShiftModal = ({modal, toggle, reFetch}) => {
    const [organization, setOrganization] = useState([]);
    const [company, setCompany] = useState([]);
    const [branch, setBranch] = useState([]);
    const [weekdays, setWeekdays] = useState([]);
    const {register, reset, handleSubmit, formState: { errors },} = useForm();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allOrganizationStatus, allOrganizationReFetch, allOrganization, allOrganizationError] = getAllOrganization();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = getAllBranch();

    const [selectedOrganization, setSelectedOrganization] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");

    useEffect(() => {
        setOrganization([])
        allOrganization?.data?.body?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setOrganization(prevOrganization => [...prevOrganization, set_data]);
        })
    }, [allOrganization])

    useEffect(() => {
        setCompany([])
        if (selectedOrganization !== ""){
            const sortedData = allCompany?.data?.body?.data?.filter((data) => parseInt(data.organization_id) === parseInt(selectedOrganization))
            sortedData?.map(item => {
                const set_data = {
                    id: item.id,
                    value: item.name
                }
                setCompany(prevCompany => [...prevCompany, set_data]);
            })
        }
    }, [allCompany, selectedOrganization])

    useEffect(() => {
        setBranch([])
        if (selectedCompany !== ""){
            const sortedData = allBranch?.data?.body?.data?.filter((data) => parseInt(data.company_id) === parseInt(selectedCompany))
            sortedData?.map(item => {
                const set_data = {
                    id: item.id,
                    value: item.name
                }
                setBranch(prevBranch => [...prevBranch, set_data]);
            })
        }
    }, [allBranch, selectedCompany])

    const formattedTime = time => moment(time, "HH:mm").format("HH:mm:ss");

    const onSubmit = (data) => {
        const start_time = formattedTime(data.start_time);
        data.start_time = start_time;
        const end_time = formattedTime(data.end_time);
        data.end_time = end_time;

        data.organization_id = selectedOrganization;
        data.company_id = selectedCompany;
        data.weekends = JSON.stringify(weekdays);
        console.log(data);

        axios.post('/hrm-system/shift', data)
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
                    toggle();
                }
                reFetch();
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`
                })
            })
    }

    return (
        <>
            <BaseModal title={"Add Shift"} dataModal={modal} dataToggle={toggle}>
                <div className="row row-cols-1 row-cols-lg-2">
                    <div className="theme-form">
                        <div className="mb-3 form-group">
                            <label style={{fontSize: "11px",}} htmlFor={"Organization"}>{`Organization:`} {errors?.organization && <span className="text-danger">(Required)</span>}</label>
                            <select className={`form-control ${errors?.organization && "is-invalid"}`} style={{fontSize: "11px", height: "30px", outline: "0px !important",}} id={"Organization"}

                                    onChange={e => setSelectedOrganization(e.target.value)}
                            >
                                <option value="">Select an option</option>
                                {
                                    organization?.map((item) => (
                                        <option value={item.id} selected={parseInt(item.id) === parseInt(selectedOrganization)}>{item.value}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="theme-form">
                        <div className="mb-3 form-group">
                            <label style={{fontSize: "11px",}} htmlFor={"company"}>{`Company:`} {errors?.company && <span className="text-danger">(Required)</span>}</label>
                            <select className={`form-control ${errors?.company && "is-invalid"}`} style={{fontSize: "11px", height: "30px", outline: "0px !important",}} id={"company"}
                                    onChange={e => setSelectedCompany(e.target.value)}
                            >
                                <option value="">Select an option</option>
                                {
                                    company?.map((item) => (
                                        <option value={item?.id} selected={parseInt(item.id) === parseInt(selectedCompany)}>{item.value}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Select
                                labelName={"Branch"}
                                placeholder={"Select an option"}
                                options={branch}
                                validation={{...register("branch_id", {required: true})}}
                                error={errors?.branch_id}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Shift Name"}
                                inputName={"name"}
                                inputType={"text"}
                                placeholder={"Enter shift name"}
                                validation={{
                                    ...register("name", { required: true }),
                                }}
                            />
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Start Time"}
                                inputName={"start_time"}
                                inputType={"time"}
                                validation={{ ...register("start_time", { required: true }) }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"End Time"}
                                inputName={"end_time"}
                                inputType={"time"}
                                validation={{ ...register("end_time", { required: true }) }}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="weekdays">Weekend</label>
                        <DropdownMultiselect
                            handleOnChange={(selected) => {
                                setWeekdays(selected);
                                // console.log(selected)
                            }}
                            options={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}
                            name="multi_weekdays"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleFormControlTextarea4">
                            Note
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea4"
                            rows="3"
                            {...register("note", {required: true})}
                        ></textarea>

                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                            validation={{...register("status", {required: true})}}
                            error={errors?.status}
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={toggle} className="me-2">
                            Cancel
                        </Button>
                        <Button color="primary" type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </BaseModal>
        </>
    );
};

export default AddShiftModal;