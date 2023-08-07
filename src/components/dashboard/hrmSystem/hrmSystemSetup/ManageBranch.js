import React, { useState } from "react";
import data from "../../../../data/customizer/hrmManageData.json";
import HrmManageCard from "../../../common/HrmManageCard";
import Breadcrumb from "../../../common/breadcrumb";
import "./CustomCss/Custom-Style.css";
import ManageJobStage from "./ManageJobStage";
import { Link } from "react-router-dom";

const ManageBranch = () => {
  const [pItem, setPItem] = useState(data.find((item) => item.id == "1"));

  //   console.log(data);
  const handleCard = (id) => {
    const menu = data.find((item) => item.id == id);
    setPItem(menu);
  };

  return (
    <div>
      <Breadcrumb parent="HRM System Setup" title="Manage Branch" />

      <div className="row">
        <div
          className="col-sm-12 col-xl-3 shadow sidebar-menu"
          style={{ cursor: "pointer" }}
        >
          {data?.map((item, index) => (
            <div
              onClick={() => handleCard(item.id)}
              className={`p-3 d-flex justify-content-between ${
                pItem.id == item.id ? "custom-div" : ""
              }`}
              key={index}
            >
              <Link
                className={`sidebar-header active  ${
                  pItem.id == item.id ? "custom-div" : ""
                }`}
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {item.cetagory}
              </Link>
              <span>
                <i
                  className={`icofont icofont-thin-right ${
                    pItem.id == item.id ? "text-white" : ""
                  }`}
                ></i>
              </span>
            </div>
          ))}
        </div>
        <div className="col-sm-12 col-xl-9">
          {pItem.id == "17" ? (
            <ManageJobStage />
          ) : (
            <HrmManageCard data={pItem} />
          )}
        </div>
        {/* <div className="col-sm-12 col-xl-12">
        {data?.map((item, index) => (
          <HrmManageCard data={item} key={index} />
        ))} */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ManageBranch;
