import React, {useEffect, useState} from 'react';
import Input from "../../../../common/modal/Input";
import Select from "../../../../common/modal/Select";
import {useForm} from "react-hook-form";

const BasicInformation = ({setProcessData, setIconWithTab, processData, employeeData}) => {
    const [nameTitle, setNameTitle] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [gander, setGander] = useState('');
    const [allData, setAllData] = useState({});
    const {register, reset, handleSubmit, formState: {errors},} = useForm();

    const EmployeeInformation = data => {

        setAllData(data);
        data.status = "Active";
        data.name_title = nameTitle;
        data.gender = gander;
        data.employee_type = employeeType;
        const abs = {...processData, ...data}
        setProcessData({ ...abs });
    }

    useEffect(() => {
        EmployeeInformation(allData);
    }, [nameTitle, gander])

    return (
        <>
            <form onChange={handleSubmit(EmployeeInformation)} className="mt-3">
                <div className="row row-cols-md-2 row-cols-1">
                    <div className="col">
                        <Select
                            labelName={"Name Title"}
                            placeholder={"Select an option"}
                            previous={employeeData?.name_title}
                            options={[
                                {id: "Mr", value: "Mr"},
                                {id: "Mrs", value: "Mrs"},
                            ]}
                            setValue={setNameTitle}
                        />
                    </div>
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Employee ID"}
                                inputName={"job_code"}
                                inputType={"text"}
                                placeholder={"Enter employee id"}
                                defaultValue={employeeData?.job_code}
                                validation={{
                                    ...register("job_code"),
                                }}
                                error={errors.job_code}
                            />
                        </div>
                    </div>
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
                                defaultValue={employeeData?.first_name}
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
                                defaultValue={employeeData?.last_name}
                                error={errors.last_name}
                            />
                        </div>
                    </div>
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
                                defaultValue={employeeData?.email}
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
                                defaultValue={employeeData?.phone}
                                error={errors.phone}
                            />
                        </div>
                    </div>
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
                                defaultValue={employeeData?.father_name}
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
                                defaultValue={employeeData?.mother_name}
                                error={errors.mother_name}
                            />
                        </div>
                    </div>
                    <div className={"col"}>
                        <Input
                            labelName={"Spouse Name"}
                            inputName={"spouse_name"}
                            inputType={"text"}
                            placeholder={"Enter your spouse name"}
                            validation={{
                                ...register("spouse_name"),
                            }}
                            defaultValue={employeeData?.spouse_name}
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
                            defaultValue={employeeData?.card_no}
                            error={errors.card_no}
                        />
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <Input
                                labelName={"Image"}
                                inputName={"img"}
                                inputType={"file"}
                                validation={{
                                    ...register("image"),
                                }}
                                defaultValue={employeeData?.image}
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
                                defaultValue={employeeData?.cv}
                                error={errors.cv}
                            />
                        </div>
                    </div>
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
                                defaultValue={employeeData?.date}
                                error={errors.date_of_birth}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Joining Date"}
                                inputName={"joining_date"}
                                inputType={"date"}
                                placeholder={"Joining Date"}
                                validation={{
                                    ...register("joining_date"),
                                }}
                                error={errors.joining_date}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <Select
                            labelName={"Employee Type"}
                            placeholder={"Select an option"}
                            options={[
                                {id: "UL_Contractor", value: "UL_Contractor"},
                                {id: "CTL_Contractor", value: "CTL_Contractor"},
                                {id: "CTL", value: "CTL"},
                                {id: "ULVSBL", value: "ULVSBL"},
                            ]}
                            setValue={setEmployeeType}
                            previous={employeeData?.employee_type}
                        />
                    </div>
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Secondary ID"}
                                inputName={"emp_machine_id"}
                                inputType={"number"}
                                placeholder={"Employee secondary id"}
                                validation={{
                                    ...register("emp_machine_id"),
                                }}
                                defaultValue={employeeData?.emp_machine_id}
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
                            // validation={{...register("gender")}}
                            // error={errors.gender}
                            setValue={setGander}
                        />
                    </div>
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
                                defaultValue={employeeData?.website}
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