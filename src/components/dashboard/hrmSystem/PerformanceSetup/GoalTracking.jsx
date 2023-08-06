import React, { useState } from "react";
import Rating from "react-rating";
import {
  Button,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const GoalTracking = () => {
  const [modal, setModal] = useState();
  const toggle = () => {
    setModal(!modal);
  };
  const [rating, setRating] = useState(5);
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Manage Goal Tracking" />
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
          style={{ padding: "5px 10px", borderRadius: "5px" }}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Goal Tracking</ModalHeader>
        <ModalBody>
          <form className="m-t-15 m-b-15">
            <div className="row">
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Branch</label>
                <select
                  className="form-control digits"
                  id="exampleFormControlSelect9"
                  defaultValue="1"
                >
                  <option>{"Select branch"}</option>
                  <option>{"other branch"}</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="exampleFormControlInput1">GoalTypes</label>
                <select
                  className="form-control digits"
                  id="exampleFormControlSelect9"
                  defaultValue="1"
                >
                  <option>{"Select Goal Types"}</option>
                  <option>{"other Goal Types"}</option>
                </select>
              </div>
            </div>

            <div className="row m-t-15">
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Start Date</label>
                <input className="form-control" required={true} type="date" />
              </div>
              <div className="col">
                <label htmlFor="exampleFormControlInput1">End Date</label>
                <input className="form-control" required={true} type="date" />
              </div>
            </div>
            <div className="row m-t-15">
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Subject</label>
                <input className="form-control" required={true} type="text" />
              </div>
            </div>
            <div className="row m-t-15">
              <div className="col">
                <label htmlFor="exampleFormControlInput1">
                  Target Achievement
                </label>
                <input className="form-control" required={true} type="text" />
              </div>
            </div>
            <div className="row m-t-15">
              <div className="col">
                <div className="form-group mb-0">
                  <label htmlFor="exampleFormControlTextarea4">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea4"
                    rows="7"
                    placeholder="Enter Remark"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row m-t-15">
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Status</label>
                <select
                  className="form-control digits"
                  id="exampleFormControlSelect9"
                  defaultValue="1"
                >
                  <option>{"Not Started"}</option>
                  <option>{"In Progress"}</option>
                  <option>{"Completed"}</option>
                </select>
              </div>
            </div>

            <div className="row m-t-15">
              <div className="col">
                <CardBody>
                  <Row className="rating">
                    <Col sm="8">
                      <Rating
                        initialRating={rating}
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                        onChange={(rate) => setRating(rate)}
                      ></Rating>
                    </Col>
                    <Col sm="4">
                      <h6 className="mb-0 text-end">
                        {"You Rated :"} {rating}
                      </h6>
                    </Col>
                  </Row>
                </CardBody>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Create
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div className="card" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className=" table-border">
              <tr>
                <th scope="col">{"Goal Type"}</th>
                <th scope="col">{"Subject"}</th>
                <th scope="col">{"Branch"}</th>
                <th scope="col">{"Target Achievement"}</th>
                <th scope="col">{"Start Date"}</th>
                <th scope="col">{"End Date"}</th>
                <th scope="col">{"Rating"}</th>
                <th scope="col">{"Progress"}</th>
                <th scope="col">{"Action"}</th>
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
                <td></td>                
                <td></td>                
                <td></td>                
              </tr> */}
            </tbody>
          </table>
          <p className="text-center p-t-10 table-text">No entries found</p>
        </div>
        {/* <p>Showing 1 to 1 of 1 entries</p> */}
      </div>
    </div>
  );
};

export default GoalTracking;
