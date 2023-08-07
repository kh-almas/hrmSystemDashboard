import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import Select from "../../../common/modal/Select";
import Input from "../../../common/modal/Input";
import Textarea from "../../../common/modal/Textarea";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";
import CKEditors from "react-ckeditor-component";
import CkEditorComponent from "../../../common/modal/CkEditorComponent";

const CreateJob = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className="mb-3">
            <Breadcrumb parent="HRM System" title="Create Job" />
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="row row-cols-1 row-cols-lg-2 g-4" style={{ padding: "20px" }}>
                    <div>
                        <div className="card mb-0 p-4 h-100">
                            <div>
                                <Input
                                    labelName={"Job title"}
                                    inputName={"title"}
                                    inputType={"text"}
                                    placeholder={"Enter job title"}
                                    validation={{
                                        ...register("title", { required: true }),
                                    }}
                                />
                            </div>

                            <div className="row row-cols-1 row-cols-lg-2">
                                <div>
                                    <Select
                                        name={"branch"}
                                        labelName={"Branch"}
                                        placeholder={"Select an option"}
                                        options={["All"]}
                                    />
                                </div>
                                <div>
                                    <Select
                                        name={"category"}
                                        labelName={"Category"}
                                        placeholder={"Select an option"}
                                        options={[]}
                                    />
                                </div>
                            </div>

                            <div className="row row-cols-1 row-cols-lg-2">
                                <div>
                                    <Input
                                        labelName={"Positions"}
                                        inputName={"position"}
                                        inputType={"number"}
                                        placeholder={"Enter a position"}
                                        validation={{
                                            ...register("title", { required: true }),
                                        }}
                                    />
                                </div>
                                <div>
                                    <Select
                                        name={"status"}
                                        labelName={"Status"}
                                        placeholder={"Select an option"}
                                        options={["Active", "inactive"]}
                                    />
                                </div>
                            </div>


                            <div className="row row-cols-1 row-cols-lg-2">
                                <div>
                                    <Input
                                        labelName={"Start Date"}
                                        inputName={"startdate"}
                                        inputType={"date"}
                                        validation={{ ...register("startdate", { required: true }) }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        labelName={"End Date"}
                                        inputName={"enddate"}
                                        inputType={"date"}
                                        validation={{ ...register("enddate", { required: true }) }}
                                    />
                                </div>
                            </div>
                            <div>
                                <Input
                                    labelName={"Skill"}
                                    inputName={"skill"}
                                    inputType={"text"}
                                    placeholder={"Enter your skills"}
                                    validation={{
                                        ...register("title", { required: true }),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card p-4 h-100">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <p>Need to ask ?</p>
                                    <div>
                                        <input
                                            className="me-2 mt-1"
                                            id="checkbox-primary-2"
                                            type="checkbox"
                                        />
                                        <label htmlFor="exampleFormControlSelect9">
                                            Gender
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="me-2 mt-1"
                                            id="checkbox-primary-2"
                                            type="checkbox"
                                        />
                                        <label htmlFor="exampleFormControlSelect9">
                                            Date of Birth
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="me-2 mt-1"
                                            id="checkbox-primary-2"
                                            type="checkbox"
                                        />
                                        <label htmlFor="exampleFormControlSelect9">
                                            Country
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <p>Need to show option ?</p>
                                    <div>
                                        <input
                                            className="me-2 mt-1"
                                            id="checkbox-primary-2"
                                            type="checkbox"
                                        />
                                        <label htmlFor="exampleFormControlSelect9">
                                            Profile Image
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="me-2 mt-1"
                                            id="checkbox-primary-2"
                                            type="checkbox"
                                        />
                                        <label htmlFor="exampleFormControlSelect9">
                                            Resume
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="me-2 mt-1"
                                            id="checkbox-primary-2"
                                            type="checkbox"
                                        />
                                        <label htmlFor="exampleFormControlSelect9">
                                            Cover Letter
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="me-2 mt-1"
                                            id="checkbox-primary-2"
                                            type="checkbox"
                                        />
                                        <label htmlFor="exampleFormControlSelect9">
                                            Terms and Condition
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <p>Custom Question</p>
                        </div>
                    </div>
                    <div>
                        <div className="card p-4">
                            <CkEditorComponent label={"Job Description"} fieldContent={"Enter job description"}/>
                        </div>
                    </div>
                    <div>
                        <div className="card p-4">
                            <CkEditorComponent label={"Job Requirement"} fieldContent={"Enter job requirement"}/>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <Button color="primary" type="submit">
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateJob;