import React, {useEffect, useMemo, useState} from 'react';
import { Box, Stack } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import axios from "../../../axios";

const MaterialReactTableExample = () => {
    const [data, setData] = useState([]);
    const [tableInfo, setTableInfo] = useState([]);
    const [groupingItem, setGrouping] = useState('');

    useEffect(() => {
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
                    if(s_char == 's'){
                        setTableInfo(setInfo => [...setInfo, newObj])
                    }
                    if(s_char == 'g'){
                        setGrouping(singleData);
                    }
                })

            })
        }
    }, [data])

    const FindMax = useMemo(
        () => data.reduce((acc, curr) => Math.max(acc, curr.age), 0),
        [],
    );

    useEffect(() => {
        const getDailyAttendanceReport = async () => {
            axios.get('/hrm-system/check/table/info')
                .then(getData => {
                    setData(getData.data.body.data.data);
                })
        }
        getDailyAttendanceReport();

    }, [])


    return (
        <>
            {
                groupingItem ?
                    <MaterialReactTable
                        columns={tableInfo}
                        data={data}
                        enableColumnResizing
                        enableGrouping
                        enableStickyHeader
                        initialState={{
                            density: 'compact',
                            expanded: true, //expand all groups by default
                            grouping: [groupingItem], //an array of columns to group by by default (can be multiple)
                            pagination: { pageIndex: 0, pageSize: 20 },
                            // sorting: [{ id: 'state', desc: false }], //sort by state by default
                        }}
                        muiToolbarAlertBannerChipProps={{ color: 'secondary' }}
                        muiTableContainerProps={{ sx: { maxHeight: 700 } }}
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

export default MaterialReactTableExample;