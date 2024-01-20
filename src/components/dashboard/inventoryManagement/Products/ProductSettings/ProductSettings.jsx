import React, { useState, useEffect, useMemo } from 'react';
import Breadcrumb from "../../../../common/breadcrumb";
import {useForm} from "react-hook-form";
import TextField from '@mui/material/TextField';
import axios from "../../../../../axios";
import Swal from "sweetalert2";

const ProductSettings = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [profitFixed, setProfitFixed] = useState(false);
    const [showSellPriceOnProduct, setShowSellPriceOnProduct] = useState(false);
    const [showPurchasePriceOnProduct, setShowPurchasePriceOnProduct] = useState(false);
    const [continueSellIfStockout, setContinueSellIfStockout] = useState(false);
    const [hasLot, setHasLot] = useState(false);
    const { 
        register, handleSubmit, reset, setValue, formState: {errors}, clearErrors
    } = useForm({
        // defaultValues: useMemo(()=> {
        //     return data;
        // }, [data])
    });

    const SubmitProductSettings = (data) => {
        data.profit_fixed = profitFixed;
        data.show_sell_price_on_product = showSellPriceOnProduct;
        data.show_purchase_price_on_product = showPurchasePriceOnProduct;
        data.continue_sell_if_stockout = continueSellIfStockout;
        data.has_lot = hasLot; 

        axios.put(`/inventory-management/products/settings/update/${data?.id}`, data)
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
                reset();
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false)
        };
        fetchData()
    }, []);

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
                                        <TextField
                                            focused
                                            variant='outlined'
                                            fullWidth
                                            autoComplete="off"
                                            size='small'
                                            type={'text'}
                                            label={'Barcode Type'}
                                            defaultValue={data?.barcode_type}
                                            {...register('barcode_type', {
                                                required: 'This field is required',
                                            })}
                                            onChange={e => {
                                                clearErrors(["barcode_type"])
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
                                        {errors.barcode_type &&
                                            <span style={{fontSize: '10px'}}>{errors.barcode_type.message}</span>}
                                    </div>

                                    <div className={"mt-3 col-sm-6"}>
                                        <TextField
                                            focused
                                            variant='outlined'
                                            fullWidth
                                            autoComplete="off"
                                            size='small'
                                            type={'text'}
                                            label={'Barcode value'}
                                            defaultValue={data?.barcode_value}
                                            {...register('barcode_value', {
                                                required: 'This field is required',
                                            })}
                                            onChange={e => {
                                                clearErrors(["barcode_value"])
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
                                        {errors.barcode_value &&
                                            <span style={{fontSize: '10px'}}>{errors.barcode_value.message}</span>}
                                    </div>
                                    <div className={"mt-3 col-sm-6"}>
                                        <TextField
                                            focused
                                            variant='outlined'
                                            fullWidth
                                            autoComplete="off"
                                            size='small'
                                            type={'text'}
                                            defaultValue={data?.min_sell_price_on_purchase}
                                            label={'Min profit percentage on purchase price'}
                                            {...register('min_sell_price_on_purchase', {
                                                required: 'This field is required',
                                            })}
                                            onChange={e => {
                                                clearErrors(["min_sell_price_on_purchase"])
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
                                        {errors.min_sell_price_on_purchase && <span
                                            style={{fontSize: '10px'}}>{errors.min_sell_price_on_purchase.message}</span>}
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
                                            defaultValue={data?.profit_on_purchase_price}
                                            {...register('profit_on_purchase_price', {
                                                required: 'This field is required',
                                            })}
                                            onChange={e => {
                                                clearErrors(["profit_on_purchase_price"])
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
                                            style={{fontSize: '10px'}}>{errors.profit_on_purchase_price.message}</span>}
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
                                        {errors.sku_prefix &&
                                            <span style={{fontSize: '10px'}}>{errors.sku_prefix.message}</span>}
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
                                        {errors.lot_prefix &&
                                            <span style={{fontSize: '10px'}}>{errors.lot_prefix.message}</span>}
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