import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "../../../../../axios";
import getAllBranch from "../../../../common/Query/hrm/GetAllBranch";
import GetAllSupplier from "../../../../common/Query/inventory/GetAllSupllier";
import { Checkbox, FormControlLabel } from "@mui/material";

const AddPurchaseQuote = ({
  setShowFromForAddWithP,
  allPurchaseQuoteReFetch,
}) => {
  const [selectedBranch, setSelectedBranch] = useState({});
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [branch, setBranch] = useState([]);
  const [hasLc, setHasLc] = useState(false);

  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const status = [
    { name: "Active", id: "Active" },
    { name: "Inactive", id: "Inactive" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  //! get brnach
  const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] =
    getAllBranch();
  useEffect(() => {
    setBranch(allBranch?.data?.body?.data?.data);
  }, [allBranch]);

  //! get supplier
  const [allSupplier, allSupplierReFetch] = GetAllSupplier();

  const onSubmit = (data) => {
    data.branch_id = selectedBranch?.id;
    data.supplier_id = selectedSupplier?.id ? selectedSupplier?.id : null;
    data.has_lc = hasLc;
    data.transaction_date = date;
    data.total_price = parseFloat(data.total_price);
    data.total_discount = parseFloat(data.total_discount);
    data.total_vat = parseFloat(data.total_vat);
    data.other_cost = parseFloat(data.other_cost);

    // console.log("Purchase Quote", data);

    axios
      .post("/inventory-management/purchase/quote", data)
      .then((info) => {
        if (info?.status == 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });

          setSelectedBranch("");
          reset();
          allPurchaseQuoteReFetch();
          setShowFromForAddWithP(false);
        }
      })
      .catch((e) => {
        console.log(e);
        if (e?.response?.data?.body?.message?.errno == 1062) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Can not duplicate variant name",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            // title: `${e?.response?.data?.body?.message?.details?.[0].message}`,
            title: `Something is wrong`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <>
      <div className="p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row row-cols-1 row-cols-lg-2">
            {/* Branch */}
            <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="branch"
                options={branch}
                getOptionLabel={(option) => (option ? option?.name : "")}
                onChange={(event, value) => {
                  setSelectedBranch(value);
                }}
                sx={{
                  width: "100%",
                  marginTop: 2,
                  "& label": {
                    fontSize: 12,
                  },
                  "& label.Mui-focused": {
                    fontSize: 16,
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Branch"
                    {...register("branch_id", {
                      required: "This field is required",
                    })}
                  />
                )}
              />
              {errors.branch_id && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.branch_id.message}
                </span>
              )}
            </div>

            {/* Supplier*/}
            <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="supplier"
                options={allSupplier}
                getOptionLabel={(option) => (option ? option?.name_s : "")}
                onChange={(event, value) => {
                  setSelectedSupplier(value);
                }}
                sx={{
                  width: "100%",
                  marginTop: 2,
                  "& label": {
                    fontSize: 12,
                  },
                  "& label.Mui-focused": {
                    fontSize: 16,
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Supplier"
                    {...register("supplier_id", {
                      required: "This field is required",
                    })}
                  />
                )}
              />
              {errors.supplier_id && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.supplier_id.message}
                </span>
              )}
            </div>

            {/* transaction_date */}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                <DatePicker
                  label="Transaction Date"
                  slotProps={{ textField: { size: "small" } }}
                  value={dayjs(date)}
                  onChange={(newValue) => {
                    setDate(moment(newValue.$d).format("YYYY-MM-DD"));
                  }}
                  sx={{
                    width: "100%",
                    marginTop: 2,
                    "& label": {
                      fontSize: 12,
                    },
                    "& label.Mui-focused": {
                      fontSize: 16,
                    },
                  }}
                />
              </LocalizationProvider>

              {errors.date && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.date.message}
                </span>
              )}
            </div>

            {/* quotation_no */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"text"}
                label={"Quotation No"}
                {...register("quotation_no", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["quotation_no"]);
                }}
                sx={{
                  marginTop: 2,
                  "& .MuiFormLabel-root": {
                    fontWeight: 400,
                    fontSize: 12,
                  },
                  "& label": {
                    fontSize: 12,
                  },
                  "& label.Mui-focused": {
                    color: "#1c2437",
                    fontSize: 16,
                  },
                  "& .MuiOutlinedInput-root": {
                    height: 35,
                    backgroundColor: "white",
                    "&.Mui-focused fieldset": {
                      borderColor: "#979797",
                      borderWidth: "1px",
                    },
                  },
                }}
              />
              {errors?.quotation_no && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors?.quotation_no.message}
                </span>
              )}
            </div>

            {/* requisition_no */}
            {/* <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"text"}
                label={"Requisition No"}
                {...register("requisition_no", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["requisition_no"]);
                }}
                sx={{
                  marginTop: 2,
                  "& .MuiFormLabel-root": {
                    fontWeight: 400,
                    fontSize: 12,
                  },
                  "& label": {
                    fontSize: 12,
                  },
                  "& label.Mui-focused": {
                    color: "#1c2437",
                    fontSize: 16,
                  },
                  "& .MuiOutlinedInput-root": {
                    height: 35,
                    backgroundColor: "white",
                    "&.Mui-focused fieldset": {
                      borderColor: "#979797",
                      borderWidth: "1px",
                    },
                  },
                }}
              />
              {errors?.requisition_no && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors?.requisition_no.message}
                </span>
              )}
            </div> */}

            {/* total qty */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"number"}
                label={"Total Quantity"}
                {...register("total_qty", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["total_qty"]);
                }}
                sx={{
                  marginTop: 2,
                  "& .MuiFormLabel-root": {
                    fontWeight: 400,
                    fontSize: 12,
                  },
                  "& label": {
                    fontSize: 12,
                  },
                  "& label.Mui-focused": {
                    color: "#1c2437",
                    fontSize: 16,
                  },
                  "& .MuiOutlinedInput-root": {
                    height: 35,
                    backgroundColor: "white",
                    "&.Mui-focused fieldset": {
                      borderColor: "#979797",
                      borderWidth: "1px",
                    },
                  },
                }}
              />
              {errors.total_qty && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.total_qty.message}
                </span>
              )}
            </div>

            {/* total_price */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"text"}
                label={"Total Price"}
                {...register("total_price", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["total_price"]);
                }}
                sx={{
                  marginTop: 2,
                  "& .MuiFormLabel-root": {
                    fontWeight: 400,
                    fontSize: 12,
                  },
                  "& label": {
                    fontSize: 12,
                  },
                  "& label.Mui-focused": {
                    color: "#1c2437",
                    fontSize: 16,
                  },
                  "& .MuiOutlinedInput-root": {
                    height: 35,
                    backgroundColor: "white",
                    "&.Mui-focused fieldset": {
                      borderColor: "#979797",
                      borderWidth: "1px",
                    },
                  },
                }}
              />
              {errors.total_price && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.total_price.message}
                </span>
              )}
            </div>

            {/* total discount */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"text"}
                label={"Total Discount"}
                {...register("total_discount", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["total_discount"]);
                }}
                sx={{
                  marginTop: 2,
                  "& .MuiFormLabel-root": {
                    fontWeight: 400,
                    fontSize: 12,
                  },
                  "& label": {
                    fontSize: 12,
                  },
                  "& label.Mui-focused": {
                    color: "#1c2437",
                    fontSize: 16,
                  },
                  "& .MuiOutlinedInput-root": {
                    height: 35,
                    backgroundColor: "white",
                    "&.Mui-focused fieldset": {
                      borderColor: "#979797",
                      borderWidth: "1px",
                    },
                  },
                }}
              />
              {errors.total_discount && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.total_discount.message}
                </span>
              )}
            </div>

            {/* total_vat */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"text"}
                label={"Total Vat"}
                {...register("total_vat", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["total_vat"]);
                }}
                sx={{
                  marginTop: 2,
                  "& .MuiFormLabel-root": {
                    fontWeight: 400,
                    fontSize: 12,
                  },
                  "& label": {
                    fontSize: 12,
                  },
                  "& label.Mui-focused": {
                    color: "#1c2437",
                    fontSize: 16,
                  },
                  "& .MuiOutlinedInput-root": {
                    height: 35,
                    backgroundColor: "white",
                    "&.Mui-focused fieldset": {
                      borderColor: "#979797",
                      borderWidth: "1px",
                    },
                  },
                }}
              />
              {errors.total_vat && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.total_vat.message}
                </span>
              )}
            </div>

            {/* other cost */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"text"}
                label={"Other Cost"}
                {...register("other_cost", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["other_cost"]);
                }}
                sx={{
                  marginTop: 2,
                  "& .MuiFormLabel-root": {
                    fontWeight: 400,
                    fontSize: 12,
                  },
                  "& label": {
                    fontSize: 12,
                  },
                  "& label.Mui-focused": {
                    color: "#1c2437",
                    fontSize: 16,
                  },
                  "& .MuiOutlinedInput-root": {
                    height: 35,
                    backgroundColor: "white",
                    "&.Mui-focused fieldset": {
                      borderColor: "#979797",
                      borderWidth: "1px",
                    },
                  },
                }}
              />
              {errors.other_cost && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.other_cost.message}
                </span>
              )}
            </div>

            {/* ship_add */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"text"}
                label={"Shipping Address"}
                {...register("shipping_add", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["shipping_add"]);
                }}
                sx={{
                  marginTop: 2,
                  "& .MuiFormLabel-root": {
                    fontWeight: 400,
                    fontSize: 12,
                  },
                  "& label": {
                    fontSize: 12,
                  },
                  "& label.Mui-focused": {
                    color: "#1c2437",
                    fontSize: 16,
                  },
                  "& .MuiOutlinedInput-root": {
                    height: 35,
                    backgroundColor: "white",
                    "&.Mui-focused fieldset": {
                      borderColor: "#979797",
                      borderWidth: "1px",
                    },
                  },
                }}
              />
              {errors?.shipping_add && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors?.shipping_add.message}
                </span>
              )}
            </div>

            {/* status */}
            <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="Status"
                options={status}
                getOptionLabel={(option) => (option ? option?.name : "")}
                onChange={(event, value) => {}}
                sx={{
                  width: "100%",
                  marginTop: 2,
                  "& label": {
                    fontSize: 12,
                  },
                  "& label.Mui-focused": {
                    fontSize: 16,
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // defaultValue={status?.[2]}
                    label="Status"
                    {...register("status", {
                      required: "This field is required",
                    })}
                  />
                )}
              />
              {errors.status && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.status.message}
                </span>
              )}
            </div>

            {/* has_lc */}
            <div>
              <FormControlLabel
                sx={{
                  marginTop: 1,
                }}
                control={
                  <Checkbox
                    checked={hasLc == true}
                    onChange={(e) => {
                      e.target.checked === true
                        ? setHasLc(true)
                        : setHasLc(false);
                    }}
                  />
                }
                label="Has Lc"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center mt-3">
            <Button
              type="submit"
              className="me-2 btn btn-pill btn-info btn-air-info btn-info-gradien px-4"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPurchaseQuote;
