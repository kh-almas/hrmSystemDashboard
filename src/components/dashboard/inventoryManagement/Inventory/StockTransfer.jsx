import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../common/breadcrumb";
import { Button } from "react-bootstrap";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import { Card, Collapse } from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import DataTable from "../../../common/component/DataTable";
import GetAllStockTransfer from "../../../common/Query/inventory/GetAllStockTransfer";
import AddStockTransfer from "./Form/AddStockTransfer";

const StockTransfer = () => {
  const [showFromForAdd, setShowFromForAdd] = useState(false);
  const [getAllStockTransfer, setGetAllStockTransfer] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [valueForEdit, setValueForEdit] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [
    getAllStockTransferStatus,
    getAllStockTransferReFetch,
    getAllStockTransferData,
    getAllStockTransferError,
  ] = GetAllStockTransfer();

  const isDarty = () => {
    setIsChange(!isChange);
  };

  useEffect(() => {
    setGetAllStockTransfer(getAllStockTransferData?.data?.body?.data);
  }, [getAllStockTransferData]);

  const updateToggle = () => {
    setEditModal(!editModal);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/inventory-management/stock/opening/delete/${id}`)
          .then((info) => {
            if (info?.status == 200) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your file has been deleted.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            getAllStockTransferReFetch();
          })
          .catch((e) => {
            if (e?.response?.data?.body?.message?.sqlState === "23000") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Can not delete variant.`,
              });
            }
          });
      }
    });
  };

  return (
    <>
      <Breadcrumb parent="Inventory management" title="Stock Transfer List" />

      <Button
        className="mt-3 btn btn-pill btn-info btn-air-info btn-air-info"
        onClick={() => setShowFromForAdd(!showFromForAdd)}
      >
        Add Stock Transfer
      </Button>

      <Card className="mt-2">
        <Collapse isOpen={showFromForAdd}>
          <AddStockTransfer
            getAllStockTransferReFetch={getAllStockTransferReFetch}
            setShowFromForAdd={setShowFromForAdd}
          ></AddStockTransfer>
        </Collapse>
      </Card>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <h5>Stock Transfer List</h5>
        </div>
        <div>
          <FilesComponent />
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              <DataTable
                editLink={
                  "/dashboard/inventory-management/inventory/stock-transfer/update/"
                }
                baseForDelete={"batch_s"}
                getAllData={getAllStockTransfer}
                handleDelete={handleDelete}
                toggleUpdateModal={updateToggle}
                setValueForEdit={setValueForEdit}
              ></DataTable>
            </div>
          </div>
        </div>
      </div>
      {/* <EditStockTransfer modal={editModal} toggle={updateToggle} reFetch={isDarty} valueForEdit={valueForEdit?.original} setValueForEdit={setValueForEdit} getAllStockTransferReFetch={getAllStockTransferReFetch}></EditStockTransfer> */}
    </>
  );
};

export default StockTransfer;
