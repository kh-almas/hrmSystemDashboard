import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllSupplier = () => {
  const {
    status: allSupplierStatus = "",
    refetch: allSupplierReFetch,
    data: AllSupplier,
    error: allSupplierError,
  } = useQuery({
    queryKey: ["allSupplierhhhh"],
    queryFn: async () => {
      return axios.get("/inventory-management/contacts/all/supplier");
    },
  });

  // if (allEmployeeStatus === 'loading') {
  //     return <span>Loading...</span>
  // }

  const allSupplier = AllSupplier?.data?.body?.data?.data;
  console.log("allSupplier", AllSupplier);

  if (allSupplierStatus === "error") {
    return Swal.fire({
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
  }

  return [allSupplier, allSupplierReFetch];
};

export default GetAllSupplier;
