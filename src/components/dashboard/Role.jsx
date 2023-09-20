import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Modal, ModalBody, ModalHeader, Pagination, PaginationItem, PaginationLink} from "reactstrap"
import Input from "../common/modal/Input";
import Select from "../common/modal/Select";
import axios from "../../axios";
import Swal from "sweetalert2";
import Breadcrumb from "../common/breadcrumb";
import CommonSearchComponet from "../common/salaryCard/CommonSearchComponet";
import RoleAPI from "../common/Query/RoleAPI";

const Role = () => {
    const [pageCount, setPageCount] = useState(0);
    const [howManyItem, setHowManyItem] = useState('10');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDBRow, setTotalDBRow] = useState(0);
    const [searchData, setSearchData] = useState('');


    const [role, setRole] = useState([]);
    const [modal, setModal] = useState(false);
    const [oldData, setOldData] = useState({});
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const {register, handleSubmit, formState: { errors },} = useForm();


    useEffect( () => {
        const getRole = async () => {
            const setItem = howManyItem < totalDBRow ? howManyItem : totalDBRow;
            console.log(setItem);
            const check1 = await RoleAPI(currentPage, howManyItem, searchData);
            setRole(check1?.data?.body?.data);

            const totalItem = check1?.data?.body?.count
            setTotalDBRow(totalItem);
            const page = Math.ceil( totalItem / howManyItem);
            setPageCount(page);
        }
        getRole();

    }, [howManyItem, currentPage, searchData])

    const toggle = () => {
        setModal(!modal);
    };
    const dataUpdateToggle = (item) => {
        setOldData(item);
        setDataUpdateModal(!dataUpdateModal);
    };

    const onSubmit = (data) => {
        console.log(data);
        // axios.post('/roles', data)
        //     .then(info => {
        //         if(info?.status == 200)
        //         {
        //             Swal.fire({
        //                 position: 'top-end',
        //                 icon: 'success',
        //                 title: 'Your work has been saved',
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             })
        //             setModal(!modal);
        //         }
        //         // allRoleReFetch();
        //     })
        //     .catch(e => {
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Oops...',
        //             text: `${e?.response?.data?.body?.message?.details[0].message}`,
        //         })
        //     })
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
                axios.delete(`/roles/${id}`)
                    .then(info => {
                        console.log(info)
                        if(info?.data?.body?.affectedRows === 1)
                        {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            // allRoleReFetch();
                        }
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

    const paginationItems = [];

    for (let i = 1; i <= pageCount; i++) {
        paginationItems.push(
            <PaginationItem key={i} active={i === currentPage}>
                <PaginationLink onClick={() => setCurrentPage(i)}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        );
    }

    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Roles" />
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
                            <CommonSearchComponet setCurrentPage={setCurrentPage} searchData={searchData} setSearchData={setSearchData} howManyItem={howManyItem} setHowManyItem={setHowManyItem} />
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className=" table-border">
                                    <tr>
                                        <th scope="col">{"SL"}</th>
                                        <th scope="col">{"Role Name"}</th>
                                        <th scope="col">{"Read"}</th>
                                        <th scope="col">{"Insert"}</th>
                                        <th scope="col">{"Update"}</th>
                                        <th scope="col">{"Delete"}</th>
                                        <th scope="col">{"Created By"}</th>
                                        <th scope="col">{"Updated by"}</th>
                                        <th scope="col">{"Status"}</th>
                                        <th scope="col text-center">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        role?.map((item, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.read_permission === 1 ? "Active" : "Inactive"}</td>
                                                <td>{item?.insert_permission === 1 ? "Active" : "Inactive"}</td>
                                                <td>{item?.update_permission === 1 ? "Active" : "Inactive"}</td>
                                                <td>{item?.delete_permission === 1 ? "Active" : "Inactive"}</td>
                                                <td>{item?.c_email}</td>
                                                <td>{item?.u_email}</td>
                                                <td>{item?.status === 1 ? "Active" : "Inactive"}</td>
                                                <td>
                                                    <div className="d-flex justify-content-start">
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
                            <div className="mt-3 d-flex justify-content-end">
                                <Pagination aria-label="Page navigation example" className="pagination-primary">
                                    <PaginationItem disabled={currentPage === 1 ? true : false}>
                                        <PaginationLink onClick={() => setCurrentPage(currentPage - 1)} previous href="#javascript" />
                                    </PaginationItem>

                                    {paginationItems}

                                    <PaginationItem disabled={currentPage === pageCount ? true : false}>
                                        <PaginationLink onClick={() => setCurrentPage(currentPage + 1)} next href="#javascript" />
                                    </PaginationItem>
                                </Pagination>
                            </div>
                            <p className="p-l-10 p-t-10">Showing 1 to 1 of 1 entries</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Role Entry</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <div className="mb-3">
                            <label htmlFor="">Permission</label>
                            <div>
                                <div class="checkbox checkbox-primary">
                                    <input value="1" id="Read" type="checkbox" { ...register("read_permission") }/>
                                    <label htmlFor="Read">Read</label>
                                </div>
                            </div>
                            <div>
                                <div class="checkbox checkbox-primary">
                                    <input value="1" id="Insert" type="checkbox"  { ...register("insert_permission") }/>
                                    <label htmlFor="Insert">Insert</label>
                                </div>
                            </div>
                            <div>
                                <div class="checkbox checkbox-primary">
                                    <input value="1" id="Update" type="checkbox" { ...register("update_permission") } />
                                    <label htmlFor="Update">Update</label>
                                </div>
                            </div>
                            <div>
                                <div class="checkbox checkbox-primary">
                                    <input value="1" id="Delete" type="checkbox" { ...register("delete_permission") } />
                                    <label htmlFor="Delete">Delete</label>
                                </div>
                            </div>
                        </div>
                        {/*<div>*/}
                        {/*    <Select*/}
                        {/*        labelName={"Weekend"}*/}
                        {/*        placeholder={"Select an option"}*/}
                        {/*        options={[*/}
                        {/*            {id: "Sunday", value: "Sunday"},*/}
                        {/*            {id: "Monday", value: "Monday"},*/}
                        {/*            {id: "Tuesday", value: "Tuesday"},*/}
                        {/*            {id: "Wednesday", value: "Wednesday"},*/}
                        {/*            {id: "Thursday", value: "Thursday"},*/}
                        {/*            {id: "Friday", value: "Friday"},*/}
                        {/*            {id: "Saturday", value: "Saturday"},*/}
                        {/*        ]}*/}
                        {/*        validation={{...register("weekends", {required: true})}}*/}
                        {/*        error={errors?.status}*/}
                        {/*    />*/}
                        {/*</div>*/}
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
            {/*{*/}
            {/*    oldData ?*/}
            {/*        <ShiftUpdateModal allShiftReFetch={allShiftReFetch} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></ShiftUpdateModal>*/}
            {/*        : ''*/}
            {/*}*/}
        </>
    );
};
export default Role;