import React, {useMemo} from "react";
import {useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {yupResolver} from "@hookform/resolvers/yup";

const Input = ({rules, performOnValue, labelName, inputName, inputType, placeholder, defaultValue, validation, error}) => {

    const {
        register
    } = useForm({
        defaultValues: useMemo(()=> {
            return defaultValue;
        }, [defaultValue])
    });
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
                        fontSize: ({ defaultValue }) => (defaultValue ? { xs: '.7rem', md: '12px' } : { xs: '.7rem', md: '16px' }),
                    },
                    '& label': {
                        fontSize: 12
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
        </div>
    );
};

export default Input;
