import React, {useEffect, useMemo, useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../../axios";
import imageUploader from "../../../../utilitis/imageUploader/imageUploader";
import Breadcrumb from "../../../common/breadcrumb";
import Submitbtn from "../../../common/button/Submitbtn";
import CkEditorComponent from "../../../common/modal/CkEditorComponent";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";

const EditContact = () => {
  const [item, setItem] = useState({});
  console.log('item', item?.name);
  const [type, setType] = useState("Supplier");
  const [note, setNote] = useState();
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const [payTermCondition, setPayTermCondition] = useState({});
  const [selectedContactTye, setSelectedContactTye] = useState({});



  const schema = yup
      .object({
        name: yup.string().required("Name is required"),
        business_name: yup.string().required("Business name is required"),
        tax_number: yup.string().required("tax number is required"),
        pay_term: yup.string().required("Pay term is required"),
        email: yup.string().required("Email is required"),
        mobile: yup.string().matches(/^[0-9]+$/, {message: "Please enter valid number.", excludeEmptyString: false}),
        alternate_contact_no: yup.string().matches(/^[0-9]+$/, {message: "Please enter valid number.", excludeEmptyString: false}),
        country: yup.string().required("Country is required"),
        state: yup.string().required("State is required"),
        city: yup.string().required("City is required"),
        address: yup.string().required("Address is required"),
        opening_balance: yup.number()
            .typeError("Opening balance must be a number")
            .positive("Opening balance should be a positive number" )
            .integer("Opening balance must be number")
            .required("Opening balance is required"),
      })
      .required()

  const {register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset} = useForm({
    resolver: yupResolver(schema),
    // defaultValues: useMemo(() => {
    //   return item;
    // }, [item]),
  });

  const payTermConditionValidation = (payTermCondition, fixedItem) => {
    const schema = yup.string()
        .oneOf(fixedItem, 'Invalid pay term condition')
        .required('Pay term condition is required');

    return schema.validate(payTermCondition, {abortEarly: false})
        .then(valid => ({isValid: true, errors: {}}))
        .catch(errors => ({isValid: false, errors}));
  }

  const processManualError = async (fieldName, value, fixedItem) => {
    const payTermConditionCheck = await payTermConditionValidation(value, fixedItem);
    clearErrors(fieldName);
    if (!payTermConditionCheck.isValid) {
      clearErrors(fieldName);
      setError(fieldName, {
        type: 'manual',
        message: payTermConditionCheck?.errors?.message,
      });

      return;
    }
  }

  const handleChangeForUpdatePayTermCondition = async (selected) => {
    await processManualError('pay_term_condition', selected?.value, ['Days', 'Months'])
    setPayTermCondition(selected);
  };

  const handleChangeForUpdateContactType = async (selected) => {
    await processManualError('contact_type', selected, ['supplier', 'customer'])
    setSelectedContactTye(selected);
  };

  const productType = [{value: "supplier", label: "Supplier"}, {value: "customer", label: "Customer"}]


  useEffect(() => {
    reset();
    // console.log(item?.contact_type)
    const filterContact = productType?.find(data => data.value == item?.contact_type)
    setSelectedContactTye(filterContact);
  }, [item])


  useEffect(() => {
    const getItem = async () => {
      try {
        const item = await axios.get(
          `inventory-management/contacts/${params.id}`
        );
        setItem(item?.data?.body?.data);
        // console.log(item);
        setNote(item?.data?.body?.data?.note);
        setImageUrl(item?.data?.body?.data?.image);
        reset();
      } catch (err) {
        console.log(err);
      }
    };
    getItem();
  }, [params.id, reset]);

  const [payTerm, setPayTerm] = useState([
    {value: "Days", label: "Days"},
    {value: "Months", label: "Months"}
  ])

  useEffect(() => {
    const filterStatus = payTerm?.find(data => data.value == item?.pay_term_condition)
    setPayTermCondition(filterStatus);
  }, [item])

  const submitUpdate = async (data) => {
    await processManualError('pay_term_condition', payTermCondition?.value, ['Days', 'Months'])
    await processManualError('contact_type', selectedContactTye?.value, ['supplier', 'customer'])
    data.contact_type = selectedContactTye?.value;
    data.note = note;
    data.pay_term_condition = payTermCondition?.value;

    const formData = new FormData();

    const appendToFormData = (obj) => {
      for (let key in obj){
        if (key === "image"){
          // formData.append(key, "img")
          formData.append(key, obj[key][0])
        }else{
          formData.append(key, obj[key])
        }
      }
    }

    appendToFormData(data);

    if(errors?.pay_term_condition?.type !== 'manual'){
      axios.put(`inventory-management/contacts/update-contact/${params.id}`, formData)
          .then(info => {
            if(info?.status == 200)
            {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
              // navigate(`/dashboard/inventory-management/contacts/supplier`);
              // toggle();
              // reset();
            }
            // reFetch();
          })
          .catch(e => {
            console.log(e)
            if(e?.response?.data?.body?.message?.errno == 1062){
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Can not duplicate name",
                showConfirmButton: false,
                timer: 1500
              });
            }else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${e?.response?.data?.body?.message?.details[0].message}`
              })
            }
          })
    }else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something is wrong",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  console.log('selectedContactTye', item)

  return (
    <>
      <Breadcrumb parent="Inventory management" title="Edit Contact" />
      <div className="card p-30">
        <form onSubmit={handleSubmit(submitUpdate)}>
          <div className="row row-cols-1 row-cols-lg-3 ">
            <div>
              <Select
                  placeholder={"Select a Product-Type"}
                  options={productType}
                  setValue={setSelectedContactTye}
                  cngFn={handleChangeForUpdateContactType}
                  error={errors['pay_term_condition']}
                  previous={selectedContactTye}
              />
            </div>
            {type === "Supplier" || type === "Customer" ? (
              <div>
                <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    type={"text"}
                    label={"Name"}
                    value={item?.name || ''}
                    {...register("name", {
                      required: "This field is required",
                    })}
                    onChange={(e) => {
                      clearErrors(["name"]);
                      setItem(prev => ({ ...prev, name: e.target.value })); //// solve the error from here
                      // item.name = e.target.value
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
                {errors?.name && (
                    <span style={{ fontSize: "10px" }}>
                    {errors.name.message}
                  </span>
                )}
              </div>
            ) : (
              ""
            )}

            <div>
              <Input
                  labelName={"Profile Picture"}
                  inputName={"profilePicture"}
                  inputType={"file"}
                  placeholder={"Profile Picture"}
                  validation={{
                    ...register("image"),
                  }}
                  error={errors?.image}
              />
            </div>

            {type === "Supplier" || type === "Customer" ? (
              <div>
                <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    type={"text"}
                    label={"Business Name"}
                    value={item?.business_name || ''}
                    {...register("business_name", {
                      required: "This field is required",
                    })}
                    onChange={(e) => {
                      clearErrors(["business_name"]);
                      setItem(prev => ({ ...prev, business_name: e.target.value })); //// solve the error from here
                      // item.name = e.target.value
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
                {errors?.business_name && (
                    <span style={{ fontSize: "10px" }}>
                    {errors.business_name.message}
                  </span>
                )}
              </div>
            ) : (
              ""
            )}

            {type === "Supplier" || type === "Customer" ? (
              <div>
                <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    type={"text"}
                    label={"Tax Number"}
                    value={item?.tax_number || ''}
                    {...register("tax_number", {
                      required: "This field is required",
                    })}
                    onChange={(e) => {
                      clearErrors(["tax_number"]);
                      setItem(prev => ({ ...prev, tax_number: e.target.value })); //// solve the error from here
                      // item.name = e.target.value
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
                {errors?.tax_number && (
                    <span style={{ fontSize: "10px" }}>
                    {errors.tax_number.message}
                  </span>
                )}
              </div>
            ) : (
              ""
            )}

            {type === "Supplier" || type === "Customer" ? (
              <div>
                <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    type={"text"}
                    label={"Opening Balance"}
                    value={item?.opening_balance || ''}
                    {...register("opening_balance", {
                      required: "This field is required",
                    })}
                    onChange={(e) => {
                      clearErrors(["opening_balance"]);
                      setItem(prev => ({ ...prev, opening_balance: e.target.value })); //// solve the error from here
                      // item.name = e.target.value
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
                {errors?.opening_balance && (
                    <span style={{ fontSize: "10px" }}>
                    {errors.opening_balance.message}
                  </span>
                )}
              </div>
            ) : (
              ""
            )}

            {type === "Supplier" || type === "Customer" ? (
              <div>
                <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    type={"text"}
                    label={"Pay Term"}
                    value={item?.pay_term || ''}
                    {...register("pay_term", {
                      required: "This field is required",
                    })}
                    onChange={(e) => {
                      clearErrors(["pay_term"]);
                      setItem(prev => ({ ...prev, pay_term: e.target.value })); //// solve the error from here
                      // item.name = e.target.value
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
                {errors?.pay_term && (
                    <span style={{ fontSize: "10px" }}>
                    {errors.pay_term.message}
                  </span>
                )}
              </div>
            ) : (
              ""
            )}

            <div>
              <Select
                  placeholder={"Select a pay_term_condition"}
                  options={payTerm}
                  setValue={payTermCondition}
                  cngFn={handleChangeForUpdatePayTermCondition}
                  error={errors['pay_term_condition']}
                  previous={payTermCondition}
              />
            </div>

            {type == "Supplier" || type === "Customer" ? (
              <div>
                <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    type={"email"}
                    label={"Email"}
                    value={item?.email || ''}
                    {...register("email", {
                      required: "This field is required",
                    })}
                    onChange={(e) => {
                      clearErrors(["email"]);
                      setItem(prev => ({ ...prev, email: e.target.value })); //// solve the error from here
                      // item.name = e.target.value
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
                {errors?.email && (
                    <span style={{ fontSize: "10px" }}>
                    {errors.email.message}
                  </span>
                )}
              </div>
            ) : (
              ""
            )}

            {type == "Supplier" || type === "Customer" ? (
              <div>
                <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    type={"text"}
                    label={"Mobile"}
                    value={item?.mobile || ''}
                    {...register("mobile", {
                      required: "This field is required",
                    })}
                    onChange={(e) => {
                      clearErrors(["mobile"]);
                      setItem(prev => ({ ...prev, mobile: e.target.value })); //// solve the error from here
                      // item.name = e.target.value
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
                {errors?.mobile && (
                    <span style={{ fontSize: "10px" }}>
                    {errors.mobile.message}
                  </span>
                )}
              </div>
            ) : (
              ""
            )}

            {type == "Supplier" || type === "Customer" ? (
              <div>
                <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    type={"text"}
                    label={"Alternate Contact No"}
                    value={item?.alternate_contact_no || ''}
                    {...register("alternate_contact_no", {
                      required: "This field is required",
                    })}
                    onChange={(e) => {
                      clearErrors(["alternate_contact_no"]);
                      setItem(prev => ({ ...prev, alternate_contact_no: e.target.value })); //// solve the error from here
                      // item.name = e.target.value
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
                {errors?.alternate_contact_no && (
                    <span style={{ fontSize: "10px" }}>
                    {errors.alternate_contact_no.message}
                  </span>
                )}
              </div>
            ) : (
              ""
            )}

            <div>
              <TextField
                  variant="outlined"
                  fullWidth
                  autoComplete="off"
                  size="small"
                  type={"text"}
                  label={"Country"}
                  value={item?.country || ''}
                  {...register("country", {
                    required: "This field is required",
                  })}
                  onChange={(e) => {
                    clearErrors(["country"]);
                    setItem(prev => ({ ...prev, country: e.target.value })); //// solve the error from here
                    // item.name = e.target.value
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
              {errors?.country && (
                  <span style={{ fontSize: "10px" }}>
                    {errors.country.message}
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
                  label={"State"}
                  value={item?.state || ''}
                  {...register("state", {
                    required: "This field is required",
                  })}
                  onChange={(e) => {
                    clearErrors(["state"]);
                    setItem(prev => ({ ...prev, state: e.target.value })); //// solve the error from here
                    // item.name = e.target.value
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
              {errors?.state && (
                  <span style={{ fontSize: "10px" }}>
                    {errors.state.message}
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
                  label={"City"}
                  value={item?.city || ''}
                  {...register("city", {
                    required: "This field is required",
                  })}
                  onChange={(e) => {
                    clearErrors(["city"]);
                    setItem(prev => ({ ...prev, city: e.target.value })); //// solve the error from here
                    // item.name = e.target.value
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
              {errors?.city && (
                  <span style={{ fontSize: "10px" }}>
                    {errors.city.message}
                  </span>
              )}
            </div>

            {type == "Supplier" || type === "Customer" ? (
              <div>
                <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    type={"text"}
                    label={"Address"}
                    value={item?.address || ''}
                    {...register("address", {
                      required: "This field is required",
                    })}
                    onChange={(e) => {
                      clearErrors(["address"]);
                      setItem(prev => ({ ...prev, address: e.target.value })); //// solve the error from here
                      // item.name = e.target.value
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
                {errors?.address && (
                    <span style={{ fontSize: "10px" }}>
                    {errors.address.message}
                  </span>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row row-cols-1 row-cols-lg-1 mb-2">
            <CkEditorComponent
              content={note}
              setContent={setNote}
              label={"Note"}
            />
          </div>
          <Submitbtn name={"Update Contact"} />
        </form>
      </div>
    </>
  );
};

export default EditContact;
