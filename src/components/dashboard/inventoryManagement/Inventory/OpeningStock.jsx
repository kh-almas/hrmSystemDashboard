import React, {useState} from "react";
import Breadcrumb from "../../../common/breadcrumb";
import Select from "../../../common/modal/Select";
import Input from "../../../common/modal/Input";
import CkEditorComponent from "../../../common/modal/CkEditorComponent";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Textarea from "../../../common/modal/Textarea";
import Submitbtn from "../../../common/button/Submitbtn";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import Paginationbtn from "../../../common/Paginationbtn";
import {Card, Collapse} from "reactstrap";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import AddOpeningStock from "./Form/AddOpeningStock";

const OpeningStock = () => {
  const [showFromForAdd , setShowFromForAdd] = useState(false);

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

      <div className="card mb-0" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div className="table-responsive">
          <table className="table">
            <thead className=" table-border">
              <tr>
                <th scope="col">{"Sl"}</th>
                <th scope="col">{"Date"}</th>
                <th scope="col">{"Name"}</th>
                <th scope="col">{"SKU"}</th>
                <th scope="col">{"Model"}</th>
                <th scope="col">{"Brand"}</th>
                <th scope="col">{"Branch"}</th>
                <th scope="col">{"Purchase Price"}</th>
                <th scope="col">{"Selling Price"}</th>
                <th scope="col">{"Stock"}</th>
                <th scope="col">{"Created User"}</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <th scope="row">{""}</th>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td></td>
              </tr> */}
            </tbody>
          </table>
          <p className="text-center p-t-10">No entries found</p>
        </div>
      </div>
      <Paginationbtn />
    </>
  );
};

export default OpeningStock;
