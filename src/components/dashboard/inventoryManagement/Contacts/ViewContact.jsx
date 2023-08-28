import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import axios from "../../../../axios";
import Breadcrumb from "../../../common/breadcrumb";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";

const ViewContact = () => {
  const params = useParams();
  const [item, setItem] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addModal, setAddModal] = useState(false);
  const [subtractModal, setSubtractModal] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      try {
        const item = await axios.get(
          `inventory-management/contacts/${params.id}`
        );
        console.log(item);
        setItem(item?.data?.body?.contact);
      } catch (err) {
        console.log(err);
      }
    };
    getItem();
  }, [params.id]);

  const addToggle = () => {
    setAddModal(!addModal);
  };
  const subsToggle = () => {
    setSubtractModal(!subtractModal);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Breadcrumb parent="Inventory management" title="Supplier Profile" />
      <div className="card p-4">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div>
              <img
                src={item?.image}
                alt="profile"
                width="120"
                height="120"
                className="rounded-circle"
              />
              <div className="mt-3">
                <h5>{item?.name}</h5>
                <p>Email : {item?.email}</p>
                <p>Phone : {item?.mobile}</p>
                <p>Pay Term : {item?.pay_term}</p>
                <p>Pay Condition : {item?.pay_term_condition}</p>
                <p>Address : {item?.address}</p>
                <p>Country : {item?.country}</p>
                <p>State : {item?.state}</p>
                <p>City : {item?.city}</p>
                <p>Tax Number : {item?.tax_number}</p>
                <p>Opening Balance : {item?.opening_balance}</p>
                <p>Registered Date :</p>
                <p>Active Status : {item?.status}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div>
              <h5>Purchase Information</h5>
              <p>Total Invoice : 1</p>
              <p>Due Invoice : 0</p>
              <Link
                to={"/dashboard/supplier/purchase-porduct-list/2"}
                className="btn btn-pill btn-primary btn-air-primary"
              >
                {" "}
                <i className="fa fa-bars me-2"></i>Products
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div>
              <h5>Finance Information</h5>
              <p>Total Purchase : $ 5,500.00</p>
              <p>Due Balance : $ 0.00</p>
              <p>['purchase.Total Purchase = Purchase + Opening Balance ']</p>
              <button
                onClick={addToggle}
                type="button"
                className="btn btn-pill btn-primary btn-air-primary"
              >
                {" "}
                <i className="fa fa-bars me-2"></i>Add Balance
              </button>
              <button
                type="button"
                className="btn btn-pill btn-primary btn-air-primary mt-2"
              >
                {" "}
                <i className="fa fa-minus me-1"></i>Subtract Balance
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={addModal} toggle={addToggle}>
        <ModalHeader toggle={addToggle}>Add Balance</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Date"}
                  inputName={"date"}
                  inputType={"date"}
                  validation={{ ...register("date", { required: true }) }}
                />
              </div>
              <div>
                <Select
                  name={"paymentFrom"}
                  labelName={"PAYMENT FROM"}
                  placeholder={"Select an option"}
                  options={["Account for cash", "Account for bank"]}
                />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-lg-2">
              <div>
                <Input
                  labelName={"Narration"}
                  inputName={"narration"}
                  inputType={"text"}
                  placeholder={"Enter Narration"}
                  validation={{
                    ...register("narration", { required: true }),
                  }}
                />
              </div>
              <div>
                <Input
                  labelName={"Country"}
                  inputType={"text"}
                  defaultValue={"Supplier-01"}
                  validation={{ ...register("country", { required: true }) }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <Button color="danger" onClick={addToggle} className="me-2">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Create
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewContact;
