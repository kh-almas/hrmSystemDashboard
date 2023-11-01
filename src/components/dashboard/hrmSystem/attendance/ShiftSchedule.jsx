import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Button, Modal, ModalBody, ModalHeader, Pagination, PaginationItem, PaginationLink} from "reactstrap";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import GetAllShift from "../../../common/Query/hrm/GetAllShift";
import GetAllShiftSchedule from "../../../common/Query/hrm/GetAllShiftSchedule";
import ShiftScheduleUpdateModal from "../../../common/modal/Form/ShiftScheduleUpdateModal";
import getShiftAPI from "../../../common/Query/hrm/forSort/getShiftAPI";
import getShiftScheduleAPI from "../../../common/Query/hrm/forSort/getShiftScheduleAPI";
import AddShiftSceduleModal from "../../../common/modal/Form/AddShiftSceduleModal";

const ShiftSchedule = () => {
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

    const {register, handleSubmit, reset, formState: { errors },} = useForm();
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);
    const [oldData, setOldData] = useState([]);
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const [shift, setShift] = useState([]);
    const [allShiftStatus, allShiftReFetch, allShift, allShiftError] = GetAllShift();


    useEffect( () => {
        const getShift= async () => {
            const setItem = howManyItem < totalDBRow ? howManyItem : totalDBRow;
            // console.log(setItem);
            const getData = await getShiftScheduleAPI(currentPage, howManyItem);
            setData(getData?.data?.body?.data?.data);
            // console.log("sdjhsakdfvhnsadklvhnldfn",getData?.data?.body?.data?.data);

            const totalItem = getData?.data?.body?.data?.count
            setTotalDBRow(totalItem);
            const page = Math.ceil( totalItem / howManyItem);
            setPageCount(page);
        }
        getShift();

    }, [howManyItem, currentPage, searchData, isChange])

    const toggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        setShift([])
        allShift?.data?.body?.data?.data?.map(item => {
            const set_data = {
                value: item.id,
                label: item.name
            }
            setShift(prevShift => [...prevShift, set_data]);
        })
    }, [allShift])

    // useEffect(() => {
    //     setData(allShiftSchedule?.data?.body?.data?.data);
    // }, [allShiftSchedule])




    const dataUpdateToggle = (item) => {
        setOldData(item);
        setDataUpdateModal(!dataUpdateModal);
    };

    const deleteSchedule = id => {
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
                axios.delete(`/hrm-system/shift-schedule/${id}`)
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
            <Breadcrumb parent="HRM System" title="Manage Shift Schedule" />
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
                                        <th scope="col">{"Date From"}</th>
                                        <th scope="col">{"Date To"}</th>
                                        <th scope="col">{"Shift From"}</th>
                                        <th scope="col">{"Shift To"}</th>
                                        <th scope="col">{"Active On"}</th>
                                        <th scope="col">{"Status"}</th>
                                        <th scope="col">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data?.map((item, index) =>
                                            <tr key={index}>
                                                <td>{ parseInt(howManyItem) * (parseInt(currentPage)-1) + index+1 }</td>
                                                <td>{item?.date_from}</td>
                                                <td>{item?.date_to}</td>
                                                <td>{item?.s_shift}</td>
                                                <td>{item?.e_shift}</td>
                                                <td>{item?.active_on}</td>
                                                <td>{item?.status}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <button onClick={() => dataUpdateToggle(item)} className="btn me-2" style={{backgroundColor: "skyblue", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                            <i className="icofont icofont-pencil-alt-5  rounded" style={{backgroundColor: "skyblue", color: "#ffffff",}}></i>
                                                        </button>
                                                        <button onClick={() => deleteSchedule(item.id)} className="btn" style={{backgroundColor: "#ff3a6e", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
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


            <AddShiftSceduleModal shift={shift} modal={modal} toggle={toggle} reFetch={isDarty} ></AddShiftSceduleModal>

            {
                oldData ?
                    <ShiftScheduleUpdateModal shift={shift} allShiftScheduleReFetch={isDarty} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></ShiftScheduleUpdateModal>
                    : ''
            }
        </>
    );
};

export default ShiftSchedule;