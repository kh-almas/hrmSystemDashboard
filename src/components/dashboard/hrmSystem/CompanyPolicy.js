import React from "react";
import Breadcrumb from "../../common/breadcrumb";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";


const CompanyPolicy = () => {
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Manage Company Policy" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive ">
                <table className="table ">
                  <thead>
                    <tr className="">
                      <th scope="col">{"BRANCH"}</th>
                      <th scope="col">{"TITLE"}</th>
                      <th scope="col">{"DESCRIPTION"}</th>
                      <th scope="col">{"ATTACHMENT"}</th>
                      <th scope="col">{"ACTION"}</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    <tr>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                      <td>{""}</td>
                    </tr>
                  </tbody> */}
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

export default CompanyPolicy;
