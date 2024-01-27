import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ProductSelectTable from "./ProductSelectTable";
import Chip from '@mui/material/Chip';

const ProductSelect = ({selected, setSelected, data, setData}) => {
    // state that need to pass
    // const [selected, setSelected] = React.useState([]);

    // console.log('data', data)


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

    const handleDelete = (id) => {
        const afterdelete = selected?.filter(item => item.id !== id);
        setSelected(afterdelete);
        // console.info('You clicked the delete icon.', afterdelete);
    };

    const [boxHeight, setBoxHeight] = useState(46); // Default height, adjust as needed
    const boxRef = useRef(null);

    useEffect(() => {
        const updateBoxHeight = () => {
            if (boxRef.current) {
                const height = boxRef.current.getBoundingClientRect().height;
                setBoxHeight(height);
            }
        };

        updateBoxHeight(); // Initial update
        window.addEventListener('resize', updateBoxHeight);

        return () => {
            window.removeEventListener('resize', updateBoxHeight);
        };
    }, [selected]); // Update when the selected items change

    const allData = [
        { id: 2, name: 'Donut', calories: 'asd', fat: 25.0, carbs: 51, protein: 4.9 },
        { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
        { id: 4, name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
        { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
        { id: 6, name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
        { id: 7, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
        { id: 8, name: 'Jelly Bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0 },
        { id: 9, name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
        { id: 10, name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0.0 },
        { id: 11, name: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2.0 },
        { id: 12, name: 'Nougat', calories: 360, fat: 19.0, carbs: 9, protein: 37.0 },
        { id: 13, name: 'Oreo', calories: 437, fat: 18.0, carbs: 63, protein: 4.0 }
    ];

    useEffect(() => {
        setData(allData);
    }, [])



    function searchAndSort(input) {
        // console.log('input', input);
        const lowerCaseInput = input.toLowerCase();

        const filteredAndSortedArray = allData
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

        setData(filteredAndSortedArray);
        // console.log('filteredAndSortedArray', filteredAndSortedArray);
    }

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
                    alignItems: 'center',
                    paddingLeft: 1,
                    minHight: `${boxHeight}px`,

                }}
                noValidate
                autoComplete="off"
                onClick={handleBoxClick}
            >
                <Box
                    sx={{marginRight: "3px"}}
                    ref={boxRef}
                >
                    {
                        selected?.map(item => <Chip label={item.name} onDelete={() => handleDelete(item.id)} sx={{margin: "2px"}} />)
                    }

                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        size={'small'}
                        inputRef={inputRef}
                        onChange={(e) => {
                            searchAndSort(e.target.value)
                            // console.log(e.target.value)
                        }}
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

            </Box>
            {isFocused && (
                <Box
                    ref={secondBoxRef}
                    component="form"
                    sx={{
                        position: 'absolute',
                        top: `calc(${boxHeight}px + 4px)`,
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
                    <ProductSelectTable selected={selected} setSelected={setSelected} data={data}></ProductSelectTable>
                </Box>
            )}
        </Box>
    );
};

export default ProductSelect;
