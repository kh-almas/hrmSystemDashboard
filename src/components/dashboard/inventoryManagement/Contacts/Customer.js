import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../../axios";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Single from "./Single";

const Customer = () => {
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          "inventory-management/contacts/all/customer"
        );
        console.log(data);
        setData(data?.data?.body?.contacts);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Breadcrumb parent="Inventory management" title="Customers" />
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
            to={"/dashboard/hrm/add-contacts"}
            className="btn btn-pill btn-info btn-air-info btn-air-info mx-2"
          >
            New Contact
          </Link>
          <button className="btn btn-pill btn-info btn-air-info btn-air-info">
            Upload Via CSV
          </button>
        </div>

        <FilesComponent />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <CommonSearchComponet />
              <div className="table-responsive ">
                <table className="table ">
                  <thead className=" table-border ">
                    <tr className="">
                      <th scope="col">{"Sl"}</th>
                      <th scope="col">{"Customer ID"}</th>
                      <th scope="col">{"Customer Name"}</th>
                      <th scope="col">{"Email"}</th>
                      <th scope="col">{"Phone"}</th>
                      <th scope="col">{"Pay Term"}</th>
                      <th scope="col">{"Tex Number"}</th>
                      <th scope="col">{"Active"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length ? (
                      data?.map((item, index) => (
                        <Single
                          key={index}
                          index={index}
                          item={item}
                          isUpdate={isUpdate}
                          setIsUpdate={setIsUpdate}
                        />
                      ))
                    ) : (
                      <p>no customer data</p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ fontSize: "13px" }}>Showing page 1 of 1</p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-pill btn-outline-secondary btn-xs"
                  type="button"
                >
                  <i
                    style={{ fontSize: "24px" }}
                    className="icofont icofont-swoosh-left"
                  ></i>
                </button>

                <p
                  style={{ fontSize: "13px" }}
                  className="p-1 px-2 btn-primary-gradien mt-3 mx-2 rounded text-light"
                >
                  1
                </p>
                <button
                  class="btn btn-pill btn-outline-secondary btn-xs"
                  type="button"
                >
                  <i
                    style={{ fontSize: "24px" }}
                    className="icofont icofont-swoosh-right"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
