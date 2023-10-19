import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {useForm} from "react-hook-form";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap"
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import GetAllCompany from "../../../common/Query/hrm/GetAllCompany";
import SectionUpdateModal from "../../../common/modal/Form/SectionUpdateModal";
import GetAllProject from "../../../common/Query/hrm/GetAllProject";
import ProjectUpdateModal from "../../../common/modal/Form/ProjectUpdateModal";

const CompanyProject = () => {
    const [company, setCompany] = useState([]);
    const [modal, setModal] = useState(false);
    const [oldData, setOldData] = useState({});
    const [project, setProject] = useState([]);
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allProjectStatus, allProjectReFetch, allProject, allProjectError] = GetAllProject();
    const {register, handleSubmit, formState: { errors },} = useForm();
    const [status, setStatus] = useState('');
    const [singleCompany, setSingleCompany] = useState('');

    useEffect(() => {
        setCompany([])
        allCompany?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setCompany(prevCompany => [...prevCompany, set_data]);
        })
    }, [allCompany])

    useEffect(() => {
        setProject(allProject?.data?.body?.data);
    }, [allProject])

    const toggle = () => {
        setModal(!modal);
    };
    const dataUpdateToggle = (item) => {
        setOldData(item);
        setDataUpdateModal(!dataUpdateModal);
    };

    const onSubmit = (data) => {
        data.statussss = status;
        data.company_id = singleCompany;
        axios.post('/hrm-system/project', data)
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
                allProjectReFetch();
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`,
                })
            })
    };

    const deleteProject = id => {
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
                axios.delete(`/hrm-system/project/${id}`)
                    .then(info => {
                        if(info?.status == 200)
                        {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        allProjectReFetch();
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
            <Breadcrumb parent="HRM System" title="Manage Project" />
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
                                        <th scope="col">{"Company"}</th>
                                        <th scope="col">{"Name"}</th>
                                        <th scope="col">{"Start Date"}</th>
                                        <th scope="col">{"End Date"}</th>
                                        <th scope="col">{"Total Employees"}</th>
                                        <th scope="col">{"Status"}</th>
                                        <th scope="col">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        project?.map((item, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.company_id}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.start_date}</td>
                                                <td>{item?.end_date}</td>
                                                <td>{item?.total_employees}</td>
                                                <td>{item?.status}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <button onClick={() => dataUpdateToggle(item)} className="btn me-2" style={{backgroundColor: "skyblue", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                            <i className="icofont icofont-pencil-alt-5  rounded" style={{backgroundColor: "skyblue", color: "#ffffff",}}></i>
                                                        </button>
                                                        <button onClick={() => deleteProject(item.id)} className="btn" style={{backgroundColor: "#ff3a6e", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
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
                <ModalHeader toggle={toggle}>Project Entry</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input
                                    labelName={"Project Name"}
                                    inputName={"name"}
                                    inputType={"text"}
                                    placeholder={"Enter project name"}
                                    validation={{
                                        ...register("name", { required: true }),
                                    }}
                                />
                            </div>
                            <div>
                                <Select
                                    labelName={"Company"}
                                    placeholder={"Select an option"}
                                    options={company}
                                    setValue={setSingleCompany}
                                />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleFormControlTextarea4">
                                Description*
                            </label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea4"
                                rows="3"
                                {...register("description", {required: true})}
                            ></textarea>
                            {errors.description && <span>This field is required</span>}
                        </div>
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input
                                    labelName={"Start Date"}
                                    inputName={"name"}
                                    inputType={"date"}
                                    placeholder={"Enter Start Date"}
                                    validation={{
                                        ...register("start_date", { required: true }),
                                    }}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"End Date"}
                                    inputName={"name"}
                                    inputType={"date"}
                                    placeholder={"Enter End Date"}
                                    validation={{
                                        ...register("end_date", { required: true }),
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input
                                    labelName={"Total Employee"}
                                    inputName={"name"}
                                    inputType={"text"}
                                    placeholder={"Enter Total Employee"}
                                    validation={{
                                        ...register("total_employees", { required: true }),
                                    }}
                                />
                            </div>
                            <div>
                                <Select
                                    labelName={"Status"}
                                    placeholder={"Select an option"}
                                    options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                                    setValue={setStatus}
                                />
                            </div>
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
                    <ProjectUpdateModal company={company} allProjectReFetch={allProjectReFetch} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></ProjectUpdateModal>
                    : ''
            }
        </>
    );
};

export default CompanyProject;