import React, {useEffect, useState} from 'react';
import {Button} from "reactstrap";
import BaseModal from "../../../../modal/BaseModal";
import Input from "../../../../modal/Input";
import Select from "../../../../modal/Select";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import DropdownTreeSelect from "react-dropdown-tree-select";
import getInventoryCategory from "../../../../Query/inventory/getInventoryCategory";
import "./category.css"
import axios from "../../../../../../axios";
import Swal from "sweetalert2";

const AddCategoryModal = ({modal, toggle, reFetch, isChange}) => {
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem("branch_id"));
    const [status, setStatus] = useState({});
    const [processData, setProcessData] = useState([]);
    const [parentCategory, setParentCategory] = useState({});

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

    const buildDirectoryTree = (categories) => {
        const directoryMap = new Map();
        const rootDirectories = [];

        categories.forEach((category) => {
            category.label = category?.name_s;
            category.value = category?.id;
            directoryMap.set(category.id, category);
            category.children = [];
        });

        categories.forEach((category) => {
            if (category.parent_id) {
                const parent = directoryMap.get(category.parent_id);
                if (parent) {
                    parent.children.push(category);
                }
            } else {
                rootDirectories.push(category);
            }
        });

        return rootDirectories;
    };

    useEffect(() => {
        const getData = async () => {
            const getData = await getInventoryCategory();
            const outputData = buildDirectoryTree(getData?.data?.body?.data);
            setProcessData(outputData);
        };
        getData();
    }, [isChange]);

    const selectSelectedData = (data, selected) => {
        data?.map(s_data => {
            if(s_data?.id === selected?.id){
                s_data.checked = selected?.checked;
            }else{
                s_data.checked = false;
                if(s_data?.children?.length > 0){
                    selectSelectedData(s_data?.children, selected);
                }
            }
        })
        if (selected?.checked === true){
            setParentCategory(selected)
        }else {
            setParentCategory({})
        }
        setProcessData(data);
    }

    const handelValueForCategory = (currentNode, selectedNodes) => {
        selectSelectedData(processData, currentNode);
    }

    const onSubmit = async (data) => {
        const checkStatus = await processManualError('status', status?.value, ['Active', 'Inactive'])
        data.status = status?.value;
        data.company_id = selectedCompany;
        data.branch_id = selectedBranch;
        data.parent_id = parentCategory?.id;
        data.parent_name = parentCategory?.label ?? 'Main';

        if(checkStatus?.isValid !== false){
            axios.post('/inventory-management/category/add', data)
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
            <BaseModal title={"Add Category"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-md-2">
                        <div>
                            <Input
                                labelName={"Name"}
                                inputName={"name"}
                                inputType={"text"}
                                placeholder={"Enter category name"}
                                validation={{
                                    ...register("name"),
                                }}
                                error={errors?.name}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Code"}
                                inputName={"code"}
                                inputType={"text"}
                                placeholder={"Enter category code"}
                                validation={{
                                    ...register("code"),
                                }}
                                error={errors?.code}
                            />
                        </div>
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
                        <label htmlFor="exampleFormControlTextarea4">
                            Select Category
                        </label>
                        <DropdownTreeSelect
                            mode='radioSelect'
                            data={processData}
                            onChange={handelValueForCategory}
                        />
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

export default AddCategoryModal;