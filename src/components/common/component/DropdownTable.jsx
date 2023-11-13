import React, {useEffect, useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/Input';

const DropdownTable = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [showSelectData, setShowSelectData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    console.log(showSelectData, 'showSelectData');

    useEffect(() => {
        setShowSelectData([]);
        selectedRows?.map(singleData => setShowSelectData(pre_list => [...pre_list, singleData.firstName]))
    }, [selectedRows]);




    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    //table
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        }
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    const checkFN = (event) => {
        setAnchorEl(event.currentTarget);
        console.log('akjdfhlak');
    }





    return (
        <>
            {/*<Autocomplete*/}
            {/*    disablePortal*/}
            {/*    id="combo-box-demo"*/}
            {/*    options={top100Films}*/}
            {/*    sx={{ width: 300 }}*/}
            {/*    renderInput={(params) => <TextField {...params} label="Movie" />}*/}
            {/*/>*/}
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={[
                    { label: 'The Shawshank Redemption', year: 1994 },
                    { label: 'The Godfather', year: 1972 },
                    { label: 'The Godfather: Part II', year: 1974 },
                    { label: 'The Dark Knight', year: 2008 },
                    { label: '12 Angry Men', year: 1957 },
                    { label: "Schindler's List", year: 1993 },
                    { label: 'Pulp Fiction', year: 1994 }]}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
            />

            <input onClick={checkFN} name={''} value={showSelectData}/>
            <button onClick={() => setShowSelectData('')}>clear</button>
            {/*<TextField*/}

            {/*    label="Enter your text"*/}
            {/*    variant="outlined"*/}
            {/*    width="450px"*/}
            {/*    // You can add more props as needed*/}
            {/*/>*/}
            <div>
                <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                    Open Popover
                </Button>
                <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}>
                    <Typography sx={{ p: 2 }}>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 13 },
                                },
                            }}
                                checkboxSelection
                                onRowSelectionModelChange={(ids) => {
                                    const selectedIDs = new Set(ids);
                                    const selectedRows = rows.filter((row) =>
                                        selectedIDs.has(row.id)
                                    );
                                    setSelectedRows(selectedRows);
                                }}
                            />
                        </div>
                    </Typography>
                </Popover>
            </div>

        </>
    );
};

export default DropdownTable;