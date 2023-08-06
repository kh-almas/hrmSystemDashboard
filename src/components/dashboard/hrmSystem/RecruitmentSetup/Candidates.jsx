import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import { Cast } from "react-feather";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";

const Candidates = () => {
  return (
    <>
      <Breadcrumb parent="HRM System" title="Manage Archive Application" />

      <div className="card" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className=" table-border">
              <tr className="">
                <th scope="col">{"Name"}</th>
                <th scope="col">{"Applied For"}</th>
                <th scope="col">{"Rating"}</th>
                <th scope="col">{"Applied At"}</th>
                <th scope="col">{"CV/Resume"}</th>
                <th scope="col">{"ACTION"}</th>
              </tr>
            </thead>
            <tbody>
              {/*<tr>*/}
              {/*    <td>{"Branchy"}</td>*/}
              {/*    <td>{"AWARD"}</td>*/}
              {/*    <td>{"DATE"}</td>*/}
              {/*    <td>{"GIFT"}</td>*/}
              {/*    <td>{"DESCRIPTION"}</td>*/}
              {/*    <td>{"ACTION"}</td>*/}
              {/*</tr>*/}
            </tbody>
          </table>
          <p className="text-center p-t-10">No entries found</p>
        </div>
      </div>
    </>
  );
};

export default Candidates;
