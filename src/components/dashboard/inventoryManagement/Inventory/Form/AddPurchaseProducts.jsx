import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FormControlLabel, Checkbox } from "@mui/material";
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
import getAllSKUForSelect from "../../../../common/Query/inventory/GetAllSKUForSelect";
import PurchaseProductModal from "./PurchaseProductModal";
import GetAllSupplier from "../../../../common/Query/inventory/GetAllSupllier";

const AddPurchaseProducts = ({
  allProductDiscountReFetch,
  setShowFromForAdd,
}) => {
  const [selectedBranch, setSelectedBranch] = useState({});
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [batchNo, setBatchNo] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");
  const [data, setData] = React.useState([]);
  const [branch, setBranch] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [hasLc, setHasLc] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [refNo, setRefNo] = useState("");
  const [reqNo, setReqNo] = useState("");
  const [shippingAdd, setShippingAdd] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [totalDiscount, setTotalDiscount] = useState("");
  const [totalVat, setTotalVat] = useState("");
  const [otherCost, setOtherCost] = useState("");

  const [attachedDocument, setAttachedDocument] = useState(null);

  const status = [
    { name: "Received", id: "Received" },
    { name: "Partial", id: "Partial" },
    { name: "Pending", id: "Pending" },
    { name: "Ordered", id: "Ordered" },
  ];
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [purchaseStatus, setPurchaseStatus] = useState("Pending");
  const [sku, setSku] = useState({});
  const [formData, setFormData] = useState({
    branch_id: "",
    date: "",
    supplier_id: "",
    invoice_no: "",
    ref_no: "",
    req_no: "",
    has_lc: 0,
    shipping_add: "",
    total_qty: "",
    total_price: "",
    total_discount: "",
    total_vat: "",
    purchase_status: "Pending",
    payment_status: "Pending",
    hasSerialKey: [],
    manufactureDate: "",
    expireDate: "",
    file: null,
  });

  const [date, setDate] = useState("");
  const [discountType, setDiscountType] = useState([
    { id: "Percent", label: "Percent" },
    { id: "Fixed", label: "Fixed" },
  ]);
  const [selectedDiscountType, setSelectedDiscountType] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    const discountAmount = (sellingPrice * discountPercent) / 100;

    setDiscountValue(discountAmount);
  }, [discountPercent, sellingPrice]);

  //   console.log("sellingPrice----", sellingPrice);
  //   console.log("discountPercent----", discountPercent);
  // console.log("discountValue----", discountValue);

  const [modal, setModal] = useState(false);
  const updateToggle = () => {
    setModal(!modal);
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

  const [allSupplier, allSupplierReFetch] = GetAllSupplier();

  // console.log("allSupplier", allSupplier)

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
    data.sku_id = sku.id;

    console.log("data", formData);

    // axios
    //   .post("/inventory-management/product/discount/add", data)
    //   .then((info) => {
    //     if (info?.status == 200) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Your work has been saved",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       // allOpeningStockReFetch();
    //       // reset();
    //       // // setSelectedBranch({});
    //       // setDate(moment(new Date()).format('YYYY-MM-DD'));
    //       const batchNo = generateSkuCode(12);
    //       setBatchNo(batchNo);
    //       allProductDiscountReFetch();
    //       setDiscountType("");
    //       setSelectedBranch({});
    //       setDiscountType([]);
    //       setDiscountValue(0);
    //       setSelectedDiscountType("");
    //       setShowFromForAdd(false);
    //       // const uniqueId = generateSkuCode(8);
    //       // setUniqueKey(uniqueId);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log("e-------", e);
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

  // const [supplierOptions, setSUpplierOptions] = useState([])
  // useEffect(() => {
  //   allSupplier?.map((item)=>{
  //     setSUpplierOptions((prev)=>[...prev, {item?.id,item?.name:}])
  //   })
  // }, [allSupplier]);

  useEffect(() => {
    const allProduct = allSku?.data?.body?.data;
    let finalArray = [];
    allProduct?.map((item) => {
      let initialObj = {
        hasSerialKey: item?.hasSerialKey,
        hasExpired: item?.hasExpired,
        hasBatch: item?.hasBatch,
        id: item.id,
        label: `${item.name} > ${item.sku} > ${item.category_name} > ${item.brand_name} > ${item.model_name}`,
      };

      finalArray.push(initialObj);
    });

    setData(finalArray);
  }, [allSku]);

  useEffect(() => {
    if (
      sku?.hasSerialKey == 1 ||
      sku?.hasSerialKey == 2 ||
      sku?.hasSerialKey == 0
    ) {
      console.log("updateToggle");
      setModal(true);
    }
  }, [sku?.hasSerialKey]);

  return (
    <>
      <div className="p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
            {/* Date */}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                <DatePicker
                  label="Date"
                  slotProps={{ textField: { size: "small" } }}
                  value={dayjs(date)}
                  onChange={(newValue) => {
                    setDate(moment(newValue.$d).format("YYYY-MM-DD"));
                    setFormData({
                      ...formData,
                      date: moment(newValue.$d).format("YYYY-MM-DD"),
                    });
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
                  setFormData({ ...formData, branch_id: value.id });
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

            {/* batchNo */}
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

            {/* Discount Type */}
            {/* <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="discountType"
                options={discountType}
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
            {selectedDiscountType?.label == "Percent" && (
              <>
                <div>
                  <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    type={"number"}
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

            {/* Supplier */}
            <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="supplier"
                options={allSupplier}
                getOptionLabel={(option) => (option ? option?.name_s : "")}
                onChange={(event, value) => {
                  setSelectedSupplier(value);
                  setFormData({ ...formData, supplier_id: value.id });
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

            {/* Purchase Price */}
            {/* <div>
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
            </div> */}

            {/* Selling Price */}
            {/* <div>
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
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.selling_price.message}
                </span>
              )}
            </div> */}

            {/* Invoice No */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type="text"
                value={invoiceNo}
                onChange={(e) => {
                  setInvoiceNo(e.target.value);
                  setFormData({ ...formData, invoice_no: e.target.value });
                }}
                label="Invoice no"
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

            {/* Ref No */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type="text"
                value={refNo}
                onChange={(e) => {
                  setRefNo(e.target.value);
                  setFormData({ ...formData, ref_no: e.target.value });
                }}
                label="Ref no"
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

            {/* Req No */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type="text"
                value={reqNo}
                onChange={(e) => {
                  setReqNo(e.target.value);
                  setFormData({ ...formData, req_no: e.target.value });
                }}
                label="Req no"
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

            {/* Shipping Address */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type="text"
                value={shippingAdd}
                onChange={(e) => {
                  setShippingAdd(e.target.value);
                  setFormData({ ...formData, shipping_add: e.target.value });
                }}
                label="Shipping Address"
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

            {/* HasLc */}
            <div>
              <FormControlLabel
                sx={{
                  marginTop: 1,
                }}
                checked={hasLc}
                onChange={() => {
                  setHasLc(!hasLc);
                  setFormData({ ...formData, has_lc: hasLc });
                }}
                control={<Checkbox defaultChecked />}
                label="Has License"
              />
            </div>

            {/* Total Quantity */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type="text"
                value={totalQuantity}
                onChange={(e) => {
                  setTotalQuantity(e.target.value);
                  setFormData({ ...formData, total_qty: e.target.value });
                }}
                label="Total Quantity"
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

            {/* Total Price */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type="text"
                value={formData?.total_price}
                onChange={(e) => {
                  setTotalPrice(e.target.value);
                  setFormData({ ...formData, total_price: e.target.value });
                }}
                label="Total Price"
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

            {/* Total Discount */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type="text"
                value={formData?.total_discount}
                onChange={(e) => {
                  setTotalDiscount(e.target.value);
                  setFormData({ ...formData, total_discount: e.target.value });
                }}
                label="Total Discount"
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

            {/* Total Vat */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type="text"
                value={formData?.total_vat}
                onChange={(e) => {
                  setTotalVat(e.target.value);
                  setFormData({ ...formData, total_vat: e.target.value });
                }}
                label="Total Vat"
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

            {/* Other Cost */}
            <div>
              <TextField
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                type="text"
                value={formData?.other_cost}
                onChange={(e) => {
                  setOtherCost(e.target.value);
                  setFormData({ ...formData, other_cost: e.target.value });
                }}
                label="Other Cost"
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

            {/* File */}
            <div>
              <label htmlFor="file-upload"></label>
              <input
                id="file-upload"
                accept="image/*"
                type="file"
                onChange={(e) => {
                  setAttachedDocument({
                    ...attachedDocument,
                    file: e.target.files[0],
                  });
                  setFormData({ ...formData, file: e.target.files[0] });
                }}
                className=" mt-3 w-100 border py-2 px-2"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
              />
            </div>

            {/* Payment Status */}
            <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="Payment Status"
                options={status}
                getOptionLabel={(option) => (option ? option?.name : "")}
                onChange={(event, value) => {
                  setPaymentStatus(value);
                  setFormData({ ...formData, payment_status: value.id });
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
                    value={formData?.purchase_status}
                    label="Select Payment Status"
                    {...register("payment_status", {
                      required: "This field is required",
                    })}
                  />
                )}
              />
            </div>

            {/* Purchase Status */}
            <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="Purchase Status"
                options={status}
                getOptionLabel={(option) => (option ? option?.name : "")}
                onChange={(event, value) => {
                  console.log("value", value);
                  setPurchaseStatus(value);
                  setFormData({ ...formData, purchase_status: value?.id });
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
                    value={formData?.purchase_status}
                    label="Select Purchase Status"
                    {...register("purchase_status", {
                      required: "This field is required",
                    })}
                  />
                )}
              />
            </div>
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
                setFormData({ ...formData, sku_id: value?.id });
              }}
              value={sku?.label}
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

          <div className="d-flex justify-content-center align-items-center mt-3">
            <Button
              type="submit"
              className="me-2 btn btn-pill btn-info btn-air-info btn-info-gradien px-4"
            >
              Submit
            </Button>
          </div>
        </form>
        {modal && (
          <PurchaseProductModal
            batchNo={batchNo}
            modal={modal}
            setModal={setModal}
            toggle={updateToggle}
            totalQuantity={totalQuantity}
            setTotalQuantity={setTotalQuantity}
            sku={sku}
            setFormData={setFormData}
            formData={formData}
          />
        )}
      </div>
    </>
  );
};

export default AddPurchaseProducts;
