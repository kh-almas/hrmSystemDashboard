import React from "react";

const StatementData = () => {
  return (
    <div>
      <div className="card p-20">
        <div className="table-responsive">
          <table className="table">
            <thead className="table-border">
              <tr>
                <th scope="col">{"DATE"}</th>
                <th scope="col">{"ID"}</th>
                <th scope="col">{"ACCOUNT NAME"}</th>
                <th scope="col">{"DESCRIPTION "}</th>
                <th scope="col">{"DEBIT"}</th>
                <th scope="col">{"CREDIT"}</th>
                <th scope="col">{"BALANCE"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{"Total	$ 0.00"}</td>
                <td>{""}</td>
                <td>{"$ 12,000.00"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatementData;
