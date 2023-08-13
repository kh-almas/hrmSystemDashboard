import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import Dropdownbtn from "../../../common/button/Dropdownbtn";
import Paginationbtn from "../../../common/Paginationbtn";
import { Link } from "react-router-dom";

const Sale = () => {
  const checkFunction = () => console.log("it works");
  const data = [
    {
      type: "link",
      url: "/dashboard/inventory-management/sale/select-payment",
      text: "Payment",
    },
    {
      type: "link",
      url: "/dashboard/inventory-management/sale/select-return",
      text: "Sell Return",
    },
    {
      type: "link",
      url: "/dashboard/inventory-management/sale/select-order-details",
      text: "Order Details",
    },
    {
      type: "function",
      url: checkFunction,
      text: "Download",
    },
    {
      type: "function",
      url: checkFunction,
      text: "Challan Download",
    },
    {
      type: "function",
      url: "#",
      text: "Clone to Sale",
    },
    {
      type: "function",
      url: "#",
      text: "Print",
    },
  ];
  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Sale" />
      <div
        style={{ padding: "0px 20px" }}
        className="d-flex justify-content-between align-items-center pb-3"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "",
            marginBottom: "20px",
          }}
        >
          <Link
            to={`/dashboard/inventory-management/sale/add-sale`}
            className="btn btn-pill btn-info btn-air-info btn-air-info"
          >
            New Sale
          </Link>
        </div>

        <FilesComponent />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div
              className="card"
              style={{ padding: "20px", zIndex: "1 !important" }}
            >
              <CommonSearchComponet />
              <div
                className="table-responsive"
                style={{ padding: "20px", zIndex: "1 !important" }}
              >
                <table className="table ">
                  <thead className=" table-border ">
                    <tr className="">
                      <th scope="col">{"Sl"}</th>
                      <th scope="col">{"Date"}</th>
                      <th scope="col">{"Invoice"}</th>
                      <th scope="col">{"User"}</th>
                      <th scope="col">{"Customer"}</th>
                      <th scope="col">{"Total Aount"}</th>
                      <th scope="col">{"Paid"}</th>
                      <th scope="col">{"Due"}</th>
                      <th scope="col">{"Status"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"1"}</td>
                      <td>{"24th Jul, 2023"}</td>
                      <td>
                        {"INV-230712"}{" "}
                        <span>
                          <i
                            style={{
                              backgroundColor: "skyblue",
                              color: "#ffffff",
                              cursor: "pointer",
                            }}
                            className="icofont icofont-eye-alt rounded  p-1"
                            id="TooltipBottom"
                            data-placement="bottom"
                          ></i>
                        </span>
                      </td>
                      <td>{"Super admin"}</td>
                      <td>{"	kjdsjhdahghjgh"}</td>
                      <td>{"	$ 6,000.00"}</td>
                      <td>{"	$ 0.00"}</td>
                      <td>{"	$ 6,000.00"}</td>
                      <td>
                        {" "}
                        <span className="badge text-bg-success">
                          {" "}
                          {"Approved"}
                        </span>
                      </td>
                      <td>
                        <div style={{ zIndex: "90" }}>
                          <Dropdownbtn data={data} />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Paginationbtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;
