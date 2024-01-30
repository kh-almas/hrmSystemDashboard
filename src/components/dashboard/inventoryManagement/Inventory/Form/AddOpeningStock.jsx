import React, {useEffect, useState} from 'react';
import Select from "../../../../common/modal/Select";
import {Box} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Input from "../../../../common/modal/Input";
import TextField from "@mui/material/TextField";
import Submitbtn from "../../../../common/button/Submitbtn";
import {useForm} from "react-hook-form";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@mui/material/Autocomplete";
import {Button} from "react-bootstrap";
import axios from "../../../../../axios";
import getAllBranch from "../../../../common/Query/hrm/GetAllBranch";
import getAllSKUForSelect from "../../../../common/Query/inventory/GetAllSKUForSelect";
import dayjs from "dayjs";
import moment from 'moment';
import Swal from "sweetalert2";
import ProductSelect from "./component/ProductSelect";
import DataTable from "../../../../common/component/DataTable";

const AddOpeningStock = () => {
    const [selectedBranch, setSelectedBranch] = useState({});
    const [batchNo, setBatchNo] = useState('');
    const [uniqueKey, setUniqueKey] = useState('');
    const [selected, setSelected] = React.useState([]);
    const [showSelected, setShowSelected] = React.useState('');

    const [branch, setBranch] = useState([]);
    const [sku, setSku] = useState([]);
    const [date, setDate] = useState('');
    const [data, setData] = React.useState([]);
    const {register, handleSubmit, formState: { errors },clearErrors} = useForm();
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = getAllBranch();
    const [allSkuStatus, allSkuReFetch, allSku, allSkuError] = getAllSKUForSelect();

    useEffect(() => {
        setShowSelected(selected?.[0]?.name);
        console.log('selected', )
    }, [selected]);
    function generateSkuCode(count) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let skuCode = '';

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            skuCode += characters.charAt(randomIndex);
        }

        return skuCode;
    }



    useEffect(() => {
        const batchNo = generateSkuCode(12);
        setBatchNo(batchNo);

        const uniqueId = generateSkuCode(8);
        setUniqueKey(uniqueId);

        setDate(moment(new Date()).format('YYYY-MM-DD'));
    }, [])

    const onSubmit = (data) => {
        data.branch_id = selectedBranch?.id;
        data.date = date;
        data.sku_id = selected?.[0]?.id;
        data.batch_no = batchNo;
        data.unique_key = `opening_stock_${uniqueKey}`;
        axios.post('/inventory-management/stock/opening/add', data)
            .then(info => {
                if(info?.status == 200)
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(e => {
                console.log(e);
                if(e?.response?.data?.body?.message?.errno == 1062){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Can not duplicate variant name',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        // title: `${e?.response?.data?.body?.message?.details?.[0].message}`,
                        title: `Something is wrong`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    useEffect(() => {
        setBranch(allBranch?.data?.body?.data?.data);
    }, [allBranch])
    //
    useEffect(() => {
        setData(allSku?.data?.body?.data);
    }, [allSku])



    return (
        <>
            <div className="p-30">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        {/*<div>*/}
                        {/*    <TextField*/}
                        {/*        readOnly*/}
                        {/*        variant='outlined'*/}
                        {/*        fullWidth*/}
                        {/*        autoComplete="off"*/}
                        {/*        size='small'*/}
                        {/*        type='text'*/}
                        {/*        value={batchNo}*/}
                        {/*        label='Batch no'*/}
                        {/*        {...register('batch_no', {*/}
                        {/*            required: 'This field is required',*/}
                        {/*        })}*/}
                        {/*        onChange={e => {*/}
                        {/*            clearErrors(["batch_no"])*/}
                        {/*        }}*/}
                        {/*        sx={{*/}
                        {/*            marginTop: 2,*/}
                        {/*            '& .MuiFormLabel-root': {*/}
                        {/*                fontWeight: 400,*/}
                        {/*                fontSize: 14,*/}
                        {/*            },*/}
                        {/*            '& label': {},*/}
                        {/*            '& label.Mui-focused': {*/}
                        {/*                color: '#1c2437',*/}
                        {/*                fontSize: 16*/}
                        {/*            },*/}
                        {/*            '& .MuiOutlinedInput-root': {*/}
                        {/*                height: 35,*/}
                        {/*                backgroundColor: 'white',*/}
                        {/*                '&.Mui-focused fieldset': {*/}
                        {/*                    borderColor: '#979797',*/}
                        {/*                    borderWidth: '1px'*/}
                        {/*                },*/}
                        {/*            },*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*    {errors.batch_no && <span style={{ fontSize: '10px' }}>{errors.batch_no.message}</span>}*/}
                        {/*</div>*/}

                        <div>
                            <Autocomplete
                                disablePortal
                                size={'small'}
                                id="branch"
                                options={branch}
                                getOptionLabel={(option) => option ? option?.name : ''}
                                onChange={(event, value) => {
                                    setSelectedBranch(value);
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
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Branch"
                                        {...register('branch_id', {
                                            required: 'This field is required',
                                        })}
                                    />
                                }
                            />
                            {errors.branch && <span style={{fontSize: '10px'}}>{errors.branch.message}</span>}
                        </div>

                        <div>
                            <ProductSelect showSelected={showSelected} setShowSelected={setShowSelected} selected={selected} setSelected={setSelected} data={data}
                                           setData={setData}></ProductSelect>
                        </div>

                        <div>
                            <TextField
                                readOnly
                                variant='outlined'
                                fullWidth
                                autoComplete="off"
                                size='small'
                                type='text'
                                value={batchNo}
                                label='Batch no'
                                sx={{
                                    marginTop: 2,
                                    '& .MuiFormLabel-root': {
                                        fontWeight: 400,
                                        fontSize: 14,
                                    },
                                    '& label.Mui-focused': {
                                        color: '#1c2437',
                                        fontSize: 16
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        height: 35,
                                        backgroundColor: 'white',
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#979797',
                                            borderWidth: '1px'
                                        },
                                    },
                                }}
                            />
                        </div>

                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                                <DatePicker
                                    label="Date"
                                    slotProps={{textField: {size: 'small'}}}
                                    value={dayjs(date)}
                                    onChange={(newValue) => {
                                        setDate(moment(newValue.$d).format('YYYY-MM-DD'));
                                    }}
                                    sx={{
                                        width: '100%',
                                        marginTop: 2,
                                        '& label': {
                                            fontSize: 12,
                                        },
                                        '& label.Mui-focused': {
                                            fontSize: 16
                                        }
                                    }}
                                />
                            </LocalizationProvider>

                            {errors.date && <span style={{fontSize: '10px'}}>{errors.date.message}</span>}
                        </div>
                        <div>
                            <TextField
                                variant='outlined'
                                fullWidth
                                autoComplete="off"
                                size='small'
                                type={'number'}
                                label={'Quantity'}
                                {...register('qty', {
                                    required: 'This field is required',
                                })}
                                onChange={e => {
                                    clearErrors(["qty"])
                                }}

                                sx={{
                                    marginTop: 2,
                                    '& .MuiFormLabel-root': {
                                        fontWeight: 400,
                                        fontSize: 14,
                                    },
                                    '& label.Mui-focused': {
                                        color: '#1c2437',
                                        fontSize: 16
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        height: 35,
                                        backgroundColor: 'white',
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#979797',
                                            borderWidth: '1px'
                                        },
                                    },
                                }}/>
                            {errors.qty && <span style={{fontSize: '10px'}}>{errors.qty.message}</span>}
                        </div>
                        <div>
                            <TextField
                                variant='outlined'
                                fullWidth
                                autoComplete="off"
                                size='small'
                                type={'number'}
                                label={'Purchase price'}
                                {...register('purchase_price', {
                                    required: 'This field is required',
                                })}
                                onChange={e => {
                                    clearErrors(["purchase_price"])
                                }}

                                sx={{
                                    marginTop: 2,
                                    '& .MuiFormLabel-root': {
                                        fontWeight: 400,
                                        fontSize: 14,
                                    },
                                    '& label.Mui-focused': {
                                        color: '#1c2437',
                                        fontSize: 16
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        height: 35,
                                        backgroundColor: 'white',
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#979797',
                                            borderWidth: '1px'
                                        },
                                    },
                                }}/>
                            {errors.purchase_price &&
                                <span style={{fontSize: '10px'}}>{errors.purchase_price.message}</span>}
                        </div>
                        <div>
                            <TextField
                                variant='outlined'
                                fullWidth
                                autoComplete="off"
                                size='small'
                                type={'number'}
                                label={'Selling price'}
                                {...register('selling_price', {
                                    required: 'This field is required',
                                })}
                                onChange={e => {
                                    clearErrors(["selling_price"])
                                }}

                                sx={{
                                    marginTop: 2,
                                    '& .MuiFormLabel-root': {
                                        fontWeight: 400,
                                        fontSize: 14,
                                    },
                                    '& label': {},
                                    '& label.Mui-focused': {
                                        color: '#1c2437',
                                        fontSize: 16
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        height: 35,
                                        backgroundColor: 'white',
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#979797',
                                            borderWidth: '1px'
                                        },
                                    },
                                }}/>
                            {errors.selling_price &&
                                <span style={{fontSize: '10px'}}>{errors.selling_price.message}</span>}
                        </div>
                        <div>
                            <TextField
                                variant='outlined'
                                fullWidth
                                autoComplete="off"
                                size='small'
                                type={'number'}
                                label={'Total discount'}
                                {...register('total_discount', {
                                    required: 'This field is required',
                                })}
                                onChange={e => {
                                    clearErrors(["total_discount"])
                                }}

                                sx={{
                                    marginTop: 2,
                                    '& .MuiFormLabel-root': {
                                        fontWeight: 400,
                                        fontSize: 14,
                                    },
                                    '& label': {},
                                    '& label.Mui-focused': {
                                        color: '#1c2437',
                                        fontSize: 16
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        height: 35,
                                        backgroundColor: 'white',
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#979797',
                                            borderWidth: '1px'
                                        },
                                    },
                                }}/>
                            {errors.total_discount &&
                                <span style={{fontSize: '10px'}}>{errors.total_discount.message}</span>}
                        </div>

                    </div>

                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <Button type="submit" className="me-2 btn btn-pill btn-info btn-air-info btn-info-gradien px-4">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddOpeningStock;