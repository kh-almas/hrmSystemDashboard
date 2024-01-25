import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ProductSelectTable from "./ProductSelectTable";
import Chip from '@mui/material/Chip';

const ProductSelect = () => {
    const inputRef = useRef(null);
    const secondBoxRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleBoxClick = (event) => {
        event.stopPropagation();
        if (inputRef.current) {
            inputRef.current.focus();
            setIsFocused(true);
        }
    };

    const handleClickOutside = (event) => {
        if (secondBoxRef.current && !secondBoxRef.current.contains(event.target)) {
            setIsFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    return (
        <Box sx={{
            position: "relative",
        }}>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    width: '100%',
                    border: '1px solid red',
                    marginBottom: 3,
                    zIndex: 999,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 1

                }}
                noValidate
                autoComplete="off"
                onClick={handleBoxClick}
            >
                <Box
                    sx={{
                        marginRight: "3px"
                    }}
                >
                    <Chip label="Deletable" onDelete={handleDelete} />
                </Box>
                <TextField
                    id="filled-basic"
                    label="Filled"
                    variant="filled"
                    size={'small'}
                    inputRef={inputRef}
                    sx={{
                        width: 300,
                        '& label': {
                            fontSize: 12,
                        },
                        '& label.Mui-focused': {
                            fontSize: 16,
                        },
                    }}
                />
            </Box>
            {isFocused && (
                <Box
                    ref={secondBoxRef}
                    component="form"
                    sx={{
                        // display: 'flex',
                        // width: '100%',
                        // border: '1px solid red',
                        // marginBottom: 3,
                        position: 'absolute',
                        top: '46px',
                        width: '100%',
                        // height: '500px',
                        border: '1px solid red',
                        backgroundColor: '#ffffff',
                        zIndex: 9999,
                        borderRadius: '5px',
                        padding: '7px'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <ProductSelectTable></ProductSelectTable>
                </Box>
            )}
        </Box>
    );
};

export default ProductSelect;
