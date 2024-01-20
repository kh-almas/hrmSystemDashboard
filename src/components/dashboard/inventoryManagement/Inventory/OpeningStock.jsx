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

const OpeningStock = () => {
  const [showFromForAdd , setShowFromForAdd] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Breadcrumb parent="Inventory management" title="Opening Stock" />

      <Button className="mt-3 btn btn-pill btn-info btn-air-info btn-air-info" onClick={() => setShowFromForAdd(!showFromForAdd)}>
        Add Opening Stock
      </Button>

      <Card className="mt-2">
        <Collapse isOpen={showFromForAdd}>
          <div className="p-30">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row row-cols-1 row-cols-lg-2">
                <div>
                  <Select
                      name={"product"}
                      labelName={"Product"}
                      // placeholder={"Select an option"}
                      options={["19 Inch LG TV"]}
                  />
                </div>
                <div>
                  <Box
                      component={"div"}
                      sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            slotProps={{
                              textField: {
                                size: 'small',
                                variant: 'outlined',
                                error: Boolean(errors),
                                helperText: `${errors?.message || ''}`
                              }
                            }}
                            onChange={(value) => {
                              console.log('value', value)
                            }}
                            label={'label'}
                            format="dd/MM/yyyy"
                            sx={{
                              mx: { xs: 2, md: 0 },
                              "& .MuiFormLabel-root": {
                                fontWeight: 500,
                              },
                              "& label.Mui-focused": {
                                color: "#3d30a2",
                              },
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "#f8f8f8",
                                "& fieldset": {
                                  transition: ".3s",
                                  borderWidth: "2px",
                                },
                                "&:hover fieldset": {
                                  borderColor: "gray",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#3D30A2",
                                  borderWidth: "2px",
                                },
                              },
                            }}
                        />
                    </LocalizationProvider>
                  </Box>
                </div>
              </div>

              <div className="row row-cols-1 row-cols-lg-2">
                <div>
                  <Input
                      labelName={"STOCK QUANTITY"}
                      inputName={"stockquantity"}
                      inputType={"text"}
                      placeholder={"Enter stock quantity"}
                      validation={{
                        ...register("stockquantity", {required: true}),
                      }}
                  />
                </div>
                <div>
                  <TextField
                      variant='outlined'
                      fullWidth
                      autoComplete="off"
                      size='small'
                      type="number"
                      label="STOCK QUANTITY"
                      placeholder="0"
                      sx={{
                        '& .MuiFormLabel-root': {
                          // fontSize: { xs: '.7rem', md: '.8rem' },
                          fontWeight: 400,
                        },
                        '& label': {
                          fontSize: 12
                        },
                        '& label.Mui-focused': {
                          color: '#1c2437',
                          fontSize: 16
                        },
                        '& .MuiOutlinedInput-root': {
                          // fontSize: { xs: 12, md: 14 },
                          height: 35,
                          backgroundColor: 'white',
                          '&.Mui-focused fieldset': {
                            borderColor: '#979797',
                            borderWidth: '1px'
                          },
                        },
                      }}/>
                </div>
                <div>
                  <Select
                      name={"employee"}
                      labelName={"Select warehouse or branch"}
                      placeholder={"Select an option"}
                      options={["Main branch"]}
                  />
                </div>
              </div>

              <div className="row row-cols-1 row-cols-lg-2">
                <div>
                  <Input
                      labelName={"Purchase Price"}
                      inputName={"purchaseprice"}
                      inputType={"text"}
                      placeholder={"Enter purchase price"}
                      validation={{
                        ...register("purchaseprice", {required: true}),
                      }}
                  />
                </div>
                <div>
                  <Input
                      labelName={"Selling Price"}
                      inputName={"sellingprice"}
                      inputType={"text"}
                      placeholder={"Enter selling price"}
                      validation={{...register("sellingprice", {required: true})}}
                  />
                </div>
              </div>

              <Submitbtn/>
            </form>
          </div>
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
