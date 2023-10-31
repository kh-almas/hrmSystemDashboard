import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {useForm} from "react-hook-form";
import {Button, Modal, ModalBody, ModalHeader, Pagination, PaginationItem, PaginationLink} from "reactstrap";
import moment from "moment/moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import ShiftUpdateModal from "../../../common/modal/Form/shiftUpdateModal";
import AddMachineInfoModal from "../../../common/modal/Form/AddMachineInfoModal";
import getMatchineInfoAPI from "../../../common/Query/hrm/forSort/getMatchineInfoAPI";
import UpdateMachineInfoModal from "../../../common/modal/Form/UpdateMachineInfoModal";

const Shift = () => {
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

    const [MachineInfo, setMachineInfo] = useState([]);
    const [modal, setModal] = useState(false);
    const [oldData, setOldData] = useState({});
    // const [machineInfoModal, setMachineInfoModal] = useState(false);
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const {register, handleSubmit, formState: { errors },} = useForm();



    useEffect( () => {
        const MachineInfo= async () => {
            const setItem = howManyItem < totalDBRow ? howManyItem : totalDBRow;
            // console.log(setItem);
            const getData = await getMatchineInfoAPI(currentPage, howManyItem, searchData);
            setMachineInfo(getData?.data?.body?.data?.data);
            console.log(getData?.data?.body?.data?.data);

            const totalItem = getData?.data?.body?.data?.count
            setTotalDBRow(totalItem);
            const page = Math.ceil( totalItem / howManyItem);
            setPageCount(page);
        }
        MachineInfo();

    }, [howManyItem, currentPage, searchData, isChange])

    //
    // const shiftToggle = () => {
    //     setShiftModal(!shiftModal);
    // }
    const formattedTime = time => moment(time, "HH:mm").format("HH:mm:ss");

    // console.log(shift);
    const timeFormat = time => {
        if (time){
            const timeArray = time.split(":");
            return `${timeArray[0]}h ${timeArray[1]}m`;
        }
    }

    const toggle = () => {
        setModal(!modal);
    };
    const dataUpdateToggle = (item) => {
        if (item)
        {
            const formattedTime = time => moment(time, "HH:mm:ss").format("HH:mm");
            const start_time = formattedTime(item?.start_time);
            item.start_time = start_time;
            const end_time = formattedTime(item?.end_time);
            item.end_time =end_time;
        }
        setOldData(item);
        setDataUpdateModal(!dataUpdateModal);
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
                axios.delete(`/hrm-system/machine/info/${id}`)
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
                        // console.log(e);
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
            <Breadcrumb parent="HRM System" title="Manage Machine Information" />
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
                                        <th scope="col">{"Organization"}</th>
                                        <th scope="col">{"Company"}</th>
                                        <th scope="col">{"Branch"}</th>
                                        <th scope="col">{"Machine Number"}</th>
                                        <th scope="col">{"Machine IP"}</th>
                                        <th scope="col">{"Machine Port"}</th>
                                        <th scope="col">{"Common Key"}</th>
                                        <th scope="col">{"Location"}</th>
                                        <th scope="col">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        MachineInfo?.map((item, index) =>
                                            <tr key={index}>
                                                <td>{ parseInt(howManyItem) * (parseInt(currentPage)-1) + index+1 }</td>
                                                <td>{item?.org_name}</td>
                                                <td>{item?.com_name}</td>
                                                <td>{item?.branch_name}</td>
                                                <td>{item?.MachineNo}</td>
                                                <td>{item?.MachineIP}</td>
                                                <td>{item?.MachinePort}</td>
                                                <td>{item?.commKey}</td>
                                                <td>{item?.Location}</td>
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
            <AddMachineInfoModal reFetch={isDarty} modal={modal} toggle={toggle} />
            {
                oldData ?
                    <UpdateMachineInfoModal allShiftReFetch={isDarty} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></UpdateMachineInfoModal>
                    : ''
            }
        </>
    );
};

export default Shift;