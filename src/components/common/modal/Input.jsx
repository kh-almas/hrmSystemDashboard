import React, {useMemo} from "react";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";

const Input = ({rules, performOnValue, labelName, inputName, inputType, placeholder, defaultValue, validation, error, disabled}) => {

    // const {
    //     register
    // } = useForm({
    //     defaultValues: useMemo(()=> {
    //         return defaultValue;
    //     }, [defaultValue])
    // });

    useMemo(()=> {
        return defaultValue;
    }, [defaultValue])

    return (
        <div className={"mt-3"}>
            {/*<div className="theme-form">*/}
            {/*    <div className="mb-2 form-group">*/}
            {/*        <label style={{fontSize: "11px",}} htmlFor={inputName}>{`${labelName ? `${labelName} :` : ''}`} {error?.type === 'required' ?*/}
            {/*            <span className="text-danger">(Required)</span> : ''}</label>*/}
            {/*        <input*/}
            {/*            // style={inputStyle}*/}
            {/*            className={`form-control ${error?.type === 'required' ? "is-invalid" : ''}`}*/}
            {/*            id={inputName}*/}
            {/*            type={inputType}*/}
            {/*            name={inputName}*/}
            {/*            placeholder={placeholder}*/}
            {/*            defaultValue={defaultValue}*/}
            {/*            {...validation}*/}
            {/*        />*/}
            {/*        <span style={{fontSize: '10px'}}>{error?.type !== 'required' ? error?.message : ''}</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <TextField
                focused={defaultValue ? true : false}
                variant='outlined'
                fullWidth
                autoComplete="off"
                size='small'
                type={inputType}
                label={labelName}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...validation}
                onChange={performOnValue}

                sx={{
                    '& .MuiFormLabel-root': {
                        fontWeight: 400,
                        fontSize: { xs: '.7rem', md: '12px' },
                    },
                    '& label': {
                        fontSize: 12,
                    },
                    '& label.Mui-focused': {
                        color: '#1c2437',
                        fontSize: 16
                    },
                    '& .MuiOutlinedInput-root': {
                        // fontSize: { xs: 12, md: 14 },
                        height: 35,
                        backgroundColor: 'white',
                        '&.Mui-focused fieldset': {
                            borderColor: '#979797',
                            borderWidth: '1px'
                        },
                    },
                }} />
            <span style={{fontSize: '10px'}}>{error?.message}</span>
        </div>
    );
};

export default Input;
