import React, {useEffect, useState} from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {Link} from "react-router-dom";
import getManualAttendanceReportsAPI from "../../../common/Query/hrm/forSort/getManualAttendanceReportsAPI";


const ManualAttendanceReport = () => {
  const [modal, setModal] = useState();

  const [data, setData] = useState([]);
  useEffect( () => {
    const getManualAttendance= async () => {
      const getData = await getManualAttendanceReportsAPI();
      setData(getData?.data?.body?.data?.data);

    }
    getManualAttendance();


  }, [])

  console.log(data);
  const toggle = () => {
    setModal(!modal);
  };
  return (
      <>
        <div className="pt-4 mb-3">
          <div className="d-flex flex-rows justify-content-center">
            <div>
              <h3 className="fw-bold">Manual Attendance Reports</h3>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Link to={"/dashboard/hrm/attendance/manual/report/pdf"} target="_blank" className="ms-3 btn btn-primary">
              View PDF
            </Link>
          </div>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleFormControlInput1">Date From</label>
              <input className="form-control" required={true} type="date" />
            </div>
            <div className="col">
              <label htmlFor="exampleFormControlInput1">Date To</label>
              <input className="form-control" required={true} type="date" />
            </div>
            <div className="col">
              <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "20px",
                  }}
              >
                <button
                    className="btn btn-primary btn-lg"
                    style={{ padding: "5px 15px" }}
                >
                  <i className="fa fa-search"></i>
                </button>
                <button
                    className="btn btn-danger btn-lg"
                    style={{ padding: "5px 15px", borderRadius: "5px" }}
                >
                  <i className="fa fa-trash-o"></i>
                </button>
                <button
                    onClick={toggle}
                    className="btn btn-primary btn-lg"
                    style={{ padding: "5px 15px" }}
                >
                  <i className="fa fa-paste"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Import employee CSV file</ModalHeader>
          <ModalBody>
            <form className="m-t-15 m-b-15">
              <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "20px",
                  }}
              >
                <h6 className="m-0">Download sample employee CSV file</h6>
                <button className="btn btn-primary btn-lg">
                  {" "}
                  <i className="fa fa-upload"></i> Download
                </button>
              </div>
              <label htmlFor="exampleFormControlInput1">Select CSV File</label>{" "}
              <br />
              <input type="file" />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Upload
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {
          data?.map((com, index) =>
              <div className="card" style={{padding: "20px"}} key={index}>
                <div>
                  <h6 className="fw-bold">Company: {com?.company_name}</h6>
                </div>
                <hr />
                {
                  com?.branch?.map((branch,index) =>
                      <div className="mb-3" key={index}>
                        <h6 style={{fontSize: "13px"}} className="fw-bold mb-3">Branch: {branch?.branch?.name}</h6>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className=" table-border">
                            <tr>
                              <th scope="col">{"Date"}</th>
                              <th scope="col">{"Employee Code"}</th>
                              <th scope="col">{"Employee Name"}</th>
                              <th scope="col">{"In Time"}</th>
                              <th scope="col">{"Out Time"}</th>
                              <th scope="col">{"Late In"}</th>
                              <th scope="col">{"Early Out"}</th>
                              <th scope="col">{"Status"}</th>
                            </tr>
                            </thead>
                            <tbody>

                            {/*attendance_type*/}
                            {/*branch_id*/}
                            {/*card_no*/}
                            {/*company_id*/}
                            {/*created_at*/}
                            {/*created_by*/}
                            {/*date*/}
                            {/*day_type*/}
                            {/*device_id*/}
                            {/*early_out*/}
                            {/*employee_id*/}
                            {/*id*/}
                            {/*in_time*/}
                            {/*late*/}
                            {/*organization_id*/}
                            {/*out_time*/}
                            {/*over_time*/}
                            {/*shift_id*/}
                            {/*status*/}
                            {/*updated_at*/}
                            {/*updated_by*/}
                            {
                              branch?.branch?.attendance?.map((attendance, index) =>
                                  <tr>
                                    <td>{attendance?.date ? attendance?.date : 'N/A'}</td>
                                    <td>{attendance?.c_no ? attendance?.c_no : 'N/A'}</td>
                                    <td>{attendance?.employee_name ? attendance?.employee_name : 'N/A'}</td>
                                    <td>{attendance?.in_time ? attendance?.in_time : 'N/A'}</td>
                                    <td>{attendance?.out_time ? attendance?.out_time : 'N/A'}</td>
                                    <td>{attendance?.late ? attendance?.late : 'N/A'}</td>
                                    <td>{attendance?.early_out ? attendance?.early_out : 'N/A'}</td>
                                    <td>{attendance?.status ? attendance?.status : 'N/A'}</td>
                                  </tr>
                              )
                            }

                            </tbody>
                          </table>
                          {/*<p className="text-center p-t-10">No entries found</p>*/}
                        </div>
                      </div>
                  )
                }

              </div>
          )
        }

      </>
  );
};

export default ManualAttendanceReport;
