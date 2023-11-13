import React, {useEffect, useState, useMemo} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/Input';
import {MaterialReactTable, useMaterialReactTable,} from 'material-react-table';
import axios from "../../../axios";

const DropdownTable2 = () => {
    const [data, setData] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [toggle, setToggle] = useState(false);

    //table state
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [rowSelection, setRowSelection] = useState({});
    const [showSelectData, setShowSelectData] = useState([]);
    // ["Mr Md. Rakibul Islam Rabbe", "Mr. Rafiqul Islam (Uzzal)", "Mr. Md. Jaj Mea"]
    //
    // {"Mr Md. Rakibul Islam Rabbe ": true, Mr. Rafiqul Islam (Uzzal): true, Mr. Md. Jaj Mea: true}

    useEffect(() => {
        const keysArray = Object.keys(rowSelection);
        setShowSelectData(keysArray);
        console.log(rowSelection);

    }, [rowSelection]);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleClose = (e) => {
        e.stopPropagation();
        setToggle(!toggle);
    };

    // const id = open ? 'simple-popover' : undefined;

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
    // }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting,]);

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

    //search data
    useEffect(() => {
        const filterData = processedData.filter(singleData =>
            columnFilters?.every(filterData =>
                String(singleData[filterData?.id]).toLowerCase().includes(String(filterData?.value).toLowerCase())
            )
        );
        setData(filterData)
        // handleClose();
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
        width: '50%',
        zIndex: 5,
        position: "absolute",
        top: "80px",
        border:'1px solid lightGrey',
        borderRadius:'8px',
        boxShadow: "5px 5px 8px 0px #cfcfcf",
        backgroundColor: "#ffffff",
    };

    return (
        <div  style={{position: "relative"}}>
            <div  style={{  maxHeight: "75px", overflowY: "scroll", display:'flex', flexWrap: 'wrap', marginTop: '10px', border: '1px solid #ccc', padding: '5px' }}>
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
            {/*<button onClick={() => setShowSelectData('')}>clear</button>*/}
            <div>
                <div class="container mt-5">
                    <div class="card" style={{width: "18rem"}}>
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="Placeholder Image" />
                            <div class="card-body">
                                <h5 class="card-title">Card Title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                </div>
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
    );
};

export default DropdownTable2;