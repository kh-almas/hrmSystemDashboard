import React, {useEffect, useMemo, useState} from 'react';
import BaseModal from "../../../../common/modal/BaseModal";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import moment from "moment/moment";
import {Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "../../../../../axios";
import Swal from "sweetalert2";
import getAllBranch from "../../../../common/Query/hrm/GetAllBranch";
import getAllSKUForSelect from "../../../../common/Query/inventory/GetAllSKUForSelect";

const EditOpeningStock = ({modal, toggle, reFetch, valueForEdit}) => {
    const [branch, setBranch] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState({});
    const [data, setData] = React.useState([]);
    const [date, setDate] = useState('');
    const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] = getAllBranch();
    const [allSkuStatus, allSkuReFetch, allSku, allSkuError] = getAllSKUForSelect();

    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: {errors},
        reset,
    } = useForm(
        {
            defaultValues: useMemo(() => {
                return valueForEdit;
            }, [valueForEdit])
        }
    );

    function generateSkuCode(count) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }

        return code;
    }


    useEffect(() => {
        const previousValue = valueForEdit?.original;

        setDate(previousValue?.date_s_g ? previousValue?.date_s_g : moment(new Date()).format('YYYY-MM-DD'));
    }, [valueForEdit?.original])


    useEffect(() => {
        const allBranchs = allBranch?.data?.body?.data?.data
        setBranch(allBranchs);
        const selected = allBranchs?.find(item => item?.id == valueForEdit?.original?.branch_id);
        console.log('selected', selected)
        setSelectedBranch(selected);

    }, [allBranch])

    useEffect(() => {
        const allProduct = allSku?.data?.body?.data;

        let finalArray = [];
        allProduct?.map(item => {
            let initialObj = {
                id : item.id,
                label: `${item.name} > ${item.sku} > ${item.category_name} > ${item.brand_name} > ${item.model_name}`,
            }

            finalArray.push(initialObj)
        })

        setData(finalArray);
    }, [allSku])

    const onSubmit = async (data) => {
        console.log('data', data)
        // axios.put(`/inventory-management/unit-type/update/${oldData?.id}`, data)
        //     .then(info => {
        //         if(info?.status == 200)
        //         {
        //             Swal.fire({
        //                 position: 'top-end',
        //                 icon: 'success',
        //                 title: 'Your work has been saved',
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             })
        //             toggle();
        //             // reset();
        //         }
        //         reFetch();
        //     })
        //     .catch(e => {
        //         console.log(e);
        //         if(e?.response?.data?.body?.message?.errno == 1062){
        //             Swal.fire({
        //                 position: 'top-end',
        //                 icon: 'error',
        //                 title: 'Can not duplicate variant name',
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             })
        //         }else {
        //             Swal.fire({
        //                 position: 'top-end',
        //                 icon: 'error',
        //                 title: `${e?.response?.data?.body?.message?.details[0].message}`,
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             })
        //         }
        //     })
    }

    return (
        <>
            <BaseModal title={"Edit opening stock"} dataModal={modal} dataToggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Autocomplete
                            disablePortal
                            size={'small'}
                            id="branch"
                            value={selectedBranch}
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
                        <Autocomplete
                            disablePortal
                            size={'small'}
                            id="Select product"
                            options={data}
                            // getOptionLabel={(option) => option ? option?.name : ''}
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
                                    label="Select product"
                                    {...register('product_id', {
                                        required: 'This field is required',
                                    })}
                                />
                            }
                        />
                        {errors.branch && <span style={{fontSize: '10px'}}>{errors.branch.message}</span>}
                    </div>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <TextField
                                readOnly
                                variant='outlined'
                                fullWidth
                                autoComplete="off"
                                size='small'
                                type='text'
                                value={valueForEdit?.original?.batch_s}
                                label='Batch no'
                                sx={{
                                    marginTop: 2,
                                    '& .MuiFormLabel-root': {
                                        fontWeight: 400,
                                        fontSize: 12,
                                    },
                                    '& label': {
                                        fontSize: 12,
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
                                        fontSize: 12,
                                    },
                                    '& label': {
                                        fontSize: 12,
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
                                        fontSize: 12,
                                    },
                                    '& label': {
                                        fontSize: 12,
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
                                        fontSize: 12,
                                    },
                                    '& label': {
                                        fontSize: 12,
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
                                        fontSize: 12,
                                    },
                                    '& label': {
                                        fontSize: 12,
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
            </BaseModal>
        </>
    );
};

export default EditOpeningStock;