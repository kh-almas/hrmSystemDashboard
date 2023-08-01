import React from "react";
import ManageJobStage from "../dashboard/hrmSystem/hrmSystemSetup/ManageJobStage";
import CommonSearchComponet from "./salaryCard/CommonSearchComponet";

const HrmManageCard = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data?.tr1 || data?.JobStageComponent ? 
        <div className="card" style={{ padding: "20px" }}>
          <CommonSearchComponet />
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">{data?.tr1}</th>
                  <th scope="col">{data?.tr2}</th>
                  {data?.tr3 && <th scope="col">{data?.tr3}</th>}
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                <th scope="row">{""}</th>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td></td>
                <td></td>                
                <td></td>                
              </tr> */}
              </tbody>
            </table>
            <p className="text-center p-t-10">No entries found</p>
          </div>
          {/* <p>Showing 1 to 1 of 1 entries</p> */}
        </div> : <ManageJobStage />
      }
  
    </div>
  );
};

export default HrmManageCard;
