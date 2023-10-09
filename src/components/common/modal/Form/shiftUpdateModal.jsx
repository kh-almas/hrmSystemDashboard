import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import GetAllCompany from "../../Query/hrm/GetAllCompany";
import getAllOrganization from "../../Query/hrm/GetAllOrganization";
import getAllBranch from "../../Query/hrm/GetAllBranch";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const ShiftUpdateModal = ({dataUpdateModal, dataUpdateToggle, oldData, allShiftReFetch}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [organization, setOrganization] = useState([]);
    const [company, setCompany] = useState([]);
    const [branch, setBranch] = useState([]);
    const [weekdays, setWeekdays] = useState([]);
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allOrganizationStatus, allOrganizationReFetch, allOrganization, allOrganizationError] = getAllOrganization();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = getAllBranch();

    const [selectedOrganization, setSelectedOrganization] = useState("11");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

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

    useEffect(() => {
        setSelectedOrganization(oldData?.organization_id);
        setSelectedCompany(oldData?.company_id)
        reset();
    },[oldData])

    const formattedTimeForUpdate = time => moment(time, "HH:mm").format("HH:mm:ss");

    const onSubmit = (data) => {
        const start_time = formattedTimeForUpdate(data.start_time);
        data.start_time = start_time;
        const end_time = formattedTimeForUpdate(data.end_time);
        data.end_time = end_time;
        const updatedData = {
            'organization_id':selectedOrganization ? selectedOrganization : oldData.organization_id,
            'company_id':selectedCompany ? selectedCompany : oldData.company_id,
            'branch_id':selectedBranch ? selectedBranch : oldData.branch_id,
            'name':data.name ? data.name : oldData.name,
            'start_time': data.start_time ? data.start_time : formattedTimeForUpdate(oldData.start_time),
            'end_time':data.end_time ? data.end_time : formattedTimeForUpdate(oldData.end_time),
            'weekends':weekdays ? JSON.stringify(weekdays) : oldData.weekends,
            'note':data.note ? data.note : oldData.note,
            'status':selectedStatus ? selectedStatus : oldData.status
        }

        console.log(updatedData);
        axios.put(`/hrm-system/shift/${oldData.id}`, updatedData)
            .then(info => {
                console.log("update",info)
                if(info?.status == 200)
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dataUpdateToggle(false);
                    allShiftReFetch();
                }
            })
            .catch(e => {
                // console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`
                })
            })
    }

    return (
        <>
            <BaseModal title={"Update Shift Entry"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Select
                                labelName={"Company"}
                                placeholder={"Select an option"}
                                options={company}
                                previous={oldData?.company_id}
                                setValue={setSelectedCompany}
                            />
                        </div>

                        <div>
                            <Select
                                labelName={"Branch"}
                                placeholder={"Select an option"}
                                options={branch}
                                previous={oldData?.branch_id}
                                setValue={setSelectedBranch}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Shift Name"}
                                inputName={"name"}
                                inputType={"text"}
                                defaultValue={oldData?.name}
                                placeholder={"Enter shift name"}
                                validation={{
                                    ...register("name"),
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
                                defaultValue={oldData?.start_time}
                                validation={{ ...register("start_time") }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"End Time"}
                                inputName={"end_time"}
                                inputType={"time"}
                                defaultValue={oldData?.end_time}
                                validation={{ ...register("end_time") }}
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
                            selected={oldData?.weekends ? JSON.parse(oldData?.weekends) : []}
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
                            {...register("note")}
                            defaultValue={oldData?.note}
                        ></textarea>

                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                            previous={oldData?.status}
                            setValue={setSelectedStatus}
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={dataUpdateToggle} className="me-2">
                            Cancel
                        </Button>
                        <Button color="primary" type="submit">
                            Update
                        </Button>
                    </div>
                </form>
            </BaseModal>
        </>
    );
};

export default ShiftUpdateModal;