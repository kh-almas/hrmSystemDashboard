import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "../../../../axios";

const GetAllPurchaseQuote = () => {
  const {
    status: allPurchaseQuoteStatus = "",
    refetch: allPurchaseQuoteReFetch,
    data: allPurchaseQuoteData = [],
    error: allPurchaseQuoteError,
  } = useQuery({
    queryKey: ["allPurchaseQuote"],
    queryFn: async () => {
      return axios.get("/inventory-management/purchase/quote");
    },
  });

  // if (allEmployeeStatus === 'loading') {
  //     return <span>Loading...</span>
  // }

  if (allPurchaseQuoteStatus === "error") {
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
    allPurchaseQuoteStatus,
    allPurchaseQuoteReFetch,
    allPurchaseQuoteData,
    allPurchaseQuoteError,
  ];
};

export default GetAllPurchaseQuote;
