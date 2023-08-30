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
                className="  d-flex flex-column flex-md-row justify-content-between align-items-center"
                style={{ margin: "10px 0px" }}
              >
                <p className="pb-2">Login Permission</p>
                <div className="pb-2">
                  <div class="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label className="form-check-label" for="inlineRadio1">
                      Enable
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                        className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                    />
                    <label className="form-check-label" for="inlineRadio2">
                      Disable
                    </label>
                  </div>
                </div>
                <button className="btn btn-info mb-2" type="button">
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
