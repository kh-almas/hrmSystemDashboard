import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Pagination, PaginationItem, PaginationLink} from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import axios from "../../../../axios";
import Swal from 'sweetalert2'
import ManualAttendancesForm from "../../../common/modal/Form/ManualAttendancesForm";
import ManualAttendancesUpdateForm from "../../../common/modal/Form/ManualAttendancesUpdateForm";
import GetManualAttendance from "../../../common/Query/hrm/GetManualAttendance";
import Input from "../../../common/modal/Input";
import {useForm} from "react-hook-form";
import getAllBranch from "../../../common/Query/hrm/GetAllBranch";
import moment from "moment";
import GetAllCompany from "../../../common/Query/hrm/GetAllCompany";
import getManualAttendanceAPI from "../../../common/Query/hrm/forSort/getManualAttendanceAPI";
import Select from "../../../common/modal/Select";

const ManualAttendance = () => {
    const [url, setUrl] = useState('/hrm-system/manual-attendance');
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

    const [branch, setBranch] = useState([]);
    const [company, setCompany] = useState([]);
    const [dataModal, setDataModal] = useState(false);
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [datewise, setDatewise] = useState('');

    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");

    const [selectedBranchInfo, setSelectedBranchInfo] = useState({value: '', label: 'Select an option'});
    const [selectedCompanyInfo, setSelectedCompanyInfo] = useState({value: '', label: 'Select an option'});

    const [modal, setModal] = useState();
    const [date, setDate] = useState(true);
    const [oldData, setOldDate] = useState('');
    const [data, setData] = useState([]);
    const [totalItemCount, setTotalItemCount] = useState();
    const {register, reset, handleSubmit, formState: { errors },} = useForm();
    const [status, refetch, manualAttendance, error] = GetManualAttendance();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = getAllBranch();
    const [selectedMonth, setSelectedMonth] =useState('');
    const [shortDate, setShortDate] = useState('');

    const handleChangeForUpdateCompany = (selected) => {
        setSelectedCompany(selected?.value);
        setSelectedCompanyInfo(selected);
    };

    const handleChangeForUpdateBranch = (selected) => {
        setSelectedBranch(selected?.value);
        setSelectedBranchInfo(selected);
    };

    const removeSearch = () => {
        setStartDate('');
        setEndDate('')
        setShortDate('');
        setDatewise('');
        setSelectedBranch('');
        setSelectedCompany('');
        setSelectedCompanyInfo({value: '', label: 'Select an option'});
        setSelectedBranchInfo({value: '', label: 'Select an option'});
    }

    const setMonth = e => {
        const value = e.target.value
        const startOfMonth = moment(value, 'YYYY-MM').clone().startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment(value, 'YYYY-MM').clone().endOf('month').format('YYYY-MM-DD');
        setStartDate(startOfMonth);
        setEndDate(endOfMonth);
        setShortDate(value);
    }

    const setDateWiseFn = e => {
        const value = e.target.value
        setDatewise(value);
    }

    useEffect( () => {
        const getManualAttendance= async () => {
            const setItem = howManyItem < totalDBRow ? howManyItem : totalDBRow;
            const getData = await getManualAttendanceAPI(url, currentPage, howManyItem, searchData, selectedBranch, selectedCompany, startDate, endDate, datewise);
            setData(getData?.data?.body?.data?.data);

            const totalItem = getData?.data?.body?.data?.count
            setTotalItemCount(totalItem);
            setTotalDBRow(totalItem);
            const page = Math.ceil( totalItem / howManyItem);
            setPageCount(page);
        }
        getManualAttendance();

    }, [howManyItem, currentPage, searchData, isChange, selectedBranch, selectedCompany, endDate, datewise])

    useEffect(() => {
        setCompany([])
        allCompany?.data?.body?.data?.data?.map(item => {
            const set_data = {
                value: item.id,
                label: item.name
            }
            setCompany(prevCompany => [...prevCompany, set_data]);
        })
    }, [allCompany])

    useEffect(() => {
        setBranch([])
        if (selectedCompany !== ""){
            const sortedData = allBranch?.data?.body?.data?.data?.filter((data) => parseInt(data.company_id) === parseInt(selectedCompany))
            sortedData?.map(item => {
                const set_data = {
                    value: item.id,
                    label: item.name
                }
                setBranch(prevBranch => [...prevBranch, set_data]);
            })
        }
    }, [allBranch, selectedCompany])

    const timeFormat = time => {
        if (time){
            const timeArray = time.split(":");
            return `${timeArray[0]}h ${timeArray[1]}m`;
        }
    }

    const toggle = () => {
        setModal(!modal);
    };

    const dataToggle = () => {
        setDataModal(!dataModal);
    };

    const dataUpdateToggle = (data) => {
        setOldDate(data);
        setDataUpdateModal(!dataUpdateModal);
    };

    const deleteAttendance = id => {
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
                axios.delete(`/hrm-system/manual-attendance/${id}`)
                    .then(info => {
                        if(info?.status == 200)
                        {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        setIsChange(!isChange);
                    })
                    .catch(e => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${e?.response?.data?.body?.message?.details[0].message}`,
                        })
                    })
            }
        })
    }



    const csvSubmit= (data) => {
        const formData = new FormData();
        formData.append('csv', data.csv[0]);

        axios.post('/hrm-system/manual-attendance/csv', formData)
            .then(info => {
                if (info?.status == 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message}`,
                })
            })
        reset();
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
            <Breadcrumb parent="HRM System" title="Manage Manual Attendance List"/>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginBottom: "20px",
                }}
            >
                <button
                    onClick={dataToggle}
                    className="btn btn-pill btn-info btn-air-info btn-air-info"
                    style={{padding: "7px 13px", borderRadius: "5px"}}
                >
                    <i className="fa fa-plus"></i>
                </button>
            </div>
            <div className="card" style={{padding: "20px"}}>
                <div className="row">
                    <div className="col-2">
                        <label htmlFor="exampleFormControlInput1">Type</label>
                        <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                            <div className="radio radio-primary">
                                <input
                                    id="radioinline1"
                                    type="radio"
                                    name="radio3"
                                    value="option1"
                                    onClick={() => setDate(true)}
                                />
                                <label className="mb-0" htmlFor="radioinline1">
                                    {Option}
                                    <span className="digits"> {"Monthly"}</span>
                                </label>
                            </div>
                            <div className="radio radio-primary">
                                <input
                                    id="radioinline2"
                                    type="radio"
                                    name="radio3"
                                    value="option1"
                                    onClick={() => setDate(false)}
                                />
                                <label className="mb-0" htmlFor="radioinline2">
                                    {Option}
                                    <span className="digits"> {"Daily"}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {date && (
                        <div className="col">
                            <label htmlFor="exampleFormControlInput1">Month</label>
                            <input
                                onChange={setMonth}
                                className="form-control"
                                required={true}
                                type="month"
                                value={shortDate}
                            />
                        </div>
                    )}
                    {!date && (
                        <div className="col">
                            <label htmlFor="exampleFormControlInput1">Date</label>
                            <input onChange={setDateWiseFn} value={datewise} className="form-control" required={true} type="date"/>
                        </div>
                    )}
                    <div className="col">
                        <Select
                            labelName={"Company"}
                            placeholder={"Select an option"}
                            options={company}
                            setValue={setSelectedCompany}
                            previous={selectedCompanyInfo}
                            cngFn={handleChangeForUpdateCompany}
                        />
                    </div>
                    <div className="col">
                        <Select
                            labelName={"Branch"}
                            placeholder={"Select an option"}
                            options={branch}
                            setValue={setSelectedBranch}
                            previous={selectedBranchInfo}
                            cngFn={handleChangeForUpdateBranch}
                        />
                    </div>
                    <div className="col-1">
                        <div  style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "25px"}}>
                            <button className="btn btn-danger btn-lg " style={{padding: "0 10px 3px 10px", borderRadius: "5px", marginRight : '3px'}} onClick={() => removeSearch()}>
                                <i style={{fontSize: '8px'}} className= "icon-close"></i>
                            </button>
                            <button onClick={toggle} className="btn btn-danger btn-lg " style={{padding: "0 10px 3px 10px", borderRadius: "5px", marginRight : '3px'}}>
                                <i style={{fontSize: '12px'}} className="fa fa-cloud-upload"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Import employee CSV file</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(csvSubmit)} className="m-t-15 m-b-15">
                        {/*<div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px",}}><h6 className="m-0">Download sample employee CSV file</h6><button className="btn btn-primary btn-lg">{" "}<i className="fa fa-upload"></i> Download</button></div>*/}
                        <div>
                            <Input
                                labelName={"Select CSV File"}
                                inputName={"csv"}
                                inputType={"file"}
                                validation={{ ...register("csv", { required: true }) }}
                                error={errors.csv}
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button color="danger" onClick={toggle} className="me-2">
                                Cancel
                            </Button>
                            <Button color="primary" type="submit">
                                Upload
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>

            <div className="card" style={{padding: "20px"}}>
                <CommonSearchComponet setCurrentPage={setCurrentPage} searchData={searchData} setSearchData={setSearchData} howManyItem={howManyItem} setHowManyItem={setHowManyItem} />
                <div className="table-responsive">
                    <table className="table">
                        <thead className=" table-border">
                        <tr>
                            <th scope="col">{"SL"}</th>
                            <th scope="col">{"Employee"}</th>
                            {/*<th scope="col">{"Company"}</th>*/}
                            {/*<th scope="col">{"Branch"}</th>*/}
                            <th scope="col">{"Date"}</th>
                            <th scope="col">{"Status"}</th>
                            <th scope="col">{"Clock In"}</th>
                            <th scope="col">{"Clock Out"}</th>
                            <th scope="col">{"Late"}</th>
                            <th scope="col">{"Early Leaving"}</th>
                            <th scope="col">{"Overtime"}</th>
                            <th scope="col">{"Action"}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data ?
                                data?.map((item, index) =>
                                    <tr key={index}>
                                        <td>{ parseInt(howManyItem) * (parseInt(currentPage)-1) + index+1 }</td>
                                        <td>{item?.employee_name }</td>
                                        {/*<td>{item?.company_id }</td>*/}
                                        {/*<td>{item?.branch_id }</td>*/}
                                        <td>{item?.date ?? 'N/A'}</td>
                                        <td>{item?.status ?? 'N/A'}</td>
                                        <td>{timeFormat(item?.in_time) ?? 'N/A'}</td>
                                        <td>{timeFormat(item?.out_time) ?? 'N/A'}</td>
                                        <td>{timeFormat(item?.late) ?? 'N/A'}</td>
                                        <td>{timeFormat(item?.early_out) ?? 'N/A'}</td>
                                        <td>{timeFormat(item?.over_time) ?? 'N/A'}</td>
                                        <td>
                                            <div className="d-flex justify-content-center">
                                                <button onClick={() => dataUpdateToggle(item)} className="btn me-2" style={{backgroundColor: "skyblue", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                    <i className="icofont icofont-pencil-alt-5  rounded" style={{backgroundColor: "skyblue", color: "#ffffff",}}></i>
                                                </button>
                                                <button onClick={() => deleteAttendance(item.id)} className="btn" style={{backgroundColor: "#ff3a6e", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                    <i className="icofont icofont-trash rounded" style={{backgroundColor: "#ff3a6e", color: "#ffffff",}}></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                 :
                                <tr>
                                    <td rowSpan={9}>
                                        <p>No entries found</p>
                                    </td>
                                </tr>
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
                {/*<p className="mt-3">Showing {totalItemCount} to {totalItemCount} of {totalItemCount} entries</p>*/}
            </div>

            <ManualAttendancesForm refetch={isDarty} dataModal={dataModal} dataToggle={dataToggle}></ManualAttendancesForm>

            <ManualAttendancesUpdateForm refetch={isDarty} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></ManualAttendancesUpdateForm>


        </>
    );
};

export default ManualAttendance;
