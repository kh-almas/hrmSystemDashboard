import moment from "moment";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import GetAllHoliday from "../../../common/Query/hrm/GetAllHoliday";
import Breadcrumb from "../../../common/breadcrumb";
import HolidayUpdateModal from "../../../common/modal/Form/HolidayUpdateModal";
import Input from "../../../common/modal/Input";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Select from "../../../common/modal/Select";

const CompanyHoliday = () => {
    const [holiday, setHoliday] = useState([]);
    const [holidayGroup, setHolidayGroup] = useState([]);
    const [modal, setModal] = useState(false);
    const [oldData, setOldData] = useState({});
    const [dataUpdateModal, setDataUpdateModal] = useState(false);
    const [allHolidayStatus, allHolidayReFetch, allHoliday, allHolidayError] = GetAllHoliday();
    const {register, handleSubmit, formState: {errors}, reset,} = useForm();
    const [status, setStatus] = useState('Active');
    console.log(allHoliday);

    // console.log('holiday', holiday)
    const handleChangeForUpdateStatus = (selected) => {
        setStatus(selected);
    };

    useEffect(() => {
        setHoliday(allHoliday?.data?.body?.data);
        setHolidayGroup(allHoliday?.data?.body?.holiday_group);
    }, [allHoliday]);

    const toggle = () => {
        setModal(!modal);
    };
    const dataUpdateToggle = (item) => {
        setOldData(item);
        setDataUpdateModal(!dataUpdateModal);
    };

    const onSubmit = (data) => {
        if (data.dateTo) {
            const dateFrom = moment(data.dateFrom, "YYYY-MM-DD");
            const dateTo = moment(data.dateTo, "YYYY-MM-DD");
            const dayDiff = dateTo.diff(dateFrom, "days");

            let err = false;
            for (let I = 0; I <= dayDiff; I++) {
                axios
                    .post("/hrm-system/holiday", {
                        title: data.title,
                        date: dateFrom.add(I ? 1 : 0, "days").format("YYYY-MM-DD"),
                        holiday_group: holidayGroup,
                        status: status?.value,
                    })
                    .then(() => {
                    })
                    .catch(() => !err);
            }

            if (!err) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setModal(!modal);
                allHolidayReFetch();
                reset();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        } else {
            const {title, dateFrom} = data;

            axios
                .post("/hrm-system/holiday", {
                    title,
                    date: dateFrom,
                    holiday_group: holidayGroup,
                    status: status?.value,
                })
                .then((info) => {
                    if (info?.status == 200) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        setModal(!modal);
                    }
                    allHolidayReFetch();
                    reset();
                })
                .catch((e) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${e?.response?.data?.body?.message?.details[0].message}`,
                    });
                });
        }
    };

    const deleteShift = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/hrm-system/holiday/${id}`)
                    .then((info) => {
                        if (info?.status == 200) {
                            Swal.fire("Deleted!", "Your file has been deleted.", "success");
                        }
                        allHolidayReFetch();
                    })
                    .catch((e) => {
                        console.log(e);
                        if (e?.response?.data?.body?.message?.sqlState === "23000") {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: `Can not delete shift, if there have any attendance in this shift`,
                            });
                        }
                        // if (!empty(e?.response?.data?.body?.message?.details[0].message))
                        // {
                        //     Swal.fire({
                        //         icon: 'error',
                        //         title: 'Oops...',
                        //         text: `${e?.response?.data?.body?.message?.details[0].message}`,
                        //     })
                        // }
                    });
            }
        });
    };
    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Holiday"/>
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
                    style={{padding: "7px 13px", borderRadius: "5px"}}
                >
                    <i className="fa fa-plus"></i>
                </button>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card" style={{padding: "20px"}}>
                            <CommonSearchComponet/>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className=" table-border">
                                    <tr>
                                        <th scope="col">{"ID"}</th>
                                        <th scope="col">{"Title"}</th>
                                        <th scope="col">{"Year"}</th>
                                        <th scope="col">{"From Date"}</th>
                                        <th scope="col">{"To Date"}</th>
                                        <th scope="col">{"Status"}</th>
                                        <th scope="col">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {holiday?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.title}</td>
                                            <td>{item?.holiday_year}</td>
                                            <td>{item?.fromDate}</td>
                                            <td>{item?.todate}</td>
                                            <td>{item?.status}</td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <button
                                                        onClick={() => dataUpdateToggle(item)}
                                                        className="btn me-2"
                                                        style={{
                                                            backgroundColor: "skyblue",
                                                            color: "#ffffff",
                                                            padding: "7px 13px",
                                                            borderRadius: "5px",
                                                        }}
                                                    >
                                                        <i
                                                            className="icofont icofont-pencil-alt-5  rounded"
                                                            style={{
                                                                backgroundColor: "skyblue",
                                                                color: "#ffffff",
                                                            }}
                                                        ></i>
                                                    </button>
                                                    <button
                                                        onClick={() => deleteShift(item.id)}
                                                        className="btn"
                                                        style={{
                                                            backgroundColor: "#ff3a6e",
                                                            color: "#ffffff",
                                                            padding: "7px 13px",
                                                            borderRadius: "5px",
                                                        }}
                                                    >
                                                        <i
                                                            className="icofont icofont-trash rounded"
                                                            style={{
                                                                backgroundColor: "#ff3a6e",
                                                                color: "#ffffff",
                                                            }}
                                                        ></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="p-l-10 p-t-10">Showing 1 to 1 of 1 entries</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Holiday Entry</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Input
                                labelName={"Title"}
                                inputName={"title"}
                                inputType={"text"}
                                validation={{
                                    ...register("title", {required: true}),
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Date From"}
                                inputName={"date-from"}
                                inputType={"date"}
                                validation={{
                                    ...register("dateFrom", {required: true}),
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Date To"}
                                inputName={"date-to"}
                                inputType={"date"}
                                validation={{
                                    ...register("dateTo"),
                                }}
                            />
                        </div>
                        <div>
                            <Select
                                labelName={"Status"}
                                placeholder={"Select an option"}
                                options={[{value: "Active", label: "Active"}, {value: "Inactive", label: "Inactive"}]}
                                setValue={setStatus}
                                cngFn={handleChangeForUpdateStatus}
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
            <HolidayUpdateModal holidayGroup={holidayGroup} allHolidayReFetch={allHolidayReFetch} oldData={oldData} dataUpdateModal={dataUpdateModal} dataUpdateToggle={dataUpdateToggle}></HolidayUpdateModal>

        </>
    );
};

export default CompanyHoliday;
