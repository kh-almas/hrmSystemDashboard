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
import {Minus} from "react-feather";

const EditVariantModal = ({modal, toggle, reFetch, valueForEdit}) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [values, setValues] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem("branch_id"));
    const [status, setStatus] = useState({});
    const [oldData, setOldData] = useState({});

    const schema = yup
        .object({
            name: yup.string().required("Name is required"),
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
        const prev_variant_value = valueForEdit?.original?.variant_value?.split(',');
        setValues(prev_variant_value ?? [])
        // console.log(valueForEdit?.original?.variant_value?.split(','))
    }, [reset,oldData,valueForEdit])

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

        data.variantValue = values?.filter(singleValue => singleValue !== '');
        if(checkStatus?.isValid !== false){
            const processData = {
                company_id:selectedCompany,
                branch_id: selectedBranch,
                name: data?.name ?? oldData?.name_s,
                description: data?.description ?? oldData?.description_s,
                status: status?.value ?? oldData?.status_s_g,
                variantValue: data.variantValue
            }
            axios.put(`/inventory-management/variant/update/${oldData?.id}`, processData)
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

    useEffect(() => {
        const filterStatus = statusOptions?.find(data => data.value == oldData?.status_s_g)
        setStatus(filterStatus);
    }, [oldData])

    const handleChangeForUpdateStatus = async (selected) => {
        await processManualError('status', selected?.value, ['Active', 'Inactive'])
        setStatus(selected);
    };

    const addValues = () => {
        const newForm = "";
        setValues([...values, newForm]);
    };
    const updateValues = (formIndex, value) => {
        // console.log(value);
        const updatedForms = [...values];
        updatedForms[formIndex] = value;
        // console.log(updatedForms);
        setValues(updatedForms);
    };
    const removeValues = (formIndex) => {
        const updatedForms = [...values];
        // console.log("updatedForms", updatedForms);
        updatedForms?.splice(formIndex, 1);
        setValues(updatedForms);
    };

    return (
        <>
            <BaseModal title={"Edit Variant"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            labelName={"Name"}
                            inputName={"name"}
                            inputType={"text"}
                            placeholder={"Enter variant name"}
                            validation={{
                                ...register("name"),
                            }}
                            error={errors?.name}
                            defaultValue={oldData?.name_s}
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

                    <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                        <div onClick={addValues} className="btn btn-lg btn-outline-info d-flex gap-3 align-items-center">
                            <span>Add Variation Value</span>
                        </div>
                    </div>

                    {values?.map((form, index) => (
                        <div key={index} className="d-flex gap-2 my-3">
                            {/*{console.log(form)}*/}
                            <input
                                className="form-control b-primary"
                                type="text"
                                placeholder="GREEN, RED, S, SM, XXL..."
                                value={form}
                                onChange={(e) => {
                                    updateValues(index, e.target.value);
                                }}
                            />
                            <div onClick={() => removeValues(index)} className=" d-flex justify-content-center align-items-center btn btn-lg btn-outline-danger">
                                <Minus />
                            </div>
                        </div>
                    ))}
                    {isSubmit && (values?.length == 0 || values[0].value == "") ? (
                        <small className="text-danger mt-1 ">
                            At least first variation Value is required
                        </small>
                    ) : (
                        <></>
                    )}

                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={toggle} className="me-2">
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

export default EditVariantModal;