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
            {/*        <TextF*/}
            {/*            style={inputStyle}*/}
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
                        // fontSize: { xs: '.7rem', md: '.8rem' },
                        fontWeight: 400,
                    },
                    '& label': {
                        fontSize: 12
                    },
                    '& label.Mui-focused': {
                        color: '#1c2437',
                        fontSize: 16
                    },
                    '& .MuiInputBase-root': {
                        // fontSize: { xs: 12, md: 14 },
                        height: 35,
                        backgroundColor: 'white',
                        '& fieldset': {
                            borderColor: `${error ?  'red' : '#979797' }`,
                            borderWidth: '1px'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: `${error ?  'red' : '#979797' }`,
                            borderWidth: '1px'
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
};

export default Input;
