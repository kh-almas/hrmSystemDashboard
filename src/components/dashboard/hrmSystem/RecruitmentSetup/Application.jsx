import React from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import {Cast} from "react-feather";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Input from "../../../common/modal/Input";
import {useForm} from "react-hook-form";
import Select from "../../../common/modal/Select";

const Application = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Job Application" />
            <div className="card p-4">
                <div className="d-md-flex justify-content-end">
                    <div className="me-2">
                        <Input
                            labelName={"Start Date"}
                            inputName={"startdate"}
                            inputType={"date"}
                            validation={{ ...register("startdate", { required: true }) }}
                        />
                    </div>
                    <div className="me-2">
                        <Input
                            labelName={"End Date"}
                            inputName={"enddate"}
                            inputType={"date"}
                            validation={{ ...register("enddate", { required: true }) }}
                        />
                    </div>
                    <div className="me-2">
                        <Select
                            name={"job"}
                            labelName={"Job"}
                            placeholder={"Select an option"}
                            options={["All"]}
                        />
                    </div>
                    <div className="d-flex align-items-end justify-content-end justify-content-md-start mb-3">
                        <div>
                            <button
                                className="btn btn-pill btn-info btn-air-info btn-air-info me-1"
                                style={{ padding: "7px 13px", borderRadius: "5px" }}
                            >
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                        <div>
                            <button
                                className="btn btn-pill btn-info btn-air-info btn-air-info"
                                style={{ padding: "7px 13px", borderRadius: "5px" }}
                            >
                                <i class="fa fa-trash-o"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-2 row-cols-xxl-4">
                <div>
                    <div class="card">
                        <div class="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <p style={{fontSize: "20px", }}>Applied</p>
                                <div>
                                    <p className="bg-primary px-2 py-1 rounded">0</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">

                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="card">
                        <div class="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <p style={{fontSize: "20px", }}>Phone Screen</p>
                                <div>
                                    <p className="bg-primary px-2 py-1 rounded">0</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">

                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="card">
                        <div class="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <p style={{fontSize: "20px", }}>Interview</p>
                                <div>
                                    <p className="bg-primary px-2 py-1 rounded">0</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">

                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="card">
                        <div class="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <p style={{fontSize: "20px", }}>Hired</p>
                                <div>
                                    <p className="bg-primary px-2 py-1 rounded">0</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Application;