import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "../../../../axios";

const GetAllPurchaseRequisition = () => {
  const {
    status: allPurchaseRequisitionStatus = "",
    refetch: allPurchaseRequisitionReFetch,
    data: allPurchaseRequisitionData = [],
    error: allPurchaseRequisitionError,
  } = useQuery({
    queryKey: ["allPurchaseRequisition"],
    queryFn: async () => {
      return axios.get("/inventory-management/stock/adjustment/");
    },
  });

  // if (allEmployeeStatus === 'loading') {
  //     return <span>Loading...</span>
  // }

  if (allPurchaseRequisitionStatus === "error") {
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
    allPurchaseRequisitionStatus,
    allPurchaseRequisitionReFetch,
    allPurchaseRequisitionData,
    allPurchaseRequisitionError,
  ];
};

export default GetAllPurchaseRequisition;
