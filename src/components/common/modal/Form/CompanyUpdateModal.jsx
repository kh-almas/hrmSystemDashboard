import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const CompanyUpdateModal = ({organization, dataUpdateModal, dataUpdateToggle, oldData, allCompanyReFetch}) => {
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const {register, reset, handleSubmit, formState: {errors},} = useForm();

    useEffect(() => {
        reset();
    },[oldData])

    const onSubmit = (data) => {
        const updatedData = {
            'organization_id':selectedOrganization ? selectedOrganization : oldData.organization_id,
            'name': data.name ? data.name : oldData.name,
            'email':data.email ? data.email : oldData.email,
            'phone':data.phone ? data.phone : oldData.phone,
            'vat':data.vat ? data.vat : oldData.vat,
            'address':data.address ? data.address : oldData.address,
            'country':data.country ? data.country : oldData.country,
            'zip':data.zip ? data.zip : oldData.zip,
            'info':data.info ? data.info : oldData.info,
            'status':selectedStatus ? selectedStatus : oldData.status
        }

        axios.put(`/hrm-system/company/${oldData.id}`, updatedData)
            .then(info => {
                console.log(info)
                if(info?.status == 200)
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dataUpdateToggle(false);
                    allCompanyReFetch();
                }
            })
            .catch(e => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e?.response?.data?.body?.message?.details[0].message}`
                })
            })
    }

    return (
        <>
            <BaseModal title={"Update Company"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Select
                            labelName={"Organization"}
                            placeholder={"Select an option"}
                            options={organization}
                            previous={oldData.organization_id}
                            // validation={{...register("organization_id")}}
                            // error={errors?.organization_id}
                            setValue={setSelectedOrganization}
                        />
                    </div>
                    <div>
                        <Input
                            labelName={"Company Name"}
                            inputName={"name"}
                            inputType={"text"}
                            defaultValue={oldData.name}
                            placeholder={"Enter company name"}
                            validation={{
                                ...register("name"),
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
                                defaultValue={oldData.email}
                                validation={{ ...register("email") }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Phone"}
                                inputName={"phone"}
                                placeholder={"Enter your phone number"}
                                inputType={"text"}
                                defaultValue={oldData.phone}
                                validation={{ ...register("phone") }}
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
                                defaultValue={oldData.country}
                                validation={{ ...register("country") }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Zip"}
                                inputName={"zip"}
                                placeholder={"Enter your zip code"}
                                inputType={"text"}
                                defaultValue={oldData.zip}
                                validation={{ ...register("zip") }}
                            />
                        </div>
                    </div>
                    <div>
                        <Input
                            labelName={"Address"}
                            inputName={"address"}
                            placeholder={"Enter your address"}
                            inputType={"text"}
                            defaultValue={oldData.address}
                            validation={{ ...register("address") }}
                        />
                    </div>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Info"}
                                inputName={"info"}
                                inputType={"text"}
                                placeholder={"Enter info"}
                                defaultValue={oldData.info}
                                validation={{ ...register("info") }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Vat"}
                                inputName={"vat"}
                                placeholder={"Enter vat"}
                                inputType={"text"}
                                defaultValue={oldData.vat}
                                validation={{ ...register("vat") }}
                            />
                        </div>
                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            defaultValue={oldData.status}
                            options={[{id: "Active", value: "Active"}, {id: "Inactive", value: "Inactive"}]}
                            // validation={{...register("status")}}
                            // error={errors?.status}
                            setValue={setSelectedStatus}
                        />
                    </div>


                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={dataUpdateToggle} className="me-2">
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

export default CompanyUpdateModal;