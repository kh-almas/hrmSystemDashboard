import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import Dropdownbtn from "../../../common/button/Dropdownbtn";

const Sale = () => {
  const menu = {
      item1:"Action",
      item2:"Another Action",
      item3:"Something Else Here",
      item4:"Separated Link",
      btncolor:"primary",
      btntext:'Primary Button',
    }
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Sale" />
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
          <button className="btn btn-pill btn-info btn-air-info btn-air-info">
            New Sale
          </button>
        </div>

        <FilesComponent />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive ">
                <table className="table ">
                  <thead className="table-light table-border ">
                    <tr className="">
                      <th scope="col">{"Sl"}</th>
                      <th scope="col">{"Date"}</th>
                      <th scope="col">{"Invoice"}</th>
                      <th scope="col">{"User"}</th>
                      <th scope="col">{"Customer"}</th>
                      <th scope="col">{"Total Aount"}</th>
                      <th scope="col">{"Paid"}</th>
                      <th scope="col">{"Due"}</th>
                      <th scope="col">{"Status"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"1"}</td>
                      <td>{"24th Jul, 2023"}</td>
                      <td>{"INV-230712"}</td>
                      <td>{"Super admin"}</td>
                      <td>{"	kjdsjhdahghjgh"}</td>
                      <td>{"	$ 6,000.00"}</td>
                      <td>{"	$ 0.00"}</td>
                      <td>{"	$ 6,000.00"}</td>
                      <td className="text-success">{"Approved"}</td>
                      <td>
                        <div>
                          <Dropdownbtn />
                        </div>

                      </td>
                    </tr>
                    <tr>
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
                            className="btn btn-pill btn-outline-info btn-xs p-1 px-4"
                            type="button"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ fontSize: "13px" }}>Showing page 1 of 1</p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-pill btn-outline-secondary btn-xs"
                  type="button"
                >
                  <i
                    style={{ fontSize: "24px" }}
                    className="icofont icofont-swoosh-left"
                  ></i>
                </button>

                <p
                  style={{ fontSize: "13px" }}
                  className="p-1 px-2 btn-primary-gradien mt-3 mx-2 rounded text-light"
                >
                  1
                </p>
                <button
                  class="btn btn-pill btn-outline-secondary btn-xs"
                  type="button"
                >
                  <i
                    style={{ fontSize: "24px" }}
                    className="icofont icofont-swoosh-right"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;
