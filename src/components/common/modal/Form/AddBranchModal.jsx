import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import GetAllCompany from "../../Query/hrm/GetAllCompany";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const AddBranchModal = ({modal, toggle, reFetch}) => {
    const [company, setCompany] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem("com_id"));
    const [selectedStatus, setSelectedStatus] = useState('');
    const {register, handleSubmit, formState: { errors },} = useForm();
    const [allCompanyStatus, allCompanyReFetch, allCompany, allCompanyError] = GetAllCompany();
    const [status, setStatus] = useState();

    const handleChangeForUpdateStatus = (selected) => {
        setStatus(selected);
    };

    // useEffect(() => {
    //     setCompany([])
    //     allCompany?.data?.body?.data?.data?.map(item => {
    //         const set_data = {
    //             id: item.id,
    //             value: item.name
    //         }
    //         setCompany(prevShift => [...prevShift, set_data]);
    //     })
    // }, [allCompany])

    const onSubmit = (data) => {
        data.company_id = selectedCompany;
        data.status = status?.value;
        // console.log(data);
        axios.post('/hrm-system/branch', data)
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
                if(e?.response?.data?.body?.message?.errno == 1062){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Can not duplicate branch name`
                    })
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${e?.response?.data?.body?.message?.details[0].message}`
                    })
                }
            })
    }

    return (
        <>
            <BaseModal title={"Add Branch"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/*<div>*/}
                    {/*    <Select*/}
                    {/*        labelName={"Company"}*/}
                    {/*        placeholder={"Select an option"}*/}
                    {/*        options={company}*/}
                    {/*        setValue={setSelectedCompany}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <Input
                            labelName={"Branch Name"}
                            inputName={"name"}
                            inputType={"text"}
                            placeholder={"Enter company name"}
                            validation={{
                                ...register("name", { required: true }),
                            }}
                        />
                    </div>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Email"}
                                inputName={"email"}
                                placeholder={"Enter your email"}
                                inputType={"email"}
                                validation={{ ...register("email", { required: true }) }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Phone"}
                                inputName={"phone"}
                                placeholder={"Enter your phone number"}
                                inputType={"text"}
                                validation={{ ...register("phone", { required: true }) }}
                            />
                        </div>
                    </div>
                    <div>
                        <Input
                            labelName={"Address"}
                            inputName={"address"}
                            placeholder={"Enter your address"}
                            inputType={"text"}
                            validation={{ ...register("address", { required: true }) }}
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
            </BaseModal>
        </>
    );
};

export default AddBranchModal;