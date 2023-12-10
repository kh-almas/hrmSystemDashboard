import React, {useEffect, useState} from 'react';
import axios from "../../../../../axios";
import SelectProductInCreateProductForm
    from "../../../../common/component/form/inventory/product/selectProductInCreateProductForm";
import Input from "../../../../common/modal/Input";
import Select from "../../../../common/modal/Select";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import TextField from "@mui/material/TextField";
import MultipleSelectWithReactSelect from "../../../../common/modal/MultipleSelectWithReactSelect";
import MultipleImageUploader from "../../../../common/component/imageUpload/MultipleImageUploader";


const SelectComboVariant = ({allStoredValue, register, unregister, returnedValueFromVariantValueSelect, setReturnedValueFromVariantValueSelect}) => {
    const [photos, setPhotos] = useState([]);
    const [checkDiff, setCheckDiff] =useState(false);
    const [allDataForVariantDropdown, setAllDataForVariantDropdown] = useState([]);
    const [allDataForVariantValueDropdown, setAllDataForVariantValueDropdown] = useState([]);
    const [formatAllDataForVariantValueDropdown, setFormatAllDataForVariantValueDropdown] = useState({});
    const [selectedVariantForVariant, setSelectedVariantForVariant] = useState([]);
    const [variantValueItem, setVariantValueItem] = useState([])
    const [addRowInVariant, setAddRowInVariant] = useState([0])

    const addNewRow = () => {
        if (selectedVariantForVariant?.length > 0){
            setAddRowInVariant(prev => [...prev, addRowInVariant.length])
        }
    }

    const handleSelectChange = (selected, rowIndex, variantId) => {
        if (!returnedValueFromVariantValueSelect[rowIndex]){
            returnedValueFromVariantValueSelect[rowIndex] = {};
        }
        returnedValueFromVariantValueSelect[rowIndex][variantId] = selected || {};
        setCheckDiff(!checkDiff)
    };


    const [variantFormValue, setVariantFormValue] = useState({});
    const handleInputChange = (value, rowIndex, inputName) => {
        const updatedVariantFormValue = { ...variantFormValue };
        if (!updatedVariantFormValue[rowIndex]) {
            updatedVariantFormValue[rowIndex] = {};
        }
        updatedVariantFormValue[rowIndex][inputName] = value || {};
        setVariantFormValue(updatedVariantFormValue);
        setCheckDiff(!checkDiff);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/inventory-management/variant/all`);
                setAllDataForVariantDropdown(response?.data?.body?.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    }, []);

    const [allDataForVariantValueDropdownForCheck, setAllDataForVariantValueDropdownForCheck] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setAllDataForVariantValueDropdownForCheck([])
                const response = await axios.get(`/inventory-management/variant/all`);
                response?.data?.body?.data?.map(item => {
                    const set_data = {
                        value: item.id,
                        label: item.name_s,
                        branch_name: item.branch_name_s,
                        company_name: item.company_name_s,

                    }
                    setAllDataForVariantValueDropdownForCheck(prev => [...prev, set_data]);
                })
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setAllDataForVariantValueDropdown([])
                const response = await axios.get(`/inventory-management/variant/value`);
                response?.data?.body?.data?.map(item => {
                    const set_data = {
                        value: item.id,
                        label: item.value,
                        variant_id: item.variant_id,
                        variant_name: item.variant_name
                    }
                    setAllDataForVariantValueDropdown(prev => [...prev, set_data]);
                })
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    }, []);



    useEffect(() => {
        allDataForVariantDropdown?.map(singleData => {
            console.log('formatAllDataForVariantValueDropdown', formatAllDataForVariantValueDropdown)
            // console.log('singleData', singleData)
            // const filterData = allDataForVariantValueDropdown?.filter(item => parseInt(singleData?.id) === parseInt(item?.value));
            const filterData = allDataForVariantValueDropdown?.filter(item => parseInt(singleData?.id) === parseInt(item?.variant_id));
            formatAllDataForVariantValueDropdown[singleData?.id] = filterData;
            setCheckDiff(checkDiff);
        })
    }, [selectedVariantForVariant]);

    const [selectedDataKeyForProductList, setSelectedDataKeyForProductList] = useState([]);
    // const [showProductList, setShowProductList] = useState(false);
    // const getSelectedData = (data) => {
    //     if(!selectedDataKeyForProductList.includes(data.id)){
    //         selectedDataKeyForProductList.push(data.id);
    //         setSelectedVariantForVariant(prev => [...prev, data]);
    //     }
    //
    //     setShowProductList(false);
    // }
    // console.log('selectedDataKeyForProductList',selectedDataKeyForProductList)
    // console.log('selectedVariantForVariant',selectedVariantForVariant)



    const removeItemFromVariantList = (id) => {
        if(addRowInVariant?.includes(id)){
            const remainingID =  addRowInVariant.splice(addRowInVariant.indexOf(id), 1);
            delete returnedValueFromVariantValueSelect[id];
            setReturnedValueFromVariantValueSelect(returnedValueFromVariantValueSelect);
            unregister(`variant_sku_${id}`);
            unregister(`variant_alert_quantity_${id}`);
            unregister(`variant_purchase_price_${id}`);
            unregister(`variant_selling_price_${id}`);
        }
    }

    const [modal, setModal] = useState({});
    const toggleOn = (id) => {
        setModal(prev => {
            const updatedModal = Object.fromEntries(
                Object.keys(prev).map(key => [key, false])
            );
            updatedModal[id] = true;
            return updatedModal;
        });
    }
    const toggleOff = (id) => {
        setModal(prev => {
            const updatedModal = Object.fromEntries(
                Object.keys(prev).map(key => [key, false])
            );
            return updatedModal;
        });

    }
    return (
        <>
            <div className="">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title mb-0">Choose Variant</h4>
                    </div>

                    <div className="card-body">
                        <div className="">
                            <MultipleSelectWithReactSelect allOptions={allDataForVariantValueDropdownForCheck} setKey={setSelectedDataKeyForProductList} setValue={setSelectedVariantForVariant}></MultipleSelectWithReactSelect>
                        </div>
                        <div className="mt-2">
                            {
                                selectedVariantForVariant?.length > 0 ?
                                    <div>
                                        <div className="d-flex justify-content-between" style={{marginBottom: '-25px'}}>
                                            {
                                                selectedVariantForVariant?.map((singleVariantData, index) =>
                                                    <div key={index} className="w-100 text-center">
                                                        <p className="m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>{singleVariantData?.label}</p>
                                                    </div>
                                                )
                                            }
                                            <p className="w-100 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>SKU</p>
                                            <p className="w-100 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Quantity</p>
                                            <p className="w-100 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Purchase Price</p>
                                            <p className="w-100 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Selling Price</p>
                                            <p className="w-100 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Tax</p>
                                            <p className="w-25 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Action</p>
                                        </div>
                                        <div>
                                            {
                                                addRowInVariant?.map((singleRowData, rowIndex) =>
                                                    <div className="d-flex justify-content-between" key={rowIndex}>
                                                        {
                                                            selectedVariantForVariant?.map((singleVariantData,index) =>
                                                                <div key={index} className="w-100 mx-2">
                                                                    <Select
                                                                        placeholder={"Select an option"}
                                                                        previous={returnedValueFromVariantValueSelect?.[rowIndex]?.[singleVariantData?.value]}
                                                                        options={formatAllDataForVariantValueDropdown[singleVariantData?.value]}
                                                                        cngFn={(selected) => handleSelectChange(selected, singleRowData, singleVariantData?.value)}
                                                                    />
                                                                </div>
                                                            )
                                                        }

                                                        <div className="w-100 mx-2" style={{marginTop: '37px'}}>
                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type="text"
                                                                placeholder="sku_01"
                                                                {...register(`variant_sku_${singleRowData}`)}
                                                                value={variantValueItem?.[rowIndex]?.[`variant_sku_${singleRowData}`]}
                                                                onChange={(e) => handleInputChange(e.target.value, rowIndex, `variant_sku_${singleRowData}`)}
                                                                sx={{
                                                                    '& .MuiFormLabel-root': {
                                                                        fontWeight: 400,
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
                                                        <div className="w-100 mx-2" style={{marginTop: '37px'}}>
                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type="text"
                                                                placeholder="0"
                                                                {...register(`opening_stock_quantity_${singleRowData}`)}
                                                                value={variantFormValue?.[rowIndex]?.[`opening_stock_quantity_${singleRowData}`] || ''}
                                                                onChange={(e) => handleInputChange(e.target.value, rowIndex, `opening_stock_quantity_${singleRowData}`)}
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
                                                        <div className="w-100 mx-2" style={{marginTop: '37px'}}>
                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type="text"
                                                                placeholder="0"
                                                                {...register(`variant_purchase_price_${singleRowData}`)}
                                                                value={variantFormValue?.[rowIndex]?.[`variant_purchase_price_${singleRowData}`]}
                                                                onChange={(e) => handleInputChange(e.target.value, rowIndex, `variant_purchase_price_${singleRowData}`)}
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
                                                        <div className="w-100 mx-2" style={{marginTop: '37px'}}>
                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type="text"
                                                                placeholder="0"
                                                                {...register(`variant_selling_price_${singleRowData}`)}
                                                                value={variantFormValue?.[rowIndex]?.[`variant_selling_price_${singleRowData}`]}
                                                                onChange={(e) => handleInputChange(e.target.value, rowIndex, `variant_selling_price_${singleRowData}`)}
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
                                                        <div className="w-100 mx-2" style={{marginTop: '37px'}}>
                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type="text"
                                                                placeholder="0"
                                                                {...register(`tax_${singleRowData}`)}
                                                                value={variantFormValue?.[rowIndex]?.[`tax_${singleRowData}`]}
                                                                onChange={(e) => handleInputChange(e.target.value, rowIndex, `tax_${singleRowData}`)}
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
                                                        <div className="text-end w-25 mx-2" style={{marginTop: '16px', display: "flex", justifyContent: "center", alignItems: 'center'}}>
                                                            <div onClick={() => toggleOn(rowIndex)} style={{marginRight: '5px', border: 'none', backgroundColor: 'white', marginTop: '25px', marginBottom: '6px', cursor: "pointer" }}>
                                                                <i className="fa fa-pencil-square-o" style={{fontSize: '15px'}}></i>
                                                            </div>
                                                            <Modal isOpen={modal[rowIndex]} toggle={toggleOn[rowIndex]} className="modal-body" centered={true}>
                                                                <ModalHeader toggle={toggleOn[rowIndex]}>`ModalTitle_${rowIndex}`</ModalHeader>
                                                                <ModalBody>
                                                                    {
                                                                        selectedVariantForVariant?.map((singleVariantData,index) =>

                                                                            <div key={index} className="w-100 mx-2">
                                                                                <Select
                                                                                    placeholder={singleVariantData.label}
                                                                                    labelName={singleVariantData.label}
                                                                                    previous={returnedValueFromVariantValueSelect?.[rowIndex]?.[singleVariantData?.id]}
                                                                                    options={formatAllDataForVariantValueDropdown[singleVariantData?.id]}
                                                                                    cngFn={(selected) => handleSelectChange(selected, singleRowData, singleVariantData?.id)}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }

                                                                    <div className="w-100 mx-2" style={{marginTop: '28px'}}>
                                                                        <TextField
                                                                            variant='outlined'
                                                                            fullWidth
                                                                            autoComplete="off"
                                                                            size='small'
                                                                            type="text"
                                                                            label="SKU"
                                                                            placeholder="sku_01"
                                                                            {...register(`variant_sku_${singleRowData}`)}
                                                                            value={variantFormValue?.[rowIndex]?.[`variant_sku_${singleRowData}`]}
                                                                            onChange={(e) => handleInputChange(e.target.value, rowIndex, `variant_sku_${singleRowData}`)}
                                                                            sx={{
                                                                                '& .MuiFormLabel-root': {
                                                                                    fontWeight: 400,
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
                                                                    <div className="w-100 mx-2" style={{marginTop: '15px'}}>
                                                                        <TextField
                                                                            variant='outlined'
                                                                            fullWidth
                                                                            autoComplete="off"
                                                                            size='small'
                                                                            type="text"
                                                                            label="Opening stock quantity"
                                                                            placeholder="0"
                                                                            {...register(`opening_stock_quantity_${singleRowData}`)}
                                                                            value={variantFormValue?.[rowIndex]?.[`opening_stock_quantity_${singleRowData}`]}
                                                                            onChange={(e) => handleInputChange(e.target.value, rowIndex, `opening_stock_quantity_${singleRowData}`)}
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
                                                                    <div className="w-100 mx-2" style={{marginTop: '15px'}}>
                                                                        <TextField
                                                                            variant='outlined'
                                                                            fullWidth
                                                                            autoComplete="off"
                                                                            size='small'
                                                                            type="text"
                                                                            label="Alert quantity"
                                                                            placeholder="0"
                                                                            {...register(`alert_quantity_${singleRowData}`)}
                                                                            value={variantFormValue?.[rowIndex]?.[`alert_quantity_${singleRowData}`]}
                                                                            onChange={(e) => handleInputChange(e.target.value, rowIndex, `alert_quantity_${singleRowData}`)}
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
                                                                    <div className="w-100 mx-2" style={{marginTop: '15px'}}>
                                                                        <TextField
                                                                            variant='outlined'
                                                                            fullWidth
                                                                            autoComplete="off"
                                                                            size='small'
                                                                            type="text"
                                                                            label="Variant purchase price"
                                                                            placeholder="0"
                                                                            {...register(`variant_purchase_price_${singleRowData}`)}
                                                                            value={variantFormValue?.[rowIndex]?.[`variant_purchase_price_${singleRowData}`]}
                                                                            onChange={(e) => handleInputChange(e.target.value, rowIndex, `variant_purchase_price_${singleRowData}`)}
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
                                                                    <div className="w-100 mx-2" style={{marginTop: '15px'}}>
                                                                        <TextField
                                                                            variant='outlined'
                                                                            fullWidth
                                                                            autoComplete="off"
                                                                            size='small'
                                                                            type="text"
                                                                            label="Variant selling price"
                                                                            placeholder="0"
                                                                            {...register(`variant_selling_price_${singleRowData}`)}
                                                                            value={variantFormValue?.[rowIndex]?.[`variant_selling_price_${singleRowData}`]}
                                                                            onChange={(e) => handleInputChange(e.target.value, rowIndex, `variant_selling_price_${singleRowData}`)}
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
                                                                    <div className="w-100 mx-2" style={{marginTop: '15px'}}>
                                                                        <TextField
                                                                            variant='outlined'
                                                                            fullWidth
                                                                            autoComplete="off"
                                                                            size='small'
                                                                            type="text"
                                                                            label="Tax"
                                                                            placeholder="0"
                                                                            {...register(`tax_${singleRowData}`)}
                                                                            value={variantFormValue?.[rowIndex]?.[`tax_${singleRowData}`]}
                                                                            onChange={(e) => handleInputChange(e.target.value, rowIndex, `tax_${singleRowData}`)}
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
                                                                    <div>
                                                                        <MultipleImageUploader photos={photos} setPhotos={setPhotos}></MultipleImageUploader>
                                                                    </div>
                                                                </ModalBody>
                                                                <ModalFooter>
                                                                    <Button color="primary">SaveChanges</Button>
                                                                    <Button color="secondary"  onClick={() => toggleOff(rowIndex)}>Cancel</Button>
                                                                </ModalFooter>
                                                            </Modal>
                                                            <div onClick={() => removeItemFromVariantList(singleRowData)} style={{border: 'none', backgroundColor: 'white', marginTop: '25px', marginBottom: '6px', cursor: "pointer" }}>
                                                                <i className="fa fa-times" style={{fontSize: '20px'}}></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    : ''
                            }
                            <div className="d-flex justify-content-end">
                                <button onClick={() => addNewRow()} className="btn btn-outline-primary btn-xs mx-3 mt-1" type="button">Add new item</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectComboVariant;