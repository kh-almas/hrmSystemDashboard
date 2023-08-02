import React, { Fragment } from 'react';
import { Home } from 'react-feather';
import { Link } from 'react-router-dom';
import Bookmark from './bookmark';

const Breadcrumb = props => {
    const breadcrumb = props;

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col">
                            <div className="page-header-left">                               
                                <ol className="breadcrumb pull-right">
                                    <li className="breadcrumb-item">
                                        <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                                            <Home />
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item" style={{fontSize: "16px"}}>{breadcrumb.parent}</li>
                                    <li className="breadcrumb-item active" style={{fontSize: "16px"}}>{breadcrumb.title}</li>
                                    {
                                        breadcrumb.id && 
                                        <li className="breadcrumb-item active">{breadcrumb.id}</li>
                                    }
                                </ol>
                                <h3>{breadcrumb.title}</h3>
                            </div>
                        </div>
                        {/* <!-- Bookmark Start--> */}
                        <Bookmark />
                        {/* <!-- Bookmark Ends--> */}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Breadcrumb
