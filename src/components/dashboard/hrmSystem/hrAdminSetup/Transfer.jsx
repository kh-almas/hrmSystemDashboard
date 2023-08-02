import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Select from "../../../modal/Select";
import Input from "../../../modal/Input";
import Textarea from "../../../modal/Textarea";
import {useForm} from "react-hook-form";

const Transfer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [modal, setModal] = useState();

    const toggle = () => {
        setModal(!modal);
    };

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Transfer" />
            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "20px",}}>
                <button onClick={toggle} className="btn btn-pill btn-info btn-air-info btn-air-info">
                    <i className="fa fa-plus"></i>
                </button>
            </div>
            <div className="card" style={{ padding: "20px" }}>
                <CommonSearchComponet />
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">{"EMPLOYEE NAME"}</th>
                            <th scope="col">{"BRANCH"}</th>
                            <th scope="col">{"DEPARTMENT"}</th>
                            <th scope="col">{"TRANSFER DATE"}</th>
                            <th scope="col">{"DESCRIPTION"}</th>
                            <th scope="col">{"ACTION"}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* <tr>
                <th scope="row">{""}</th>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td></td>
              </tr> */}
                        </tbody>
                    </table>
                    <p className="text-center p-t-10">No entries found</p>
                </div>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Transfer</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Select labelName={"Employee"} placeholder={"Select an option"} options={['Accountant',]} inputName={"employ"}/>
                            </div>
                            <div>
                                <Select name={"branch"} labelName={"Branch"} placeholder={"Select a Branch"} options={[]} inputName={"branch"}/>
                            </div>
                        </div>

                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Select labelName={"Department"} placeholder={"Select an option"} options={[]} inputName={"department"}/>
                            </div>
                            <div>
                                <Input labelName={'Transfer Date'} inputName={'date'} inputType={'date'}  validation={{...register("date", { required: true })}} />
                            </div>
                        </div>
                        <div>
                            <Textarea labelName={"Description"} inputName={"description"} placeholder={"Enter Description"} height={"5"}/>
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

export default Transfer;