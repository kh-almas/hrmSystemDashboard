import React from 'react';
import Breadcrumb from "../../../common/breadcrumb";

const SupplierPurchaseProductList = () => {
    return (
        <>
            <Breadcrumb parent="Inventory management" title="Supplier purchase product list" />
            <div className="table-responsive">
                <table className="table">
                    <thead className="table-border">
                    <tr>
                        <th scope="col">{"Product Name"}</th>
                        <th scope="col">{"SKU"}</th>
                        <th scope="col">{"Price"}</th>
                        <th scope="col">{"Quantity"}</th>
                        <th scope="col">{"Tax"}</th>
                        <th scope="col">{"Discount"}</th>
                        <th scope="col">{"Invoice"}</th>
                        <th scope="col">{"Date"}</th>
                        <th scope="col">{"SubTotal"}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* <tr>
                <th scope="row">{""}</th>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
                <td></td>
              </tr> */}
                    </tbody>
                </table>
                <p className="text-center p-t-10">No entries found</p>
            </div>
        </>
    );
};

export default SupplierPurchaseProductList;