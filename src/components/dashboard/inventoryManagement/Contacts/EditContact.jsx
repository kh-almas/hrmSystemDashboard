import React, { useEffect, useState } from "react";
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

const EditContact = () => {
  const [item, setItem] = useState({});
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
        mobile: yup.string().required("Mobile number is required"),
        alternate_contact_no: yup.string().required( "Alternate contact number is required"),
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
    console.log(item?.contact_type)
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


    console.log(data);
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


  return (
    <>
      <Breadcrumb parent="Inventory management" title="Edit Contact" />
      <div className="card p-30">
        <form onSubmit={handleSubmit(submitUpdate)}>
          <div className="row row-cols-1 row-cols-lg-3 ">
            <div>
              <Select
                  labelName={"Product-Type"}
                  placeholder={"Select an option"}
                  options={productType}
                  setValue={setSelectedContactTye}
                  cngFn={handleChangeForUpdateContactType}
                  error={errors['pay_term_condition']}
                  previous={selectedContactTye}
              />
            </div>
            {type === "Supplier" || type === "Customer" ? (
              <div>
                <Input
                  labelName={"Name"}
                  inputName={"name"}
                  inputType={"text"}
                  placeholder={"Name"}
                  validation={{
                    ...register("name"),
                  }}
                  error={errors?.name}
                  defaultValue={item?.name}
                />
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
                <div>
                  <Input
                    labelName={"Business Name"}
                    inputName={"business-name"}
                    placeholder={"Business Name"}
                    inputType={"text"}
                    validation={{
                      ...register("business_name"),
                    }}
                    error={errors?.business_name}
                    defaultValue={item?.business_name}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {type === "Supplier" || type === "Customer" ? (
              <div>
                <div>
                  <Input
                    labelName={"Tax Number"}
                    inputName={"tex-number"}
                    inputType={"text"}
                    placeholder={"0"}
                    validation={{
                      ...register("tax_number"),
                    }}
                    error={errors?.tax_number}
                    defaultValue={item?.tax_number}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {type === "Supplier" || type === "Customer" ? (
              <div>
                <div>
                  <Input
                    labelName={"Openning Balance"}
                    inputName={"opennibg-balance"}
                    inputType={"text"}
                    placeholder={"Openning Balance"}
                    validation={{
                      ...register("opening_balance"),
                    }}
                    error={errors?.opening_balance}
                    defaultValue={item?.opening_balance}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {type === "Supplier" || type === "Customer" ? (
              <div>
                <div>
                  <Input
                    labelName={"Pay Term"}
                    inputName={"pay-term"}
                    inputType={"text"}
                    placeholder={"Pay Term"}
                    validation={{
                      ...register("pay_term"),
                    }}
                    error={errors?.pay_term}
                    defaultValue={item?.pay_term}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            <div>
              <Select
                  labelName={"pay-term-condition"}
                  placeholder={"Select an option"}
                  options={payTerm}
                  setValue={payTermCondition}
                  cngFn={handleChangeForUpdatePayTermCondition}
                  error={errors['pay_term_condition']}
                  previous={payTermCondition}
              />
              {console.log(errors)}
            </div>

            {type == "Supplier" || type === "Customer" ? (
              <div>
                <div>
                  <Input
                    labelName={"Email"}
                    inputName={"email"}
                    inputType={"email"}
                    placeholder={"Email"}
                    validation={{
                      ...register("email"),
                    }}
                    error={errors?.email}
                    defaultValue={item?.email}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {type == "Supplier" || type === "Customer" ? (
              <div>
                <div>
                  <Input
                    labelName={"Mobile"}
                    inputName={"mobile"}
                    inputType={"text"}
                    placeholder={"Mobile"}
                    validation={{
                      ...register("mobile"),
                    }}
                    error={errors?.mobile}
                    defaultValue={item?.mobile}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {type == "Supplier" || type === "Customer" ? (
              <div>
                <div>
                  <Input
                    labelName={"Alternate Contact No"}
                    inputName={"alternate-contact-no"}
                    inputType={"text"}
                    placeholder={"Alternate Contact No"}
                    validation={{
                      ...register("alternate_contact_no"),
                    }}
                    error={errors?.alternate_contact_no}
                    defaultValue={item?.alternate_contact_no}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            <div>
              <Input
                  labelName={"Country"}
                  inputName={"country"}
                  inputType={"text"}
                  placeholder={"Your country"}
                  validation={{
                    ...register("country"),
                  }}
                  error={errors?.country}
                  defaultValue={item?.country}
              />
            </div>

            <div>
              <Input
                  labelName={"State"}
                  inputName={"state"}
                  inputType={"text"}
                  placeholder={"Your state"}
                  validation={{
                    ...register("state"),
                  }}
                  error={errors?.state}
                  defaultValue={item?.state}
              />
            </div>

            <div>
              <Input
                  labelName={"City"}
                  inputName={"city"}
                  inputType={"text"}
                  placeholder={"Your city"}
                  validation={{
                    ...register("city"),
                  }}
                  defaultValue={item?.city}
                  error={errors?.city}
              />
            </div>

            {type == "Supplier" || type === "Customer" ? (
              <div>
                <Input
                  labelName={"Address"}
                  inputName={"address"}
                  inputType={"text"}
                  placeholder={"Address"}
                  validation={{ ...register("address") }}
                  error={errors?.address}
                  defaultValue={item?.address}
                />
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
