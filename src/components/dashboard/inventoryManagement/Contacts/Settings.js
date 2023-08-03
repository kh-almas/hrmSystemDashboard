import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
const Settings = () => {
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Setting" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />

              <div
                className="d-flex justify-content-evenly align-items-center"
                style={{ margin: "10px 0px" }}
              >
                <p>Login Permission</p>
                <div class="btn-radio">
                  <div class="btn-group" data-toggle="buttons">
                    <div class="btn ">
                      <div class="radio radio-secondary">
                        <input
                          id="radio11"
                          type="radio"
                          name="radio2"
                          value="option1"
                        />
                        <label for="radio11">Enable</label>
                      </div>
                    </div>
                    <div class="btn  active border-0">
                      <div class="radio radio-secondary">
                        <input
                          id="radio12"
                          type="radio"
                          name="radio2"
                          value="option1"
                          checked=""
                        />
                        <label for="radio12">Disable</label>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-info" type="button">
                  <span className="p-r-5">
                    <i className="icofont icofont-check-alt"></i>
                  </span>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
