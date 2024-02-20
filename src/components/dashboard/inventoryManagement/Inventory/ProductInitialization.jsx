import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../common/breadcrumb";
import getAllBranch from "../../../common/Query/hrm/GetAllBranch";
import getCompanyBranchAPI from "../../../common/Query/hrm/forSort/getCompanyBranchAPI";
import axios from "../../../../axios";
import Select from "../../../common/modal/Select";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

import SelectProductInCreateProductForm from "../../../common/component/form/inventory/product/selectProductInCreateProductForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  flexRender,
  MRT_TableBodyCellValue,
  useMaterialReactTable,
} from "material-react-table";
import { Button } from "reactstrap";
import Swal from "sweetalert2";

const ProductInitialization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allBranch, setAllBranch] = useState([]);
  const [data, setData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState({});
  const [selectedDataKeyForProductList, setSelectedDataKeyForProductList] =
    useState([]);
  const [allDataForDropdown, setAllDataForDropdown] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [rowSelection, setRowSelection] = useState([]);
  const [selectedProductIdFromDB, setSelectedProductIdFromDB] = useState([]);
  const [branchSkuData, setBranchSkuData] = useState([]);
  const [render, setRender] = useState(false);
  const [search, setSearch] = useState("");
  const [searchBranch, setSearchBranch] = useState("");
  const [visibleData, setVisibleData] = useState([]);
  const [visibleBranchData, setVisibleBranchData] = useState([]);

  useEffect(() => {
    const getDataFn = async () => {
      setAllBranch((prev) => []);
      const getData = await axios.get("/hrm-system/branch/");
      getData?.data?.body?.data?.data?.map((item) => {
        const set_data = {
          value: item.id,
          label: item.name,
        };
        setAllBranch((prevBranch) => [...prevBranch, set_data]);
      });
    };
    getDataFn();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/inventory-management/products/list/combo/select`
        );
        setData(response?.data?.body?.data);
        setVisibleData(response?.data?.body?.data);
        console.log("response?.data?.body?.data", response?.data?.body?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getDataFn = async () => {
      if (selectedBranch.value) {
        const setData = [];
        let allData = [];
        setBranchSkuData([]);
        setVisibleBranchData([]);
        const getData = await axios.get(
          `/inventory-management/branch/products/initialization/${selectedBranch?.value}`
        );
        allData = getData?.data?.body?.data;
        console.log("allData", allData);
        allData?.forEach((singleData) => {
          setData.push(singleData.product_id);
        });
        setSelectedDataKeyForProductList(setData);

        data?.forEach((dt, i) => {
          // console.log("dt?.id == setData[i]", dt?.id, setData[i]);
          setData?.includes(dt?.id) &&
            setBranchSkuData((prev) => [...prev, dt]);
          setVisibleBranchData((prev) => [...prev, dt]);
        });
      }
    };
    getDataFn();
  }, [selectedBranch, render]);
  console.log("setBranchSkuData", branchSkuData, visibleBranchData);

  // console.log("selectedBranch", selectedBranch);

  const handleChangeForSelectedBranch = (selected) => {
    setSelectedBranch(selected);
  };
  console.log("setSelectedProduct", selectedProduct);

  const submitInitializationForm = () => {
    console.log("selectedProduct", selectedProduct);
    axios
      .put(
        `/inventory-management/branch/products/initialization/update/${selectedBranch?.value}`,
        selectedProduct
      )
      .then((info) => {
        setRender(!render);
        setSelectedProduct([]);
        if (info?.status == 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          // toggle();
          // reset();
        }
        // reFetch();
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
            title: `${e?.response?.data?.body?.message?.details[0].message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const deleteSkuFromBranch = () => {
    const id = selectedProduct?.map((pd) => pd?.id);

    if (!id || id.length === 0) {
      console.error("No products selected for deletion");
      return; // Exit early if no products are selected
    }

    console.log("id", id);

    Promise.all(
      id.map((productId) =>
        axios.delete(
          `/inventory-management/branch/products/initialization/delete/${productId}`
        )
      )
    )
      .then((responses) => {
        console.log("responses", responses);
        // Check if all responses are successful (status code 200)
        const allSuccess = responses.every(
          (response) => response.status === 200
        );

        if (allSuccess) {
          setRender(!render);
          setSelectedProduct([]);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.error("Failed to delete one or more products");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to delete one or more products",
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting products:", error);
        if (error?.response?.data?.body?.message?.sqlState === "23000") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Cannot delete product if there are any related records",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An unexpected error occurred while deleting products",
          });
        }
      });
  };


  const filteredData = data?.filter((dt) => {
    if (!search) {
      return true;
    }
    return dt.sku.trim().toLowerCase().includes(search.trim().toLowerCase());
  });
  const filteredBranchData = branchSkuData?.filter((dt) => {
    if (!searchBranch) {
      return true;
    }
    return dt.sku
      .trim()
      .toLowerCase()
      .includes(searchBranch.trim().toLowerCase());
  });

  const scrollbarStyle = {
    overflowY: "auto",
    // "::-webkit-scrollbar": {
    //   width: "0", // Remove scrollbar width
    // },
    // "::-webkit-scrollbar-vertical": {
    //   display: "none", // Hide vertical scrollbar
    // },
  };

  return (
    <>
      {!isLoading ? (
        <>
          <Breadcrumb
            parent="Inventory management"
            title="Product initialization in branch"
          />
          <div className="row">
            <div className="col-md-6">
              <div className="mt-4 card p-3">
                <Select
                  labelName={"Select branch"}
                  placeholder={"Select an option"}
                  options={allBranch}
                  setValue={setSelectedBranch}
                  cngFn={handleChangeForSelectedBranch}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col-md-6">
              <div class="mt-4 card p-2 w-100">
                <h4 className="text-center py-2">All SKU</h4>
                <div className="py-2 d-flex gap-3">
                  <input
                    type="search"
                    className="form-control w-75"
                    placeholder="Search sku..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <div
                    onClick={submitInitializationForm}
                    className="form-control w-25 bg-primary d-flex justify-content-center align-items-center"
                  >
                    <FaArrowRight size={19} />
                  </div>
                </div>
                <div
                  className="overflow-x-scroll"
                  style={{ height: "500px", ...scrollbarStyle }}
                >
                  <table className="table table-responsive">
                    <thead>
                      <tr className="text-dark">
                        <th className="text-center text-dark">Select</th>
                        <th className="text-center text-dark">Name</th>
                        <th className="text-center text-dark">SKU</th>
                        <th className="text-center text-dark">Category</th>
                        <th className="text-center text-dark">Brand</th>
                        <th className="text-center text-dark">Model</th>
                      </tr>
                    </thead>
                    <tbody className="table-hover">
                      {filteredData
                        ?.filter(
                          (dt) =>
                            !selectedDataKeyForProductList?.includes(dt?.id)
                        )
                        ?.map((dt, i) => (
                          <tr key={i}>
                            <td className="text-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedProduct?.find(
                                  (pd) => pd?.id === dt?.id
                                )}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  if (isChecked) {
                                    setSelectedProduct((prev) => [...prev, dt]);
                                  } else {
                                    setSelectedProduct((prev) =>
                                      prev.filter((item) => item.id !== dt.id)
                                    );
                                  }
                                }}
                              />{" "}
                            </td>
                            <td className="text-nowrap">{dt?.name}</td>
                            <td className="text-nowrap">{dt?.sku}</td>
                            <td className="text-nowrap">{dt?.category_name}</td>
                            <td className="text-nowrap">{dt?.brand_name}</td>
                            <td className="text-nowrap">{dt?.model_name}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mt-4 card p-2 w-100">
                <h4 className="text-center py-2">
                  {selectedBranch?.label} Branch SKU
                </h4>
                <div className="py-2 d-flex gap-3">
                  <div
                    onClick={deleteSkuFromBranch}
                    className="form-control w-25 bg-primary d-flex justify-content-center align-items-center"
                  >
                    <FaArrowLeft size={19} />
                  </div>
                  <input
                    type="search"
                    className="form-control w-75"
                    placeholder="Search sku..."
                    value={searchBranch}
                    onChange={(e) => setSearchBranch(e.target.value)}
                  />
                </div>
                <div
                  className="overflow-x-scroll"
                  style={{ height: "500px", ...scrollbarStyle }}
                >
                  <table className="table table-responsive">
                    <thead>
                      <tr className="text-dark">
                        <th className="text-center text-dark">Select</th>
                        <th className="text-center text-dark">Name</th>
                        <th className="text-center text-dark">SKU</th>
                        <th className="text-center text-dark">Category</th>
                        <th className="text-center text-dark">Brand</th>
                        <th className="text-center text-dark">Model</th>
                      </tr>
                    </thead>
                    <tbody className="table-hover">
                      {filteredBranchData?.map((dt, i) => (
                        <tr key={i}>
                          <td className="text-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedProduct?.find(
                                (pd) => pd?.id === dt?.id
                              )}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                  setSelectedProduct((prev) => [...prev, dt]);
                                } else {
                                  setSelectedProduct((prev) =>
                                    prev.filter((item) => item.id !== dt.id)
                                  );
                                }
                              }}
                            />{" "}
                          </td>
                          <td className="text-nowrap">{dt?.name}</td>
                          <td className="text-nowrap">{dt?.sku}</td>
                          <td className="text-nowrap">{dt?.category_name}</td>
                          <td className="text-nowrap">{dt?.brand_name}</td>
                          <td className="text-nowrap">{dt?.model_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ height: "100vh" }}>
          <div className="d-flex align-items-center justify-content-center">
            <div className="loader-box">
              <div className="loader">
                <div className="line bg-primary"></div>
                <div className="line bg-primary"></div>
                <div className="line bg-primary"></div>
                <div className="line bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInitialization;
