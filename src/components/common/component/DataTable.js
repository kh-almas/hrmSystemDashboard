import React, {useEffect, useMemo, useState} from 'react';
import {MaterialReactTable} from "material-react-table";
import {Box, IconButton} from "@mui/material";
import {Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";
import axios from "../../../axios";
import {Link} from "react-router-dom";

const DataTable = ({ getAllData, handleDelete, editLink = '', toggleUpdateModal, setValueForEdit }) => {
    const [data, setData] = useState([]);
    const [tableInfo, setTableInfo] = useState([]);
    const [groupingItem, setGrouping] = useState('');

    useEffect(() => {
        setData([])
        setData(getAllData);
    }, [getAllData])

    useEffect(() => {
        // setTableInfo([]);
        // setGrouping([])
        if(data?.length > 0 ){
            const objectKeys = Object.keys(data[0]);

            objectKeys.map(singleData => {
                function splitString(inputString) {
                    const wordsArray = inputString.split('_');
                    const longWords = [];
                    const singleChars = [];

                    wordsArray.forEach((word) => {
                        if (word.length === 1) {
                            singleChars.push(word);
                        } else {
                            longWords.push(word);
                        }
                    });

                    const capitalizedLongWords = longWords.map(word => word.charAt(0).toUpperCase() + word.slice(1));

                    return { longWords: capitalizedLongWords.join(' '), singleChars };
                }
                const { longWords, singleChars } = splitString(singleData);
                const newObj = {
                    header: longWords,
                    accessorKey: singleData,
                }

                singleChars?.map(s_char => {
                    if(s_char == 'm'){
                        newObj.aggregationFn = 'max';
                        newObj.AggregatedCell = ({ cell, table }) => (
                            <>
                                Oldest by{' '}
                                {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
                                <Box
                                    sx={{ color: 'info.main', display: 'inline', fontWeight: 'bold' }}
                                >
                                    {cell.getValue()}
                                </Box>
                            </>
                        );
                    }
                    if(s_char == 'a'){
                        newObj.aggregationFn = 'mean';
                        newObj.AggregatedCell = ({ cell, table }) => (
                            <>
                                Average by{' '}
                                {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
                                <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
                                    {cell.getValue()?.toLocaleString?.('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}
                                </Box>
                            </>
                        );
                    }
                    if(s_char == 'i'){
                        newObj.Cell = ({ cell }) => <img src={`http://localhost:5000/${cell.getValue()}`} alt="User Avatar" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />;
                    }
                    if(s_char == 's'){
                        setTableInfo(prevInfo => {
                            if (!prevInfo.some(item => item.accessorKey === newObj.accessorKey)) {
                                return [...prevInfo, newObj];
                            }
                            return prevInfo;
                        });
                    }
                    if(s_char == 'g'){
                        setGrouping(singleData);
                    }
                })
            })
        }
    }, [data])

    // const FindMax = useMemo(
    //     () => data.reduce((acc, curr) => Math.max(acc, curr.age), 0),
    //     [],
    // );

    return (
        <>
            {
                groupingItem ?
                    <MaterialReactTable
                        columns={tableInfo}
                        data={data}
                        enableGrouping
                        enableStickyHeader
                        initialState={{
                            density: 'compact',
                            expanded: true, //expand all groups by default
                            grouping: [groupingItem], //an array of columns to group by default (can be multiple)
                            pagination: { pageIndex: 0, pageSize: 10 },
                            // sorting: [{ id: 'state', desc: false }], //sort by state by default
                        }}
                        muiToolbarAlertBannerChipProps={{ color: 'secondary' }}
                        muiTableContainerProps={{ maxHeight: 700}}
                        enableRowActions
                        renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: "center", alignItems: "center" }}>

                                {
                                    editLink ?
                                        <Link to={`${process.env.PUBLIC_URL}${editLink}${row?.original?.id}`}>
                                            <EditIcon />
                                        </Link> :
                                        <IconButton
                                            color="secondary"
                                            onClick={() => {
                                                setValueForEdit(row);
                                                toggleUpdateModal();
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>

                                }


                                <IconButton
                                    color="error"
                                    onClick={() => {
                                        // data.splice(row.index, 1); //assuming simple data table
                                        // setData([...data]);
                                        handleDelete(row?.original?.id)
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
        </>
    );
};

export default DataTable;