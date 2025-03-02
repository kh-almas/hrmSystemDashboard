import React, {useEffect, useState} from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import FilesComponent from "../../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../../common/salaryCard/CommonSearchComponet";
import DataTable from "../../../../common/component/DataTable";
import AddVariantModal from "../../../../common/component/form/inventory/varient/AddVariantModal";
import EditVariantModal from "../../../../common/component/form/inventory/varient/EditVariantModal";
import getInventoryVariant from "../../../../common/Query/inventory/getInventoryVariant";
import Swal from "sweetalert2";
import axios from "../../../../../axios";
import getInventoryModel from "../../../../common/Query/inventory/getInventoryModel";
import AddModelModal from "../../../../common/component/form/inventory/model/AddModelModal";
import EditModelModal from "../../../../common/component/form/inventory/model/EditModelModal";
const Model = () => {
  const [data, setData] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [valueForEdit, setValueForEdit] = useState({});
  // console.log(valueForEdit);
  const isDarty = () =>
  {
    setIsChange(!isChange);
  }
  const toggle = () => {
    setModal(!modal);
  };

  const updateToggle = () => {
    setEditModal(!editModal);
  };

  useEffect(() => {
    const getData = async () => {
      const getData = await getInventoryModel();
      setData(getData?.data?.body?.data);
      console.log(getData?.data?.body?.data)
    };
    getData();
  }, [isChange]);

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
        axios.delete(`/inventory-management/model/delete/${id}`)
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
              isDarty();
            })
            .catch(e => {
              if(e?.response?.data?.body?.message?.sqlState === "23000")
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: `Can not delete variant.`,
                })
              }
            })
      }
    })
  };

  return (
      <>
        <Breadcrumb parent="Inventory management" title="Model" />
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
            <button onClick={toggle} className="btn btn-pill btn-info btn-air-info btn-air-info">
              Add Model
            </button>
          </div>
          <FilesComponent />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card" style={{ padding: "20px" }}>
                <DataTable getAllData={data} handleDelete={handleDelete} toggleUpdateModal={updateToggle} setValueForEdit={setValueForEdit} ></DataTable>
              </div>
            </div>
          </div>
        </div>
        <AddModelModal modal={modal} toggle={toggle} reFetch={isDarty}></AddModelModal>
        <EditModelModal modal={editModal} toggle={updateToggle} reFetch={isDarty} valueForEdit={valueForEdit} ></EditModelModal>
      </>
  );
};

export default Model;
