import React, {useEffect, useMemo, useState} from 'react';
import { Box, Stack } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
// import { data } from './makeData';
import getDailyAttendanceReportsAPI from "../../../common/Query/hrm/forSort/getDailyAttendanceReportsAPI";

const GridCheck = () => {
    const [data, setData] = useState([]);
    const [tableInfo, setTableInfo] = useState([]);
    const [groupingItem, setGrouping] = useState('');

    // const averageSalary = useMemo(
    //     () => data.reduce((acc, curr) => acc + curr.salary, 0) / data.length,
    //     [],
    // );

    console.log('tableInfo', tableInfo);

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

                // const inputString = 'in_time_s_p_t';
                const { longWords, singleChars } = splitString(singleData);

                console.log('Long Words:', longWords);
                console.log('Single Characters:', singleChars);





        //         const words = key.split('_');
        //         let firstTwoWords = '';
        //         const otherWords = [];
        //
        //         for (let i = 0; i < words.length; i++) {
        //             if (i < 2) {
        //                 firstTwoWords =
        //             } else {
        //                 otherWords.push(words[i]);
        //             }
        //         }
                const newObj = {
                    header: longWords,
                    accessorKey: singleData,
                }

                console.log('newObj', newObj)
                setTableInfo(setInfo => [...setInfo, newObj])
                setGrouping('date');
            })

            console.log(objectKeys);
        }else{
            // console.log('dfghgt')
        }
    }, [data])

    const FindMax = useMemo(
        () => data.reduce((acc, curr) => Math.max(acc, curr.age), 0),
        [],
    );

    const columns = useMemo(
        () => [
            {
                header: 'Date',
                accessorKey: 'date',
            },
            {
                header: 'Name',
                accessorKey: 'employee_name',
                enableGrouping: false,
            },
            {
                header: 'Designation',
                accessorKey: 'desig_name',
            },
            {
                header: 'In Time',
                accessorKey: 'in_time',
                aggregationFn: 'max',
                AggregatedCell: ({ cell, table }) => (
                    <>
                        Oldest by{' '}
                        {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
                        <Box
                            sx={{ color: 'info.main', display: 'inline', fontWeight: 'bold' }}
                        >
                            {cell.getValue()}
                        </Box>
                    </>
                ),
                Footer: () => (
                    <Stack>
                        Max Age:
                        <Box color="warning.main">{Math.round(FindMax)}</Box>
                    </Stack>
                ),
            },
            {
                header: 'Out Time',
                accessorKey: 'out_time',
            },
            {
                header: 'Late',
                accessorKey: 'late',
            },
            {
                header: 'Early Out',
                accessorKey: 'early_out',
            },
            {
                header: 'Over Time',
                accessorKey: 'over_time',
            },
            // {
            //     header: 'First Name',
            //     accessorKey: 'firstName',
            //     enableGrouping: false, //do not let this column be grouped
            // },
            // {
            //     header: 'Last Name',
            //     accessorKey: 'lastName',
            // },
            // {
            //     header: 'Age',
            //     accessorKey: 'age',
            //     aggregationFn: 'max', //show the max age in the group (lots of pre-built aggregationFns to choose from)
                //required to render an aggregated cell
                // AggregatedCell: ({ cell, table }) => (
                //     <>
                //         Oldest by{' '}
                //         {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
                //         <Box
                //             sx={{ color: 'info.main', display: 'inline', fontWeight: 'bold' }}
                //         >
                //             {cell.getValue()}
                //         </Box>
                //     </>
                // ),
                // Footer: () => (
                //     <Stack>
                //         Max Age:
                //         <Box color="warning.main">{Math.round(maxAge)}</Box>
                //     </Stack>
                // ),
            // },
            // {
            //     header: 'Gender',
            //     accessorKey: 'gender',
                //optionally, customize the cell render when this column is grouped. Make the text blue and pluralize the word
                // GroupedCell: ({ cell, row }) => (
                //     <Box sx={{ color: 'primary.main' }}>
                //         <strong>{cell.getValue()}s </strong> ({row.subRows?.length})
                //     </Box>
                // ),
            // },
            // {
            //     header: 'State',
            //     accessorKey: 'state',
            // },
            // {
            //     header: 'Salary',
            //     accessorKey: 'salary',
            //     aggregationFn: 'mean',
                //required to render an aggregated cell, show the average salary in the group
                // AggregatedCell: ({ cell, table }) => (
                //     <>
                //         Average by{' '}
                //         {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
                //         <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
                //             {cell.getValue()?.toLocaleString?.('en-US', {
                //                 style: 'currency',
                //                 currency: 'USD',
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             })}
                //         </Box>
                //     </>
                // ),
                // //customize normal cell render on normal non-aggregated rows
                // Cell: ({ cell }) => (
                //     <>
                //         {cell.getValue()?.toLocaleString?.('en-US', {
                //             style: 'currency',
                //             currency: 'USD',
                //             minimumFractionDigits: 0,
                //             maximumFractionDigits: 0,
                //         })}
                //     </>
                // ),
                // Footer: () => (
                //     <Stack>
                //         Average Salary:
                //         <Box color="warning.main">
                //             {averageSalary?.toLocaleString?.('en-US', {
                //                 style: 'currency',
                //                 currency: 'USD',
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             })}
                //         </Box>
                //     </Stack>
                // ),
            // },
        ],
        // [averageSalary, maxAge],
        [data],
    );

    useEffect(() => {
        // console.log('selectedCompany', selectedCompany, 'selectedBranch', selectedBranch, 'dateFrom', dateFrom, 'dateTo', dateTo, 'selectedDepartment', selectedDepartment)
        const getDailyAttendanceReport = async () => {
            const getData = await getDailyAttendanceReportsAPI();
            setData(getData?.data?.body?.data?.data[0]?.branch[0]?.branch?.attendance);
            // console.log(getData?.data?.body?.data?.data[0]?.branch[0]?.branch?.attendance);
        }
        getDailyAttendanceReport();

    }, [])

    console.log([groupingItem], 'groupingItem')


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
export default GridCheck;