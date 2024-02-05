import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "../../../../axios";

const GetAllPurchaseProducts = () => {
  const {
    status: allProductDiscount = "",
    refetch: allProductDiscountReFetch,
    data: allProductDiscountData = [],
    error: allProductDiscountError,
  } = useQuery({
    queryKey: ["allProductDiscount"],
    queryFn: async () => {
      return axios.get("/inventory-management/product/discount/");
    },
  });


  // if (allEmployeeStatus === 'loading') {
  //     return <span>Loading...</span>
  // }

  if (allProductDiscount === "error") {
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

  return [
    allProductDiscount,
    allProductDiscountReFetch,
    allProductDiscountData,
    allProductDiscountError,
  ];
};

export default GetAllPurchaseProducts;
