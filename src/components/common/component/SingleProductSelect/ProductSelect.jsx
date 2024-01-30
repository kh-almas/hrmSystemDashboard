import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ProductSelectTable from "./ProductSelectTable";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';

const ProductSelect = ({selected, setSelected, data, headCells, showSelected, setShowSelected}) => {
    const inputRef = useRef(null);
    const secondBoxRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        if (Object.keys(selected).length > 0){
            setIsFocused(false);
        }

    }, [selected])

    const handleBoxClick = (event) => {
        event.stopPropagation();
        if (inputRef.current) {
            inputRef.current.focus();
            setIsFocused(true);
        }
    };

    useEffect(() => {
        setSortedData(data);
    }, [data]);

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

    const handleDelete = (id) => {
        const afterdelete = selected?.filter(item => item.id !== id);
        setSelected(afterdelete);
    };

    const [boxHeight, setBoxHeight] = useState(46);
    const boxRef = useRef(null);

    useEffect(() => {
        const updateBoxHeight = () => {
            if (boxRef.current) {
                const height = boxRef.current.getBoundingClientRect().height;
                setBoxHeight(height);
            }
        };

        updateBoxHeight();
        window.addEventListener('resize', updateBoxHeight);

        return () => {
            window.removeEventListener('resize', updateBoxHeight);
        };
    }, [selected]);

    function searchAndSort(input) {
        const lowerCaseInput = input.toLowerCase();

        const filteredAndSortedArray = data
            .filter(obj => {
                return Object.values(obj).some(value => {
                    if (typeof value === 'string' || typeof value === 'number') {
                        const stringValue = typeof value === 'number' ? value.toString() : value;
                        return stringValue.toLowerCase().includes(lowerCaseInput);
                    }
                    return false;
                });
            })
            .sort((a, b) => {
                const valueA = Object.values(a).join('').toLowerCase();
                const valueB = Object.values(b).join('').toLowerCase();
                return valueA.localeCompare(valueB);
            });

        setSortedData(filteredAndSortedArray);
    }

    return (
        <Box sx={{position: "relative"}}>
            <TextField
                autoComplete={'off'}
                focused={selected?.[0]?.name}
                id="filled-basic"
                disablePortal
                size={'small'}
                label="Select Product"
                value={showSelected}
                inputRef={inputRef}
                onClick={handleBoxClick}
                onFocus={handleBoxClick}
                onChange={(e) => {
                    searchAndSort(e.target.value);
                    setShowSelected(e.target.value)
                    setSelected([])
                }}
                sx={{
                    width: '100%',
                    marginTop: 3,
                    '& label': {
                        fontSize: 12,
                    },
                    '& label.Mui-focused': {
                        fontSize: 16
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {showSelected && (
                                <IconButton
                                    size="small"
                                    sx={{
                                        '& .MuiSvgIcon-root':{
                                            fontSize:16
                                        }
                                    }}
                                    onClick={() => {
                                        setShowSelected('');
                                        setSelected([]);
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            )}
                            <IconButton
                                size="small"
                                sx={{
                                    '& .MuiSvgIcon-root':{
                                        fontSize:16
                                    }
                                }}
                                onClick={handleBoxClick}
                            >
                                <ArrowDropDownIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            {/*    </Box>*/}

            {/*</Box>*/}
            {isFocused && (
                <Box
                    ref={secondBoxRef}
                    component="form"
                    sx={{
                        position: 'absolute',
                        top: `calc(${boxHeight}px + 12px)`,
                        width: '100%',
                        border: '1px solid red',
                        backgroundColor: '#ffffff',
                        zIndex: 9999,
                        borderRadius: '5px',
                        padding: '7px'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <ProductSelectTable selected={selected} setSelected={setSelected} data={sortedData} setShowSelected={setShowSelected} headCells={headCells}></ProductSelectTable>
                </Box>
            )}
        </Box>
    );
};

export default ProductSelect;
