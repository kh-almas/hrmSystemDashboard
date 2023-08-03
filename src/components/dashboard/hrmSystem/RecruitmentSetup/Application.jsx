import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import {Cast} from "react-feather";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Input from "../../../common/modal/Input";
import {useForm} from "react-hook-form";
import Select from "../../../common/modal/Select";
import CardPrimary from "../../../common/card/CardPrimary";
import CardSecondary from "../../../common/card/CardSecondary";
import CardSuccess from "../../../common/card/CardSuccess";
import CardInfo from "../../../common/card/CardInfo";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Textarea from "../../../common/modal/Textarea";
import CardDanger from "../../../common/card/CardDanger";

const Application = () => {
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
            <Breadcrumb parent="HRM System" title="Manage Job Application" />
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
            <div className="card p-4 shadow">
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
                    <CardPrimary>
                        <div className="card-header p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="m-0" style={{fontSize: "20px", }}>Applied</p>
                                <div>
                                    <p className="bg-primary px-2 py-1 m-0 rounded">0</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-3">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </CardPrimary>
                </div>
                <div>
                    <CardSecondary>
                        <div className="card-header p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="m-0" style={{fontSize: "20px", }}>Phone Screen</p>
                                <div>
                                    <p className="bg-primary px-2 py-1 m-0 rounded">0</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-3">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </CardSecondary>
                </div>
                <div>
                    <CardDanger>
                        <div class="card-header p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="m-0" style={{fontSize: "20px", }}>Interview</p>
                                <div>
                                    <p className="bg-primary px-2 py-1 rounded m-0">0</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-3">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </CardDanger>
                </div>
                <div>
                    <CardInfo>
                        <div class="card-header p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="m-0" style={{fontSize: "20px", }}>Hired</p>
                                <div>
                                    <p className="bg-primary px-2 py-1 rounded m-0">0</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-3">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </CardInfo>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Job Application</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Select
                                name={"job"}
                                labelName={"Job"}
                                placeholder={"Select an option"}
                                options={[]}
                            />
                        </div>

                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input
                                    labelName={"Name"}
                                    inputName={"name"}
                                    inputType={"text"}
                                    placeholder={"Enter your name"}
                                    validation={{
                                        ...register("name", { required: true }),
                                    }}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"Email"}
                                    inputName={"email"}
                                    inputType={"text"}
                                    placeholder={"Enter your email"}
                                    validation={{
                                        ...register("email", { required: true }),
                                    }}
                                />
                            </div>
                            <div>
                                <Input
                                    labelName={"Phone"}
                                    inputName={"phone"}
                                    inputType={"text"}
                                    placeholder={"Enter phone number"}
                                    validation={{
                                        ...register("phone", { required: true }),
                                    }}
                                />
                            </div>
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

export default Application;