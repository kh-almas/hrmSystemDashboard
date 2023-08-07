import React from "react";
import CommonSearchComponet from "./salaryCard/CommonSearchComponet";

const HrmManageCard = ({ data }) => {
 
  return (
    <div>
      <div className="card" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className=" table-border">
              <tr className={`bg-gray `}>
                {/* d-flex justify-content-between align-items-center */}
                {/* ${
                  data?.tr1 && data?.tr2
                    ? "d-flex justify-content-between"
                    : "d-flex justify-content-between "
                } */}
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
          <p className="text-center p-t-10 f-16 text-secondary">
            No entries found
          </p>
        </div>
        {/* <p>Showing 1 to 1 of 1 entries</p> */}
      </div>
    </div>
  );
};

export default HrmManageCard;
