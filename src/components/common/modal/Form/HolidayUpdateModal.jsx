import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import BaseModal from "../BaseModal";
import Input from "../Input";

const HolidayUpdateModal = ({
  allHolidayReFetch,
  oldData,
  dataUpdateModal,
  dataUpdateToggle,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
  }, [oldData]);

  const onSubmit = (data) => {
    const updatedData = {
      date: data.date ? data.date : oldData.date,
      status: data.status ? data.status : oldData.status,
    };

    axios
      .put(`/hrm-system/holiday/${oldData.id}`, updatedData)
      .then((info) => {
        console.log(info);
        if (info?.status == 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          dataUpdateToggle(false);
          allHolidayReFetch();
        }
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${e?.response?.data?.body?.message?.details[0].message}`,
        });
      });
  };

  return (
    <>
      <BaseModal
        title={"Update Holiday"}
        dataModal={dataUpdateModal}
        dataToggle={dataUpdateToggle}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              labelName={"Title"}
              inputName={"title"}
              inputType={"text"}
              defaultValue={oldData?.title}
              validation={{
                ...register("title", { required: true }),
              }}
            />
          </div>
          <div>
            <Input
              labelName={"Date"}
              inputName={"date"}
              inputType={"date"}
              defaultValue={oldData?.date}
              validation={{
                ...register("date", { required: true }),
              }}
            />
          </div>
          {/* <div>
            <Select
              labelName={"Status"}
              placeholder={"Select an option"}
              previous={oldData?.status}
              options={[
                { id: "Active", value: "Active" },
                { id: "Inactive", value: "Inactive" },
              ]}
              validation={{ ...register("status", { required: true }) }}
              error={errors?.status}
            />
          </div> */}

          <div className="d-flex justify-content-end">
            <Button color="danger" onClick={dataUpdateToggle} className="me-2">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Create
            </Button>
          </div>
        </form>
      </BaseModal>
    </>
  );
};

export default HolidayUpdateModal;
