import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import GetAllCompany from "../../Query/hrm/GetAllCompany";
import {useForm} from "react-hook-form";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const AddOrganizationModal = ({modal, toggle, reFetch}) => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const {register, handleSubmit, formState: { errors },} = useForm();


    const onSubmit = (data) => {
        data.status = selectedStatus;
        axios.post('/hrm-system/organization', data)
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
                    text: `${e?.response?.data?.body?.message?.details[0].message}`
                })
            })
    };

    return (
        <>
            <BaseModal title={"Add Organization"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            labelName={"Organization Name"}
                            inputName={"name"}
                            inputType={"text"}
                            placeholder={"Enter organization name"}
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
                    <div className="row row-cols-1 row-cols-lg-2">
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
                    <div className="row row-cols-1 row-cols-lg-2">
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
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                            // validation={{...register("status", {required: true})}}
                            // error={errors?.status}
                            setValue={setSelectedStatus}
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

export default AddOrganizationModal;