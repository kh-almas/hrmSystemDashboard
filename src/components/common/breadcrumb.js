import React, { Fragment } from "react";
import { Home } from "react-feather";
import { Link } from "react-router-dom";
import Bookmark from "./bookmark";

const Breadcrumb = (props) => {
  const breadcrumb = props;

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="pt-2 pb-2">
          <div className="row">
            <div className="col">
              <div>
                <div className="mb-2">
                  <p style={{ marginRight: "10px", fontSize: "13px", fontWeight: "bold", marginBottom: "0" }}>{breadcrumb.title}</p>
                </div>
                <ol className="breadcrumb m-0 p-0" style={{fontSize: "11px"}}>
                  <li className="breadcrumb-item"><a href="#javascript"><i className="fa fa-home"></i></a></li>
                  <li className="breadcrumb-item">{breadcrumb.parent}</li>
                  <li className="breadcrumb-item active">{breadcrumb.title}</li>
                </ol>
              </div>
            </div>
            {/* <!-- Bookmark Start--> */}
            {/*<Bookmark />*/}
            {/* <!-- Bookmark Ends--> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Breadcrumb;
