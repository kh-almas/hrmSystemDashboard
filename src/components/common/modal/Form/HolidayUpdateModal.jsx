import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button} from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import BaseModal from "../BaseModal";
import Input from "../Input";
import Select from "../Select";
import moment from "moment/moment";

const HolidayUpdateModal = ({allHolidayReFetch, oldData, dataUpdateModal, dataUpdateToggle}) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const [status, setStatus] = useState('Active');
    console.log('oldData', oldData);

    const [statusOptions, setStatusOptions] = useState([
        {value: "Active", label: "Active"},
        {value: "Inactive", label: "Inactive"}
    ])

    useEffect(() => {
        const filterStatus = statusOptions?.find(data => data.value == oldData?.status)
        setStatus(filterStatus);
        reset()
    }, [oldData])

    const handleChangeForUpdateStatus = (selected) => {
        setStatus(selected);
    };

    const onSubmit = (data) => {

        const holidayFromDate = data.dateFrom ? data.dateFrom : oldData?.fromDate;
        const holidayToDate = data.dateTo ? data.dateTo : oldData?.todate;

        // console.log(data)
        if (holidayToDate) {
            const dateFrom = moment(holidayFromDate, "YYYY-MM-DD");
            const dateTo = moment(holidayToDate, "YYYY-MM-DD");
            const dayDiff = dateTo.diff(dateFrom, "days");
            console.log('dateFrom', dateFrom, 'dateTo', dateTo, 'dayDiff', dayDiff);
            console.log(dayDiff, 'dayDiff');

            let err = false;
            for (let I = 0; I <= dayDiff; I++) {

                axios
                    .put(`/hrm-system/holiday/${oldData?.holiday_group}`, {
                            title: data.title,
                            date: dateFrom.add(I > 0 ? 1 : 0, "days").format("YYYY-MM-DD"),
                            status: status?.value
                        }
                    )
                    .then(() => {
                        allHolidayReFetch();
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
                dataUpdateToggle();

                reset();
                allHolidayReFetch();
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
                .put(`/hrm-system/holiday/${oldData?.holiday_group}`, {
                    title,
                    date: dateFrom,
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
                        dataUpdateToggle();
                    }
                    reset();
                    allHolidayReFetch();
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

    return (
        <>
            <BaseModal
                title={"Update Holiday"}
                dataModal={dataUpdateModal}
                dataToggle={dataUpdateToggle}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            labelName={"Title"}
                            inputName={"title"}
                            defaultValue={oldData?.title}
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
                            defaultValue={oldData?.fromDate}
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
                            defaultValue={oldData?.todate}
                            validation={{
                                ...register("dateTo"),
                            }}
                        />
                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={statusOptions}
                            previous={status}
                            setValue={setStatus}
                            cngFn={handleChangeForUpdateStatus}
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

export default HolidayUpdateModal;
