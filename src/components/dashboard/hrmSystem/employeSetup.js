import React from "react";
import Breadcrumb from "../../common/breadcrumb";

const EmployeSetup = () => {
  return (
    <div>
      <Breadcrumb parent="HRM System" title="Manage Employee" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              {/* <div className="card-header">
                <h5>{BasicTable}</h5>
                <span>
                  {" "}
                  {"Use a class"} <code> {"table"} </code> {"to any table."}
                </span>
              </div> */}
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">{"Employee ID"}</th>
                      <th scope="col">{"Name"}</th>
                      <th scope="col">{"Email"}</th>
                      <th scope="col">{"Branch"}</th>
                      <th scope="col">{"Department"}</th>
                      <th scope="col">{"Designation"}</th>
                      <th scope="col">{"Date Of Joining"}</th>
                      <th scope="col">{"Last Login"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{"1"}</th>
                      <td>{"Alexander"}</td>
                      <td>{"Orton"}</td>
                      <td>{"@mdorton"}</td>
                      <td>{"Admin"}</td>
                      <td>{"USA"}</td>
                    </tr>
                    <tr>
                      <th scope="row">{"2"}</th>
                      <td>{"John Deo"}</td>
                      <td>{"Deo"}</td>
                      <td>{"@johndeo"}</td>
                      <td>{"User"}</td>
                      <td>{"USA"}</td>
                    </tr>
                    <tr>
                      <th scope="row">{"3"}</th>
                      <td>{"Randy Orton"}</td>
                      <td>{"the Bird"}</td>
                      <td>{"@twitter"}</td>
                      <td>{"admin"}</td>
                      <td>{"UK"}</td>
                    </tr>
                    <tr>
                      <th scope="row">{"4"}</th>
                      <td>{"Randy Mark"}</td>
                      <td>{"Ottandy"}</td>
                      <td>{"@mdothe"}</td>
                      <td>{"user"}</td>
                      <td>{"AUS"}</td>
                    </tr>
                    <tr>
                      <th scope="row">{"5"}</th>
                      <td>{"Ram Jacob"}</td>
                      <td>{"Thornton"}</td>
                      <td>{"@twitter"}</td>
                      <td>{"admin"}</td>
                      <td>{"IND"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeSetup;
