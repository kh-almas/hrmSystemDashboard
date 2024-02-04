import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Card, Collapse } from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import GetAllProductDiscount from "../../../common/Query/inventory/GetAllProductDiscount";
import Breadcrumb from "../../../common/breadcrumb";
import DataTable from "../../../common/component/DataTable";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import AddProductDiscount from "./Form/AddProductDiscount";
import EditProductDiscount from "./Form/EditProductDiscount";

const ProductDiscount = () => {
  const [showFromForAdd, setShowFromForAdd] = useState(false);
  const [allProductDiscount, setAllProductDiscount] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [valueForEdit, setValueForEdit] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [
    allProductDiscountStatus,
    allProductDiscountReFetch,
    allProductDiscountData,
    allProductDiscountError,
  ] = GetAllProductDiscount();

  const isDarty = () => {
    setIsChange(!isChange);
  };

  useEffect(() => {
    setAllProductDiscount(allProductDiscountData?.data?.body?.data);
  }, [allProductDiscountData]);

  const updateToggle = () => {
    setEditModal(!editModal);
  };

  // console.log('allProductDiscountData',allProductDiscount)

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
          .delete(`/inventory-management/stock/adjustment/delete/${batch_id}`)
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
            allProductDiscountReFetch();
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
        Add Product Discount
      </Button>

      <Card className="mt-2">
        <Collapse isOpen={showFromForAdd}>
          <AddProductDiscount
            setShowFromForAdd={setShowFromForAdd}
            allProductDiscountReFetch={allProductDiscountReFetch}
          ></AddProductDiscount>
        </Collapse>
      </Card>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <h5>Product Discount List</h5>
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
                getAllData={allProductDiscount}
                handleDelete={handleDelete}
                toggleUpdateModal={updateToggle}
                setValueForEdit={setValueForEdit}
              ></DataTable>
            </div>
          </div>
        </div>
      </div>
      <EditProductDiscount
        modal={editModal}
        toggle={updateToggle}
        reFetch={isDarty}
        valueForEdit={valueForEdit?.original}
        setValueForEdit={setValueForEdit}
        allProductDiscountReFetch={allProductDiscountReFetch}
      ></EditProductDiscount>
    </>
  );
};

export default ProductDiscount;
