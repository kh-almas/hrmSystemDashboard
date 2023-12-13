import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import {useForm, useWatch} from "react-hook-form";
import Select from "../../../../common/modal/Select";
import Input from "../../../../common/modal/Input";
import CkEditorComponent from "../../../../common/modal/CkEditorComponent";
import Submitbtn from "../../../../common/button/Submitbtn";
import AddUnitTypeModal from "../../../../common/component/form/inventory/unitType/AddUnitTypeModal";
import AddCategoryModal from "../../../../common/component/form/inventory/Category/AddCategoryModal";
import AddBrandModal from "../../../../common/component/form/inventory/brand/AddBrandModal";
import AddModelModal from "../../../../common/component/form/inventory/model/AddModelModal";
import DropdownTreeSelect from "react-dropdown-tree-select";
import getInventoryCategory from "../../../../common/Query/inventory/getInventoryCategory";
import getInventoryUnitType from "../../../../common/Query/inventory/getInventoryUnitType";
import getInventoryBrand from "../../../../common/Query/inventory/getInventoryBrand";
import getInventoryModel from "../../../../common/Query/inventory/getInventoryModel";
import SelectProductInCreateProductForm from "../../../../common/component/form/inventory/product/selectProductInCreateProductForm";
import axios from "../../../../../axios";
import TextField from '@mui/material/TextField';
import AutoComplete from "../../../../common/modal/AutoComplete";
import MultipleImageUploader from "../../../../common/component/imageUpload/MultipleImageUploader";
import SelectComboVariant from "./SelectComboVariant";
import Swal from "sweetalert2";
import AddProductOptionModal from "../../../../common/component/form/inventory/productOption/AddProductOptionModal";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Collapse,
    Button,
    Modal,
    ModalHeader,
    ModalBody, ModalFooter
} from 'reactstrap'
import { Accordion } from 'react-bootstrap';


const AddProduct = () => {
    const [allStoredValue, setAllStoredValue] = useState({})
    const [photos, setPhotos] = useState([]);
    const [parentCategory, setParentCategory] = useState({});
    const [processDataForCategory, setprocessDataForCategory] = useState([]);
    const [type, setType] = useState("Single");
    const [unit, setUnit] = useState(false);
    const [brand, setBrand] = useState(false);
    const [category, setCategory] = useState(false);
    const [model, setModel] = useState(false);
    const [typeChange, setTypeChange] = useState({value: "Single", label: "Single"});
    const [selectedProductForCombo, setSelectedProductForCombo] = useState([]);
    const [note, setNote] = useState('');
    const [taxType, setTaxType] = useState({value: "percent", label: "Percent"});

    const handleChangeTaxType = (selected) => {
        setTaxType(selected);
    }
    const [returnedValueFromVariantValueSelect, setReturnedValueFromVariantValueSelect] = useState({})


    const [isChange, setIsChange] = useState(false);
    const isDarty = () => {
        setIsChange(!isChange);
    }
    useEffect(() => {
        // console.log('photos',photos);
    }, [photos]);

    const unitToggle = () => {
        setUnit(!unit);
    };

    const brandToggle = () => {
        setBrand(!brand);
    };

    const categoryToggle = () => {
        setCategory(!category);
    };

    const modelToggle = () => {
        setModel(!model);
    };

    const buildDirectoryTree = (categories) => {
        const directoryMap = new Map();
        const rootDirectories = [];

        categories.forEach((category) => {
            category.label = category?.name_s;
            category.value = category?.id;
            directoryMap.set(category.id, category);
            category.children = [];
        });

        categories.forEach((category) => {
            if (category.parent_id) {
                const parent = directoryMap.get(category.parent_id);
                if (parent) {
                    parent.children.push(category);
                }
            } else {
                rootDirectories.push(category);
            }
        });

        return rootDirectories;
    };

    useEffect(() => {
        const getData = async () => {
            const getData = await getInventoryCategory();
            const outputData = buildDirectoryTree(getData?.data?.body?.data);
            setprocessDataForCategory(outputData);
        };
        getData();
    }, [isChange]);

    const selectSelectedData = (data, selected) => {
        data?.map(s_data => {
            if (s_data?.id === selected?.id) {
                s_data.checked = selected?.checked;
            } else {
                s_data.checked = false;
                if (s_data?.children?.length > 0) {
                    selectSelectedData(s_data?.children, selected);
                }
            }
        })
        if (selected?.checked === true) {
            setParentCategory(selected)
        } else {
            setParentCategory({})
        }
        setprocessDataForCategory(data);
    }

    const handleTypeChange = (selected) => {
        reset();
        setTypeChange(selected);
        setType(selected?.value);
    };

    const handelValueForCategory = (currentNode, selectedNodes) => {
        selectSelectedData(processDataForCategory, currentNode);
    }

    const [unitType, setUnitType] = useState({});
    const handleChangeForUpdateUnitType = (selected) => {
        setUnitType(selected);
    };

    const [barcodeType, setBarcodeType] = useState({});
    const handleChangeForUpdateBarcodeType = (selected) => {
        setBarcodeType(selected);
    };

    const [measurementUnit, setMeasurementUnit] = useState({});
    const handleChangeForUpdateMeasurementUnit = (selected) => {
        setMeasurementUnit(selected);
    };


    const [singleModel, setSingleModel] = useState({});
    const handleChangeForUpdateSingleModel = (selected) => {
        setSingleModel(selected);
    };

    const [brandValue, setBrandValue] = useState({});
    const handleChangeForUpdateBrandValue = (selected) => {
        setBrandValue(selected);
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: {errors},
        unregister,
    } = useForm({
        defaultValues: useMemo(()=> {
            return selectedProductForCombo;
        }, [selectedProductForCombo])
    });


    const [allUnitType, setAllUnitType] = useState([]);
    const [isUnitTypeChange, setIsUnitTypeChange] = useState(false);
    const isUnitTypeDirty = () => {
        setIsUnitTypeChange(!isUnitTypeChange);
    }
    useEffect(() => {
        const getDataFn = async () => {
            setAllUnitType([])
            const getData = await getInventoryUnitType();
            getData?.data?.body?.data?.map(item => {
                const set_data = {
                    value: item.id,
                    label: item.unit_type_s
                }
                setAllUnitType(prevUnit => [...prevUnit, set_data]);
            })
        }
        getDataFn();
    }, [isUnitTypeChange])


    const [allBrand, setAllBrand] = useState([]);
    const [isBranchChange, setIsBranchChange] = useState(false);
    const isBranchDirty = () => {
        setIsBranchChange(!isBranchChange);
    }
    useEffect(() => {
        const getDataFn = async () => {
            setAllBrand([])
            const getData = await getInventoryBrand();
            getData?.data?.body?.data?.map(item => {
                const set_data = {
                    value: item.id,
                    label: item.name_s
                }
                setAllBrand(prevBrand => [...prevBrand, set_data]);
            })
        }
        getDataFn();
    }, [isBranchChange])


    const [allModel, setAllModel] = useState([]);
    const [isModelChange, setIsModelChange] = useState(false);
    const isModelDirty = () => {
        setIsModelChange(!isModelChange);
    }
    useEffect(() => {
        const getDataFn = async () => {
            setAllModel([])
            const getData = await getInventoryModel();
            getData?.data?.body?.data?.map(item => {
                const set_data = {
                    value: item.id,
                    label: item.name_s
                }
                setAllModel(prevModel => [...prevModel, set_data]);
            })
        }
        getDataFn();
    }, [isModelChange])


    const [allDataForDropdown, setAllDataForDropdown] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/inventory-management/products/list`);
                setAllDataForDropdown(response?.data?.body?.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    }, []);



    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'sku',
            header: 'SKU',
        },
        {
            accessorKey: 'category_name',
            header: 'Category',
        },
        {
            accessorKey: 'brand_name',
            header: 'Brand',
        },
        {
            accessorKey: 'model_name',
            header: 'Model',
        },
    ];


    const [selectedDataKeyForProductList, setSelectedDataKey] = useState([]);
    const [showProductList, setShowProductList] = useState(false);
    const getSelectedData = (data) => {
        if(!selectedDataKeyForProductList.includes(data.id)){
            selectedDataKeyForProductList.push(data.id);
            setSelectedProductForCombo(prev => [...prev, data]);
        }

        setShowProductList(false);
    }

    const removeItemFromProductList = (id) => {
        if (selectedDataKeyForProductList.includes(id)){
                unregister(`product_id_${id}`)
                unregister(`quantity_${id}`)
                unregister(`price_${id}`)
                unregister(`tax_${id}`)
            const filterData = selectedProductForCombo?.filter(singleData => singleData?.id !== id);
            setSelectedProductForCombo(filterData);
            selectedDataKeyForProductList.splice(selectedDataKeyForProductList.indexOf(id), 1);
        }
    }

    // product options functionality added
    const [selectedProductOptions, setSelectedProductOptions] = useState({});
    const [productOptions, setProductOptions] = useState([]);
    const [makeProductOptions, setMakeProductOptions] = useState([]);
    const [productOptionsModal, setProductOptionsModal] = useState(false);


    //set value here
    const [addRowInOptionValue, setAddRowInOptionValue] = useState({})
    const [addRowInOptionSelectValue, setAddRowInOptionSelectValue] = useState({})
    //dynamic input here
    const [addRowInOption, setAddRowInOption] = useState({})
    const [componentRender, setComponentRender] = useState(false)


    const [isOpen, setIsOpen] = useState('');
    const accordionToggle = (id) => (isOpen === id ? setIsOpen(null) : setIsOpen(id));


    const globalOptions = () => {
        setIsOpen(selectedProductOptions?.value);
        if (makeProductOptions.length === 0) {
            setMakeProductOptions([selectedProductOptions]);
            if(!addRowInOption.hasOwnProperty(selectedProductOptions?.value)){
                addRowInOption[selectedProductOptions?.value] = [0];
            }
        } else {
            if (!makeProductOptions.some(data => data.value === selectedProductOptions.value)) {
                setMakeProductOptions(prev => [...prev, selectedProductOptions]);
                if(!addRowInOption.hasOwnProperty(selectedProductOptions?.value)){
                    addRowInOption[selectedProductOptions?.value] = [0];
                }
            }
        }
    }

    const handleChangeForProductType = (selected) => {
        setSelectedProductOptions(selected);
    };

    const toggle = () => {
        setProductOptionsModal(!productOptionsModal);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setProductOptions([])
                const response = await axios.get(`/inventory-management/products/options/list`);
                response?.data?.body?.data?.map(item => {
                    const set_data = {
                        value: item.id,
                        label: item.name
                    }
                    setProductOptions(prev => [...prev, set_data]);
                })
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    }, [isChange]);

    const removeOptions = (id) => {
        const filterData = makeProductOptions?.filter(singleData => parseInt(singleData.value) !== parseInt(id))
        setMakeProductOptions(filterData)
    }

    // const [addRowInOptionValue, setAddRowInOptionValue] = useState({})

    const handelOptionData = (field, value, singleOptions, singleRowData) => {
        if (!addRowInOptionValue.hasOwnProperty(singleOptions)) {
            addRowInOptionValue[singleOptions] = {};
        }
        if (!addRowInOptionValue[singleOptions].hasOwnProperty(singleRowData)) {
            addRowInOptionValue[singleOptions][singleRowData] = {
                "option_id": singleOptions,
            };
        }
        addRowInOptionValue[singleOptions][singleRowData][field] = value;
    };


    // const [addRowInOptionSelectValue, setAddRowInOptionSelectValue] = useState({})


    const handelOptionsSelectData = (field, selectedValue, singleOptions, singleRowData) => {
        if (!addRowInOptionSelectValue.hasOwnProperty(singleOptions)) {
            addRowInOptionSelectValue[singleOptions] = {};
        }
        if (!addRowInOptionSelectValue[singleOptions].hasOwnProperty(singleRowData)) {
            addRowInOptionSelectValue[singleOptions][singleRowData] = {};
        }
        addRowInOptionSelectValue[singleOptions][singleRowData][field] = selectedValue;

        handelOptionData(field, selectedValue.value, singleOptions, singleRowData)
    };


    const addNewRowForOptionValues = (id) => {
        if(!addRowInOption.hasOwnProperty(id)){
            addRowInOption[id] = ['0'];
        }
        let makeField = addRowInOption[id];
        makeField.push(makeField?.length);

        addRowInOption[id] = makeField;
        setComponentRender(!componentRender);
    }

    const removeItemFromVariantList = (singleOptions, singleRowData) => {
        const removeItemFrom = addRowInOption[singleOptions];

        if (removeItemFrom?.includes(singleRowData)) {
            // Use filter to create a new array without the removed item
            const remainingItems = removeItemFrom.filter(item => item !== singleRowData);

            addRowInOption[singleOptions] = remainingItems;
            setComponentRender(!componentRender);
        }
    }

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        // Extract files from the event
        const files = e.target.files;

        // Convert the files object to an array
        const filesArray = Array.from(files);

        // Update the selectedFiles state
        setSelectedFiles([...selectedFiles, ...filesArray]);

        // Log the array of files
        console.log(filesArray);
    };



    const submitAddProductForm = (data) => {
        const formData = new FormData();

        // selectedFiles.forEach((file, index) => {
        //     formData.append(`images[${index}]`, file);
        // });
        // for(let key in selectedFiles){
        //     formData.append(`images`, selectedFiles);
            // console.log(selectedFiles[key][0])
        // }

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('images', selectedFiles[i]);
        }


        console.log('imagggggggggg',formData.get('images'));

        formData.append(`HowManyImages`, 34);



        data.product_type = type;
        data.unit_id = unitType?.value;
        data.barcode_type = barcodeType?.value;
        data.brand_id = brandValue?.value;
        data.category_id = parentCategory?.id;
        data.model_id = singleModel?.value;
        data.note = note;
        data.tax_type = taxType?.value;
        data.measurement_unit = measurementUnit?.value;
        data.howManyProduct = selectedProductForCombo?.length;
        data.options = addRowInOptionValue;
        data.alert_quantity = allStoredValue.alert_quantity;
        data.opening_stock_quantity = allStoredValue.opening_stock_quantity;
        data.purchase_price = allStoredValue.purchase_price;
        data.selling_price = allStoredValue.selling_price;
        data.min_selling_price = allStoredValue.min_selling_price;
        data.tax = allStoredValue.tax;

        if (data.product_type === 'Variant'){
            let skuInfo = []
            for (let key in returnedValueFromVariantValueSelect){
                let newObj = returnedValueFromVariantValueSelect[key]
                const sku = `variant_sku_${key}`
                const openingStockQuantity = `opening_stock_quantity_${key}`
                const alertQuantity = `alert_quantity_${key}`
                const purchasePrice = `variant_purchase_price_${key}`
                const sellingPrice = `variant_selling_price_${key}`
                const tax = `tax_${key}`
                const skuArr = {
                    sku: data[sku],
                    opening_stock_quantity: data[openingStockQuantity],
                    alert_quantity: data[alertQuantity],
                    purchase_price: data[purchasePrice],
                    selling_price: data[sellingPrice],
                    tax: data[tax],
                    variant: newObj
                }
                skuInfo.push(skuArr);
                delete data[sku];
                delete data[openingStockQuantity];
                delete data[alertQuantity];
                delete data[purchasePrice]
                delete data[sellingPrice]
                delete data[tax]
            }
            data.variant_sku = skuInfo;
        }
        console.log('data', data)

        axios.post('/inventory-management/products/add', formData)
            .then(info => {
                console.log(info);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                // reset();
                // toggle();
                // }
                // reFetch();
            })
            .catch(e => {
                console.log(e)
                if(e?.response?.data?.body?.message?.errno == 1062){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Can not duplicate product name`
                    })
                }
                // else {
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Oops...',
                //         text: `${e?.response?.data?.body?.message?.details[0].message}`
                //     })
                // }
            })
    }


    return (
        <div>
            <Breadcrumb parent="Inventory management" title="Add New Product"/>
            <div className="container-fluid">
                <form onSubmit={handleSubmit(submitAddProductForm)} encType="multipart/form-data">
                    <div className="edit-profile">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="">
                                            <div className="pb-2 d-flex align-items-center justify-content-center">
                                                <div className="form-check form-check-inline align-items-center">
                                                    <input {...register("is_raw_material")} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1"/>
                                                    <label className="form-check-label" htmlFor="inlineRadio1">
                                                        Raw Material
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input {...register("is_raw_material")} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="0" checked={true}/>
                                                    <label className="form-check-label" htmlFor="inlineRadio2">
                                                        Finish Product
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <Select
                                                    labelName={"Product Type"}
                                                    placeholder={"Select an option"}
                                                    options={[
                                                        {value: "Single", label: "Single"},
                                                        {value: "Variant", label: "Variant"},
                                                        {value: "Combo", label: "Combo"},
                                                        {value: "Service", label: "Service"}]}
                                                    setValue={setTypeChange}
                                                    cngFn={handleTypeChange}
                                                    previous={typeChange}
                                                />
                                            </div>
                                            <div>
                                                <input type="file" onChange={handleFileChange} multiple/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {type !== "Service" ? (
                                <div className="card">
                                    <div className="card-body">
                                        {type === "Single" || type === "Variant" || type === "Combo" ? (
                                            <div className="pb-3">
                                                <Select
                                                    name={"measurement_unit"}
                                                    labelName={"Size unit"}
                                                    placeholder={"Select size unit"}
                                                    options={[
                                                        {value: "Inch", label: "Inch"},
                                                        {value: "Cm", label: "Cm"}]}
                                                    setValue={setMeasurementUnit}
                                                    cngFn={handleChangeForUpdateMeasurementUnit}
                                                />
                                            </div>
                                        ) : ( "")}
                                        <div>
                                            <h6 className="mb-0">Product size</h6>
                                            <div className='row row-cols-1 row-cols-md-2'>
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Height"}
                                                            inputName={"height"}
                                                            inputType={"number"}
                                                            placeholder={"height"}
                                                            validation={{
                                                                ...register("p_height"),
                                                            }}
                                                        />
                                                    </div>
                                                ) : ( "" )}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Width"}
                                                            inputName={"width"}
                                                            inputType={"number"}
                                                            placeholder={"width"}
                                                            validation={{
                                                                ...register("p_width"),
                                                            }}
                                                        />
                                                    </div>
                                                ) : ( "" )}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Length"}
                                                            inputName={"length"}
                                                            inputType={"number"}
                                                            placeholder={"Length"}
                                                            validation={{...register("p_length")}}
                                                        />
                                                    </div>
                                                ) : ('')}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Weight"}
                                                            inputName={"weight"}
                                                            inputType={"number"}
                                                            placeholder={"weight"}
                                                            validation={{...register("p_weight")}}
                                                        />
                                                    </div>
                                                ) : ('')}
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <h6 className="mb-0">Package size</h6>
                                            <div className="row row-cols-1 row-cols-md-2">
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Height"}
                                                            inputName={"height"}
                                                            inputType={"number"}
                                                            placeholder={"height"}
                                                            validation={{
                                                                ...register("package_height"),
                                                            }}
                                                        />
                                                    </div>
                                                ) : ( "" )}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Width"}
                                                            inputName={"width"}
                                                            inputType={"number"}
                                                            placeholder={"width"}
                                                            validation={{
                                                                ...register("package_width"),
                                                            }}
                                                        />
                                                    </div>
                                                ) : ( "" )}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Length"}
                                                            inputName={"length"}
                                                            inputType={"number"}
                                                            placeholder={"Length"}
                                                            validation={{...register("package_length")}}
                                                        />
                                                    </div>
                                                ) : ('')}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Weight"}
                                                            inputName={"weight"}
                                                            inputType={"number"}
                                                            placeholder={"weight"}
                                                            validation={{...register("package_weight")}}
                                                        />
                                                    </div>
                                                ) : ('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ) : ( "" )}

                                <div>
                                    <MultipleImageUploader photos={photos} setPhotos={setPhotos}></MultipleImageUploader>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">

                                                <div className="row row-cols-3">
                                                    {type == "Single" || type == "Combo" || type === "Variant" || type === "Service"? (
                                                    <div>
                                                        <Input
                                                            labelName={"Product Name"}
                                                            inputName={"product-name"}
                                                            inputType={"text"}
                                                            placeholder={"Product Name"}
                                                            validation={{...register("name")}}
                                                        />
                                                    </div>
                                                    ) : ( "" )}
                                                    {type !== "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Product Sku"}
                                                            inputName={"product-sku"}
                                                            placeholder={"Product-Sku"}
                                                            inputType={"text"}
                                                            validation={{
                                                                ...register("sku"),
                                                            }}
                                                        />
                                                    </div>
                                                    ) : ( "" )}
                                                    {type === "Single" ? (
                                                    <div>
                                                        <Input
                                                            name={"hsn"}
                                                            labelName={"HSN"}
                                                            inputType={"text"}
                                                            placeholder={"HSN"}
                                                            validation={{...register("hsn")}}
                                                        />
                                                    </div>
                                                    ) : ( "" )}
                                                </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    {type !== "Service" ? (
                                    <div className="card">
                                        <div className="card-body">
                                            <div>
                                                <div className="row row-cols-1 row-cols-md-2">
                                                    {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div style={{position: "relative"}}>
                                                        <p onClick={unitToggle}
                                                           style={{position: "absolute", right: "14px", cursor: "pointer",}}
                                                           className="text-primary">
                                                            New Unit
                                                            <span>
                                                          <i className="icofont icofont-plus-circle"></i>
                                                        </span>
                                                        </p>
                                                        <div>
                                                            <Select
                                                                name={"select-unit"}
                                                                // labelName={"select-unit"}
                                                                placeholder={"Select Unit"}
                                                                options={allUnitType}
                                                                setValue={setUnitType}
                                                                cngFn={handleChangeForUpdateUnitType}
                                                            />
                                                        </div>
                                                    </div>
                                                    ) : ( "" )}



                                                    {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div style={{position: "relative"}}>
                                                        <p
                                                            onClick={brandToggle}
                                                            style={{
                                                                position: "absolute",
                                                                right: "14px",
                                                                cursor: "pointer",
                                                            }}
                                                            className="text-primary"
                                                        >
                                                            New Brand
                                                            <span>
                    <i className="icofont icofont-plus-circle"></i>
                  </span>
                                                        </p>

                                                        <div>
                                                            <Select
                                                                name={"select-brand"}
                                                                // labelName={"Select Brand"}
                                                                placeholder={"Select Brand"}
                                                                options={allBrand}
                                                                setValue={setBrandValue}
                                                                cngFn={handleChangeForUpdateBrandValue}
                                                            />
                                                        </div>
                                                    </div>
                                                    ) : ( "" )}

                                                    {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div style={{position: "relative"}}>
                                                        <p
                                                            onClick={modelToggle}
                                                            style={{
                                                                position: "absolute",
                                                                right: "14px",
                                                                cursor: "pointer",
                                                            }}
                                                            className="text-primary"
                                                        >
                                                            Model
                                                            <span>
                                  <i className="icofont icofont-plus-circle"></i>
                                </span>
                                                        </p>

                                                        <div>
                                                            <Select
                                                                name={"select-Model"}
                                                                // labelName={"Select Model"}
                                                                placeholder={"Select Model"}
                                                                options={allModel}
                                                                setValue={setSingleModel}
                                                                cngFn={handleChangeForUpdateSingleModel}
                                                            />
                                                        </div>
                                                    </div>
                                                    ) : ( "" )}

                                                    {type === "Single" || type === "Variant" || type === "Combo" ? (
                                                    <div>
                                                        <Select
                                                            name={"barcode-type"}
                                                            // labelName={"Barcode Type"}
                                                            placeholder={"Select Barcode Type"}
                                                            options={[
                                                                {value: "Single", label: "Single"},
                                                                {value: "Variant", label: "Variant"},
                                                                {value: "Combo", label: "Combo"},
                                                                {value: "Service", label: "Service"}]}
                                                            setValue={setBarcodeType}
                                                            cngFn={handleChangeForUpdateBarcodeType}
                                                        />
                                                    </div>
                                                    ) : ( "")}
                                                </div>


                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                <div className="mt-2">
                                                    <div className="d-flex justify-content-between">
                                                        <label htmlFor="exampleFormControlTextarea4"
                                                               style={{fontSize: '11px'}}>
                                                            Select Category
                                                        </label>
                                                        <p onClick={categoryToggle}
                                                           style={{cursor: "pointer", marginBottom: '7px'}}
                                                           className="text-primary">
                                                            New Category
                                                            <span>
                                                              <i className="icofont icofont-plus-circle"></i>
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <DropdownTreeSelect
                                                            mode='radioSelect'
                                                            data={processDataForCategory}
                                                            onChange={handelValueForCategory}
                                                        />
                                                    </div>
                                                </div>
                                                ) : ( "" )}

                                            </div>
                                        </div>
                                    </div>
                                    ) : ( "" )}
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div>
                                                    <div className="row row-cols-3">
                                                        {type === "Single" || type === "Combo" || type === "Variant" ? (
                                                        <div className={"mt-3"}>
                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type={'number'}
                                                                label={'Alert Quantity'}
                                                                onChange={e => {
                                                                    allStoredValue.alert_quantity= e.target.value
                                                                    setAllStoredValue(allStoredValue)
                                                                }}

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
                                                                        height: 35,
                                                                        backgroundColor: 'white',
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: '#979797',
                                                                            borderWidth: '1px'
                                                                        },
                                                                    },
                                                                }} />
                                                        </div>
                                                        ) : ( "" )}

                                                        {type == "Single" || type == "Combo" || type == "Variant" ? (
                                                        <div className={"mt-3"}>
                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type={'number'}
                                                                label={'Opening stock quantity'}
                                                                {...register("opening_stock_quantity")}
                                                                onChange={e => {
                                                                    allStoredValue.opening_stock_quantity= e.target.value
                                                                    setAllStoredValue(allStoredValue)
                                                                }}

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
                                                                        height: 35,
                                                                        backgroundColor: 'white',
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: '#979797',
                                                                            borderWidth: '1px'
                                                                        },
                                                                    },
                                                                }} />
                                                        </div>
                                                        ) : ( "" )}

                                                        {type === "Single" || type === "Combo" || type === "Variant" || type === "Service" ? (
                                                        <div className={"mt-3"}>
                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type={'number'}
                                                                label={'Purchase Price'}
                                                                {...register("purchase_price")}
                                                                onChange={e => {
                                                                    allStoredValue.purchase_price= e.target.value
                                                                    setAllStoredValue(allStoredValue)
                                                                }}

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
                                                        ) : ( "" )}

                                                        { type == "Single" || type === "Combo" || type === "Variant" || type === "Service" ? (
                                                        <div className={"mt-3"}>

                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type={'number'}
                                                                label={'Selling Price'}
                                                                // placeholder={'placeholder'}
                                                                {...register("selling_price")}
                                                                onChange={e => {
                                                                    allStoredValue.selling_price= e.target.value
                                                                    setAllStoredValue(allStoredValue)
                                                                }}

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
                                                        ) : ( "" )}

                                                        {type == "Single" || type == "Combo" || type == "Variant" ? (
                                                        <>
                                                            <div className={"mt-3"}>

                                                                <TextField
                                                                    variant='outlined'
                                                                    fullWidth
                                                                    autoComplete="off"
                                                                    size='small'
                                                                    type={'number'}
                                                                    label={'Min Selling Price'}
                                                                    // placeholder={'placeholder'}
                                                                    {...register("min_selling_price")}
                                                                    onChange={e => {
                                                                        allStoredValue.min_selling_price= e.target.value
                                                                        setAllStoredValue(allStoredValue)
                                                                    }}

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
                                                        </>
                                                        ) : ( "" )}

                                                        {type == "Single" || type == "Combo" || type === "Variant" || type === "Service" ? (
                                                        <div className="mt-3">
                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type={'number'}
                                                                label={'Tax'}
                                                                // placeholder={'placeholder'}
                                                                {...register("tax")}
                                                                onChange={e => {
                                                                    allStoredValue.tax= e.target.value
                                                                    setAllStoredValue(allStoredValue)
                                                                }}

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
                                                                        // '& fieldset span': {
                                                                        //     paddingRight: '6px',
                                                                        // },
                                                                        // '&.Mui-focused fieldset span': {
                                                                        //     // paddingRight: '6px',
                                                                        // },
                                                                    },
                                                                }} />
                                                        </div>
                                                        ) : ( "" )}

                                                        {type == "Single" || type == "Combo" || type === "Variant" || type === "Service" ? (
                                                        <div>
                                                            <Select
                                                                placeholder={"Tax Type"}
                                                                // previous={taxType}
                                                                options={[{value: "percent", label: "Percent"}, {value: "value", label: "Value"}]}
                                                                setValue={setTaxType}
                                                                cngFn={handleChangeTaxType}
                                                            />
                                                        </div>
                                                        ) : ( "" )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <CkEditorComponent label={"Note"} setContent={setNote} content={note}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {type == "Combo" ? (
                        <div className="">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">Choose Product</h4>
                                </div>

                                <div className="px-3">
                                    <SelectProductInCreateProductForm data={allDataForDropdown} selectedDataKey={selectedDataKeyForProductList} show={showProductList} setShow={setShowProductList} getSelectedData={getSelectedData} columns={columns}></SelectProductInCreateProductForm>
                                </div>


                                <div className="table-responsive mt-4">
                                    {selectedProductForCombo?.length > 0 ?
                                        <table className="table card-table text-nowrap">
                                            <thead className="table-border">
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Tax</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                selectedProductForCombo?.map((singleData, index) =>
                                                    <tr key={index}>
                                                        <td>
                                                            <div>
                                                                <TextField
                                                                    disabled
                                                                    id="outlined-size-small"
                                                                    value={singleData?.name}
                                                                    size="small"
                                                                    validation={{...register(`product_id_${index}`,{ value: singleData?.id })}}
                                                                    sx={{
                                                                        width: '100%',
                                                                        marginTop: '16px'
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div>
                                                                <Input
                                                                    inputName={"quantity"}
                                                                    inputType={"number"}
                                                                    placeholder={"0"}
                                                                    validation={{
                                                                        ...register(`quantity_${index}`),
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <Input
                                                                    inputName={"price"}
                                                                    inputType={"number"}
                                                                    placeholder={"0"}
                                                                    // defaultValue={singleData?.selling_price * }
                                                                    validation={{
                                                                        ...register(`price_${index}`),
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <Input
                                                                    inputName={"tax"}
                                                                    inputType={"number"}
                                                                    placeholder={"0"}
                                                                    validation={{
                                                                        ...register(`tax_${index}`),
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="text-end" style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
                                                            <div style={{border: 'none', backgroundColor: 'white', marginTop: '22px', marginBottom: '6px', cursor: "pointer" }} onClick={() => removeItemFromProductList(singleData?.id)}>
                                                                <i className="fa fa-times" style={{fontSize: '20px'}}></i>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                        : ''
                                    }

                                </div>
                            </div>
                        </div>
                        ) : ( "")}

                        { type === "Variant" ? (
                            <SelectComboVariant allStoredValue={allStoredValue} returnedValueFromVariantValueSelect={returnedValueFromVariantValueSelect} setReturnedValueFromVariantValueSelect={setReturnedValueFromVariantValueSelect} register={register} unregister={unregister}></SelectComboVariant>
                        ) : ( "")}
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title mb-0">Products Options</h4>
                        </div>
                        <div className="card-body">
                            <Container fluid={true}>
                                <Row>
                                    <Col sm="12" xl="12">
                                        <Accordion defaultActiveKey="0">
                                            <div className="default-according" id="accordion">
                                                {
                                                    makeProductOptions?.map(singleOptions =>
                                                        <>
                                                            <Card>
                                                                <CardHeader>
                                                                    <h5 className="mb-0">
                                                                        <div className="d-flex justify-content-between">
                                                                            <Button as={Card.Header} className='btn btn-link' color='default' onClick={() => accordionToggle(singleOptions?.value)}  >
                                                                                {singleOptions?.label}
                                                                            </Button>
                                                                            <div style={{border: 'none', backgroundColor: 'white', marginTop: '22px', marginBottom: '6px', cursor: "pointer" }} onClick={() => removeOptions(singleOptions?.value)}>
                                                                                <i className="fa fa-times" style={{fontSize: '20px'}}></i>
                                                                            </div>
                                                                        </div>

                                                                    </h5>
                                                                </CardHeader>
                                                                <Collapse isOpen={parseInt(isOpen) === parseInt(singleOptions?.value)}>
                                                                    <CardBody>

                                                                        <div>


                                                                            {
                                                                                addRowInOption[singleOptions?.value]?.length > 0 ?
                                                                                    <div>
                                                                                        <div className="d-flex justify-content-between" style={{marginBottom: '-25px'}}>
                                                                                            <p className="w-100 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Label</p>
                                                                                            <p className="w-100 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Price</p>
                                                                                            <p className="w-100 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Price Type</p>
                                                                                            <p className="w-25 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Action</p>
                                                                                        </div>
                                                                                        <div>
                                                                                            {
                                                                                                addRowInOption[singleOptions?.value]?.map((singleRowData, rowIndex) =>
                                                                                                    <div className="d-flex justify-content-between" key={rowIndex}>
                                                                                                        <div className="w-100 mx-2" style={{marginTop: '37px'}}>
                                                                                                            <TextField
                                                                                                                variant='outlined'
                                                                                                                fullWidth
                                                                                                                autoComplete="off"
                                                                                                                size='small'
                                                                                                                type="text"
                                                                                                                placeholder={singleRowData}
                                                                                                                value={addRowInOptionValue?.[singleOptions?.value]?.[singleRowData]?.['option_value_name']}
                                                                                                                onChange={e => handelOptionData('option_value_name', e.target.value, singleOptions?.value, singleRowData)}
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
                                                                                                                type="number"
                                                                                                                placeholder="0"
                                                                                                                value={addRowInOptionValue?.[singleOptions?.value]?.[singleRowData]?.['added_price_value']}
                                                                                                                onChange={e => handelOptionData('added_price_value', e.target.value, singleOptions?.value, singleRowData)}
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
                                                                                                            <Select
                                                                                                                placeholder={"Price Type"}
                                                                                                                options={[{value: "fixed", label: "Fixed"}, {value: "percent", label: "Percent"}]}
                                                                                                                setValue={setTaxType}
                                                                                                                cngFn={(selected) => handelOptionsSelectData('added_price_type', selected, singleOptions?.value, singleRowData)}
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div className="text-end w-25 mx-2" style={{marginTop: '16px', display: "flex", justifyContent: "center", alignItems: 'center'}}>
                                                                                                            <div onClick={() => removeItemFromVariantList(singleOptions?.value, singleRowData)} style={{border: 'none', backgroundColor: 'white', marginTop: '25px', marginBottom: '6px', cursor: "pointer" }}>
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
                                                                                <button onClick={() => addNewRowForOptionValues(singleOptions?.value)} className="btn btn-outline-primary btn-xs mx-3 mt-1" type="button">Add new item</button>
                                                                            </div>
                                                                        </div>




                                                                    </CardBody>
                                                                </Collapse>
                                                            </Card>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </Accordion>
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                        <div className="my-3">
                            <div class="d-flex justify-content-between">
                                <div class="mr-auto p-2">
                                    <button onClick={() => toggle()} className="btn btn-secondary btn-sm" type="button">Add new option</button>
                                </div>
                                <div className="d-flex">
                                    <div style={{marginTop: '-28px', width: '200px'}}>
                                        <Select
                                            name={"option"}
                                            // labelName={"Barcode Type"}
                                            placeholder={"Select Barcode Type"}
                                            options={productOptions}
                                            setValue={setSelectedProductOptions}
                                            cngFn={handleChangeForProductType}
                                        />
                                    </div>
                                    <div class="p-2">
                                        <button onClick={() => globalOptions()} className="btn btn-secondary btn-sm" type="button">Add global options</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Submitbtn name={"Add Product"}/>
                </form>
            </div>


            <AddProductOptionModal modal={productOptionsModal} toggle={toggle} reFetch={isDarty}></AddProductOptionModal>

            <AddUnitTypeModal modal={unit} toggle={unitToggle} reFetch={isUnitTypeDirty}></AddUnitTypeModal>
            <AddCategoryModal isChange={isChange} modal={category} toggle={categoryToggle} reFetch={isDarty}></AddCategoryModal>
            <AddBrandModal modal={brand} toggle={brandToggle} reFetch={isBranchDirty}></AddBrandModal>
            <AddModelModal modal={model} toggle={modelToggle} reFetch={isModelDirty}></AddModelModal>
        </div>
    );
};

export default AddProduct;
