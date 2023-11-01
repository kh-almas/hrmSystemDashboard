import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import GetAllCompany from "../../Query/hrm/GetAllCompany";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import GetAllOrganization from "../../Query/hrm/GetAllOrganization";

const AddCompanyModal = ({ modal, toggle, reFetch }) => {
    const [selectedOrganization, setSelectedOrganization] = useState(localStorage.getItem("org_id"));
    const [organization, setOrganization] = useState([]);
    const {register, handleSubmit, formState: { errors },} = useForm();
    const [allOrganizationStatus, allOrganizationReFetch, allOrganization, allOrganizationError] = GetAllOrganization();
    const [status, setStatus] = useState('Active');

    const handleChangeForUpdateStatus = (selected) => {
        setStatus(selected);
    };

    useEffect(() => {
        setOrganization([]);
        allOrganization?.data?.body?.data?.data?.map(item => {
            const set_data = {
                id: item?.id,
                value: item?.name
            }
            setOrganization(prevOrganization => [...prevOrganization, set_data]);
        })
    }, [allOrganization])

    const onSubmit = (data) => {
        data.organization_id = selectedOrganization;
        data.status = status?.value;
        // console.log(data);
        axios.post('/hrm-system/company', data)
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
                        text: `Can not duplicate name, shortname and slogan`
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
            <BaseModal title={"Add Company"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="row row-cols-1 row-cols-lg-2">
                        {/*<div>*/}
                        {/*    <Select*/}
                        {/*        labelName={"Organization"}*/}
                        {/*        placeholder={"Select an option"}*/}
                        {/*        options={organization}*/}
                        {/*        setValue={setSelectedOrganization}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div>
                            <Input
                                labelName={"Company Name"}
                                inputName={"name"}
                                inputType={"text"}
                                placeholder={"Enter company name"}
                                validation={{
                                    ...register("name", { required: true }),
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Short Name"}
                                inputName={"shortname"}
                                inputType={"text"}
                                placeholder={"Enter Short name"}
                                validation={{
                                    ...register("shortname", { required: true }),
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Slogan"}
                                inputName={"slogan"}
                                inputType={"text"}
                                placeholder={"Enter Slogan name"}
                                validation={{
                                    ...register("slogan", { required: true }),
                                }}
                            />
                        </div>
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
                        <div>
                            <Input
                                labelName={"Country"}
                                inputName={"country"}
                                placeholder={"Enter your country"}
                                inputType={"text"}
                                validation={{ ...register("country", { required: true }) }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Zip"}
                                inputName={"zip"}
                                placeholder={"Enter your zip code"}
                                inputType={"text"}
                                validation={{ ...register("zip", { required: true }) }}
                            />
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
                            <Input
                                labelName={"Info"}
                                inputName={"info"}
                                inputType={"text"}
                                placeholder={"Enter info"}
                                validation={{ ...register("info", { required: true }) }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Vat"}
                                inputName={"vat"}
                                placeholder={"Enter vat"}
                                inputType={"text"}
                                validation={{ ...register("vat", { required: true }) }}
                            />
                        </div>
                    </div>
                    <div className="form-group mb-0">
                        <label htmlFor="exampleFormControlTextarea4">
                            description
                        </label>
                        <textarea
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

export default AddCompanyModal;