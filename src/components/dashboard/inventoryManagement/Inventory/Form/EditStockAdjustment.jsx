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
import getAllSKUForSelect from "../../../../common/Query/inventory/GetAllSKUForSelect";
import BaseModal from "../../../../common/modal/BaseModal";

const EditStockAdjustment = ({
  modal,
  toggle,
  reFetch,
  valueForEdit,
  allStockAdjustmentReFetch,
  setValueForEdit,
}) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [branch, setBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState({});
  const [purpose, setPurpose] = useState([
    { id: "General", label: "General" },
    { id: "Reconciliation", label: "Reconciliation" },
  ]);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [data, setData] = React.useState([]);
  const [date, setDate] = useState("");
  const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] =
    getAllBranch();
  const [allSkuStatus, allSkuReFetch, allSku, allSkuError] =
    getAllSKUForSelect();

  useEffect(() => {
    console.log('selectedPurpose', selectedPurpose)
  }, [selectedPurpose]);

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
      (item) => (item.id = valueForEdit?.ref_id)
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

    const selectPurpose = purpose?.find(
      (item) => item?.id == valueForEdit?.purpose_type_s_g
    );
    // console.log('selectPurpose', selectPurpose)
    setSelectedPurpose(selectPurpose);

    // setIsLoading(false);
  }, [allBranch, valueForEdit, allSku, purpose]);

  const onSubmit = async (data) => {
    data.branch_id = selectedBranch?.id;
    data.date = date;
    data.purpose_type = selectedPurpose?.id;
    data.ref_id = selectedProduct.id;

    // console.log("datdaaaa", data);

    axios
      .put(
        `/inventory-management/stock/adjustment/update/${valueForEdit?.primary_id}`,
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
          allStockAdjustmentReFetch();
          setValueForEdit({});
          toggle();
        }
        reFetch();
      })
      .catch((e) => {
        console.log("e---------", e);
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

  return (
    <>
      {selectedPurpose ? (
        <BaseModal
          title={"Edit Stock Adjustment"}
          dataModal={modal}
          dataToggle={toggle}
        >
          <form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <Autocomplete
                  readOnly
                  size={"small"}
                  id="purpose"
                  options={purpose}
                  defaultValue={selectedPurpose}
                  // getOptionLabel={(option) => (option ? option?.id : "")}
                  onChange={(event, value) => {
                    setSelectedPurpose(value);
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
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          label="Purpose type "
                          {...register("purpose_type")}
                      />
                  )}
              />
              {errors?.purpose_type && (
                  <span style={{fontSize: "10px", color: "red"}}>
                    {errors?.purpose_type?.message}
                  </span>
              )}
            </div>
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
              {errors?.branch && (
                  <span style={{fontSize: "10px"}}>
                  {errors?.branch.message}
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
                          {...register("ref_id")}
                      />
                  )}
              />
              {errors.ref_id && (
                  <span style={{fontSize: "10px"}}>
                  {errors.ref_id.message}
                </span>
              )}
            </div>
            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                  <DatePicker
                      label="Date"
                      slotProps={{textField: {size: "small"}}}
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
                    <span style={{fontSize: "10px"}}>
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
                    type={"text"}
                    label={"Quantity"}
                    defaultValue={valueForEdit?.total_qty_s}
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
                {errors?.total_qty && (
                    <span style={{fontSize: "10px"}}>
                    {errors.total_qty.message}
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
                    label={"Total price"}
                    defaultValue={valueForEdit?.total_price_s}
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
                    <span style={{fontSize: "10px"}}>{errors.total_price.message}</span>
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
                    defaultValue={valueForEdit?.total_discount_s}
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
                    <span style={{fontSize: "10px"}}>
                    {errors.total_discount.message}
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
                    label={"Other Cost"}
                    defaultValue={valueForEdit?.other_cost_s}
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
                    <span style={{fontSize: "10px"}}>
                    {errors.other_cost.message}
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
                    label={"Total Vat"}
                    defaultValue={valueForEdit?.total_vat_s}
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
                    <span style={{fontSize: "10px"}}>
                    {errors.total_vat.message}
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
        </BaseModal>
      ) : (
          <div></div>
      )}
    </>
  );
};

export default EditStockAdjustment;
