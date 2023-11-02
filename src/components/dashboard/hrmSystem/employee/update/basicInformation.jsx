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
        data.name_title = nameTitle?.value;
        data.gender = gander?.value;
        data.employee_type = employeeType?.value;
        const abs = {...processData, ...data}
        setProcessData({ ...abs });
    }
    useEffect(() => {
        EmployeeInformation(allData);
    }, [nameTitle, gander])


    const nameTitleOptions = [
        {value: "Mr", label: "Mr"},
        {value: "Mrs", label: "Mrs"},
    ]

    const empTypeOption = [
        {value: "UL_Contractor", label: "UL_Contractor"},
        {value: "CTL_Contractor", label: "CTL_Contractor"},
        {value: "CTL", label: "CTL"},
        {value: "ULVSBL", label: "ULVSBL"},
    ]

    const genderOption = [
        {value: "Male", label: "Male"},
        {value: "Female", label: "Female"},
        {value: "Other", label: "Other"},
    ]


    useEffect(() => {
        const filterNameTitle = nameTitleOptions?.find(data => data.value == employeeData?.name_title)
        setNameTitle(filterNameTitle);
        // console.log(filterNameTitle, 'filterNameTitle')

        const filterEmpType = empTypeOption?.find(data => data.value == employeeData?.employee_type)
        setEmployeeType(filterEmpType);

        const filterGender = genderOption?.find(data => data.value == employeeData?.gender)
        setGander(filterGender);
    }, [employeeData])

    const handleChangeForNameTitle = (selected) => {
        setNameTitle(selected);
    };

    const handleChangeForEnpType = (selected) => {
        setEmployeeType(selected);
    };

    const handleChangeForGender = (selected) => {
        setGander(selected);
    };

    return (
        <>
            <form onChange={handleSubmit(EmployeeInformation)} className="mt-3">
                <div className="row row-cols-md-2 row-cols-1">
                    <div className="col">
                        <Select
                            labelName={"Name Title"}
                            placeholder={"Select an option"}
                            options={nameTitleOptions}
                            previous={nameTitle}
                            setValue={setNameTitle}
                            cngFn={handleChangeForNameTitle}
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
                                defaultValue={employeeData?.date_of_birth}
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
                                defaultValue={employeeData?.joining_date}
                                error={errors.joining_date}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <Select
                            labelName={"Employee Type"}
                            placeholder={"Select an option"}
                            options={empTypeOption}
                            setValue={setEmployeeType}
                            previous={employeeType}
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
                            options={genderOption}
                            previous={gander}
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