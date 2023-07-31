import React, {useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Select from "../../../modal/Select";
import Input from "../../../modal/Input";
import Textarea from "../../../modal/Textarea";
import {useForm} from "react-hook-form";

const Holiday = () => {
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
            <Breadcrumb parent="HRM System" title="Manage Holiday" />
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
                            <th scope="col">{"Occasion"}</th>
                            <th scope="col">{"Start Date"}</th>
                            <th scope="col">{"End Date"}</th>
                            <th scope="col">{"Action"}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* <tr>
                <th scope="row">{""}</th>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
              </tr> */}
                        </tbody>
                    </table>
                    <p className="text-center p-t-10">No entries found</p>
                </div>
            </div>


            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Holiday</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Input labelName={'Occasion'} inputName={'occasion'} inputType={'text'} placeholder={'Enter occasion name'} validation={{...register("occasion", { required: true })}}/>
                        </div>

                        <div className="row row-cols-1 row-cols-lg-2">
                            <div>
                                <Input labelName={'Start Date'} inputName={'startdate'} inputType={'date'}  validation={{...register("startdate", { required: true })}} />
                            </div>
                            <div>
                                <Input labelName={'End Date'} inputName={'enddate'} inputType={'date'}  validation={{...register("enddate", { required: true })}} />
                            </div>
                        </div>

                        <div>
                            <input className="me-2 mt-1" id="checkbox-primary-2" type="checkbox" />
                            <label htmlFor="exampleFormControlSelect9">Synchronize in Google Calendar ?</label>
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

export default Holiday;