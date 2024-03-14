import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Card, Collapse } from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import GetAllStockAdjustment from "../../../common/Query/inventory/GetAllStockAdjustment";
import Breadcrumb from "../../../common/breadcrumb";
import DataTable from "../../../common/component/DataTable";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import AddStockAdjustment from "./Form/AddStockAdjustment";
import EditStockAdjustment from "./Form/EditStockAdjustment";
import {Link} from "react-router-dom";

const StockAdjustments = () => {
  const [showFromForAdd, setShowFromForAdd] = useState(false);
  const [allStockAdjustment, setAllStockAdjustment] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [valueForEdit, setValueForEdit] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [
    allStockAdjustmentStatus,
    allStockAdjustmentReFetch,
    allStockAdjustmentData,
    allStockAdjustmentError,
  ] = GetAllStockAdjustment();

  const isDarty = () => {
    setIsChange(!isChange);
  };

  useEffect(() => {
    setAllStockAdjustment(allStockAdjustmentData?.data?.body?.data);
  }, [allStockAdjustmentData]);

  const updateToggle = () => {
    setEditModal(!editModal);
  };

  // console.log('allStockAdjustmentData',allStockAdjustment)

  const handleDelete = (primary_id) => {
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
          .delete(`/inventory-management/stock/adjustment/delete/${primary_id}`)
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
            allStockAdjustmentReFetch();
          })
          .catch((e) => {
            if (e?.response?.data?.body?.message?.sqlState === "23000") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Can not delete Stock Adjustment.`,
              });
            }
          });
      }
    });
  };

  return (
    <>
      <Breadcrumb parent="Inventory management" title="Stock Adjustment" />

      <Button
        className="mt-3 btn btn-pill btn-info btn-air-info btn-air-info"
        onClick={() => setShowFromForAdd(!showFromForAdd)}
      >
        Add Stock Adjustment
      </Button>

      <Link
          to={'/dashboard/inventory-management/inventory/stock-adjustment/create'}
        className="mt-3 btn btn-pill btn-info btn-air-info btn-air-info"
      >
        Add Stock Adjustment
      </Link>

      <Card className="mt-2">
        <Collapse isOpen={showFromForAdd}>
          <AddStockAdjustment
            setShowFromForAdd={setShowFromForAdd}
            allStockAdjustmentReFetch={allStockAdjustmentReFetch}
          ></AddStockAdjustment>
        </Collapse>
      </Card>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <h5>Stock Adjustment List</h5>
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
                statusData={['active', 'pending', 'inactive']}
                baseForDelete={"primary_id"}
                getAllData={allStockAdjustment}
                handleDelete={handleDelete}
                toggleUpdateModal={updateToggle}
                setValueForEdit={setValueForEdit}
              ></DataTable>
            </div>
          </div>
        </div>
      </div>
      <EditStockAdjustment
        modal={editModal}
        toggle={updateToggle}
        reFetch={isDarty}
        valueForEdit={valueForEdit?.original}
        setValueForEdit={setValueForEdit}
        allStockAdjustmentReFetch={allStockAdjustmentReFetch}
      ></EditStockAdjustment>
    </>
  );
};

export default StockAdjustments;
