import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import Breadcrumb from "../../../common/breadcrumb";
import ShiftForm from "../../../common/modal/Form/ShiftForm";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const Shift = () => {
  const [dataModal, setDataModal] = useState(false);
  const [data, setData] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState();
  const [oldData, setOldDate] = useState();
  const [dataUpdateModal, setDataUpdateModal] = useState(false);

  useEffect(() => {
    axios
      .get("/hrm-system/shift")
      // .then(res => res.json())
      .then((info) => {
        setTotalItemCount(info.data.body.data.length);
        setData(info.data.body.data);
      })
      .catch((e) => {
        Swal.fire({
          title: "Something is wrong.",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
                        rgba(0,0,123,0.4)
                        url("/images/nyan-cat.gif")
                        left top
                        no-repeat
                      `,
        });
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState();

  const timeFormat = (time) => {
    if (time) {
      const timeArray = time.split(":");
      return `${timeArray[0]}h ${timeArray[1]}m`;
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  const dataToggle = () => {
    setDataModal(!dataModal);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const dataUpdateToggle = (data) => {
    setOldDate(null);

    axios
      .get(`/hrm-system/manual-attendance/${data}`)
      // .then(res => res.json())
      .then((info) => {
        setOldDate(info.data.body.data);
      })
      .catch((e) => {
        // console.log(e);
      });
    // setOldDateId(data);
    setDataUpdateModal(!dataUpdateModal);
  };
  return (
    <>
      <Breadcrumb parent="HRM System" title="Manage Shift" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={dataToggle}
          className="btn btn-pill btn-info btn-air-info btn-air-info"
          style={{ padding: "7px 13px", borderRadius: "5px" }}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive">
                <table className="table">
                  <thead className=" table-border">
                    <tr>
                      <th scope="col">{"Shift Id"}</th>
                      <th scope="col">{"Shift Name"}</th>
                      <th scope="col">{"Start Time"}</th>
                      <th scope="col">{"End Time"}</th>
                      <th scope="col">{"Weekend"}</th>
                      <th scope="col">{"Status"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length ? (
                      data?.map((item, index) => (
                        <tr key={index}>
                          <td>{item?.id}</td>
                          <td>{item?.name ?? "N/A"}</td>
                          <td>{timeFormat(item?.start_time) ?? "N/A"}</td>
                          <td>{timeFormat(item?.end_time) ?? "N/A"}</td>
                          <td>{item?.weekends}</td>
                          <td>{item?.status}</td>
                          <td>
                            <div className="d-flex justify-content-center">
                              <button
                                onClick={() => dataUpdateToggle(item.id)}
                                className="btn me-2"
                                style={{
                                  backgroundColor: "skyblue",
                                  color: "#ffffff",
                                  padding: "7px 13px",
                                  borderRadius: "5px",
                                }}
                              >
                                <i
                                  className="icofont icofont-pencil-alt-5  rounded"
                                  style={{
                                    backgroundColor: "skyblue",
                                    color: "#ffffff",
                                  }}
                                ></i>
                              </button>
                              <button
                                onClick={() => dataUpdateToggle(item.id)}
                                className="btn"
                                style={{
                                  backgroundColor: "#ff3a6e",
                                  color: "#ffffff",
                                  padding: "7px 13px",
                                  borderRadius: "5px",
                                }}
                              >
                                <i
                                  className="icofont icofont-trash rounded"
                                  style={{
                                    backgroundColor: "#ff3a6e",
                                    color: "#ffffff",
                                  }}
                                ></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td rowSpan={9}>
                          <p>No entries found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                Showing {totalItemCount} to {totalItemCount} of {totalItemCount}{" "}
                entries
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Shift Entry</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                labelName={"Shift Name"}
                inputName={"name"}
                inputType={"text"}
                placeholder={"Enter shift name"}
                validation={{
                  ...register("naem", { required: true }),
                }}
              />
            </div>
            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Start Time"}
                  inputName={"starttime"}
                  inputType={"time"}
                  validation={{ ...register("starttime", { required: true }) }}
                />
              </div>
              <div>
                <Input
                  labelName={"End Time"}
                  inputName={"endtime"}
                  inputType={"time"}
                  validation={{ ...register("endtime", { required: true }) }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="weekdays">Weekend</label>
              <DropdownMultiselect
                options={[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ]}
                name="weekdays"
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
      <ShiftForm dataModal={dataModal} dataToggle={dataToggle}></ShiftForm>
    </>
  );
};

export default Shift;
