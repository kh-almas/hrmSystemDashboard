import React, {useEffect, useState} from "react";
import Breadcrumb from "../../../common/breadcrumb";
import { Button } from "react-bootstrap";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import {Card, Collapse} from "reactstrap";
import AddOpeningStock from "./Form/AddOpeningStock";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import DataTable from "../../../common/component/DataTable";
import GetAllOpeningStock from "../../../common/Query/inventory/GetAllOpeningStock";

const OpeningStock = () => {
  const [showFromForAdd , setShowFromForAdd] = useState(false);
  const [allOpeningStock , setAllOpeningStock] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [valueForEdit, setValueForEdit] = useState({});
    const [editModal, setEditModal] = useState(false);
    const [allOpeningStockStatus, allOpeningStockReFetch, allOpeningStockData, allOpeningStockError] = GetAllOpeningStock()

    const isDarty = () =>
    {
        setIsChange(!isChange);
    }

    useEffect(() => {
        setAllOpeningStock(allOpeningStockData?.data?.body?.data);
    }, [allOpeningStockData]);

    const updateToggle = () => {
        setEditModal(!editModal);
    };

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
      <Breadcrumb parent="Inventory management" title="Opening Stock" />

      <Button className="mt-3 btn btn-pill btn-info btn-air-info btn-air-info" onClick={() => setShowFromForAdd(!showFromForAdd)}>
        Add Opening Stock
      </Button>

      <Card className="mt-2">
        <Collapse isOpen={showFromForAdd}>
            <AddOpeningStock></AddOpeningStock>
        </Collapse>
      </Card>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <h5>Opening Stock List</h5>
        </div>
        <div>
          <FilesComponent/>
        </div>
      </div>

        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card" style={{padding: "20px"}}>
                        <DataTable getAllData={allOpeningStock} handleDelete={handleDelete} toggleUpdateModal={updateToggle} setValueForEdit={setValueForEdit}></DataTable>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default OpeningStock;
