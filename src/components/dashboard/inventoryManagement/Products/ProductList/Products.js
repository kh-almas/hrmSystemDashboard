import React, {useEffect, useMemo, useState} from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import FilesComponent from "../../../../common/filesComponent/FilesComponent";
import CommonSearchComponet from "../../../../common/salaryCard/CommonSearchComponet";
import {Link} from "react-router-dom";
import {MaterialReactTable} from "material-react-table";
import {Box, IconButton} from "@mui/material";
import {Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";
import axios from "../../../../../axios";

const Products = () => {
    const [data, setData] = useState([]);
    const [item, setItem] = useState("products");

    const handleCard = (cardName) => {
        setItem(cardName);
    };

    const tableInfo = useMemo(
        () => [
            {
                accessorKey: 'productSku',
                header: 'productSku'
            },
            {
                accessorKey: 'barcodeType',
                header: 'barcodeType'
            },
            {
                accessorKey: 'openingStockQuantity',
                header: 'openingStockQuantity'
            },
            {
                accessorKey: 'alertQuantity',
                header: 'alertQuantity'
            },
            {
                accessorKey: 'purchasePrice',
                header: 'purchasePrice'
            },
            {
                accessorKey: 'sellingPrice',
                header: 'sellingPrice'
            },
            {
                accessorKey: 'minSellingPrice',
                header: 'minSellingPrice'
            },
            {
                accessorKey: 'taxType',
                header: 'taxType'
            },
            {
                accessorKey: 'tax',
                header: 'tax'
            },
            {
                accessorKey: 'productLength',
                header: 'productLength'
            },
            {
                accessorKey: 'productHeight',
                header: 'productHeight'
            },
            {
                accessorKey: 'productWidth',
                header: 'productWidth'
            },
            {
                accessorKey: 'productWeight',
                header: 'productWeight'
            },
            {
                accessorKey: 'packageHeight',
                header: 'packageHeight'
            },
            {
                accessorKey: 'packageWidth',
                header: 'packageWidth'
            },
            {
                accessorKey: 'packageLength',
                header: 'packageLength'
            },
            {
                accessorKey: 'packageWeight',
                header: 'packageWeight'
            },
            {
                accessorKey: 'measurementUnit',
                header: 'measurementUnit'
            },
            {
                accessorKey: 'weightUnit',
                header: 'weightUnit'
            },
            {
                accessorKey: 'unitType',
                header: 'unitType'
            },
            {
                accessorKey: 'brandName',
                header: 'brandName'
            },
            {
                accessorKey: 'categoryName',
                header: 'categoryName'
            },
            {
                accessorKey: 'modelName',
                header: 'modelName'
            },
            {
                accessorKey: 'isRawMaterial',
                header: 'isRawMaterial'
            },
            {
                accessorKey: 'hasSerialKey',
                header: 'hasSerialKey'
            },
            {
                accessorKey: 'productType',
                header: 'productType'
            },
            {
                accessorKey: 'productName',
                header: 'productName'
            },
            {
                accessorKey: 'hsn',
                header: 'hsn'
            },
        ]
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/inventory-management/products/list`);
                setData(response?.data?.body?.data);
                // console.log(response)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    }, []);

    return (
        <div>
            <Breadcrumb parent="Inventory management" title="Product List"/>
            <div style={{padding: "0px 18px"}} className="d-flex justify-content-between align-items-center pb-3">
                <div style={{display: "flex", alignItems: "center", justifyContent: "", marginBottom: "20px",}}>
                    <div className="d-flex flex-column flex-md-row  text-center">
                        <Link
                            to={"/dashboard/inventory-management/products/add-product"}
                            className="btn btn-pill btn-info btn-air-info  mx-2 mb-2 mt-1"
                        >
                            <i className="fa fa-plus me-1"></i>
                            New Product
                        </Link>
                    </div>
                </div>
                <FilesComponent/>
            </div>

            <div className={"card"}>
                {

                    data?.length !== 0 ?
                        <MaterialReactTable
                            columns={tableInfo}
                            data={data}
                            enableGrouping
                            enableStickyHeader
                            initialState={{
                                density: 'compact',
                                expanded: true, //expand all groups by default
                                grouping: ['productSku'], //an array of columns to group by default (can be multiple)
                                pagination: { pageIndex: 0, pageSize: 10 },
                                // sorting: [{ id: 'state', desc: false }], //sort by state by default
                            }}
                            muiToolbarAlertBannerChipProps={{ color: 'secondary' }}
                            muiTableContainerProps={{ maxHeight: 700}}
                            enableRowActions
                            renderRowActions={({ row, table }) => (
                                <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: "center", alignItems: "center" }}>
                                    <Link to={`/dashboard/inventory-management/products/edit-product/${row?.original?.id}`} color="secondary">
                                        <EditIcon />
                                    </Link>

                                    <IconButton
                                        color="error"
                                        onClick={() => {
                                            // data.splice(row.index, 1); //assuming simple data table
                                            // setData([...data]);
                                            console.log(row?.original?.id)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            )}
                        />
                        : <div style={{height: "100vh"}}>
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
                }
            </div>
        </div>
    );
};

export default Products;
