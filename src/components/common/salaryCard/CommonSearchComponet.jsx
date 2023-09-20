import React, {useState} from "react";
import {useForm} from "react-hook-form";
const CommonSearchComponet = ({howManyItem, setHowManyItem, searchData, setSearchData, setCurrentPage }) => {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => {
        setCurrentPage(1);
        setHowManyItem(data?.item)
    };
    const onSearch = (data) => {
        setCurrentPage(1);
        setSearchData(data?.search);
    };
  return (
    <div className="row" style={{ marginBottom: "20px" }}>
      <div className="col-sm-12 col-xl-10">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <form onChange={handleSubmit(onSubmit)} className="d-flex align-items-center">
                <select
                    {...register("item")}
                    className="form-control digits"
                    id="exampleFormControlSelect9"
                    style={{ width: "max-content" }}
                >
                    <option selected={howManyItem === "10"} value="10">{"10"}</option>
                    <option selected={howManyItem === "25"} value="25">{"25"}</option>
                    <option selected={howManyItem === "50"} value="50">{"50"}</option>
                    <option selected={howManyItem === "100"} value="100">{"100"}</option>
                </select>
                <p style={{ margin: "0px", marginLeft: "5px" }}>entries per page</p>
            </form>

        </div>
      </div>
      <div className="col-sm-12 col-xl-2">
          <form onChange={handleSubmit(onSearch)} className="d-flex align-items-center">
              <input {...register("search")} type="search" className="form-control" placeholder="Search.." />
          </form>
      </div>
    </div>
  );
};

export default CommonSearchComponet;
