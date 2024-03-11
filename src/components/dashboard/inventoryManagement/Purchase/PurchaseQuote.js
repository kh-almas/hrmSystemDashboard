import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Card, Collapse } from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import Breadcrumb from "../../../common/breadcrumb";
import DataTable from "../../../common/component/DataTable";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import AddPurchaseQuote from "./Form/AddPurchaseQuote";
import EditPurchaseQuote from "./Form/EditPurchaseQuote";
import GetAllPurchaseQuote from "../../../common/Query/inventory/GetAllPurchaseQuote";

const PurchaseQuote = () => {
  const [showFromForAdd, setShowFromForAdd] = useState(false);
  //   const [allPurchaseQuote, setAllPurchaseQuote] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [valueForEdit, setValueForEdit] = useState({});
  const [editModal, setEditModal] = useState(false);

  //   const [
  //     allPurchaseQuoteStatus,
  //     allPurchaseQuoteReFetch,
  //     allPurchaseQuoteData,
  //     allPurchaseQuoteError,
  //   ] = GetAllPurchaseQuote();

  //   useEffect(() => {
  //     setAllPurchaseQuote(allPurchaseQuoteData?.data?.body?.data);
  //   }, [allPurchaseQuoteData]);

  //   console.log("allPurchaseQuote", allPurchaseQuote);

  const isDarty = () => {
    setIsChange(!isChange);
  };

  const updateToggle = () => {
    setEditModal(!editModal);
  };

  // console.log('allPurchaseQuoteData',allPurchaseQuote)

  const handleDelete = (primary_id) => {
    console.log("primary_id", primary_id);
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
          .delete(
            `/inventory-management/purchase/requisition/delete/${primary_id}`
          )
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
            // allPurchaseQuoteReFetch();
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
      <Breadcrumb parent="Inventory management" title="Purchase Quote" />

      <div className="d-flex gap-2">
        <Button
          className="mt-3 btn btn-pill btn-info btn-air-info btn-air-info"
          onClick={() => setShowFromForAdd(!showFromForAdd)}
        >
          Add Purchase Quote
        </Button>
        <Button
          className="mt-3 btn btn-pill btn-info btn-air-info btn-air-info"
        //   onClick={() => setShowFromForAdd(!showFromForAdd)}
        >
          Add Purchase Quote From Requisition
        </Button>
      </div>

      <Card className="mt-2">
        <Collapse isOpen={showFromForAdd}>
          <AddPurchaseQuote
            setShowFromForAdd={setShowFromForAdd}
            // allPurchaseQuoteReFetch={allPurchaseQuoteReFetch}
          ></AddPurchaseQuote>
        </Collapse>
      </Card>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <h5>Purchase Quote List</h5>
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
                baseForDelete={"primary_id"}
                // getAllData={allPurchaseQuote}
                handleDelete={handleDelete}
                toggleUpdateModal={updateToggle}
                setValueForEdit={setValueForEdit}
              ></DataTable>
            </div>
          </div>
        </div>
      </div>
      <EditPurchaseQuote
        modal={editModal}
        toggle={updateToggle}
        reFetch={isDarty}
        valueForEdit={valueForEdit?.original}
        setValueForEdit={setValueForEdit}
        // allPurchaseQuoteReFetch={allPurchaseQuoteReFetch}
      ></EditPurchaseQuote>
    </>
  );
};

export default PurchaseQuote;
