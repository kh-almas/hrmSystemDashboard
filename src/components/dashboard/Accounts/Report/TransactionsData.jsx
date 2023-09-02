import React from "react";

const TransactionsData = () => {
  return (
    <div>
      <div className="card p-20">
        <div className="table-responsive">
          <table className="table">
            <thead className="table-border">
              <tr>
                <th scope="col">{"DATE"}</th>
                <th scope="col">{"REFERENCE NO."}</th>
                <th scope="col">{"DESCRIPTION"}</th>
                <th scope="col">{"DEBIT"}</th>
                <th scope="col">{"CREDIT"}</th>
                <th scope="col">{"BALANCE"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{"24th Jul, 2023"}</td>
                <td>{"INV-230711"}</td>
                <td>{"Product Sales"}</td>
                <td>{"$ 12,000.00"}</td>
                <td>{""}</td>
                <td>{"$ 12,000.00"}</td>
              </tr>
              <tr>
                <td>{"24th Jul, 2023"}</td>
                <td>{"INV-230711"}</td>
                <td>{"Product Sales"}</td>
                <td>{""}</td>
                <td>{"$ 12,000.00"}</td>
                <td>{"$ 12,000.00"}</td>
              </tr>
              <tr>
                <td>{"24th Jul, 2023"}</td>
                <td>{""}</td>
                <td>{"Product Sales"}</td>
                <td>{""}</td>
                <td>{"$ 12,000.00"}</td>
                <td>{"$ 12,000.00"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsData;
