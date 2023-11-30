import React, { useState, useRef, useEffect } from 'react';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {
    flexRender,
    MRT_GlobalFilterTextField,
    MRT_TableBodyCellValue,
    useMaterialReactTable
} from "material-react-table";
import axios from "../../../axios";

const DropdownTable4 = ({ setSelectedProductForCombo, updateSelectedProduct}) => {
    const [show, setShow] = useState(false);
    const containerRef = useRef(null);
    const [data, setData] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);
    const [showSelectDataAllInfo, setShowSelectDataAllInfo] = useState([]);

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

    return (
        <div ref={containerRef}>
            {/*<input*/}
            {/*    onMouseDown={() => setShow(true)}*/}
            {/*    type="text"*/}
            {/*/>*/}
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
                    onMouseDown={() => setShow(true)}
                    // onFocus={(e) => showMultiselectModalForAddProductInInventoryFn()}
                    // onBlur={(e) => hideMultiselectModalForAddProductInInventoryFn()}
                />
            </Box>
            {show && (
                <div
                    style={{
                        width: '400px',
                        backgroundColor: 'red',
                        position: 'absolute',
                    }}
                    onClick={() => setShow(true)}
                >
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
            )}
        </div>
    );
};

export default DropdownTable4;
