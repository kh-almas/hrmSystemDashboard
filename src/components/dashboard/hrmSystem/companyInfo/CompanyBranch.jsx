import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Button, Modal, ModalBody, ModalHeader, Pagination, PaginationItem, PaginationLink} from "reactstrap"
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
import getCompanyAPI from "../../../common/Query/hrm/forSort/getCompanyAPI";
import getCompanyBranchAPI from "../../../common/Query/hrm/forSort/getCompanyBranchAPI";
import AddCompanyModal from "../../../common/modal/Form/AddCompanyModal";
import AddBranchModal from "../../../common/modal/Form/AddBranchModal";

const CompanyBranch = () => {
    const [pageCount, setPageCount] = useState(1);
    const [howManyItem, setHowManyItem] = useState('10');
    const [currentPage, setCurrentPage] = useState('1');
    const [totalDBRow, setTotalDBRow] = useState(0);
    const [searchData, setSearchData] = useState('');
    const [isChange, setIsChange] = useState(false);
    const isDarty = () =>
    {
        setIsChange(!isChange);
    }

    const [company, setCompany] = useState([]);
    const [modal, setModal] = useState(false);
    const [oldData, setOldData] = useState({});
    const [branch, setBranch] = useState([]);
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = GetAllBranch();
    const {register, handleSubmit, formState: { errors },} = useForm();


    useEffect( () => {
        const getCompanyBranch= async () => {
            const setItem = howManyItem < totalDBRow ? howManyItem : totalDBRow;
            // console.log(setItem);
            const getData = await getCompanyBranchAPI(currentPage, howManyItem, searchData);
            setBranch(getData?.data?.body?.data?.data);
            console.log("getData",getData);

            const totalItem = getData?.data?.body?.data?.count
            setTotalDBRow(totalItem);
            const page = Math.ceil( totalItem / howManyItem);
            setPageCount(page);
        }
        getCompanyBranch();

    }, [howManyItem, currentPage, searchData, isChange])

    useEffect(() => {
        setCompany([])
        allCompany?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item.id,
                value: item.name
            }
            setCompany(prevShift => [...prevShift, set_data]);
        })
    }, [allCompany])

    const toggle = () => {
        setModal(!modal);
    };
    const dataUpdateToggle = (item) => {
        setOldData(item);
        setDataUpdateModal(!dataUpdateModal);
    };

    const onSubmit = (data) => {
        axios.post('/hrm-system/branch', data)
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
                isDarty();
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
                axios.delete(`/hrm-system/branch/${id}`)
                    .then(info => {
                        if(info?.status == 200)
                        {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        allBranchReFetch();
                        isDarty()
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
            <PaginationItem key={i} active={i === parseInt(currentPage)}>
                <PaginationLink onClick={() => setCurrentPage(i)}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        );
    }

    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Branch" />
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
                                        <th scope="col">{"ID"}</th>
                                        <th scope="col">{"Company"}</th>
                                        <th scope="col">{"Name"}</th>
                                        <th scope="col">{"Email"}</th>
                                        <th scope="col">{"Phone"}</th>
                                        <th scope="col">{"Address"}</th>
                                        <th scope="col">{"Status"}</th>
                                        <th scope="col">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        branch?.map((item, index) =>
                                            <tr key={index}>
                                                <td>{ parseInt(howManyItem) * (parseInt(currentPage)-1) + index+1 }</td>
                                                <td>{item?.company_name}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.email}</td>
                                                <td>{item?.phone}</td>
                                                <td>{item?.address}</td>
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
                            {/*<p className="p-l-10 p-t-10">Showing 1 to 1 of 1 entries</p>*/}
                        </div>
                    </div>
                </div>
            </div>
            <AddBranchModal modal={modal} toggle={toggle} reFetch={isDarty}></AddBranchModal>
            {
                oldData ?
                    <BranchUpdateModal company={company} allBranchReFetch={isDarty} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></BranchUpdateModal>
                    : ''
            }
        </>
    );
};

export default CompanyBranch;