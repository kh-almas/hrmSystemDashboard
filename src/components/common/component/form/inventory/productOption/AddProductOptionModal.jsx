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
import {FolderMinus, Minus, MinusSquare} from "react-feather";

const AddProductOptionModal = ({modal, toggle, reFetch}) => {
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem("branch_id"));
    const [type, setType] = useState({});

    const handleChangeForUpdateType = selected => {
        setType(selected);
    }

    // const schema = yup
    //     .object({
    //         name: yup.string().required("Name is required"),
    //         description: yup.string().required("Business name is required")
    //     })
    //     .required()

    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: {errors},
        reset
    } = useForm({
        // resolver: yupResolver(schema)
    });

    const fieldValidation = (fieldName, value, fixedItem) => {
        const schema = yup.string()
            .oneOf(fixedItem, `Invalid ${fieldName}` )
            .required(`${fieldName} is required`);

        return schema.validate(value, {abortEarly: false})
            .then(valid => ({isValid: true, errors: {}}))
            .catch(errors => ({isValid: false, errors}));
    }
    const onSubmit = async (data) => {
        data.company_id = selectedCompany;
        data.branch_id = selectedBranch;
        data.type = type?.value;
        console.log(data);
        axios.post('/inventory-management/products/options/add', data)
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

    return (
        <>
            <BaseModal title={"Add Product Options"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            labelName={"Name"}
                            inputName={"name"}
                            inputType={"text"}
                            placeholder={"Enter product options name"}
                            validation={{
                                ...register("name"),
                            }}
                            error={errors?.name}
                        />
                    </div>
                    <div className="form-group mb-3" style={{fontSize: "11px"}}>
                        <div>
                            <Select
                                name={"Type"}
                                placeholder={"Select a Type"}
                                options={[
                                    {value: "field", label: "Input Field"},
                                    {value: "dropdown", label: "Dropdown"},
                                    {value: "checkbox", label: "Checkbox"},
                                    {value: "radiobutton", label: "RadioButton"}]}
                                setValue={setType}
                                cngFn={handleChangeForUpdateType}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
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

export default AddProductOptionModal;