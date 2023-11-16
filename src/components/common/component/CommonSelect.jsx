import React, {useEffect, useMemo, useState} from 'react';
import axios from "../../../axios";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";

const CommonSelect = () => {
    const [data, setData] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowSelection, setRowSelection] = useState({});
    const [showSelectData, setShowSelectData] = useState([]);

    useEffect(() => {
        const keysArray = Object.keys(rowSelection);
        setShowSelectData(keysArray);
    }, [rowSelection]);

    const handleClose = (e) => {
        e.stopPropagation();
        setToggle(!toggle);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(`http://localhost:5000/hrm-system/employee/`)
                    .then(getData => {
                        setData(getData?.data?.body?.data?.data);
                        setProcessedData(getData?.data?.body?.data?.data);
                        setRowCount(getData?.data?.body?.data?.data?.length);
                    })
            } catch (error) {
                setIsError(true);
                console.error(error);
                return;
            }
            setIsRefetching(false);
        };
        fetchData()
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'full_name',
                header: 'Employee Name',
            },
            {
                accessorKey: 'deg_name',
                header: 'Designation',
            },
        ],
        [],
    );

    useEffect(() => {
        const filterData = processedData.filter(singleData =>
            columnFilters?.every(filterData =>
                String(singleData[filterData?.id]).toLowerCase().includes(String(filterData?.value).toLowerCase())
            )
        );
        setData(filterData)
    }, [columnFilters])

    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: true,
        getRowId: (row) => row.full_name,
        onRowSelectionChange: setRowSelection,
        initialState: { showColumnFilters: true },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        rowCount,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: row.getToggleSelectedHandler(),
            sx: { cursor: 'pointer' },
        }),
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
            rowSelection
        },
    });

    function selectItemAfterRemoveFn(arr) {
        const selectItemAfterRemove = arr.reduce((obj, item) => {
            obj[item] = true;
            return obj;
        }, {});
        setRowSelection(selectItemAfterRemove)
    }

    const handleRemove = (index) => {
        const updatedItems = [...showSelectData];
        updatedItems.splice(index, 1);
        selectItemAfterRemoveFn(updatedItems);
        setShowSelectData(updatedItems);
        setToggle(false)
    };

    const handleRemoveAll = () => {
        setShowSelectData([]);
    };

    const scrollbarStyles = {
        padding: "10px",
        width: '100%',
        zIndex: 5,
        position: "absolute",
        top: "80px",
        border:'1px solid lightGrey',
        borderRadius:'8px',
        boxShadow: "5px 5px 8px 0px #cfcfcf",
        backgroundColor: "#ffffff",
    };

    return (
        <>
            <div  style={{position: "relative", width: "100%"}}>
                <div  style={{  height: "75px", overflowY: "scroll", display:'flex', flexWrap: 'wrap', border: '1px solid #ccc', padding: '5px' }}>
                    {showSelectData.map((item, index) => (
                        <div key={index} style={{ display:'flex',alignItems:'center', marginRight: '5px', marginBottom: '5px', position: 'relative' }}>
                            <div style={{backgroundColor: "lightgray", padding: "5px 5px 3px 5px", borderRadius: "6px"}}>
                                {item}
                                <span>
                                <i onClick={() => handleRemove(index)} style={{fontSize: "17px", cursor: 'pointer', marginLeft: "3px"}} className="icofont icofont-close-line"></i>
                            </span>
                            </div>
                        </div>
                    ))}
                    <input
                        onClick={handleClose}
                        type="text"
                        value={''}
                        // onChange={handleInputChange}
                        // onKeyDown={handleInputKeyDown}
                        placeholder="Type and press Enter to add items"
                        style={{ flex: 1, border: 'none', outline: 'none', maxHeight: "100px", overflowY: "scroll" }}
                    />
                </div>
                {toggle &&
                    <div style={scrollbarStyles}>
                        <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                            <button
                                onClick={() => setToggle(false)}
                                style={{
                                    borderRadius:'5px',
                                    backgroundColor:'#627FF4',
                                    border:0,
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    padding:'6px 12px',
                                    width:'fit-content',
                                    cursor: "pointer"}}>
                                <i  className="icofont icofont-close-line-circled" style={{color: "white", fontSize: '25px', }}></i>
                            </button>
                        </div>
                        <div style={{overflowY: "scroll", height: "400px",}}>
                            <MaterialReactTable table={table}/>
                        </div>
                        {/*<MaterialReactTable sx={{'&::-webkit-scrollbar': { width: 0} }} table={table}/>*/}
                    </div>
                }
            </div>
        </>
    );
};

export default CommonSelect;