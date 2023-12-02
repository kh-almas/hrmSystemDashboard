import React, { useState, useRef, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {
    flexRender,
    MRT_GlobalFilterTextField,
    MRT_TableBodyCellValue,
    useMaterialReactTable
} from "material-react-table";
import axios from "../../../../../../axios";

const SelectProductInCreateProductForm = ({ setSelectedProductForCombo, updateSelectedProduct }) => {
    const [show, setShow] = useState(false);
    const containerRef = useRef(null);
    const [data, setData] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);
    const [selectedData, setSelectedData] = useState([]);

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputClick = () => {
        if (!show) {
            setShow(true);
        }
    };

    const getSelectedData = (data) => {
        console.log(data);
        setShow(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/inventory-management/products/list`);
                setData(response?.data?.body?.data);
            } catch (error) {
                console.error(error);
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
        <div ref={containerRef} style={{ width: '250px' }}>
            <div>
                <MRT_GlobalFilterTextField
                    onClick={handleInputClick}
                    style={{ width: '250px' }}
                    table={table}
                    onFocus={() => setShow(true)}
                />
            </div>
            {show && (
                <div
                    style={{
                        width: '400px',
                        backgroundColor: 'white',
                        position: 'absolute',
                        zIndex: 10
                    }}
                >
                    <TableContainer style={{ height: '400px' }}>
                        <Table>
                            <TableHead style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'white' }}>
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
                                    <TableRow style={{ cursor: 'pointer' }} key={row.id} selected={row.getIsSelected()} onClick={() => getSelectedData(row?.original)}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell align="center" variant="body" key={cell.id}>
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

export default SelectProductInCreateProductForm;
