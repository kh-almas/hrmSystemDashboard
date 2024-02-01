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
import getAllBranch from "../../../../common/Query/hrm/GetAllBranch";
import getAllSKUForSelect from "../../../../common/Query/inventory/GetAllSKUForSelect";

const AddStockAdjustment = ({ allStockAdjustmentReFetch }) => {
  const [selectedBranch, setSelectedBranch] = useState({});
  const [batchNo, setBatchNo] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");
  const [data, setData] = React.useState([]);
  const [branch, setBranch] = useState([]);
  const [purpose, setPurpose] = useState(["Damage", "Recompilation"]);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [sku, setSku] = useState([]);
  const [date, setDate] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();
  const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] =
    getAllBranch();
  const [allSkuStatus, allSkuReFetch, allSku, allSkuError] =
    getAllSKUForSelect();

  function generateSkuCode(count) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }

  useEffect(() => {
    const batchNo = generateSkuCode(12);
    setBatchNo(batchNo);

    const uniqueId = generateSkuCode(8);
    setUniqueKey(uniqueId);

    setDate(moment(new Date()).format("YYYY-MM-DD"));
  }, []);

  const onSubmit = (data) => {
    data.branch_id = selectedBranch?.id;
    data.date = date;
    data.batch_no = batchNo;
    data.unique_key = `opening_stock_${uniqueKey}`;

    console.log("data", data);

    // axios
    //   .post("/inventory-management/stock/opening/add", data)
    //   .then((info) => {
    //     if (info?.status == 200) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Your work has been saved",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       allStockAdjustmentReFetch();
    //       reset();
    //       setSelectedBranch({});
    //       setDate(moment(new Date()).format("YYYY-MM-DD"));
    //       const batchNo = generateSkuCode(12);
    //       setBatchNo(batchNo);
    //       const uniqueId = generateSkuCode(8);
    //       setUniqueKey(uniqueId);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     if (e?.response?.data?.body?.message?.errno == 1062) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "error",
    //         title: "Can not duplicate variant name",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     } else {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "error",
    //         // title: `${e?.response?.data?.body?.message?.details?.[0].message}`,
    //         title: `Something is wrong`,
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
    //   });
  };

  useEffect(() => {
    setBranch(allBranch?.data?.body?.data?.data);
  }, [allBranch]);

  useEffect(() => {
    const allProduct = allSku?.data?.body?.data;
    // console.log('allProduct', allProduct);

    let finalArray = [];
    allProduct?.map((item) => {
      let initialObj = {
        id: item.id,
        label: `${item.name} > ${item.sku} > ${item.category_name} > ${item.brand_name} > ${item.model_name}`,
      };

      finalArray.push(initialObj);
    });

    setData(finalArray);
  }, [allSku]);

  return (
    <>
      <div className="p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                marginTop: 3,
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

          <div>
            <Autocomplete
              disablePortal
              size={"small"}
              id="Select product"
              options={data}
              // getOptionLabel={(option) => option ? option?.name : ''}
              onChange={(event, value) => {
                setSelectedBranch(value);
              }}
              sx={{
                width: "100%",
                marginTop: 3,
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
                  label="Select product"
                  {...register("product_id", {
                    required: "This field is required",
                  })}
                />
              )}
            />
            {errors.product_id && (
              <span style={{ fontSize: "10px", color: "red" }}>
                {errors.product_id.message}
              </span>
            )}
          </div>
          <div className="row row-cols-1 row-cols-lg-2">
            <div>
              <TextField
                readOnly
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type="text"
                value={batchNo}
                label="Batch no"
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
            </div>

            <div>
          
              <Autocomplete
                disablePortal
                size={"small"}
                id="purpose"
                options={purpose}
                getOptionLabel={(option) => (option ? option : "")}
                onChange={(event, value) => {
                  setSelectedPurpose(value);
                }}
                // sx={{
                //   width: "100%",
                //   marginTop: 3,
                //   "& label": {
                //     fontSize: 12,
                //   },
                //   "& label.Mui-focused": {
                //     fontSize: 16,
                //   },
                // }}
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Purpose "
                    {...register("purpose", {
                      required: "This field is required",
                    })}
                  />
                )}
              />
              {errors.purpose && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.purpose.message}
                </span>
              )}
            </div>

            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"text"}
                label={"Ref Id"}
                {...register("refId", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["refId"]);
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
              {errors.refId && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.refId.message}
                </span>
              )}
            </div>

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                <DatePicker
                  label="Date"
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
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"number"}
                label={"Quantity"}
                {...register("qty", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["qty"]);
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
              {errors.qty && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.qty.message}
                </span>
              )}
            </div>
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"number"}
                label={"Purchase price"}
                {...register("purchase_price", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["purchase_price"]);
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
              {errors.purchase_price && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.purchase_price.message}
                </span>
              )}
            </div>
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"number"}
                label={"Selling price"}
                {...register("selling_price", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["selling_price"]);
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
              {errors.selling_price && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.selling_price.message}
                </span>
              )}
            </div>
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type={"number"}
                label={"Total discount"}
                {...register("purpose", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["purpose"]);
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
              {errors.purpose && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.purpose.message}
                </span>
              )}
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

export default AddStockAdjustment;
