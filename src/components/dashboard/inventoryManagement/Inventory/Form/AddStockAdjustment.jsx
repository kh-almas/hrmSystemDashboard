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
import getAllSKUForSelect from "../../../../common/Query/inventory/GetAllSKUForSelect";
import GetAllStockAdjustment from "../../../../common/Query/inventory/GetAllStockAdjustment";
import Breadcrumb from "../../../../common/breadcrumb";
import GetAllProductForSelect from "../../../../common/Query/inventory/GetAllProductForSelect";
import AddStockAdjustmentModal from "./AddStockAdjustmentModal";

const AddStockAdjustment = () => {
  const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = getAllBranch();
  const [allProductStatus, allProductReFetch, allProduct, allProductError] = GetAllProductForSelect();
  const [allSkuStatus, allSkuReFetch, allSku, allSkuError] = getAllSKUForSelect();

  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [serialKeys, setSerialKeys] = useState([]);
  const updateToggle = () => {
    setModal(!modal);
  };

  const [formData, setFormData] = useState({
    date: moment(new Date()).format("YYYY-MM-DD"),
    branch_id: "",
    purpose: "General",
    product: [],
  });

  const [productFormData, setProductFormData] = useState({
    hasSerialKey: [],
    manufactureDate: "",
    expireDate: "",
    sku: "",
    sku_id: "",
    product_id: "",
    qty: "",
    batchNo: "",
  });

  // useEffect(() => {
  //   console.log('formData', formData)
  // }, [formData]);

  const addProductInfo = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      product: [
        ...prevFormData.product,
        productFormData
      ],
    }));

    setProductFormData({
      hasSerialKey: [],
      manufactureDate: "",
      expireDate: "",
      sku: "",
      sku_id: "",
      product_id: "",
      qty: "",
    })
    setQuantity('');
    setSerialKeys([]);


    // console.log('productFormData', productFormData);
  }
  console.log('formData', formData);

  const [selectedBranch, setSelectedBranch] = useState({});
  const [data, setData] = React.useState([]);
  const [productData, setProductData] = React.useState([]);
  const [branch, setBranch] = useState([]);
  const [purpose, setPurpose] = useState([
    { id: "General", label: "General" },
    { id: "Reconciliation", label: "Reconciliation" },
  ]);
  const [selectedPurpose, setSelectedPurpose] = useState({ id: "General", label: "General" });
  const [sku, setSku] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [date, setDate] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  useEffect(() => {
    if (sku.id) {
      setModal(true);
    }
  }, [sku]);


  useEffect(() => {
    setDate(moment(new Date()).format("YYYY-MM-DD"));
  }, []);

  const onSubmit = (data) => {
    data.branch_id = selectedBranch?.id;
    data.sku_id = sku?.id;
    data.purpose_type = selectedPurpose?.id;
    data.date = date;

    axios
      .post("inventory-management/stock/adjustment/add", data)
      .then((info) => {
        if (info?.status == 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
       
          setSku("");
          setSelectedBranch('');
          setSelectedPurpose("");
          setPurpose("");
          reset();
        
        }
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
    const allproducts = allProduct?.data?.body?.data;

    let finalArray = [];
    allproducts?.map((item) => {
      let initialObj = {
        id: item.id,
        label: `${item.name} > ${item.sku} > ${item.category_name} > ${item.brand_name} > ${item.model_name}`,
      };

      finalArray.push(initialObj);
    });

    setProductData(finalArray);
  }, [allProduct]);

  useEffect(() => {
    if(selectedProduct.id){
      const allSkus = allSku?.data?.body?.data;

      let finalArray = [];
      allSkus?.map((item) => {
        if (item.product_id == selectedProduct.id) {
          let initialObj = {
            id: item.id,
            productId: item.product_id,
            hasBatch: item.hasBatch,
            hasExpired: item.hasExpired,
            hasSerialKey: item.hasSerialKey,
            sku: item.sku,
            label: `${item.sku} > ${item.name} > ${item.category_name} > ${item.brand_name} > ${item.model_name}`,
          };

          finalArray.push(initialObj);
        }
      });

      setData(finalArray);
    }

  }, [allSku, selectedProduct]);

  return (
    <>
      <Breadcrumb parent="Inventory management" title="Add Stock Adjustment" />
      <div className="p-30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Autocomplete
                size={"small"}
                id="purpose"
                options={purpose}
                defaultValue={selectedPurpose}
                onChange={(event, value) => {
                  setSelectedPurpose(value);
                  setFormData({...formData, purpose: value?.id});

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
                        label="Purpose type"
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
          {selectedPurpose?.id === "General" ? (
              <>
                <div className="row row-cols-1 row-cols-lg-2">
                  <div>
                    <Autocomplete
                        disablePortal
                        size={"small"}
                        id="branch"
                        options={branch}
                        getOptionLabel={(option) => (option ? option?.name : "")}
                        onChange={(event, value) => {
                          setSelectedBranch(value);
                          setFormData({...formData, branch_id: value?.id});
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
                        <span style={{fontSize: "10px", color: "red"}}>{errors.branch_id.message}</span>)}
                  </div>

                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                          label="Date"
                          slotProps={{textField: {size: "small"}}}
                          value={dayjs(date)}
                          onChange={(newValue) => {
                            setDate(moment(newValue.$d).format("YYYY-MM-DD"));
                            setFormData({
                              ...productFormData,
                              date: moment(newValue.$d).format(
                                  "YYYY-MM-DD"
                              ),
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
                        <span style={{fontSize: "10px", color: "red"}}>
                        {errors.date.message}
                      </span>
                    )}
                  </div>
                </div>


                <div>
                  <Autocomplete
                      disablePortal
                      size={"small"}
                      id="Select product"
                      options={productData}
                      onChange={(event, value) => {
                        setSelectedProduct(value);
                        setData({});
                        setSku({});
                        setProductFormData({...productFormData, product_id: value?.id});
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
                              label="Select product"
                              {...register("product", {
                                required: "This field is required",
                              })}
                          />
                      )}
                  />
                  {errors?.product && (
                      <span style={{fontSize: "10px", color: "red"}}>
                      {errors?.product?.message}
                    </span>
                  )}
                </div>

                <div>
                  <Autocomplete
                      disablePortal
                      size={"small"}
                      id="Select Sku"
                      options={data}
                      value={sku}
                      getOptionLabel={(option) => option.label ? option?.label : ''}
                      onChange={(event, value) => {
                        setSku(value);
                        setProductFormData({...productFormData, sku_id: value?.id, sku: value?.sku});
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
                              label="Select product"
                              {...register("sku_id", {
                                required: "This field is required",
                              })}
                          />
                      )}
                  />
                  {errors?.sku_id && (
                      <span style={{fontSize: "10px", color: "red"}}>
                      {errors?.sku_id?.message}
                    </span>
                  )}
                </div>

                <div className={"card mt-3"}>
                  <div className="card-block row">
                    <div className="col-sm-12 col-lg-12 col-xl-12">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="table-border">
                          <tr>
                            <th scope="col">{"SKU"}</th>
                            <th scope="col">{"Quantity"}</th>
                            <th scope="col">{"Batch No"}</th>
                            <th scope="col">{"Manufacture Date"}</th>
                            <th scope="col">{"Expire Date"}</th>
                            <th scope="col">{"Action"}</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            formData?.product?.map((item, index) =>
                                <tr key={index}>
                                  <td>{item.sku}</td>
                                  <td>{item.qty}</td>
                                  <td>{item.batchNo}</td>
                                  <td>{item.manufactureDate}</td>
                                  <td>{item.expireDate}</td>
                                </tr>
                            )
                          }

                          </tbody>
                        </table>
                      </div>
                    </div>
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
              </>
          ) : ("")}
          <AddStockAdjustmentModal
              modal={modal}
              setModal={setModal}
              toggle={updateToggle}
              sku={sku}
              setQuantity={setQuantity}
              quantity={quantity}
              setProductFormData={setProductFormData}
              productFormData={productFormData}
              addProductInfo={addProductInfo}
              serialKeys={serialKeys}
              setSerialKeys={setSerialKeys}
          ></AddStockAdjustmentModal>
        </form>
      </div>
    </>
  );
};

export default AddStockAdjustment;
