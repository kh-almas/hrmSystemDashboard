import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import moment from "moment/moment";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "../../../../../axios";
import getAllBranch from "../../../../common/Query/hrm/GetAllBranch";
import GetEmployee from "../../../../common/Query/hrm/GetEmployee";
import getAllSKUForSelect from "../../../../common/Query/inventory/GetAllSKUForSelect";
import BaseModal from "../../../../common/modal/BaseModal";

const ProductReconciliation = ({
  modal,
  toggle,
  reFetch,
  valueForEdit,
  allOpeningStockReFetch,
  setValueForEdit,
}) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [branch, setBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [data, setData] = React.useState([]);
  const [date, setDate] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [employee, setEmployee] = useState([]);
  const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] =
    GetEmployee();

  const handleChangeForUpdateStatus = (selected) => {
    setEmployeeInfo(selected);
  };
  const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] =
    getAllBranch();
  const [allSkuStatus, allSkuReFetch, allSku, allSkuError] =
    getAllSKUForSelect();

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      return valueForEdit;
    }, [valueForEdit]),
  });

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
    allEmployee?.data?.body?.data?.data?.map((item) => {
      const set_data = {
        value: item.id,
        label: item?.full_name,
      };
      setEmployee((prevEmployee) => [...prevEmployee, set_data]);
    });
  }, [allEmployee]);

  useEffect(() => {
    // setIsLoading(true);
    reset();
    const allProduct = allSku?.data?.body?.data;

    let finalArray = [];
    allProduct?.map((item) => {
      let initialObj = {
        id: item.id,
        label: `${item.name} > ${item.sku} > ${item.category_name} > ${item.brand_name} > ${item.model_name}`,
      };

      finalArray.push(initialObj);
    });

    const filterProduct = finalArray.find(
      (item) => (item.id = valueForEdit?.sku_id)
    );

    setSelectedProduct(filterProduct);

    setData(finalArray);

    setDate(
      valueForEdit?.date_s_g
        ? valueForEdit?.date_s_g
        : moment(new Date()).format("YYYY-MM-DD")
    );
    const allBranchs = allBranch?.data?.body?.data?.data;
    setBranch(allBranchs);
    const selected = allBranchs?.find(
      (item) => item?.id == valueForEdit?.branch_id
    );
    setSelectedBranch(selected);

    const selectAuditMember = employee?.find(
      (item) => item?.value == valueForEdit?.audit_by_s
    );
    // const selectAuditMember = employee?.find(
    //     (item) => console.log('item',item)
    //   );
    setSelectedUser(selectAuditMember);

    console.log("employeeInfo", employeeInfo);
    console.log("selectAuditMember", selectAuditMember);

    // setIsLoading(false);
  }, [allBranch, valueForEdit, allSku]);

  const onSubmit = async (data) => {
    data.branch_id = selectedBranch?.id;
    data.date = date;
    data.batch_no = valueForEdit?.batch_s;
    data.sku_id = selectedProduct.id;
    axios
      .put(
        `/inventory-management/stock/reconciliation/update/${valueForEdit?.batch_s}`,
        data
      )
      .then((info) => {
        if (info?.status == 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Update Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          allOpeningStockReFetch();
          setValueForEdit({});
          toggle();
        }
        reFetch();
      })
      .catch((e) => {
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
            title: `${e?.response?.data?.body?.message?.details?.[0].message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  //   console.log("valueForEdit-------", valueForEdit);

  return (
    <>
      {selectedBranch ? (
        <BaseModal
          title={"Edit Product Reconciliation"}
          dataModal={modal}
          dataToggle={toggle}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="branch"
                value={selectedBranch}
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
                    {...register("branch_id")}
                  />
                )}
              />
              {errors.branch && (
                <span style={{ fontSize: "10px" }}>
                  {errors.branch.message}
                </span>
              )}
            </div>
            <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="Select product"
                value={selectedProduct}
                options={data}
                // getOptionLabel={(option) => option ? option?.name : ''}
                onChange={(event, value) => {
                  setSelectedProduct(value);
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
                    {...register("sku_id")}
                  />
                )}
              />
              {errors.branch && (
                <span style={{ fontSize: "10px" }}>
                  {errors.branch.message}
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
                  value={valueForEdit?.batch_s}
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
                  <span style={{ fontSize: "10px" }}>
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
                  defaultValue={valueForEdit?.system_stock_quantity_s}
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
                  <span style={{ fontSize: "10px" }}>
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
                  label={"Physical Qty"}
                  defaultValue={valueForEdit?.physical_quantity_s}
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
                  <span style={{ fontSize: "10px" }}>
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
                  defaultValue={valueForEdit?.adjust_quantity_s}
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
                {errors.adjust_qty && (
                  <span style={{ fontSize: "10px" }}>
                    {errors.adjust_qty.message}
                  </span>
                )}
              </div>{" "}
              <div>
                <TextField
                  variant="outlined"
                  fullWidth
                  autoComplete="off"
                  size="small"
                  type={"text"}
                  label={"Remarks"}
                  defaultValue={valueForEdit?.remarks_s}
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
                  <span style={{ fontSize: "10px" }}>
                    {errors.remarks.message}
                  </span>
                )}
              </div>
              <div style={{ marginTop: "15px" }}>
                {/* <Select
                  // labelName={"Employee Name"}
                  defaultValue={check}
                  placeholder={"Select an option"}
                  options={employee}
                  setValue={setEmployeeInfo}
                  cngFn={handleChangeForUpdateStatus}
                /> */}

                <div>
                  <Autocomplete
                    disablePortal
                    size={"small"}
                    id="Audit By"
                    value={selectedUser}
                    options={employee}
                    // getOptionLabel={(option) => (option ? option?.name : "")}
                    onChange={(event, value) => {
                      setSelectedUser(value);
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
                        label="audit_by"
                        {...register("audit_by")}
                      />
                    )}
                  />
                  {errors.audit_by && (
                    <span style={{ fontSize: "10px" }}>
                      {errors.audit_by.message}
                    </span>
                  )}
                </div>
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
        </BaseModal>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ProductReconciliation;
