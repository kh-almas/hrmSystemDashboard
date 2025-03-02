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
import StockTransferModal from "./StockTransferModal";

const EditStockTransfer = ({ allStockTransferReFetch, setShowFromForAdd }) => {
  const [modal, setModal] = useState(false);
  const [selectedFromBranch, setSelectedFromBranch] = useState({});
  const [selectedToBranch, setSelectedToBranch] = useState({});
  const [batchNo, setBatchNo] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");
  const [quantity, setQuantity] = useState("");
  const [data, setData] = React.useState([]);
  const [branch, setBranch] = useState([]);
  const [requisition, setRequisition] = useState([
    { name: "requisition1", id: 1 },
    { name: "requisition2", id: 2 },
  ]);
  const [sku, setSku] = useState({});
  const [date, setDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    deliveryDate: "",
    deliveryStatus: "0",
    hasSerialKey: [],
    manufactureDate: "",
    expireDate: "",
    fromBranch_id: "",
    toBranch_id: "",
    requisition_id: "",
    sku_id: "",
    qty: "",
    purchase_status: "",
    file: null,
  });

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
    // console.log("dateeeeee-------",data);
    // console.log("dateeeeee-------",date);
    // data.fromBranch_id = selectedFromBranch?.id;
    // data.date = date;
    // data.batch_no = batchNo;
    // data.sku_id = sku.id;

    // setFormData(data);

    console.log("formddadaddaadaaa--", formData);

    // axios
    //   .post("/inventory-management/stock/opening/add", formData)
    //   .then((info) => {
    //     if (info?.status == 200) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Your work has been saved",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       // allStockTransferReFetch();
    //       // reset();
    //       // // setSelectedFromBranch({});
    //       // setDate(moment(new Date()).format('YYYY-MM-DD'));
    //       const batchNo = generateSkuCode(12);
    //       setBatchNo(batchNo);
    //       allStockTransferReFetch();
    //       setShowFromForAdd(false);
    //       // const uniqueId = generateSkuCode(8);
    //       // setUniqueKey(uniqueId);
    //     }
    //   })
    //   .catch((e) => {
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
    let finalArray = [];
    allProduct?.map((item) => {
      // console.log("item", item);
      let initialObj = {
        hasSerialKey: item?.hasSerialKey,
        hasExpired: item?.hasExpired,
        hasBatch: item?.hasBatch,
        id: item.id,
        label: `${item?.name} > ${item?.sku} > ${item?.category_name} > ${item?.brand_name} > ${item?.model_name}`,
      };

      finalArray.push(initialObj);
    });

    setData(finalArray);
  }, [allSku]);

  useEffect(() => {
    if (
      (sku?.hasSerialKey == 1 ||
        sku?.hasSerialKey == 2 ||
        sku?.hasBatch == 1 ||
        sku?.hasExpired == 1) &&
      formData?.qty
    ) {
      setModal(true);
    }
  }, [formData?.qty, sku?.hasBatch, sku?.hasExpired, sku?.hasSerialKey]);

  const updateToggle = () => {
    setModal(!modal);
  };

  console.log("formData", formData);

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
                setSelectedFromBranch(value);
                setFormData({ ...formData, fromBranch_id: value.id });
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
                  label="From Branch"
                  {...register("fromBranch_id", {
                    required: "This field is required",
                  })}
                />
              )}
            />
            {errors.fromBranch_id && (
              <span style={{ fontSize: "10px", color: "red" }}>
                {errors.fromBranch_id.message}
              </span>
            )}
          </div>
          <div>
            <Autocomplete
              disablePortal
              size={"small"}
              id="toBranch_id"
              options={branch}
              getOptionLabel={(option) => (option ? option?.name : "")}
              onChange={(event, value) => {
                setSelectedToBranch(value);
                setFormData({ ...formData, toBranch_id: value.id });
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
                  label="To Branch"
                  {...register("toBranch_id", {
                    required: "This field is required",
                  })}
                />
              )}
            />
            {errors.toBranch_id && (
              <span style={{ fontSize: "10px", color: "red" }}>
                {errors.toBranch_id.message}
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
              value={quantity}
              {...register("qty", {
                required: "This field is required",
              })}
              onChange={(e) => {
                setQuantity(e.target.value);
                setFormData({ ...formData, qty: e.target.value });
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

          <div className="row row-cols-1 row-cols-lg-2">
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
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                <DatePicker
                  label="Delivery Date"
                  slotProps={{ textField: { size: "small" } }}
                  value={dayjs(date)}
                  onChange={(newValue) => {
                    setDeliveryDate(moment(newValue.$d).format("YYYY-MM-DD"));
                    setFormData({
                      ...formData,
                      deliveryDate: moment(newValue.$d).format("YYYY-MM-DD"),
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

              {errors.deliveryDate && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.deliveryDate.message}
                </span>
              )}
            </div>
            <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="requisition_id"
                options={requisition}
                getOptionLabel={(option) => (option ? option?.name : "")}
                onChange={(event, value) => {
                  // setSelectedToBranch(value);
                  setFormData({ ...formData, requisition_id: value.id });
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
                    label="Requisition"
                    {...register("requisition_id", {
                      required: "This field is required",
                    })}
                  />
                )}
              />
              {errors.requisition_id && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.requisition_id.message}
                </span>
              )}
            </div>
            {/* <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="warehouse"
                options={warehouse}
                getOptionLabel={(option) => (option ? option?.name : "")}
                onChange={(event, value) => {
                  // setSelectedFromBranch(value);
                  setFormData({ ...formData, warehouse_id: value.id });
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
                    label="Warehouse"
                    {...register("warehouse", {
                      required: "This field is required",
                    })}
                  />
                )}
              />
              {errors.warehouse && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.warehouse.message}
                </span>
              )}
            </div> */}
            {/* <div>
              <Autocomplete
                disablePortal
                size={"small"}
                id="warehouse"
                options={supplier}
                getOptionLabel={(option) => (option ? option?.name : "")}
                onChange={(event, value) => {
                  // setSelectedFromBranch(value);
                  setFormData({ ...formData, supplier_id: value.id });
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
                    label="Supplier"
                    {...register("supplier", {
                      required: "This field is required",
                    })}
                  />
                )}
              />
              {errors.supplier && (
                <span style={{ fontSize: "10px", color: "red" }}>
                  {errors.supplier.message}
                </span>
              )}
            </div> */}
            
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
                  setFormData({ ...formData, remarks: e.target.value });
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
                  {errors.remarks.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="file-upload"></label>
              <input
                id="file-upload"
                accept="image/*"
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files[0] })
                }
                className=" mt-3 w-100 border py-2 px-2"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                }}
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

      {modal && (
        <StockTransferModal
          modal={modal}
          setModal={setModal}
          toggle={updateToggle}
          sku={sku}
          setQuantity={setQuantity}
          quantity={quantity}
          setFormData={setFormData}
          formData={formData}
        />
      )}
    </>
  );
};

export default EditStockTransfer;
