import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "../../../../axios";

const GetAllProductReconciliation = () => {
  const {
    status: allProductReconciliation = "",
    refetch: allProductReconciliationReFetch,
    data: allProductReconciliationData = [],
    error: allProductReconciliationError,
  } = useQuery({
    queryKey: ["allProductReconciliation"],
    queryFn: async () => {
      return axios.get("/inventory-management/stock/reconciliation/");
    },
  });

  // if (allEmployeeStatus === 'loading') {
  //     return <span>Loading...</span>
  // }



  if (allProductReconciliation === "error") {
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
    allProductReconciliation,
    allProductReconciliationReFetch,
    allProductReconciliationData,
    allProductReconciliationError,
  ];
};

export default GetAllProductReconciliation;
