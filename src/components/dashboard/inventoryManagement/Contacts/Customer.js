import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Single from "./Single";
import getShiftAPI from "../../../common/Query/hrm/forSort/getShiftAPI";
import getInventoryContact from "../../../common/Query/inventory/getInventoryContact";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import DataTable from "../../../common/component/DataTable";

const Supplier = () => {
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const type = "customer";
      const getData = await getInventoryContact(type);
      setData(getData?.data?.body?.data?.data);
    };
    getData();
  }, [isUpdate]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`inventory-management/contacts/delete-contact/${id}`)
            .then(info => {
              if(info?.status == 200)
              {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your file has been deleted.",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
              setIsUpdate(!isUpdate);
            })
            .catch(e => {
              if(e?.response?.data?.body?.message?.sqlState === "23000")
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: `Can not delete shift, if there have any attendance in this shift`,
                })
              }
              // if (!empty(e?.response?.data?.body?.message?.details[0].message))
              // {
              //     Swal.fire({
              //         icon: 'error',
              //         title: 'Oops...',
              //         text: `${e?.response?.data?.body?.message?.details[0].message}`,
              //     })
              // }
            })
      }
    })
  };


  return (
      <div>
        <Breadcrumb parent="Inventory management" title="Customer" />
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
                to={"/dashboard/inventory-management/contacts/add-contacts/supplier"}
                className="btn btn-pill btn-info btn-air-info btn-air-info mx-2"
            >
              <i className="fa fa-plus me-2"></i>
              New Contact
            </Link>
            <Link
                to={"/dashboard/csv/upload"}
                className="btn btn-pill btn-info btn-air-info btn-air-info"
            >
              <i className="fa fa-upload me-1"></i> Upload Via CSV
            </Link>
          </div>

          <FilesComponent />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card" style={{ padding: "20px" }}>
                <DataTable getAllData={data} handleDelete={handleDelete} editLink={'/dashboard/inventory-management/contacts/edit-contacts/'}></DataTable>
                {/*<div className="table-responsive ">*/}
                {/*  <table className="table ">*/}
                {/*    <thead className=" table-border ">*/}
                {/*      <tr className="">*/}
                {/*        <th scope="col">{"Sl"}</th>*/}
                {/*        <th scope="col">{"Image"}</th>*/}
                {/*        <th scope="col">{"Supplier Name"}</th>*/}
                {/*        <th scope="col">{"Email"}</th>*/}
                {/*        <th scope="col">{"Phone"}</th>*/}
                {/*        <th scope="col">{"Pay Term"}</th>*/}
                {/*        <th scope="col">{"Tex Number"}</th>*/}
                {/*        <th scope="col">{"Action"}</th>*/}
                {/*      </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    {*/}
                {/*      data?.map((item, index) => (*/}
                {/*          <Single*/}
                {/*              howManyItem={howManyItem}*/}
                {/*              currentPage={currentPage}*/}
                {/*              key={index}*/}
                {/*              index={index}*/}
                {/*              item={item}*/}
                {/*              isUpdate={isUpdate}*/}
                {/*              setIsUpdate={setIsUpdate}*/}
                {/*          />*/}
                {/*      ))*/}
                {/*    }*/}
                {/*    </tbody>*/}
                {/*  </table>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Supplier;