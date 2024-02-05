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

const EditPurchaseProducts = ({
  modal,
  toggle,
  reFetch,
  valueForEdit,
  allProductDiscountReFetch,
  setValueForEdit,
}) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [branch, setBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [data, setData] = React.useState([]);
  const [date, setDate] = useState("");

  const [discountType, setDiscountType] = useState([
    { id: "Percent", label: "Percent" },
    { id: "Fixed", label: "Fixed" },
  ]);
  const [selectedDiscountType, setSelectedDiscountType] = useState("");
  const [sellingPrice, setSellingPrice] = useState();
  const [discountPercent, setDiscountPercent] = useState();
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    const discountAmount = (sellingPrice * discountPercent) / 100;

    setDiscountValue(discountAmount);
  }, [discountPercent, sellingPrice]);

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

    const selectDiscount = discountType?.find(
      (item) => item?.id == valueForEdit?.discount_type_s
    );
    setSelectedDiscountType(selectDiscount);
    setDiscountValue(valueForEdit?.discount_value_s);
    setDiscountPercent(valueForEdit?.discount_percent_s);
    setSellingPrice(valueForEdit?.selling_price_s);

    if (selectedDiscountType?.id == "Fixed") {
      setDiscountValue(0);
      setDiscountPercent(0);
    }

  }, [allBranch, valueForEdit, allSku, discountType]);

  const onSubmit = async (data) => {
    data.branch_id = selectedBranch?.id;
    data.date = date;
    data.batch_no = valueForEdit?.batch_s;
    data.sku_id = selectedProduct.id;
    data.discount_value = discountValue ? discountValue : 0;
    data.approve_status = "Approved";
    axios
      .put(
        `/inventory-management/product/discount/update/${valueForEdit?.primary_id}`,
        data
      )
      .then((info) => {
        if (info?.status == 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          allProductDiscountReFetch();
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

  return (
    <>
      {selectedBranch ? (
        <BaseModal
          title={"Edit opening stock"}
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

              {/* <div>
                <Autocomplete
                  disablePortal
                  size={"small"}
                  id="discountType"
                  options={discountType}
                  defaultValue={valueForEdit?.discount_type_s}
                  getOptionLabel={(option) => (option ? option?.id : "")}
                  onChange={(event, value) => {
                    setSelectedDiscountType(value);
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
                      label="Discount Type"
                      {...register("discount_type", {
                        required: "This field is required",
                      })}
                    />
                  )}
                />
                {errors.discount_type && (
                  <span style={{ fontSize: "10px", color: "red" }}>
                    {errors.discount_type.message}
                  </span>
                )}
              </div> */}

              <div>
                <Autocomplete
                  disablePortal
                  size={"small"}
                  id="discountType"
                  options={discountType}
                  defaultValue={valueForEdit?.discount_type_s}
                  // getOptionLabel={(option) => (option ? option?.id : "")}
                  onChange={(event, value) => {
                    setSelectedDiscountType(value);
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
                      label="Discount Type "
                      {...register("discount_type", {
                        required: "This field is required",
                      })}
                    />
                  )}
                />
                {errors?.discount_type && (
                  <span style={{ fontSize: "10px", color: "red" }}>
                    {errors?.discount_type?.message}
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
                  defaultValue={valueForEdit?.purchase_price_s}
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
                  <span style={{ fontSize: "10px" }}>
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
                  defaultValue={valueForEdit?.selling_price_s}
                  {...register("selling_price", {
                    required: "This field is required",
                  })}
                  onChange={(e) => {
                    setSellingPrice(e.target.value);
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
                  <span style={{ fontSize: "10px" }}>
                    {errors.selling_price.message}
                  </span>
                )}
              </div>

              {selectedDiscountType?.id == "Percent" && (
                <>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      autoComplete="off"
                      size="small"
                      type={"number"}
                      defaultValue={valueForEdit?.discount_percent_s}
                      label={"Discount Percent"}
                      {...register("discount_percent", {
                        required: "This field is required",
                      })}
                      onChange={(e) => {
                        setDiscountPercent(e.target.value);
                        clearErrors(["discount_percent"]);
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
                    {errors.discount_percent && (
                      <span style={{ fontSize: "10px", color: "red" }}>
                        {errors.discount_percent.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      autoComplete="off"
                      disabled
                      size="small"
                      type={"number"}
                      label={"Discount Value"}
                      // {...register("discount_value", {
                      //   required: "This field is required",
                      // })}
                      value={discountValue}
                      onChange={(e) => {
                        clearErrors(["discount_value"]);
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
                    {/* {errors.discount_value && (
  <span style={{ fontSize: "10px", color: "red" }}>
    {errors.discount_value.message}
  </span>
)} */}
                  </div>
                </>
              )}
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

export default EditPurchaseProducts;
