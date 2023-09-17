import React, {useEffect, useState} from "react";
import data from "../../../../data/customizer/hrmManageData.json";
import HrmManageCard from "../../../common/HrmManageCard";
import Breadcrumb from "../../../common/breadcrumb";
import "./CustomCss/Custom-Style.css";
import ManageJobStage from "./ManageJobStage";
import {Link} from "react-router-dom";

const ManageBranch = () => {
    const [pItem, setPItem] = useState(data.find((item) => item.id == "1"));
    const [showHideManu, setShowHideManu] = useState(false);

    //   console.log(data);
    const handleCard = (id) => {
        const menu = data.find((item) => item.id == id);
        setPItem(menu);
    };

    return (
        <div className={"overflow-hidden"}>
            <Breadcrumb parent="HRM System Setup" title="Manage Branch"/>
            <div className="d-flex justify-content-end d-xl-none">
                <i onClick={() => setShowHideManu(!showHideManu)} className="fa fa-dedent p-3"
                   style={{fontSize: "20px", cursor: "pointer", color: "#3E70F1"}}></i>
            </div>

            <div className="row">
                <div
                    className={`col-sm-12 col-xl-3 d-xl-block shadow sub-sidebar ${showHideManu ? "d-block" : "d-none"}`}
                    style={{cursor: "pointer"}}>
                    {data?.map((item, index) => (
                        <div
                            onClick={() => handleCard(item.id)}
                            className={`p-3 d-flex justify-content-between sidebar-submenu ${pItem.id == item.id ? "sub-sidebar-button" : ""}`}
                            key={index}
                        >
                            <Link
                                className={`text-decoration-none sidebar-submenu-button ${pItem.id == item.id ? "text-white" : ""}`}
                                style={{fontSize: "14px", fontWeight: "500", color: "#000000"}}>
                                {item.cetagory}
                            </Link>
                            <span>
                        <i className={`icofont icofont-thin-right ${pItem.id == item.id ? "text-white" : ""}`}></i>
                    </span>
                        </div>))}
                </div>

                <div className="col-sm-12 col-xl-9">
                    {pItem.id == "17" ? (<ManageJobStage/>) : (<HrmManageCard data={pItem}/>)}
                </div>
                {/* <div className="col-sm-12 col-xl-12">
        {data?.map((item, index) => (
          <HrmManageCard data={item} key={index} />
        ))} */}
                {/* </div> */}
            </div>
        </div>);
};

export default ManageBranch;
