import React from 'react';
import {Link} from "react-router-dom";

const Editbtn = () => {
    return (
        <>
            <button className="btn btn-primary" type="button" id="offsetRight" data-toggle="m-tooltip" data-bs-title="Tooltip on bottom"
                    data-placement="right">20px 0px
            </button>
            <Link to="/dashboard/hrm/salary-details">
                <i
                    style={{
                        backgroundColor: "skyblue",
                        color: "#ffffff",
                    }}
                    className="icofont icofont-eye-alt rounded m-r-15 p-2"
                ></i>
            </Link>
        </>
    );
};

export default Editbtn;