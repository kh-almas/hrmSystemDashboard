import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Single from "./Single";
import getShiftAPI from "../../../common/Query/hrm/forSort/getShiftAPI";
import getInventoryContact from "../../../common/Query/inventory/getInventoryContact";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

const Supplier = () => {
  const [pageCount, setPageCount] = useState(1);
  const [howManyItem, setHowManyItem] = useState('2');
  const [currentPage, setCurrentPage] = useState('1');
  const [totalDBRow, setTotalDBRow] = useState(0);
  const [searchData, setSearchData] = useState('');
  const [isChange, setIsChange] = useState(false);
  const isDarty = () =>
  {
    setIsChange(!isChange);
  }

  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const type = "customer";
      const setItem = howManyItem < totalDBRow ? howManyItem : totalDBRow;
      const getData = await getInventoryContact(type, currentPage, howManyItem, searchData);
      setData(getData?.data?.body?.data?.data);

      const totalItem = getData?.data?.body?.data?.count;
      console.log(totalItem, 'totalItem')
      setTotalDBRow(totalItem);
      const page = Math.ceil( totalItem / howManyItem);
      setPageCount(page);
    };
    getData();
  }, [howManyItem, currentPage, searchData, isUpdate]);

  const paginationItems = [];

  for (let i = 1; i <= pageCount; i++) {
    paginationItems.push(
        <PaginationItem key={i} active={i === parseInt(currentPage)}>
          <PaginationLink onClick={() => setCurrentPage(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
    );
  }

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
                to={"/dashboard/inventory-management/contacts/add-contacts/customer"}
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
                <CommonSearchComponet setCurrentPage={setCurrentPage} searchData={searchData} setSearchData={setSearchData} howManyItem={howManyItem} setHowManyItem={setHowManyItem} />
                <div className="table-responsive ">
                  <table className="table ">
                    <thead className=" table-border ">
                    <tr className="">
                      <th scope="col">{"Sl"}</th>
                      <th scope="col">{"Image"}</th>
                      <th scope="col">{"Supplier Name"}</th>
                      <th scope="col">{"Email"}</th>
                      <th scope="col">{"Phone"}</th>
                      <th scope="col">{"Pay Term"}</th>
                      <th scope="col">{"Tex Number"}</th>
                      <th scope="col">{"Action"}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      data?.map((item, index) => (
                          <Single
                              howManyItem={howManyItem}
                              currentPage={currentPage}
                              key={index}
                              index={index}
                              item={item}
                              isUpdate={isUpdate}
                              setIsUpdate={setIsUpdate}
                          />
                      ))
                    }
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 d-flex justify-content-end">
                  <Pagination aria-label="Page navigation example" className="pagination-primary">
                    <PaginationItem disabled={currentPage === 1 ? true : false}>
                      <PaginationLink onClick={() => setCurrentPage(currentPage - 1)} previous href="#javascript" />
                    </PaginationItem>

                    {paginationItems}

                    <PaginationItem disabled={currentPage === pageCount ? true : false}>
                      <PaginationLink onClick={() => setCurrentPage(currentPage + 1)} next href="#javascript" />
                    </PaginationItem>
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Supplier;