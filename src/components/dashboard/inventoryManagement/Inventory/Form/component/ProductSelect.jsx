import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ProductSelect = () => {
    const [showDiv, setShowDiv] = useState(false);
    const [value, setValue] = useState(null);

    const arrayOfObjects = [
        { id: 1, name: 'Object 1' },
        { id: 2, name: 'Object 2' },
        { id: 3, name: 'Object 3' },
        { id: 4, name: 'Object 4' },
        { id: 5, name: 'Object 5' },
        { id: 6, name: 'Object 6' },
        { id: 7, name: 'Object 7' },
        { id: 8, name: 'Object 8' },
        { id: 9, name: 'Object 9' },
        { id: 10, name: 'Object 10' },
    ];

    const handleDivClick = () => {
        setShowDiv(!showDiv);
    };

    return (
        <div className={'mt-5 mb-5'}>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={value}
                onInputChange={(event, newInputValue) => {
                    setValue(newInputValue);
                }}
                options={arrayOfObjects}
                getOptionLabel={(option) => (option ? option?.name : '')}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Custom Autocomplete"
                        focused={showDiv}
                        onClick={handleDivClick}
                    />
                )}
            />
            {showDiv && (
                <div
                    style={{
                        width: '100%', // Adjust the width as needed
                        padding: '10px',
                        height: "500px",
                        backgroundColor: 'white',
                        zIndex: 10,
                        boxShadow: '4px 5px 25px 1px #737373',
                        borderRadius: '7px',
                        top: '50px', // Adjust the position as needed
                    }}
                >
                    {/* Your custom content for the div */}
                    Div Content
                </div>
            )}
        </div>
    );
};

export default ProductSelect;
