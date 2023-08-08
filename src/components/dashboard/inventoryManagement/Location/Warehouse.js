import React, {useState} from "react";
import Breadcrumb from "../../../common/breadcrumb";
import { Link } from "react-router-dom";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../common/Paginationbtn";
import {useForm} from "react-hook-form";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Select from "../../../common/modal/Select";
import Input from "../../../common/modal/Input";
import Textarea from "../../../common/modal/Textarea";
const Warehouse = () => {
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
      <Breadcrumb parent="Inventory management" title="Warehouse List" />
      <div
        style={{ padding: "0px 20px" }}
        className="d-flex justify-content-between align-items-center pb-3"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "",
            marginBottom: "20px",
          }}
        >
          <div>
              <button onClick={toggle} className="btn btn-pill btn-info btn-air-info btn-air-info">
                  Add New Warehouse
              </button>
          </div>
        </div>

        <FilesComponent />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive ">
                <table className="table">
                  <thead className=" table-border">
                    <tr className="">
                      <th scope="col">{"Id"}</th>
                      <th scope="col">{"Name"}</th>
                      <th scope="col">{"Address"}</th>
                      <th scope="col">{"Email"}</th>
                      <th scope="col">{"Phone"}</th>
                      <th scope="col">{"Status"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                        <td>{"1"}</td>
                        <td>{"24th Jul, 2023"}</td>
                        <td>{"INV-230712"}</td>
                        <td>{"Super admin"}</td>
                        <td>{"	kjdsghddsfbdsf"}</td>
                        <td>{"	$ 6,000.00"}</td>
                        <td>{"	$ 0.00"}</td>
                        <td>{"	$ 6,000.00"}</td>
                        <td className="text-success">{"Approved"}</td>
                        <td>
                          <button
                            class="btn btn-pill btn-outline-info btn-xs p-1 px-4"
                            type="button"
                          >
                            Select
                          </button>
                        </td>
                      </tr> */}
                  </tbody>
                </table>
                <p className="text-center p-t-10 text-secondary">
                  No data available in table
                </p>
              </div>
            </div>
            <Paginationbtn />
          </div>
        </div>
      </div>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add New Warehouse</ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Name"}
                                inputName={"name"}
                                inputType={"text"}
                                placeholder={"Enter warehouse name"}
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
                                placeholder={"Enter warehouse email"}
                                validation={{ ...register("email", { required: true }) }}
                            />
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <Input
                                labelName={"Phone"}
                                inputName={"phone"}
                                inputType={"text"}
                                placeholder={"Enter warehouse phone number"}
                                validation={{ ...register("email", { required: true }) }}
                            />
                        </div>
                        <div>
                            <Select
                                name={"status"}
                                labelName={"Status"}
                                placeholder={"Select an option"}
                                options={["Active", "Inactive"]}
                            />
                        </div>
                    </div>

                    <div>
                        <Textarea
                            labelName={"Description"}
                            inputName={"description"}
                            height={"5"}
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button color="danger" onClick={toggle} className="me-2">
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

export default Warehouse;
