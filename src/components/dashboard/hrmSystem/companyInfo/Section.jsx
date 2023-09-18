import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap"
import Input from "../../../common/modal/Input";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Select from "../../../common/modal/Select";
import moment from "moment/moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import ShiftUpdateModal from "../../../common/modal/Form/shiftUpdateModal";
import GetAllOrganization from "../../../common/Query/hrm/GetAllOrganization";
import OrganizationUpdateModal from "../../../common/modal/Form/OrganizationUpdateModal";
import GetAllCompany from "../../../common/Query/hrm/GetAllCompany";
import CompanyUpdateModal from "../../../common/modal/Form/CompanyUpdateModal";
import GetAllBranch from "../../../common/Query/hrm/GetAllBranch";
import BranchUpdateModal from "../../../common/modal/Form/BranchUpdateModal";
import GetAllSection from "../../../common/Query/hrm/GetAllSection";
import GetAllDepartment from "../../../common/Query/hrm/GetAllDepartment";
import SectionUpdateModal from "../../../common/modal/Form/SectionUpdateModal";

const Section = () => {
    const [department, setDepartment] = useState([]);
    const [modal, setModal] = useState(false);
    const [oldData, setOldData] = useState({});
    const [branch, setBranch] = useState([]);
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const [allDepartmentStatus, allDepartmentReFetch, allDepartment, allDepartmentError] = GetAllDepartment();
    const [allSectionStatus, allSectionReFetch, allSection, allSectionError] = GetAllSection();
    const {register, handleSubmit, formState: { errors },} = useForm();


    useEffect(() => {
        setDepartment([])
        allDepartment?.data?.body?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setDepartment(prevDepartment => [...prevDepartment, set_data]);
        })
    }, [allDepartment])

    useEffect(() => {
        setBranch(allSection?.data?.body?.data);
    }, [allSection])

    const toggle = () => {
        setModal(!modal);
    };
    const dataUpdateToggle = (item) => {
        setOldData(item);
        setDataUpdateModal(!dataUpdateModal);
    };

    const onSubmit = (data) => {
        axios.post('/hrm-system/section', data)
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
                    setModal(!modal);
                }
                allSectionReFetch();
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`,
                })
            })
    };

    const deleteShift = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/hrm-system/section/${id}`)
                    .then(info => {
                        if(info?.status == 200)
                        {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        allSectionReFetch();
                    })
                    .catch(e => {
                        console.log(e);
                        if(e?.response?.data?.body?.message?.sqlState === "23000")
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `Can not delete shift, if there have any attendance in this shift`,
                            })
                        }
                        // if (!empty(e?.response?.data?.body?.message?.details[0].message))
                        // {
                        //     Swal.fire({
                        //         icon: 'error',
                        //         title: 'Oops...',
                        //         text: `${e?.response?.data?.body?.message?.details[0].message}`,
                        //     })
                        // }
                    })
            }
        })
    }
    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Section" />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginBottom: "20px",
                }}
            >
                <button
                    onClick={toggle}
                    className="btn btn-pill btn-info btn-air-info btn-air-info"
                    style={{ padding: "7px 13px", borderRadius: "5px" }}
                >
                    <i className="fa fa-plus"></i>
                </button>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card" style={{ padding: "20px" }}>
                            <CommonSearchComponet />
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className=" table-border">
                                    <tr>
                                        <th scope="col">{"ID"}</th>
                                        <th scope="col">{"Name"}</th>
                                        <th scope="col">{"Department"}</th>
                                        <th scope="col">{"Status"}</th>
                                        <th scope="col">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        branch?.map((item, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.department_id}</td>
                                                <td>{item?.status}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <button onClick={() => dataUpdateToggle(item)} className="btn me-2" style={{backgroundColor: "skyblue", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                            <i className="icofont icofont-pencil-alt-5  rounded" style={{backgroundColor: "skyblue", color: "#ffffff",}}></i>
                                                        </button>
                                                        <button onClick={() => deleteShift(item.id)} className="btn" style={{backgroundColor: "#ff3a6e", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                            <i className="icofont icofont-trash rounded" style={{backgroundColor: "#ff3a6e", color: "#ffffff",}}></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <p className="p-l-10 p-t-10">Showing 1 to 1 of 1 entries</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Section Entry</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Select
                                labelName={"Department"}
                                placeholder={"Select an option"}
                                options={department}
                                validation={{...register("department_id", {required: true})}}
                                error={errors?.department_id}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Section Name"}
                                inputName={"name"}
                                inputType={"text"}
                                placeholder={"Enter company name"}
                                validation={{
                                    ...register("name", { required: true }),
                                }}
                            />
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
                </ModalBody>
            </Modal>
            {
                oldData ?
                    <SectionUpdateModal department={department} allSectionReFetch={allSectionReFetch} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></SectionUpdateModal>
                    : ''
            }
        </>
    );
};

export default Section;