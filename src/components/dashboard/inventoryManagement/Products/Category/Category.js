import React, {useEffect, useState} from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import FilesComponent from "../../../../common/filesComponent/FilesComponent";
import Swal from "sweetalert2";
import axios from "../../../../../axios";
import DataTable from "../../../../common/component/DataTable";
import getInventoryCategory from "../../../../common/Query/inventory/getInventoryCategory";
import AddCategoryModal from "../../../../common/component/form/inventory/Category/AddCategoryModal";
import EditCategoryModal from "../../../../common/component/form/inventory/Category/EditCategoryModal";

const Category = () => {

    const [data, setData] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [valueForEdit, setValueForEdit] = useState({});
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
            const getData = await getInventoryCategory();
            setData(getData?.data?.body?.data);
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
                axios.delete(`/inventory-management/category/delete/${id}`)
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
      <>
          <Breadcrumb parent="Inventory management" title="category" />
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
                      Add Category
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
          <AddCategoryModal isChange={isChange} modal={modal} toggle={toggle} reFetch={isDarty}></AddCategoryModal>
          <EditCategoryModal isChange={isChange} modal={editModal} toggle={updateToggle} reFetch={isDarty} valueForEdit={valueForEdit} ></EditCategoryModal>
      </>
  );
};

export default Category;
