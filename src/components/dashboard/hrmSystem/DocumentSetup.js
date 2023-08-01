import React from "react";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";
import Breadcrumb from "../../common/breadcrumb";

const DocumentSetup = () => {
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
                      <th scope="col">{"DOCUMENT"}</th>
                      <th scope="col">{"ROLE"}</th>
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

export default DocumentSetup;
