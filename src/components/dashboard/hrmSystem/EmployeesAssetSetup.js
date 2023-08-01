import React from "react";
import Breadcrumb from "../../common/breadcrumb";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";

const EmployeesAssetSetup = () => {
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Manage Document" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive ">
                <table className="table ">
                  <thead>
                    <tr className="">
                      <th scope="col">{"NAME"}</th>
                      <th scope="col">{"USERS"}</th>
                      <th scope="col">{"PURCHASE DATE"}</th>
                      <th scope="col">{"SUPPORTED DATE"}</th>
                      <th scope="col">{"AMOUNT"}</th>
                      <th scope="col">{"DESCRIPTION"}</th>
                      <th scope="col">{"ACTION"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                        </tr> */}
                  </tbody>
                </table>
                <p className="text-center p-t-10">No entries found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesAssetSetup;
