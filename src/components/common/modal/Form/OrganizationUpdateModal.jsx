import React, {useEffect, useState} from 'react';
import BaseModal from "../BaseModal";
import Select from "../Select";
import Input from "../Input";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const OrganizationUpdateModal = ({dataUpdateModal, dataUpdateToggle, oldData, allOrganizationReFetch}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [status, setStatus] = useState('Active');

    const [statusOptions, setStatusOptions] = useState([
        {value: "Active", label: "Active"},
        {value: "Inactive", label: "Inactive"}
    ])

    useEffect(() => {
        const filterStatus = statusOptions?.find(data => data.value == oldData?.status)
        setStatus(filterStatus);
    }, [oldData])

    const handleChangeForUpdateStatus = (selected) => {
        setStatus(selected);
    };

    useEffect(() => {
        reset();
    },[oldData])

    const onSubmit = (data) => {
        const updatedData = {
            'name':data.name ? data.name : oldData.name,
            'shortname':data.shortname ? data.shortname : oldData.shortname,
            'slogan':data.slogan ? data.slogan : oldData.slogan,
            'description':data.description ? data.description : oldData.description,
            'email': data.email ? data.email : oldData.email,
            'phone':data.phone ? data.phone : oldData.phone,
            'vat':data.vat ? data.vat : oldData.vat,
            'address':data.address ? data.address : oldData.address,
            'country':data.country ? data.country : oldData.country,
            'zip':data.zip ? data.zip : oldData.zip,
            'info':data.info ? data.info : oldData.info,
            'status':status?.value ? status?.value : oldData.status
        }

        axios.put(`/hrm-system/organization/${oldData.id}`, updatedData)
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
                    allOrganizationReFetch();
                }
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
            <BaseModal title={"Update Organization"} dataModal={dataUpdateModal} dataToggle={dataUpdateToggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            labelName={"Organization Name"}
                            inputName={"name"}
                            inputType={"text"}
                            defaultValue={oldData.name}
                            placeholder={"Enter organization name"}
                            validation={{
                                ...register("name")
                            }}
                        />
                    </div>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Short Name"}
                                inputName={"shortname"}
                                inputType={"text"}
                                defaultValue={oldData?.shortname}
                                placeholder={"Enter Short name"}
                                validation={{
                                    ...register("shortname")
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Slogan"}
                                inputName={"slogan"}
                                inputType={"text"}
                                defaultValue={oldData?.slogan}
                                placeholder={"Enter Slogan name"}
                                validation={{
                                    ...register("slogan")
                                }}
                            />
                        </div>
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
                                defaultValue={oldData?.country}
                                validation={{ ...register("country") }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Zip"}
                                inputName={"zip"}
                                placeholder={"Enter your zip code"}
                                inputType={"text"}
                                defaultValue={oldData?.zip}
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
                            defaultValue={oldData?.address}
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
                                defaultValue={oldData?.info}
                                validation={{ ...register("info") }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Vat"}
                                inputName={"vat"}
                                placeholder={"Enter vat"}
                                inputType={"text"}
                                defaultValue={oldData?.vat}
                                validation={{ ...register("vat") }}
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
                            defaultValue={oldData?.description}
                        ></textarea>
                    </div>
                    <div>
                        <Select
                            labelName={"Status"}
                            placeholder={"Select an option"}
                            options={statusOptions}
                            previous={status}
                            setValue={setStatus}
                            cngFn={handleChangeForUpdateStatus}
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

export default OrganizationUpdateModal;