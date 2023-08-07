import React, { Fragment } from "react";
import { Home } from "react-feather";
import { Link } from "react-router-dom";
import Bookmark from "./bookmark";

const Breadcrumb = (props) => {
  const breadcrumb = props;

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <div>

                <div className="mb-2">
                  <h3 style={{ marginRight: "10px" }}>{breadcrumb.title}</h3>
                </div>
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item"><a href="#javascript"><i className="fa fa-home"></i></a></li>
                  <li className="breadcrumb-item">{breadcrumb.parent}</li>
                  <li className="breadcrumb-item active">{breadcrumb.title}</li>
                </ol>
              </div>
              {/*<div className="page-header-left">*/}
              {/*  <ol className="breadcrumb pull-right">*/}
              {/*    <h3 style={{ marginRight: "10px" }}>{breadcrumb.title}</h3>*/}
              {/*    <li className="breadcrumb-item">*/}
              {/*      <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>*/}
              {/*        <Home />*/}
              {/*      </Link>*/}
              {/*    </li>*/}
              {/*    <li className="breadcrumb-item">{breadcrumb.parent}</li>*/}
              {/*    <li className="breadcrumb-item active">{breadcrumb.title}</li>*/}
              {/*    {breadcrumb.id && (*/}
              {/*        <li className="breadcrumb-item active">{breadcrumb.id}</li>*/}
              {/*    )}*/}
              {/*  </ol>*/}
              {/*</div>*/}
            </div>
            {/* <!-- Bookmark Start--> */}
            <Bookmark />
            {/* <!-- Bookmark Ends--> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Breadcrumb;
