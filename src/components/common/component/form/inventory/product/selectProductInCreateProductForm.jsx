import React, {useEffect, useState, useRef, useContext} from 'react';
import {
    MRT_GlobalFilterTextField,
    MRT_TableBodyCellValue,
    MRT_TablePagination,
    MRT_ToolbarAlertBanner,
    flexRender,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import Popover from '@mui/material/Popover';
import axios from "../../../../../../axios";
import CustomSelectProvider, {SelectContext} from "../../../../../Provider/CustomSelectProvider";

const SelectProductInCreateProductForm = ({ setSelectedProductForCombo, updateSelectedProduct}) => {
    // const {
    //     MultiselectShowForAddProductInInventory,
    //     hideMultiselectModalForAddProductInInventoryFn,
    //     setMultiselectShowForAddProductInInventory,
    //     showMultiselectModalForAddProductInInventoryFn,
    //     excludedDivRefForAddProductInInventory
    // } = useContext(SelectContext);
    const [data, setData] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);
    const [showSelectDataAllInfo, setShowSelectDataAllInfo] = useState([]);


    useEffect(() => {
        setRowSelection(updateSelectedProduct);
    }, [updateSelectedProduct])

    useEffect(() => {
        const keysArray = Object.keys(rowSelection);
        const filteredData = data?.filter(singleData => keysArray.includes(singleData?.id?.toString()));
        setShowSelectDataAllInfo(filteredData);
        setSelectedProductForCombo([]);
        setSelectedProductForCombo(filteredData);
    }, [rowSelection]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(`/inventory-management/products/list`)
                    .then(getData => {
                        setData(getData?.data?.body?.data);
                    })
            } catch (error) {
                console.error(error);
                return;
            }
        };
        fetchData()
    }, []);


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
            accessorKey: 'hsn',
            header: 'HSN',
        },
        {
            accessorKey: 'barcode_type',
            header: 'Barcode',
        },
    ];


    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: true,
        enableBottomToolbar: false,
        // enableStickyHeader: true,
        // enableStickyFooter: true,
        // muiTableContainerProps: { sx: { height: '200px' } },
        // muiTableBodyCellProps: {
        //     sx: (theme) => ({
        //         backgroundColor:
        //             theme.palette.mode === 'dark'
        //                 ? theme.palette.grey[900]
        //                 : theme.palette.grey[50],
        //     }),
        // },
        initialState: {
            pagination: { pageSize: 5, pageIndex: 0 },
            showGlobalFilter: true,
        },
        iconActive: {
            display: 'none',
        },
        getRowId: (row) => row.id,
        onRowSelectionChange: setRowSelection,
        enablePagination: false,
        state: {
            rowSelection
        },
    });

    const checkfn = (e) => {
        console.log(e.target.tagName)
    }

    const [show, setShow] = useState(false);
    const containerRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target)
        ) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div>
                <Box
                    // onClick={showMultiselectModal}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center', width: "fit-content"
                    }}
                >
                    <MRT_GlobalFilterTextField
                        table={table}
                        // onFocus={(e) => showMultiselectModalForAddProductInInventoryFn()}
                        // onBlur={(e) => hideMultiselectModalForAddProductInInventoryFn()}
                    />
                </Box>
            {
                show ?
                    <div>
                        <div style={{
                            width: '400px',
                            height: '700px',
                            backgroundColor: 'red',
                            position: 'absolute',
                        }}
                             onClick={() => setShow(true)}
                        >
                            <div id="table" style={{ backgroundColor: 'white', height: '400px', width: '500px', overflow: "hidden"}}>
                                <TableContainer style={{height: '400px'}}>
                                    <Table>
                                        {/* Use your own markup, customize however you want using the power of TanStack Table */}
                                        <TableHead style={{position: 'sticky', top: 0, zIndex:100, backgroundColor: 'white'}}>
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <TableRow key={headerGroup.id}>
                                                    {headerGroup.headers.map((header) => (
                                                        <TableCell align="center" variant="head" key={header.id}>
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
                                                <TableRow key={row.id} selected={row.getIsSelected()}>
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell align="center" variant="body" key={cell.id}>
                                                            {/* Use MRT's cell renderer that provides better logic than flexRender */}
                                                            <MRT_TableBodyCellValue cell={cell} table={table} />
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div> : ''
            }


        </div>
    );
};

export default SelectProductInCreateProductForm;
