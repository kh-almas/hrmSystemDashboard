import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputTest() {
    return (
        <div className="p-5">
            <TextField
                required
                variant='outlined'
                fullWidth
                autoComplete="off"
                size='small'
                type={'text'}
                label='jhghjmtgfuyjhnfherutgukygj'
                placeholder={'placeholder'}

                sx={{
                    '& .MuiFormLabel-root': {
                        // fontSize: { xs: '.7rem', md: '.8rem' },
                        fontWeight: 400,
                    },
                    '& label': {
                        color: 'red',
                        fontSize: 12
                    },
                    '& label.Mui-focused': {
                        color: '#1c2437',
                        fontSize: 16
                    },
                    '& .MuiOutlinedInput-root': {
                        // fontSize: { xs: 12, md: 14 },
                        height: 35,
                        backgroundColor: '#ebebeb',
                        '&.Mui-focused fieldset': {
                            borderColor: '#2a3064',
                            borderWidth: '2px'
                        },
                        // '& fieldset span': {
                        //     paddingRight: '6px',
                        // },
                        // '&.Mui-focused fieldset span': {
                        //     // paddingRight: '6px',
                        // },
                    },
                }} />
        </div>
    );
}