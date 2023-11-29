import React, { useEffect, useState, useRef } from 'react';
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

const SelectProductInCreateProductForm = ({data, excludedDivRef, setSelectedProductForCombo, updateSelectedProduct, showMultiselectModal, MultiselectShow, columns}) => {

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
                        onFocus={(e) => showMultiselectModal(e)}
                    />
                </Box>
            {
                MultiselectShow ?
                    <>
                        <div ref={excludedDivRef} style={{ backgroundColor: 'white', height: '400px', width: '500px', zIndex: "100", position: "absolute", overflow: "hidden"}}>
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
                    </> : ''
            }


        </div>
    );
};

export default SelectProductInCreateProductForm;
