import React from "react";

const Modal = ({ data }) => {
  return (
    <div>
      {data.employe && (
        <div className="row">
          <div className="col">
            <label htmlFor="exampleFormControlInput1">{data.label}</label>
            <select
              className="form-control digits"
              id="exampleFormControlSelect9"
              defaultValue="1"
            >
              <option>{data?.option1}</option>
              <option>{data?.option2}</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="exampleFormControlInput1">{data.label}</label>
            <select
              className="form-control digits"
              id="exampleFormControlSelect9"
              defaultValue="1"
            >
              <option>{data?.option1}</option>
              <option>{data?.option2}</option>
            </select>
          </div>
        </div>
      )}

      {data.selectOne && (
        <div className="row">
          <div className="col">
            <label htmlFor="exampleFormControlInput1">{data.label}</label>
            <select
              className="form-control digits"
              id="exampleFormControlSelect9"
              defaultValue="1"
            >
              <option>{data?.option1}</option>
              <option>{data?.option2}</option>
            </select>
          </div>
        </div>
      )}

      {data?.gift && (
        <div className="row m-t-15">
          <div className="col">
            <label htmlFor="exampleFormControlInput1">{data?.label}</label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              required={true}
              type="date"
            />
          </div>
          <div className="col">
            <label htmlFor="exampleFormControlInput1">{data?.label}</label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              required={true}
              type="text"
            />
          </div>
        </div>
      )}
      {data?.select && (
        <div className="row m-t-15">
          <div className="col">
            <label htmlFor="exampleFormControlInput1">{data.label}</label>
            <select
              className="form-control digits"
              id="exampleFormControlSelect9"
              defaultValue="1"
            >
              <option>{data?.option1}</option>
              <option>{data?.option2}</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="exampleFormControlInput1">{data?.label}</label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              required={true}
              type="text"
            />
          </div>
        </div>
      )}
      {data?.date && (
        <div className="row m-t-15">
          <div className="col">
            <label htmlFor="exampleFormControlInput1">{data?.label}</label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              required={true}
              type="date"
            />
          </div>
          <div className="col">
            <label htmlFor="exampleFormControlInput1">{data?.label}</label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              required={true}
              type="date"
            />
          </div>
        </div>
      )}

      {data?.description && (
        <div className="row">
          <div className="form-group mb-0">
            <label htmlFor="exampleFormControlTextarea4">{data?.label}</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea4"
              rows="5"
              placeholder={data?.placeholder}
            ></textarea>
          </div>
        </div>
      )}
      {data?.textFild && (
        <div className="row m-t-15">
          <div className="col">
            <label htmlFor="exampleFormControlInput1">{data?.label}</label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              required={true}
              type="text"
            />
          </div>
          <div className="col">
            <label htmlFor="exampleFormControlInput1">{data?.label}</label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              required={true}
              type="text"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
