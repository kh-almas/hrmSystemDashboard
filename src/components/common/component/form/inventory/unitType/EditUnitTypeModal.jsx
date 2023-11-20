import React, {useState, useEffect, useMemo} from 'react';
import {Button} from "reactstrap";
import BaseModal from "../../../../modal/BaseModal";
import Input from "../../../../modal/Input";
import Select from "../../../../modal/Select";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "../../../../../../axios";
import Swal from "sweetalert2";

const EditUnitTypeModal = ({modal, toggle, reFetch, valueForEdit}) => {
    console.log(valueForEdit)
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem("branch_id"));
    const [status, setStatus] = useState({});
    const [unitType, setUnitType] = useState({});
    const [oldData, setOldData] = useState({});

    const schema = yup
        .object({
            description: yup.string().required("Business name is required")
        })
        .required()

    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: {errors},
        reset,
    } = useForm({
        defaultValues: useMemo(()=> {
            return oldData;
        }, [oldData]),
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        setOldData(valueForEdit?.original);
        reset();
    }, [reset, oldData, valueForEdit])

    const fieldValidation = (fieldName, value, fixedItem) => {
        const schema = yup.string()
            .oneOf(fixedItem, `Invalid ${fieldName}` )
            .required(`${fieldName} is required`);

        return schema.validate(value, {abortEarly: false})
            .then(valid => ({isValid: true, errors: {}}))
            .catch(errors => ({isValid: false, errors}));
    }

    const processManualError = async (fieldName, value, fixedItem) => {
        const fieldValidationCheck = await fieldValidation(fieldName, value, fixedItem);
        // console.log("value", fieldValidationCheck)
        clearErrors(fieldName);
        if (!fieldValidationCheck.isValid) {
            clearErrors(fieldName);
            setError(fieldName, {
                type: 'manual',
                message: fieldValidationCheck?.errors?.message,
            });

            return fieldValidationCheck;
        }
    }

    const onSubmit = async (data) => {
        const checkStatus = await processManualError('status', status?.value, ['Active', 'Inactive'])

        if(checkStatus?.isValid !== false){
            const processData = {
                company_id:selectedCompany,
                branch_id: selectedBranch,
                unit_type: data?.unit_type ?? oldData?.unit_type_s,
                description: data?.description ?? oldData?.description_s,
                status: status?.value ?? oldData?.status_s_g
            }
            axios.put(`/inventory-management/unit-type/update/${oldData?.id}`, processData)
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
                        toggle();
                        // reset();
                    }
                    reFetch();
                })
                .catch(e => {
                    console.log(e);
                    if(e?.response?.data?.body?.message?.errno == 1062){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Can not duplicate variant name',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: `${e?.response?.data?.body?.message?.details[0].message}`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
    }

    const [statusOptions, setStatusOptions] = useState([
        {value: "Active", label: "Active"},
        {value: "Inactive", label: "Inactive"}
    ])

    const [unitTypeOptions, setUnitTypeOptions] = useState([
        {value: "PCs", label: "PCs"},
        {value: "Weight", label: "Inactive"}
    ])

    useEffect(() => {
        const filterStatus = statusOptions?.find(data => data.value == oldData?.status_s_g)
        setStatus(filterStatus);
        const filterUnitType = unitTypeOptions?.find(data => data.value == oldData?.unit_type_s)
        setUnitType(filterUnitType);
    }, [oldData])

    const handleChangeForUpdateStatus = async (selected) => {
        await processManualError('status', selected?.value, ['Active', 'Inactive'])
        setStatus(selected);
    };

    const handleChangeForUnitType = async (selected) => {
        await processManualError('unit_type', selected?.value, ['PCs', 'Weight'])
        setUnitType(selected);
    };

    return (
        <>
            <BaseModal title={"Add Unit Type"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Select
                            labelName={"Unit Type"}
                            placeholder={"Select an option"}
                            options={unitTypeOptions}
                            setValue={setUnitType}
                            cngFn={handleChangeForUnitType}
                            error={errors?.unit_type}
                            previous={unitType}
                        />
                    </div>
                    <div className="form-group mb-3" style={{fontSize: "11px"}}>
                        <label htmlFor="exampleFormControlTextarea4">
                            Description
                            {errors?.description?.type === 'required' ?
                                <span className="text-danger">(Required)</span> : ''}
                        </label>
                        <textarea
                            style={{fontSize: "11px"}}
                            className="form-control"
                            id="exampleFormControlTextarea4"
                            rows="3"
                            {...register("description")}
                            defaultValue={oldData?.description_s}
                        ></textarea>
                    </div>


                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={statusOptions}
                            setValue={setStatus}
                            cngFn={handleChangeForUpdateStatus}
                            error={errors?.status}
                            previous={status}
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={toggle} className="me-2">
                            Cancel
                        </Button>
                        <Button color="primary" type="submit">
                            update
                        </Button>
                    </div>
                </form>
            </BaseModal>
        </>
    );
};

export default EditUnitTypeModal;