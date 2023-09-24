import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import GetAllCompany from "../../Query/hrm/GetAllCompany";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import GetAllBranch from "../../Query/hrm/GetAllBranch";

const AddDepartmentModal = ({modal, toggle, reFetch}) => {
    const {register, handleSubmit, formState: { errors },} = useForm();
    const [branch, setBranch] = useState([]);
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = GetAllBranch();

    useEffect(() => {
        setBranch([]);
        allBranch?.data?.body?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setBranch(prevBranch => [...prevBranch, set_data]);
        })
    }, [allBranch])

    const onSubmit = (data) => {
        axios.post('/hrm-system/department', data)
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
                }
                reFetch();
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`,
                })
            })
    };

    return (
        <>
            <BaseModal title={"Add Department"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Select
                            labelName={"Branch"}
                            placeholder={"Select an option"}
                            options={branch}
                            validation={{...register("branch_id")}}
                            error={errors.branch_id}
                        />
                    </div>
                    <div>
                        <Input
                            labelName={"Department Name"}
                            inputName={"name"}
                            inputType={"text"}
                            placeholder={"Enter department name"}
                            validation={{
                                ...register("name", { required: true }),
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            labelName={"Details"}
                            inputName={"details"}
                            placeholder={"Enter details"}
                            inputType={"text"}
                            validation={{ ...register("details", { required: true }) }}
                        />
                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                            validation={{...register("status", {required: true})}}
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

export default AddDepartmentModal;