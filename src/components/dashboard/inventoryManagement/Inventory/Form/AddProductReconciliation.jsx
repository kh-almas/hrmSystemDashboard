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
import GetEmployee from "../../../../common/Query/hrm/GetEmployee";
import getAllSKUForSelect from "../../../../common/Query/inventory/GetAllSKUForSelect";
import Select from "../../../../common/modal/Select";

const AddProductReconciliation = ({
  allProductReconciliationReFetch,
  setShowFromForAdd,
}) => {
  const [selectedBranch, setSelectedBranch] = useState({});
  const [batchNo, setBatchNo] = useState("");
  const [data, setData] = React.useState([]);
  const [branch, setBranch] = useState([]);
  const [sku, setSku] = useState({});
  const [date, setDate] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState("");
  const [employee, setEmployee] = useState([]);
  const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] =
    GetEmployee();

  const handleChangeForUpdateStatus = (selected) => {
    setEmployeeInfo(selected);
  };

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

    setDate(moment(new Date()).format("YYYY-MM-DD"));
  }, []);

  useEffect(() => {
    allEmployee?.data?.body?.data?.data?.map((item) => {
      const set_data = {
        value: item.id,
        label: item?.full_name,
      };
      setEmployee((prevEmployee) => [...prevEmployee, set_data]);
    });
  }, [allEmployee]);





  const onSubmit = (data) => {
    data.branch_id = selectedBranch?.id;
    data.sku_id = sku?.id;
    data.date = date;
    data.batch_no = batchNo;
    data.audit_by = employeeInfo?.value;
    data.approve_status = false;



    console.log("data=====---", data);

    axios
      .post("inventory-management/stock/reconciliation/add", data)
      .then((info) => {
        if (info?.status == 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });

          const batchNo = generateSkuCode(12);
          setBatchNo(batchNo);

          setSku("");
          setSelectedBranch("");
          reset();
          allProductReconciliationReFetch();
          setShowFromForAdd(false);
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

  //   console.log("allEmployee=====---", allEmployee);
  //   console.log("employeeInfo=====---", employeeInfo);
  //   console.log("employee=====---", employee);

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
                setSku(value);
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
                  {...register("sku_id", {
                    required: "This field is required",
                  })}
                />
              )}
            />
            {errors?.sku_id && (
              <span style={{ fontSize: "10px", color: "red" }}>
                {errors?.sku_id?.message}
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
                label={"System Stock Qty"}
                {...register("system_stock_qty", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["system_stock_qty"]);
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
              {errors.system_stock_qty && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.system_stock_qty.message}
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
                label={"Physical qty"}
                {...register("physical_qty", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["physical_qty"]);
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
              {errors.physical_qty && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.physical_qty.message}
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
                label={"Adjust Qty"}
                {...register("adjust_qty", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["adjust_qty"]);
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
              {errors?.adjust_qty && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors?.adjust_qty?.message}
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
                label={"Remarks"}
                {...register("remarks", {
                  required: "This field is required",
                })}
                onChange={(e) => {
                  clearErrors(["remarks"]);
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
              {errors.remarks && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors?.remarks?.message}
                </span>
              )}
            </div>

            <div style={{ marginTop: "15px" }}>
              <Select
                // labelName={"Employee Name"}
                placeholder={"Select an option"}
                options={employee}
                setValue={setEmployeeInfo}
                cngFn={handleChangeForUpdateStatus}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center mt-5">
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

export default AddProductReconciliation;
