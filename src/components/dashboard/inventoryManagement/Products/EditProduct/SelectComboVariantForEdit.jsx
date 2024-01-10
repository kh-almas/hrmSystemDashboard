import React, {useEffect, useState} from 'react';
import axios from "../../../../../axios";
import Select from "../../../../common/modal/Select";
import {Button, Card, CardBody, CardHeader, Collapse, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import TextField from "@mui/material/TextField";
import MultipleSelectWithReactSelect from "../../../../common/modal/MultipleSelectWithReactSelect";
import VariantImage from "../AddProduct/VariantImage";
import CreatableSelect from "react-select/creatable";
import Swal from "sweetalert2";
import {Accordion} from "react-bootstrap";
import { HiPlus, HiOutlineMinusSm } from "react-icons/hi";
import MultipleSelectWithReactSelectForEdit from "../../../../common/modal/MultipleSelectWithReactSelectForEdit";
import EditVariantImage from "./EditVariantImage";

const SelectComboVariantForEdit = ({selectedVariantForVariant, setSelectedVariantForVariant, previousSKU, setPreviousSKU, addRowInVariant, setAddRowInVariant, variantFormValue, setVariantFormValue}) => {
    const [isValueOfVariantUpdate, setIsValueOfVariantUpdate]= useState(false);
    const [componentRender, setComponentRender] = useState(false)
    const [rowImage, setRowImage] = useState({});
    const [deletedImage, setDeletedImage] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [checkDiff, setCheckDiff] =useState(false);
    const [allDataForVariantDropdown, setAllDataForVariantDropdown] = useState([]);
    const [allDataForVariantValueDropdown, setAllDataForVariantValueDropdown] = useState([]);
    const [formatAllDataForVariantValueDropdown, setFormatAllDataForVariantValueDropdown] = useState({});
    const [variantSKu, setVariantSku] = useState({})
    const [isOpen, setIsOpen] = useState(0);
    const usedIdsForSkuImage = new Set();
    const [selectedPhotos, setSelectedPhotos] = useState([]);


    useEffect(() => {
        // rowImage
        const skuImage = variantFormValue?.[0]?.variantImg;
        if(skuImage){
            const getImageFromDB = [];
            skuImage?.map(singleImage => {
                let id;
                do {
                    id = Math.floor((Math.random() * 5000));
                } while (usedIdsForSkuImage.has(id));
                usedIdsForSkuImage.add(id);

                const makeImageOBJ = {
                    id,
                    image: `http://localhost:5000/product/image/${singleImage}`,
                }

                getImageFromDB.push(makeImageOBJ);

                // const setImageInSku = rowImage['0'] || [];
                // rowImage['0'] = [...setImageInSku, makeImageOBJ];

                // const updatedVariantFormValue = { ...variantFormValue };
                // if (!updatedVariantFormValue['0']) {
                //     updatedVariantFormValue['0'] = {};
                // }
                //
                // updatedVariantFormValue['0']['sku_images'] = makeImageOBJ || {};
                // setVariantFormValue(updatedVariantFormValue);
                
                // setPhotos(prev => [...prev, makeImageOBJ])
            })
            rowImage['0'] = getImageFromDB;
            setPhotos(getImageFromDB);
            setCheckDiff(!checkDiff);
        }
    }, []);

    // const generateSku = () => {
    //     const prefix = 'sku1_';
    //     let randomSku;
    //     do {
    //         randomSku = `${prefix}${Math.random().toString(36).substr(2, 12)}`;
    //     } while (previousSKU.includes(randomSku));
    //     setPreviousSKU(prev => [...prev, randomSku])
    //     return randomSku;
    // }

    // useEffect(() => {
    //     const firstvariantSKU = generateSku();
    //     setVariantSku({0: firstvariantSKU})
    //     if (!variantFormValue['0']) {
    //         variantFormValue['0'] = {};
    //     }
    //     variantFormValue['0']['sku'] = firstvariantSKU;
    //     setComponentRender(!componentRender)
    // }, []);

    const handleImageChange = async (files) => {
        if (files?.length && files?.length > 0) {
            const imagesArray = Array.from(files);
            return await Promise.all(imagesArray.map(fileToBase64))
                .then((base64Array) => {
                    return base64Array;
                })
                .catch((error) => {
                    console.error('Error converting images to base64:', error);
                    throw error;
                });
        }
        return Promise.resolve([]);
    };

    const fileToBase64 = (file) => {
        if(file.size){
            return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
        }
        
    };

    // useEffect(() => {
    //     let files = [];
    //     photos?.map(singlePhotos => {
    //         files.push(singlePhotos?.file)
    //     })
    //     handleImageChange(files)
    // }, [componentRender]);

    const commonFNForSetImage = (allImages, rowIndex, inputName) => {
        const updatedVariantFormValue = { ...variantFormValue };
        if (!updatedVariantFormValue[rowIndex]) {
            updatedVariantFormValue[rowIndex] = {};
        }

        updatedVariantFormValue[rowIndex][inputName] = {}

        updatedVariantFormValue[rowIndex][inputName] = allImages || {};
        setVariantFormValue(updatedVariantFormValue);
        setCheckDiff(!checkDiff);
    }

    const handleImageChangeFN = async (value, rowIndex, inputName) => {
        const files = value?.target?.files;
        const allImages = await handleImageChange(files)
        commonFNForSetImage(allImages, rowIndex, inputName);

    };

    const handleDeletedPhotos = async (singleRowData, inputName) => {
        const remainingPhotos = rowImage?.[singleRowData]?.filter((photo) => !selectedPhotos.includes(photo?.id));
        const processedFiles = {};

        remainingPhotos?.forEach((singlePhotos, index) => {
            if (singlePhotos.file) {
                processedFiles[index] = singlePhotos.file;
            }
        });

        // delete database image
        // const [deletedImage, setDeletedImage] = useState([]);

        const remainingPhotosForDelete = rowImage?.[singleRowData]?.filter((photo) => selectedPhotos.includes(photo?.id));
        const deletedFileNameArray = [];
        remainingPhotosForDelete?.forEach((singlePhotos, index) => {
            if (!singlePhotos.file) {
                const imageUrl = singlePhotos?.image;
                const url = new URL(imageUrl);
                const pathname = url.pathname;
                const match = pathname.match(/\/([^\/]+)$/);
                const filename = match[1];

                // setDeletedImage(prev => [...prev, filename])
                deletedFileNameArray.push(filename);
            }
        });

        commonFNForSetImage(deletedFileNameArray, singleRowData, 'deletedFileNameArray');

        setPhotos(processedFiles);

        const remainingAllImages = await handleImageChange(Object.values(processedFiles));
        rowImage[singleRowData] = [...remainingPhotos];
        setSelectedPhotos([]);
    }; 

    const addNewRow = () => {
        if (selectedVariantForVariant?.length > 0){
            const preLength = addRowInVariant.length;
            setAddRowInVariant(prev => [...prev, preLength])
            setIsOpen(preLength);
            // const variantsSKU = generateSku();
            // setVariantSku(prev => {...prev, {[preLength]: variantSKU}})
            // variantSKu[preLength] = variantsSKU;
            // if (!variantFormValue[preLength]) {
            //     variantFormValue[preLength] = {};
            // }
            // variantFormValue[preLength]['sku'] = variantsSKU;
            setComponentRender(!componentRender)
        }
    }
    //
    // useEffect(() => {
    //
    // }, []);



    const handleSelectChange = (selected, rowIndex, variantId) => {
        const updatedVariantFormValue = { ...variantFormValue };
        if (!updatedVariantFormValue[rowIndex]) {
            updatedVariantFormValue[rowIndex] = {};
        }
        if (!updatedVariantFormValue[rowIndex]['variant']) {
            updatedVariantFormValue[rowIndex]['variant'] = {};
        }
        updatedVariantFormValue[rowIndex]['variant'][variantId] = selected || {};
        setVariantFormValue(updatedVariantFormValue);
        setCheckDiff(!checkDiff);
    };

    const handleInputChange = (value, rowIndex, inputName) => {
        const updatedVariantFormValue = { ...variantFormValue };
        if (!updatedVariantFormValue[rowIndex]) {
            updatedVariantFormValue[rowIndex] = {};
        }
        updatedVariantFormValue[rowIndex][inputName] = value || {};
        setVariantFormValue(updatedVariantFormValue);
        setCheckDiff(!checkDiff);
    };

    const [allDataForVariantValueDropdownForCheck, setAllDataForVariantValueDropdownForCheck] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setAllDataForVariantValueDropdownForCheck([])
                const response = await axios.get(`/inventory-management/variant/all`);
                setAllDataForVariantDropdown(response?.data?.body?.data);
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
    }, [isValueOfVariantUpdate]);

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
    }, [isValueOfVariantUpdate]);



    useEffect(() => {
        allDataForVariantDropdown?.map(singleData => {
            // const filterData = allDataForVariantValueDropdown?.filter(item => parseInt(singleData?.id) === parseInt(item?.value));
            const filterData = allDataForVariantValueDropdown?.filter(item => parseInt(singleData?.id) === parseInt(item?.variant_id));
            formatAllDataForVariantValueDropdown[singleData?.id] = filterData;
            setCheckDiff(!checkDiff);
        })
    }, [isValueOfVariantUpdate ,selectedVariantForVariant, allDataForVariantValueDropdown, allDataForVariantValueDropdownForCheck]);

    const [selectedDataKeyForProductList, setSelectedDataKeyForProductList] = useState([]);




    const removeItemFromVariantList = (id) => {
        if(addRowInVariant?.includes(id)){
            const updatedRows = addRowInVariant.filter(itemId => itemId !== id);
            setAddRowInVariant(updatedRows);
            setComponentRender(!componentRender);
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

    const [isLoading, setIsLoading] = useState(false);
    const handleCreate = (inputValue, singleRowData, singleVariantData) => {
        setIsLoading(true);
        const data = {
            variant_id: singleVariantData?.value,
            variant_value: inputValue
        }
        axios.post('/inventory-management/products/add/variant-value', data)
            .then(info => {
                if(info?.status == 200)
                {
                    // setIsValueOfVariantUpdate(!isValueOfVariantUpdate)
                    const addNewData = {
                        value:info.data.body.data.insertId,
                        label: inputValue,
                        variant_id: singleVariantData?.value,
                        variant_name: singleVariantData?.label,
                    }
                    let oldData = formatAllDataForVariantValueDropdown[singleVariantData?.value]
                    formatAllDataForVariantValueDropdown[singleVariantData?.value] = [...oldData, addNewData];

                    const updatedVariantFormValue = { ...variantFormValue };
                    if (!updatedVariantFormValue[singleRowData]) {
                        updatedVariantFormValue[singleRowData] = {};
                    }
                    if (!updatedVariantFormValue[singleRowData]['variant']) {
                        updatedVariantFormValue[singleRowData]['variant'] = {};
                    }
                    updatedVariantFormValue[singleRowData]['variant'][singleVariantData?.value] = addNewData || {};
                    setVariantFormValue(updatedVariantFormValue);
                    setComponentRender(!componentRender)
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
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `${e?.response?.data?.body?.message?.details[0].message}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        setIsLoading(false);
    };
    const toggle = (id) => (isOpen === id ? setIsOpen(null) : setIsOpen(id));

    return (
        <>
            <div className="">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title mb-0">Choose Variant</h4>
                    </div>

                    <div className="card-body">
                        <div className="">
                            <MultipleSelectWithReactSelectForEdit selectedVariantForVariant={selectedVariantForVariant} allOptions={allDataForVariantValueDropdownForCheck} setKey={setSelectedDataKeyForProductList} setValue={setSelectedVariantForVariant}></MultipleSelectWithReactSelectForEdit>
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
                                                    <Accordion defaultActiveKey="0">
                                                        <div className="d-flex justify-content-between align-items-end" key={rowIndex}>
                                                            {
                                                                selectedVariantForVariant?.map((singleVariantData,index) =>
                                                                    <div key={index} className="w-100 mx-2">

                                                                        {/*<Select*/}
                                                                        {/*    labelName={' '}*/}
                                                                        {/*    placeholder={"Select an option"}*/}
                                                                        {/*    previous={variantFormValue?.[singleRowData]?.['variant']?.[singleVariantData?.value]}*/}
                                                                        {/*    options={formatAllDataForVariantValueDropdown[singleVariantData?.value]}*/}
                                                                        {/*    cngFn={(selected) => handleSelectChange(selected, singleRowData, singleVariantData?.value)}*/}
                                                                        {/*/>*/}
                                                                        <CreatableSelect
                                                                            isClearable
                                                                            isDisabled={isLoading}
                                                                            isLoading={isLoading}
                                                                            onChange={(selected) => {
                                                                                handleSelectChange(selected, singleRowData, singleVariantData?.value)
                                                                            }}
                                                                            onCreateOption={(inputValue)=>handleCreate(inputValue, singleRowData, singleVariantData)}
                                                                            options={formatAllDataForVariantValueDropdown[singleVariantData?.value]}
                                                                            value={variantFormValue?.[singleRowData]?.['variant']?.[singleVariantData?.value]}
                                                                        />
                                                                    </div>
                                                                )
                                                            }

                                                            <div className="w-100 mx-2">
                                                                <TextField
                                                                    disabled={true}
                                                                    variant='outlined'
                                                                    fullWidth
                                                                    autoComplete="off"
                                                                    size='small'
                                                                    type="text"
                                                                    placeholder="sku_01"
                                                                    value={variantFormValue?.[singleRowData]?.[`sku`] || ''}
                                                                    onChange={(e) => handleInputChange(e.target.value, singleRowData, `sku`)}
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
                                                            <div className="w-100 mx-2">
                                                                <TextField
                                                                    variant='outlined'
                                                                    fullWidth
                                                                    autoComplete="off"
                                                                    size='small'
                                                                    type="number"
                                                                    placeholder="0"
                                                                    value={variantFormValue?.[singleRowData]?.[`opening_stock_quantity`] || ''}
                                                                    onChange={(e) => handleInputChange(e.target.value, singleRowData, `opening_stock_quantity`)}
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
                                                            <div className="w-100 mx-2">
                                                                <TextField
                                                                    variant='outlined'
                                                                    fullWidth
                                                                    autoComplete="off"
                                                                    size='small'
                                                                    type="number"
                                                                    placeholder="0"
                                                                    value={variantFormValue?.[singleRowData]?.[`purchase_price`]}
                                                                    onChange={(e) => handleInputChange(e.target.value, singleRowData, `purchase_price`)}
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
                                                            <div className="w-100 mx-2">
                                                                <TextField
                                                                    variant='outlined'
                                                                    fullWidth
                                                                    autoComplete="off"
                                                                    size='small'
                                                                    type="number"
                                                                    placeholder="0"
                                                                    value={variantFormValue?.[singleRowData]?.[`selling_price`]}
                                                                    onChange={(e) => handleInputChange(e.target.value, singleRowData, `selling_price`)}
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
                                                            <div className="w-100 mx-2">
                                                                <TextField
                                                                    variant='outlined'
                                                                    fullWidth
                                                                    autoComplete="off"
                                                                    size='small'
                                                                    type="number"
                                                                    placeholder="0"
                                                                    value={variantFormValue?.[singleRowData]?.[`tax`]}
                                                                    onChange={(e) => handleInputChange(e.target.value, singleRowData, `tax`)}
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
                                                                <div onClick={() => toggle(singleRowData)} style={{marginRight: '5px', border: 'none', backgroundColor: 'white', marginTop: '25px', marginBottom: '6px', cursor: "pointer" }}>
                                                                    {
                                                                        isOpen !== singleRowData ?
                                                                            <HiPlus style={{fontSize: '19px'}}></HiPlus>
                                                                            : <HiOutlineMinusSm style={{fontSize: '19px'}}></HiOutlineMinusSm>
                                                                    }

                                                                </div>

                                                                <div onClick={() => removeItemFromVariantList(singleRowData)} style={{border: 'none', backgroundColor: 'white', marginTop: '21px', marginBottom: '6px', cursor: "pointer" }}>
                                                                    <i className="fa fa-times" style={{fontSize: '20px'}}></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Collapse isOpen={isOpen === singleRowData} style={{border: '1px solid #F1F1F1', padding: "4px", paddingBottom: 0, margin: "7px", backgroundColor: '#F1F1F1', borderRadius: "4px"}}>
                                                            <div className="mx-2 mb-2" style={{marginTop: '15px'}}>
                                                                <TextField
                                                                    variant='outlined'
                                                                    fullWidth
                                                                    autoComplete="off"
                                                                    size='small'
                                                                    type="number"
                                                                    label="Alert quantity"
                                                                    placeholder="0"
                                                                    value={variantFormValue?.[singleRowData]?.[`alert_quantity`]}
                                                                    onChange={(e) => handleInputChange(e.target.value, singleRowData, `alert_quantity`)}
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
                                                            <div style={{margin: "0 7px 13px 7px"}}>
                                                                <EditVariantImage
                                                                    rowImage={rowImage}
                                                                    setRowImage={setRowImage}
                                                                    handelUploadData={(e) =>  handleImageChangeFN(e, singleRowData, `sku_images`)}
                                                                    handleDeletedPhotos={(e) =>  handleDeletedPhotos(singleRowData, `sku_images`)}
                                                                    singleRowData={singleRowData}
                                                                    photos={photos}
                                                                    setPhotos={setPhotos}
                                                                    selectedPhotos={selectedPhotos}
                                                                    setSelectedPhotos={setSelectedPhotos}
                                                                ></EditVariantImage>
                                                            </div>
                                                        </Collapse>
                                                    </Accordion>
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

export default SelectComboVariantForEdit;
