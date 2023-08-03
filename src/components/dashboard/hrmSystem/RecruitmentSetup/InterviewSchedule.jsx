import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import {Link} from "react-router-dom";
import Calendar2 from "../hrAdminSetup/Calendar2";
import {Button, Label, Modal, ModalBody, ModalHeader} from "reactstrap";
import Select from "../../../common/modal/Select";
import Input from "../../../common/modal/Input";
import Textarea from "../../../common/modal/Textarea";
import {useForm} from "react-hook-form";

const InterviewSchedule = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [modal, setModal] = useState();

    const toggle = () => {
        setModal(!modal);
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Interview Schedule" />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginBottom: "20px",
                }}
            >
                <button
                    onClick={toggle}
                    className="btn btn-pill btn-info btn-air-info btn-air-info"
                    style={{ padding: "7px 13px", borderRadius: "5px" }}
                >
                    <i className="fa fa-plus"></i>
                </button>
            </div>

            <div>
                <Calendar2 />
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Event</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Select
                                    name={"interviewer"}
                                    labelName={"Interviewer"}
                                    placeholder={"Select an option"}
                                    options={[]}
                                />
                            </div>
                            <div>
                                <Select
                                    name={"assignemployee"}
                                    labelName={"Employee"}
                                    placeholder={"Select an option"}
                                    options={[]}
                                />
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input
                                    labelName={"Interview Date"}
                                    inputName={"date"}
                                    inputType={"date"}
                                    validation={{ ...register("date", { required: true }) }}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"Interview Time"}
                                    inputName={"time"}
                                    inputType={"time"}
                                    validation={{ ...register("time", { required: true }) }}
                                />
                            </div>
                        </div>

                        <div>
                            <Textarea
                                labelName={"Description"}
                                inputName={"description"}
                                placeholder={"Enter Description"}
                                height={"5"}
                            />
                        </div>

                        <div>
                            <input
                                className="me-2 mt-1"
                                id="checkbox-primary-2"
                                type="checkbox"
                            />
                            <label htmlFor="exampleFormControlSelect9">
                                Synchronize in Google Calendar ?
                            </label>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button color="" onClick={toggle} className="me-2">
                                Cancel
                            </Button>
                            <Button color="primary" type="submit">
                                Create
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
};

export default InterviewSchedule;