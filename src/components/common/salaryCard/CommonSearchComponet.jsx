import React from "react";
const CommonSearchComponet = () => {
  return (
    <div className="row" style={{ marginBottom: "20px" }}>
      <div className="col-sm-12 col-xl-10">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <select
            className="form-control digits"
            id="exampleFormControlSelect9"
            defaultValue="1"
            style={{ width: "max-content" }}
          >
            <option>{"10"}</option>
            <option>{"15"}</option>
            <option>{"20"}</option>
            <option>{"25"}</option>
            <option>{"30"}</option>
            <option>{"35"}</option>
            <option>{"45"}</option>
            <option>{"65"}</option>
            <option>{"75"}</option>
            <option>{"90"}</option>
            <option>{"100"}</option>
          </select>
          <p style={{ margin: "0px" }}>entries per page</p>
        </div>
      </div>
      <div className="col-sm-12 col-xl-2">
        <input type="search" className="form-control" placeholder="Search.." />
      </div>
    </div>
  );
};

export default CommonSearchComponet;
