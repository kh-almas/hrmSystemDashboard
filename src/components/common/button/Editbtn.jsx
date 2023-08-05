import React from 'react';
import {Link} from "react-router-dom";
import {UncontrolledTooltip} from "reactstrap";

const Editbtn = () => {
    return (
        <>
            <Link to="/dashboard/hrm/salary-details">
                <i
                    style={{
                        backgroundColor: "skyblue",
                        color: "#ffffff",
                    }}
                    className="icofont icofont-eye-alt rounded m-r-15 p-2"
                    id="TooltipBottom" data-placement="bottom"
                ></i>
            </Link>
            <UncontrolledTooltip className="mt-2" placement="bottom" target="TooltipBottom">
                {"Edit"}
            </UncontrolledTooltip>
        </>
    );
};

export default Editbtn;