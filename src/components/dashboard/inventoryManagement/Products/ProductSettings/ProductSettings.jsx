import React, { useState, useEffect, useMemo } from 'react';
import Breadcrumb from "../../../../common/breadcrumb";
import {useForm} from "react-hook-form";
import TextField from '@mui/material/TextField';
import axios from "../../../../../axios";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import {Checkbox} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const ProductSettings = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [barcodeValue, setBarcodeValue] = useState([]);
    const [barcodeType, setBarcodeType] = useState([]);
    const [profitFixed, setProfitFixed] = useState(false);
    const [showSellPriceOnProduct, setShowSellPriceOnProduct] = useState(false);
    const [showPurchasePriceOnProduct, setShowPurchasePriceOnProduct] = useState(false);
    const [continueSellIfStockout, setContinueSellIfStockout] = useState(false);
    const [hasLot, setHasLot] = useState(false);
    const [barcodeTypeValue, setBarcodeTypeValue] = useState([{value: "Singless", label: "Singless"}, {value: "Single", label: "Single"}])
    const {register, handleSubmit, reset, setValue, formState: {errors}, clearErrors} = useForm({
        // defaultValues: useMemo(()=> {
        //     return data;
        // }, [data])
    });
    const SubmitProductSettings = (formData) => {
        formData.profit_fixed = profitFixed;
        formData.show_sell_price_on_product = showSellPriceOnProduct;
        formData.show_purchase_price_on_product = showPurchasePriceOnProduct;
        formData.continue_sell_if_stockout = continueSellIfStockout;
        formData.has_lot = hasLot;
        formData.barcode_value = JSON.stringify(barcodeValue);
        formData.barcode_type = barcodeType.value;

        axios.put(`/inventory-management/products/settings/update/${data?.id}`, formData)
            .then(info => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(e => {
                if(e?.response?.data?.body?.message?.errno == 1062){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Can not duplicate product sku`
                    })
                }
            })
    }

    

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/inventory-management/products/settings/`);
                const parseData =response?.data?.body?.data?.[0]
                setData(parseData);
                setProfitFixed(parseData.profit_fixed == '1' ? true : false);
                setShowSellPriceOnProduct(parseData.show_sell_price_on_product == '1' ? true : false);
                setShowPurchasePriceOnProduct(parseData.show_purchase_price_on_product == '1' ? true : false);
                setContinueSellIfStockout(parseData.continue_sell_if_stockout == '1' ? true : false);
                setHasLot(parseData.has_lot == '1' ? true : false);
                setBarcodeValue(JSON.parse(parseData.barcode_value));
                const dbBarcode = barcodeTypeValue?.find(singleItem => singleItem?.value == parseData?.barcode_type)
                setBarcodeType(dbBarcode);
                reset();
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false)
        };
        fetchData()
    }, []);

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    function removeDuplicatesByProperty(arr, key) {
        const uniqueValues = new Set();
        const resultArray = arr.filter((item) => {
            const value = item[key];
            if (!uniqueValues.has(value)) {
                uniqueValues.add(value);
                return true;
            }
            return false;
        });

        return resultArray;
    }

    const setBarcodeValueFN = (selected) => {
        setBarcodeValue(selected);
    }

    return (
        <>
            {
                !isLoading ? 
                <>
                    <Breadcrumb parent="Inventory management" title="Product Settings" />
                    <div className="row mt-4">
                        <div className="col-sm-12 col-xl-8 mx-auto">
                        <div className="card">
                        <div className="card-body megaoptions-border-space-sm">
                            <form onSubmit={handleSubmit(SubmitProductSettings)}>
                            <div className="row">

                                <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="checkbox checkbox-secondary me-3 ms-2">
                                        <input
                                        id="checkbox1" 
                                        type="checkbox" 
                                        name="checkbox1546" 
                                        onChange={(e) => {
                                            setProfitFixed(e.target.checked)
                                        }}
                                        checked={profitFixed}
                                        />
                                        <label htmlFor="checkbox1">Profit Fixed</label>
                                    </div>
                                    </div>
                                </div>
                                
                                <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="checkbox checkbox-secondary me-3 ms-2">
                                        <input
                                        id="checkbox2" 
                                        type="checkbox" 
                                        name="checkbox1" 
                                        checked={showSellPriceOnProduct}
                                        onChange={(e) => {
                                            setShowSellPriceOnProduct(e.target.checked)
                                        }}
                                        />
                                        <label htmlFor="checkbox2">Show sell price on product</label>
                                    </div>
                                    </div>
                                </div>
                                
                                <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="checkbox checkbox-secondary me-3 ms-2">
                                        <input 
                                        id="checkbox3" 
                                        type="checkbox" 
                                        name="checkbox1" 
                                        value="option1" 
                                        checked={showPurchasePriceOnProduct}
                                        onChange={(e) => {
                                            setShowPurchasePriceOnProduct(e.target.checked)
                                        }}
                                        />
                                        <label htmlFor="checkbox3">Show purchase price on product</label>
                                    </div>
                                    </div>
                                </div>
                                
                                <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="checkbox checkbox-secondary me-3 ms-2">
                                        <input 
                                        id="checkbox4" 
                                        type="checkbox" 
                                        name="checkbox1" 
                                        checked={continueSellIfStockout}
                                        onChange={(e) => {
                                            setContinueSellIfStockout(e.target.checked)
                                        }}
                                        />
                                        <label htmlFor="checkbox4">Continue sell if stockout</label>
                                    </div>
                                    </div>
                                </div>
                                
                                <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="checkbox checkbox-secondary me-3 ms-2">
                                        <input 
                                        id="checkbox5" 
                                        type="checkbox" 
                                        name="checkbox1" 
                                        checked={hasLot}
                                        onChange={(e) => {
                                            setHasLot(e.target.checked)
                                        }}
                                        />
                                        <label htmlFor="checkbox5">Has lot number</label>
                                    </div>
                                    </div>
                                </div>
                            </div>
                                <div className="row">
                                    <div className={"mt-3 col-sm-6"}>
                                        <Autocomplete
                                            disablePortal
                                            size={'small'}
                                            id="combo-box-demo"
                                            onChange={(e, data) => setBarcodeType(data)}
                                            options={barcodeTypeValue}
                                            value={barcodeType}
                                            sx={{
                                                width: '100%',
                                                fontSize: "12px",
                                                '& label': {
                                                    color: '#1c2437',
                                                    fontSize: 12
                                                },
                                                '& MuiProper-root': {
                                                    color: '#1c2437',
                                                    fontSize: 12
                                                },
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    label="Barcode type"
                                                />
                                        }
                                        />
                                    </div>

                                    <div className={"mt-3 col-sm-6"}>
                                        <Autocomplete
                                            multiple
                                            size={'small'}
                                            id="checkboxes-tags-demo"
                                            options={[{value: "Singless", label: "Singless"}, {value: "Single", label: "Single"}]}
                                            // disableCloseOnSelect

                                            getOptionLabel={(option) => option.label}
                                            value={barcodeValue}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{marginRight: 8}}
                                                        // checked={selected}
                                                        checked={barcodeValue.some(singleItem => singleItem?.value === option?.value)}
                                                    />
                                                    {option.label}
                                                </li>
                                            )}
                                            onChange={(e, data) => setBarcodeValueFN(data)}
                                            // value={barcodeValue}
                                            sx={{
                                                width: '100%',
                                                fontSize: "12px",
                                                '& label': {
                                                    color: '#1c2437',
                                                    fontSize: 12
                                                },
                                                '& MuiProper-root': {
                                                    color: '#1c2437',
                                                    fontSize: 12
                                                },
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Checkboxes"
                                                    placeholder="Barcode Value"
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className={"mt-3 col-sm-6"}>
                                        <TextField
                                            focused
                                            variant='outlined'
                                            fullWidth
                                            autoComplete="off"
                                            size='small'
                                            type={'text'}
                                            defaultValue={data?.min_profit_percentage_on_purchase_price}
                                            label={'Min profit percentage on purchase price'}
                                            {...register('min_profit_percentage_on_purchase_price', {
                                                required: 'This field is required',
                                            })}
                                            onChange={e => {
                                                clearErrors(["min_profit_percentage_on_purchase_price"])
                                            }}

                                            sx={{
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
                                        {errors.min_sell_price_on_purchase && <span style={{fontSize: '10px'}}>{errors.min_sell_price_on_purchase.message}</span>}
                                    </div>

                                    <div className={"mt-3 col-sm-6"}>
                                        <TextField
                                            focused
                                            variant='outlined'
                                            fullWidth
                                            autoComplete="off"
                                            size='small'
                                            type={'text'}
                                            label={'Profit percentage on purchase price'}
                                            defaultValue={data?.profit_percentage_on_purchase_price}
                                            {...register('profit_percentage_on_purchase_price', {
                                                required: 'This field is required',
                                            })}
                                            onChange={e => {
                                                clearErrors(["profit_percentage_on_purchase_price"])
                                            }}

                                            sx={{
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
                                        {errors.profit_on_purchase_price && <span
                                            style={{fontSize: '10px'}}>{errors.profit_percentage_on_purchase_price.message}</span>}
                                    </div>


                                    <div className={"mt-3 col-sm-6"}>
                                        <TextField
                                            focused
                                            variant='outlined'
                                            fullWidth
                                            autoComplete="off"
                                            size='small'
                                            type={'text'}
                                            label={'SKU prefix'}
                                            defaultValue={data?.sku_prefix}
                                            {...register('sku_prefix', {
                                                required: 'This field is required',
                                            })}
                                            onChange={e => {
                                                clearErrors(["sku_prefix"])
                                            }}

                                            sx={{
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
                                        {errors.sku_prefix && <span style={{fontSize: '10px'}}>{errors.sku_prefix.message}</span>}
                                    </div>

                                    <div className={"mt-3 col-sm-6"}>
                                        <TextField
                                            focused
                                            variant='outlined'
                                            fullWidth
                                            autoComplete="off"
                                            size='small'
                                            type={'text'}
                                            label={'LOT prefix'}
                                            defaultValue={data?.lot_prefix}
                                            {...register('lot_prefix', {
                                                required: 'This field is required',
                                            })}
                                            onChange={e => {
                                                clearErrors(["lot_prefix"])
                                            }}

                                            sx={{
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
                                        {errors.lot_prefix && <span style={{fontSize: '10px'}}>{errors.lot_prefix.message}</span>}
                                    </div>
                                </div>
                                <div className="text-end mt-4">
                                    <button className="btn btn-primary m-r-15" type="submit">{'Submit'}</button>
                                </div>
                            </form>
                        </div>

                        </div>
                        </div>
                    </div>
                </> : ''
            }

        </>
    );
};

export default ProductSettings;