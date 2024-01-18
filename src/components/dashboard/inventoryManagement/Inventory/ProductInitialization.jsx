import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../../common/breadcrumb";
import getAllBranch from "../../../common/Query/hrm/GetAllBranch";
import getCompanyBranchAPI from "../../../common/Query/hrm/forSort/getCompanyBranchAPI";
import axios from "../../../../axios";
import Select from "../../../common/modal/Select";
import SelectProductInCreateProductForm
    from "../../../common/component/form/inventory/product/selectProductInCreateProductForm";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {flexRender, MRT_TableBodyCellValue, useMaterialReactTable} from "material-react-table";

const ProductInitialization = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [allBranch, setAllBranch] = useState([]);
    const [data, setData] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState({});
    const [selectedDataKeyForProductList, setSelectedDataKeyForProductList] = useState([]);
    const [allDataForDropdown, setAllDataForDropdown] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);

    console.log('selectedProduct', selectedProduct)
    console.log('selectedDataKeyForProductList', selectedDataKeyForProductList)
    useEffect(() => {
        const getDataFn = async () => {
            setAllBranch([])
            const getData = await axios.get('/hrm-system/branch/')
            // console.log('getData', getData?.data?.body?.data?.data);
            getData?.data?.body?.data?.data?.map(item => {
                const set_data = {
                    value: item.id,
                    label: item.name
                }
                setAllBranch(prevBrand => [...prevBrand, set_data]);
            })
        }
        getDataFn();
    }, [])
    // console.log('selectedBranch', selectedBranch)

    const handleChangeForSelectedBranch = (selected) => {
        setSelectedBranch(selected);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/inventory-management/products/list/combo/select`);
                setData(response?.data?.body?.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    }, []);

    const getSelectedData = (data) => {
        console.log('selected data', data)
        if(!selectedDataKeyForProductList.includes(data.id)){
            selectedDataKeyForProductList.push(data.id);
            setSelectedProduct(prev => [...prev, data]);
        }else{
            const updatedDataKeyList = selectedDataKeyForProductList.filter(
                (id) => id !== data.id
            )
            setSelectedProduct((prev) =>
                prev.filter((item) => item.id !== data.id)
            );
            setSelectedDataKeyForProductList(updatedDataKeyList);
        }
    }

    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'sku',
            header: 'SKU',
        },
        {
            accessorKey: 'category_name',
            header: 'Category',
        },
        {
            accessorKey: 'brand_name',
            header: 'Brand',
        },
        {
            accessorKey: 'model_name',
            header: 'Model',
        },
    ];

    const table = useMaterialReactTable({
        columns,
        data,
        getRowId: (row) => row.id,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => setRowSelection((prev) => ({ ...prev, [row.id]: !prev[row.id] })),
            selected: rowSelection[row.id],
            sx: {
                cursor: 'pointer',
            },
        }),
        enableBottomToolbar: false,
        initialState: {
            showGlobalFilter: true,
        },
        onRowSelectionChange: setRowSelection,
        enablePagination: false,
        state: {
            rowSelection
        },
    });

    return (
        <>
            {
                !isLoading ?
                    <>
                        <Breadcrumb parent="Inventory management" title="Product initialization in branch"/>
                        <div className="row">
                            <div className="col-md-3">
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
                            <div class="col-md-9">
                                <div class="mt-4">

                                    <div style={{backgroundColor: 'white', boxShadow: 'rgb(115, 115, 115) 4px 5px 25px -25px', borderRadius: '7px'}}>
                                        <TableContainer className="hideSidebar" style={{borderRadius: '7px'}}>
                                            <Table>
                                                <TableHead style={{
                                                    position: 'sticky',
                                                    top: 0,
                                                    zIndex: 100,
                                                    backgroundColor: 'white'
                                                }}>
                                                    {table.getHeaderGroups().map((headerGroup) => (
                                                        <TableRow key={headerGroup.id}>
                                                            {headerGroup.headers.map((header) => (
                                                                <TableCell align="center" variant="head"
                                                                           key={header.id}>
                                                                    {header.isPlaceholder
                                                                        ? null
                                                                        : flexRender(
                                                                            header.column.columnDef.Header ??
                                                                            header.column.columnDef.header,
                                                                            header.getContext(),
                                                                        )}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))}
                                                </TableHead>
                                                <TableBody>
                                                    {table.getRowModel().rows.map((row) => (
                                                        <TableRow style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: selectedDataKeyForProductList.includes(row?.id) ? '#eaebf3' : 'white'
                                                        }} key={row.id} selected={row.getIsSelected()}
                                                                  onClick={() => getSelectedData(row?.original)}>
                                                            {row.getVisibleCells().map((cell) => (
                                                                <TableCell align="center" variant="body" key={cell.id}>
                                                                    <MRT_TableBodyCellValue cell={cell} table={table}/>
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div style={{height: "100vh"}}>
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
        </>
    );
};

export default ProductInitialization;