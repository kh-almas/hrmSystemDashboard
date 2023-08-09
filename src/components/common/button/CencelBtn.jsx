import React from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
const CencelBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location?.state?.from?.pathname || "/";

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      navigate("/dashboard/inventory-management/purchase/order");
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Button
        onClick={handleCancel}
        type="submit"
        className="me-2 btn btn-pill btn-info btn-air-info btn-info-gradien px-4"
      >
        Cancel
      </Button>
    </div>
  );
};

export default CencelBtn;
