import React, {useState} from 'react';
import {Button} from "reactstrap";
import BaseModal from "../../../../modal/BaseModal";
import Input from "../../../../modal/Input";
import Select from "../../../../modal/Select";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "../../../../../../axios";
import Swal from "sweetalert2";

const AddUnitTypeModal = ({modal, toggle, reFetch}) => {
    const [selectedOrganization, setSelectedOrganization] = useState(localStorage.getItem("org_id"));
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem("branch_id"));
    const [status, setStatus] = useState({});
    const [unitType, setUnitType] = useState({});

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
    } = useForm({
        resolver: yupResolver(schema)
    });

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

    const handleChangeForUpdateStatus = async (selected) => {
        await processManualError('status', selected?.value, ['Active', 'Inactive'])
        setStatus(selected);
    };

    const handleChangeForUnitType = async (selected) => {
        await processManualError('unit_type', selected?.value, ['PCs', 'Weight'])
        setUnitType(selected);
    };

    const onSubmit = async (data) => {
        const checkStatus = await processManualError('status', status?.value, ['Active', 'Inactive'])
        const checkUnitType = await processManualError('unit_type', unitType?.value, ['PCs', 'Weight'])
        data.unit_type = unitType?.value;
        data.status = status?.value;
        data.company_id = selectedCompany;
        data.branch_id = selectedBranch;

        if(checkStatus?.isValid !== false && checkUnitType?.isValid !== false){
            axios.post('/inventory-management/unit-type/add', data)
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

    return (
        <>
            <BaseModal title={"Add Variant"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Select
                            labelName={"Unit type"}
                            placeholder={"Select an option"}
                            options={[{value: "PCs", label: "PCs"}, {value: "Weight", label: "Weight"}]}
                            setValue={setUnitType}
                            cngFn={handleChangeForUnitType}
                            error={errors?.unit_type}
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
                        ></textarea>
                    </div>


                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={[{value: "Active", label: "Active"}, {value: "Inactive", label: "Inactive"}]}
                            setValue={setStatus}
                            cngFn={handleChangeForUpdateStatus}
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
            </BaseModal>
        </>
    );
};

export default AddUnitTypeModal;