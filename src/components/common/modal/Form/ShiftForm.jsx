import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import BaseModal from "../BaseModal";
import Input from "../Input";
import Select from "../Select";

const ShiftForm = ({ dataModal, dataToggle }) => {
  const [employee, setEmployee] = useState([]);
  const [weekday, setWeekday] = useState([]);
  const [shift, setShift] = useState([]);
  const [weekends, setWeekends] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("/hrm-system/employee/")
      .then((info) => {
        info?.data?.body?.data?.map((item) => {
          const set_data = {
            id: item.id,
            value: item.name,
          };
          setEmployee((prevEmployee) => [...prevEmployee, set_data]);
        });
      })
      .catch((e) => {
        Swal.fire({
          title: "Something is wrong.",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
                        rgba(0,0,123,0.4)
                        url("/images/nyan-cat.gif")
                        left top
                        no-repeat
                      `,
        });
      });

    axios
      .get("/hrm-system/weekday/")
      .then((info) => {
        info?.data?.body?.data?.map((item) => {
          const set_data = {
            id: item.id,
            value: item.name,
          };
          setWeekday((prevWeekday) => [...prevWeekday, set_data]);
        });
      })
      .catch((e) => {
        Swal.fire({
          title: "Something is wrong.",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
                        rgba(0,0,123,0.4)
                        url("/images/nyan-cat.gif")
                        left top
                        no-repeat
                      `,
        });
      });

    axios
      .get("/hrm-system/shift")
      .then((info) => {
        info?.data?.body?.data?.map((item) => {
          const set_data = {
            id: item.id,
            value: item.name,
          };
          setShift((prevShift) => [...prevShift, set_data]);
        });
      })
      .catch((e) => {
        Swal.fire({
          title: "Something is wrong.",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
                        rgba(0,0,123,0.4)
                        url("/images/nyan-cat.gif")
                        left top
                        no-repeat
                      `,
        });
      });
  }, []);

  const formattedTime = (time) => moment(time, "HH:mm").format("HH:mm:ss");

  const onSubmit = (data) => {
    data.weekends = weekends.join(",");

    console.log(data);

    // const in_time = formattedTime(data.in_time);
    // data.in_time = in_time;
    // const out_time = formattedTime(data.out_time);
    // data.out_time = out_time;

    // axios
    //   .post("/hrm-system/manual-attendance", data)
    //   .then((info) => {
    //     if (info?.status == 200) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Your work has been saved",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       dataToggle(false);
    //     }
    //   })
    //   .catch((e) => {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: `${e?.response?.data?.body?.message?.details[0]}`,
    //       footer: '<a href="">Why do I have this issue?</a>',
    //     });
    //   });
  };

  return (
    <>
      <BaseModal
        title={"Shift Entry"}
        dataModal={dataModal}
        dataToggle={dataToggle}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row row-cols-1 row-cols-lg-2">
            <div>
              <Input
                labelName={"Shift Name"}
                inputName={"name"}
                inputType={"text"}
                placeholder={"Enter shift name"}
                validation={{
                  ...register("name", { required: true }),
                }}
              />
              {/*<span className="text-danger">*/}
              {/*    {errors?.date && `Date is required`}*/}
              {/*</span>*/}
            </div>
            <div>
              <Input
                labelName={"Start Time"}
                inputName={"startTime"}
                inputType={"time"}
                validation={{ ...register("start_time", { required: true }) }}
                error={errors?.start_time}
              />
            </div>
          </div>

          <div className="row row-cols-1 row-cols-lg-2">
            <div>
              <Input
                labelName={"End Time"}
                inputName={"endTime"}
                inputType={"time"}
                validation={{ ...register("end_time", { required: true }) }}
                error={errors?.end_time}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="weekends">Weekends</label>
              <DropdownMultiselect
                options={[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ]}
                name="weekends"
                handleOnChange={(selected) => setWeekends(selected)}
              />
            </div>
          </div>
          <div>
            <Select
              name={"status"}
              labelName={"Status"}
              placeholder={"Select an option"}
              options={[
                { id: "Active", value: "Active" },
                { id: "Inactive", value: "Inactive" },
              ]}
              validation={{ ...register("status", { required: true }) }}
              error={errors?.status}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button color="danger" onClick={dataToggle} className="me-2">
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

export default ShiftForm;
