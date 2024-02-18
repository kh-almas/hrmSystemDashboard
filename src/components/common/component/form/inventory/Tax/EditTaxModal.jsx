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

const EditTaxModal = ({modal, toggle, reFetch, valueForEdit}) => {
    const [values, setValues] = useState([]);
    const [status, setStatus] = useState({});


    console.log('valueForEdit', valueForEdit)

    const schema = yup
        .object({
            name: yup.string().required("Name is required"),
            tax: yup.string().required("tax is required")
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
            return valueForEdit;
        }, [valueForEdit]),
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const prev_variant_value = valueForEdit?.variant_value?.split(',');
        setValues(prev_variant_value ?? [])
        reset();
    }, [reset, valueForEdit])

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
                name: data?.name ?? valueForEdit?.name_s,
                tax: data?.tax ?? valueForEdit?.tax_s,
                status: status?.value ?? valueForEdit?.status_s_g,
            }
            axios.put(`/inventory-management/product/tax/update/${valueForEdit?.id}`, processData)
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
        const filterStatus = statusOptions?.find(data => data.value == valueForEdit?.status_s_g)
        setStatus(filterStatus);
    }, [valueForEdit])

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
            <BaseModal title={"Edit Tax"} dataModal={modal} dataToggle={toggle}>
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
                            defaultValue={valueForEdit?.name_s}
                        />
                    </div>

                    <div>
                        <Input
                            labelName={"Tax"}
                            inputName={"tax"}
                            inputType={"number"}
                            placeholder={"Enter tax"}
                            defaultValue={valueForEdit?.tax_s}
                            validation={{
                                ...register("tax"),
                            }}
                            error={errors?.tax}
                        />
                    </div>

                    <div style={{marginTop: '18px'}}>
                        <Select
                            // labelName={"Status"}
                            placeholder={"Select an option"}
                            options={statusOptions}
                            setValue={setStatus}
                            cngFn={handleChangeForUpdateStatus}
                            error={errors?.status}
                            previous={status}
                        />
                    </div>

                    <div className="d-flex justify-content-end mt-4">
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

export default EditTaxModal;