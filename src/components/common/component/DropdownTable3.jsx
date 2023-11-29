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
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from "../../../axios";

const DropdownTable3 = () => {
    const [data, setData] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);
    // const [processedData, setProcessedData] = useState([]);
    // const [rowCount, setRowCount] = useState(0);
    // console.log(rowSelection)

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(`http://localhost:5000/hrm-system/employee/`)
                    .then(getData => {
                        setData(getData?.data?.body?.data?.data);
                        // console.log(getData?.data?.body?.data?.data)
                    })
            } catch (error) {
                // setIsError(true);
                console.error(error);
                return;
            }
            // setIsRefetching(false);
        };
        fetchData()
    }, []);

    const columns = [
        {
            accessorKey: 'full_name',
            header: 'Name',
        },
        {
            accessorKey: 'deg_name',
            header: 'Designation',
        },
        {
            accessorKey: 'dept_name',
            header: 'Department',
        },
    ];

    const table = useMaterialReactTable({
        columns,
        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //MRT display columns can still work, optionally override cell renders with `displayColumnDefOptions`
        enableRowSelection: true,
        initialState: {
            pagination: { pageSize: 5, pageIndex: 0 },
            showGlobalFilter: true,
        },
        iconActive: {
            display: 'none',
        },
        getRowId: (row) => row.id,
        onRowSelectionChange: setRowSelection,
        // customize the MRT components
        // muiPaginationProps: {
        //     rowsPerPageOptions: [5, 10, 15],
        //     variant: 'outlined',
        // },
        // paginationDisplayMode: 'pages',
        enablePagination: false,
        state: {
            rowSelection
        },
    });



    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const showModal = (e) => {
        console.log(e.currentTarget);
        setAnchorEl(e.currentTarget);
    }


    return (
        <>
            <Stack sx={{ m: '2rem 0' }}>
                <Box
                    onFocus={(e) => showModal(e)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center', width: "fit-content"
                    }}
                >
                    {/**
                     * Use MRT components along side your own markup.
                     * They just need the `table` instance passed as a prop to work!
                     */}
                    <MRT_GlobalFilterTextField
                        table={table}


                        // onBlur={(e) => hideModal(e)}
                    />
                    {/*<MRT_TablePagination table={table} />*/}
                </Box>


                <div>
                    {/*<Button aria-describedby={id} variant="contained" onClick={handleClick}>*/}
                    {/*    Open Popover*/}
                    {/*</Button>*/}
                    <Popover
                        sx={{height: '600px',}}
                        disableAutoFocus={true}
                        disableEnforceFocus={true}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        {/*<Typography onClick={(e) => hideModal(e)} sx={{ p: 2 }}>The content of the Popover.</Typography>*/}
                        <TableContainer>
                            <Table>
                                {/* Use your own markup, customize however you want using the power of TanStack Table */}
                                <TableHead>
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
                    </Popover>
                </div>
            </Stack>
        </>
    );
};

export default DropdownTable3;
