import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../common/breadcrumb";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";
import {useForm} from "react-hook-form";
import {Button, Modal, ModalBody, ModalHeader, Pagination, PaginationItem, PaginationLink} from "reactstrap"
import moment from "moment/moment";
import axios from "../../../axios";
import Swal from "sweetalert2";
import Input from "../../common/modal/Input";
import getUserAPI from "../../common/Query/hrm/forSort/getUserAPI";
import GetEmployee from "../../common/Query/hrm/GetEmployee";
import Select from "../../common/modal/Select";

const CreateUser = () => {
    const [employee, setEmployee] = useState([]);
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

    const [user, setUser] = useState([]);
    const [modal, setModal] = useState(false);
    const [shiftModal, setShiftModal] = useState(false);
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const {register, handleSubmit, formState: { errors },} = useForm();
    const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] = GetEmployee();
    const [employeeInfo, setEmployeeInfo] = useState('');


    const handleChangeForUpdateStatus = (selected) => {
        setEmployeeInfo(selected);
    };

    useEffect( () => {
        const getUserdata= async () => {
            // const setItem = howManyItem < totalDBRow ? howManyItem : totalDBRow;
            const getData = await getUserAPI();
            setUser(getData?.data?.body?.users);
            // console.log(getData)

            // const totalItem = getData?.data?.body?.data?.count
            // setTotalDBRow(totalItem);
            // const page = Math.ceil( totalItem / howManyItem);
            // setPageCount(page);
        }
        getUserdata();

    }, [isChange])


    useEffect( () => {
        allEmployee?.data?.body?.data?.data?.map(item => {
            const set_data = {
                value: item.id,
                label: item?.full_name
            }
            setEmployee(prevEmployee => [...prevEmployee, set_data]);
        })
    }, [allEmployee])

    const onSubmit = (data) => {
        data.userId = employeeInfo?.value;
        axios.post('/users', data)
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
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    // text: `${e?.response?.data?.body?.message?.details[0].message}`,
                    text: `gfvcnhjgvhj`
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
                axios.delete(`/users/${id}`)
                    .then(info => {
                        if(info?.status == 200)
                        {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        isDarty();
                    })
                    .catch(e => {
                        if(e?.response?.data?.body?.message?.sqlState === "23000")
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `Can not delete shift, if there have any attendance in this shift`,
                            })
                        }
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
            <Breadcrumb parent="HRM System" title="Manage User" />

            <div className="container-fluid">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Select
                                labelName={"Employee Name"}
                                placeholder={"Select an option"}
                                options={employee}
                                setValue={setEmployeeInfo}
                                cngFn={handleChangeForUpdateStatus}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Password"}
                                inputName={"password"}
                                inputType={"password"}
                                validation={{ ...register("password", { required: true }) }}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button color="primary" type="submit">
                            Create
                        </Button>
                    </div>
                </form>
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
                                        <th scope="col">{"Email"}</th>
                                        <th scope="col">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        user?.map((item, index) =>
                                            <tr key={index}>
                                                <td>{ parseInt(howManyItem) * (parseInt(currentPage)-1) + index+1 }</td>
                                                <td>{item?.email}</td>
                                                <td>
                                                    <div className="">
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
        </>
    );
};

export default CreateUser;