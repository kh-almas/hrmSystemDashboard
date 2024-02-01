import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Card, Collapse } from "reactstrap";
import GetAllStockAdjustment from "../../../common/Query/inventory/GetAllOpeningStock";
import Breadcrumb from "../../../common/breadcrumb";
import DataTable from "../../../common/component/DataTable";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import AddStockAdjustment from "./Form/AddStockAdjustment";

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

  return (
    <>
      <Breadcrumb parent="Inventory management" title="Stock Adjustment" />

      <Button
        className="mt-3 btn btn-pill btn-info btn-air-info btn-air-info"
        onClick={() => setShowFromForAdd(!showFromForAdd)}
      >

        Add Stock Adjustment
      </Button>


      <Card className="mt-2">
        <Collapse isOpen={showFromForAdd}>
          <AddStockAdjustment
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
            <div className="card" >
              {/* <DataTable
                baseForDelete={"batch_s"}
                getAllData={allStockAdjustment}
                handleDelete={handleDelete}
                toggleUpdateModal={updateToggle}
                setValueForEdit={setValueForEdit}
              ></DataTable> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockAdjustments;
