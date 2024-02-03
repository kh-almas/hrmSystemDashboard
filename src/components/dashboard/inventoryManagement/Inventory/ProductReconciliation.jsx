import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Card, Collapse } from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import GetAllProductReconciliation from "../../../common/Query/inventory/GetAllProductReconciliation";
import Breadcrumb from "../../../common/breadcrumb";
import DataTable from "../../../common/component/DataTable";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import AddProductReconciliation from "./Form/AddProductReconciliation";
import EditProductReconciliation from "./Form/EditProductReconciliation";

const ProductReconciliation = () => {
  const [showFromForAdd, setShowFromForAdd] = useState(false);
  const [allProductReconciliation, setAllProductReconciliation] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [valueForEdit, setValueForEdit] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [
    allProductReconciliationtatus,
    allProductReconciliationReFetch,
    allProductReconciliationData,
    allProductReconciliationError,
  ] = GetAllProductReconciliation();

  const isDarty = () => {
    setIsChange(!isChange);
  };

  useEffect(() => {
    setAllProductReconciliation(allProductReconciliationData?.data?.body?.data);
  }, [allProductReconciliationData]);

  const updateToggle = () => {
    setEditModal(!editModal);
  };

  // console.log('allProductReconciliationData',allProductReconciliation)

  const handleDelete = (batch_id) => {
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
            `/inventory-management/stock/reconciliation/delete/${batch_id}`
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
            allProductReconciliationReFetch();
          })
          .catch((e) => {
            if (e?.response?.data?.body?.message?.sqlState === "23000") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Can not delete Reconciliation.`,
              });
            }
          });
      }
    });
  };

  return (
    <>
      <Breadcrumb
        parent="Inventory management"
        title="Product Reconciliation"
      />

      <Button
        className="mt-3 btn btn-pill btn-info btn-air-info btn-air-info"
        onClick={() => setShowFromForAdd(!showFromForAdd)}
      >
        Add Product Reconciliation
      </Button>

      <Card className="mt-2">
        <Collapse isOpen={showFromForAdd}>
          <AddProductReconciliation
            setShowFromForAdd={setShowFromForAdd}
            allProductReconciliationReFetch={allProductReconciliationReFetch}
          ></AddProductReconciliation>
        </Collapse>
      </Card>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <h5>Add Product Reconciliation</h5>
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
                baseForDelete={"batch_s"}
                getAllData={allProductReconciliation}
                handleDelete={handleDelete}
                toggleUpdateModal={updateToggle}
                setValueForEdit={setValueForEdit}
              ></DataTable>
            </div>
          </div>
        </div>
      </div>
      {editModal && (
        <EditProductReconciliation
          modal={editModal}
          toggle={updateToggle}
          reFetch={isDarty}
          valueForEdit={valueForEdit?.original}
          setValueForEdit={setValueForEdit}
          allProductReconciliationReFetch={allProductReconciliationReFetch}
        />
      )}
    </>
  );
};

export default ProductReconciliation;
