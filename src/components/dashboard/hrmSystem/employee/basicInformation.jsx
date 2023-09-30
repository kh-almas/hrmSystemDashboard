import React from 'react';
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const BasicInformation = ({setProcessData, setIconWithTab, processData}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    // const navigate = useNavigate();
    const EmployeeInformation = data => {
        // console.log("our data",data);
        data.status = "Active";
        data.full_name = `${data.first_name} ${data.last_name}`;
        // setProcessData({basicInfo: data});
        setProcessData({ ...processData, basicInfo: data });
        const formData = new FormData();
        const formbaalData = new FormData();

        // let img
        // formbaalData.append("img",img)
        // for (let pair of formbaalData.entries()) {
        //     console.log("data---->",pair[0]+ ', ' + pair[1]);
        // }

        // for (const key in data) {
        //
        //     if (data.hasOwnProperty(key)) {
        //         // img = (key=== "image" && data[key][0])
        //         // console.log(key , key=== "image" ? data[key][0]: data[key])
        //         formData.append(key, key=== "image" || key=== "cv" ? data[key][0]: data[key]);
        //     }
        // }

        // for (let pair of formData.entries()) {
        //     console.log("data",pair[0]+ ', ' + pair[1]);
        // }

        // axios.post('/hrm-system/employee', formData)
        //     .then(info => {
        //         if (info?.status == 200) {
        //             Swal.fire({
        //                 position: 'top-end',
        //                 icon: 'success',
        //                 title: 'Your work has been saved',
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             })
        //
        //         }
        //         // navigate("/dashboard/hrm/employee");
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Oops...',
        //             // text: `${e?.response?.data?.body?.message?.details[0].message}`,
        //         })
        //     })
    }

    return (
        <>
            <form onChange={handleSubmit(EmployeeInformation)} className="mt-3">
                <div className="row">
                    <div className="col-6">
                        <Select
                            labelName={"Name Title"}
                            placeholder={"Select an option"}
                            options={[
                                {id: "Mr", value: "Mr"},
                                {id: "Mrs", value: "Mrs"},
                            ]}
                            validation={{...register("name_title")}}
                            error={errors.name_title}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div>
                            <Input
                                labelName={"First Name"}
                                inputName={"first_name"}
                                inputType={"text"}
                                placeholder={"Enter your first name"}
                                validation={{
                                    ...register("first_name"),
                                }}
                                error={errors.first_name}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Last Name"}
                                inputName={"last_name"}
                                inputType={"text"}
                                placeholder={"Enter your last name"}
                                validation={{
                                    ...register("last_name"),
                                }}
                                error={errors.last_name}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Email*"}
                                inputName={"email"}
                                inputType={"email"}
                                placeholder={"Enter your email"}
                                validation={{
                                    ...register("email"),
                                }}
                                error={errors.email}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Phone"}
                                inputName={"phone"}
                                inputType={"text"}
                                placeholder={"Enter your phone number"}
                                validation={{
                                    ...register("phone"),
                                }}
                                error={errors.phone}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Father Name"}
                                inputName={"father_name"}
                                inputType={"text"}
                                placeholder={"Enter your father name"}
                                validation={{
                                    ...register("father_name"),
                                }}
                                error={errors.father_name}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Mother Name"}
                                inputName={"mother_name"}
                                inputType={"text"}
                                placeholder={"Enter your last name"}
                                validation={{
                                    ...register("mother_name"),
                                }}
                                error={errors.mother_name}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className={"col"}>
                        <Input
                            labelName={"Spouse Name"}
                            inputName={"spouse_name"}
                            inputType={"text"}
                            placeholder={"Enter your spouse name"}
                            validation={{
                                ...register("spouse_name"),
                            }}
                            error={errors.mother_name}
                        />
                    </div>
                    <div className={"col"}>
                        <Input
                            labelName={"Card Number"}
                            inputName={"card_no"}
                            inputType={"text"}
                            placeholder={"Enter your card number"}
                            validation={{
                                ...register("card_no"),
                            }}
                            error={errors.card_no}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <Input
                                labelName={"Image"}
                                inputName={"img"}
                                inputType={"file"}
                                validation={{
                                    ...register("image"),
                                }}
                                error={errors.image}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <Input
                                labelName={"CV"}
                                inputName={"cv"}
                                inputType={"file"}
                                validation={{
                                    ...register("cv"),
                                }}
                                error={errors.cv}
                            />
                        </div>
                    </div>
                </div>
                <div className="row m-t-15">
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Date of Birth"}
                                inputName={"date_of_birth"}
                                inputType={"date"}
                                placeholder={"Date of Birth*"}
                                validation={{
                                    ...register("date_of_birth"),
                                }}
                                error={errors.date_of_birth}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <Select
                            labelName={"Gander"}
                            placeholder={"Select an option"}
                            options={[
                                {id: "Male", value: "Male"},
                                {id: "Female", value: "Female"},
                                {id: "Other", value: "Other"},
                            ]}
                            validation={{...register("gender")}}
                            error={errors.gender}
                        />
                    </div>
                </div>
                <div className="row m-t-15">
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Website"}
                                inputName={"website"}
                                inputType={"url"}
                                placeholder={"Enter your website url"}
                                validation={{
                                    ...register("website"),
                                }}
                                error={errors.website}
                            />
                        </div>
                    </div>
                </div>
                {/*<div className="d-flex justify-content-end">*/}
                {/*    <button className="btn btn-primary mt-2"*/}
                {/*            style={{width: "max-content", marginLeft: "auto", marginBottom: "30px"}}*/}
                {/*            type="submit">*/}
                {/*        Next*/}
                {/*    </button>*/}
                {/*</div>*/}
            </form>
        </>
    );
};

export default BasicInformation;