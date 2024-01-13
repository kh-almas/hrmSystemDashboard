import React, { useEffect, useMemo, useState} from "react";
import Breadcrumb from "../../../../common/breadcrumb";
import {useForm} from "react-hook-form";
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
import SelectComboVariant from "./SelectComboVariant";
import Swal from "sweetalert2";
import AddProductOptionModal from "../../../../common/component/form/inventory/productOption/AddProductOptionModal";
import {Container, Card, CardHeader, CardBody, Collapse} from 'reactstrap'
import { Accordion } from 'react-bootstrap';
import ProductImage from "./ProductImage";
import {Trash2} from "react-feather";

const AddProduct = () => {
    const [componentRender, setComponentRender] = useState(false)
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
    const [priceType, setPriceType] = useState({value: "percent", label: "Percent"});
    const [variantFormValue, setVariantFormValue] = useState({});
    const [previousSKU, setPreviousSKU] = useState([]);
    const [baseProductSKU, setBaseProductSKU] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: {errors},
        unregister,
        clearErrors
    } = useForm({
        // mode:'onChange',
        defaultValues: useMemo(()=> {
            return selectedProductForCombo;
        }, [selectedProductForCombo])
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setProductOptions([])
                const response = await axios.get(`/inventory-management/products/get-all-sku`);
                const allSKUData = response?.data?.body?.data?.map(item => item.sku)
                setPreviousSKU(allSKUData)
                
                const prefix = 'sku_';
                let randomSku;

                do {
                    randomSku = `${prefix}${Math.random().toString(36).substr(2, 12)}`;
                } while (allSKUData.includes(randomSku));

                setBaseProductSKU(randomSku);
                setPreviousSKU(prev => [...prev, randomSku])
                reset();
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    }, []);

    const handleChangeTaxType = (selected) => {
        setTaxType(selected);
    }


    const [isChange, setIsChange] = useState(false);
    const isDarty = () => {
        setIsChange(!isChange);
    }
    useEffect(() => {
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

    const [barcodeType, setBarcodeType] = useState({value: "Single", label: "Single"});
    const handleChangeForUpdateBarcodeType = (selected) => {
        setBarcodeType(selected);
    };

    const [measurementUnit, setMeasurementUnit] = useState({value: "Inch", label: "Inch"});
    const handleChangeForUpdateMeasurementUnit = (selected) => {
        setMeasurementUnit(selected);
    };

    const [weightUnit, setWeightUnit] = useState({value: "Gram (g)", label: "Gram (g)"});
    const handleChangeForUpdateWeightUnit = (selected) => {
        setWeightUnit(selected);
    };

    const [singleModel, setSingleModel] = useState({});
    const handleChangeForUpdateSingleModel = (selected) => {
        setSingleModel(selected);
    };

    const [brandValue, setBrandValue] = useState({});
    const handleChangeForUpdateBrandValue = (selected) => {
        setBrandValue(selected);
    };



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

    useEffect(() => {
        setUnitType(allUnitType?.[0]);
    }, [allUnitType]);

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

    useEffect(() => {
        setBrandValue(allBrand?.[0]);
    }, [allBrand]);


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

    useEffect(() => {
        setSingleModel(allModel?.[0]);
    }, [allModel]);

    const [allDataForDropdown, setAllDataForDropdown] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/inventory-management/products/list/combo/select`);
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
    const [totalComboPrice, setTotalComboPrice] = useState(0)
    const getSelectedData = (data) => {

        if(!selectedDataKeyForProductList.includes(data.id)){
            selectedDataKeyForProductList.push(data.id);
            setTotalComboPrice(prev => prev + data?.price)
            setSelectedProductForCombo(prev => [...prev, data]);
        }
        setShowProductList(false);
    }

    const removeItemFromProductList = (id, index) => {
        if (selectedDataKeyForProductList.includes(id)){
                unregister(`product_id_${index}`)
                unregister(`quantity_${index}`)
                unregister(`price_${index}`)
                unregister(`tax_${index}`)
            const filterData = selectedProductForCombo?.filter(singleData => singleData?.id !== id);
            setSelectedProductForCombo(filterData);
            selectedDataKeyForProductList.splice(selectedDataKeyForProductList.indexOf(id), 1);
        }
    }

    const [selectedProductOptions, setSelectedProductOptions] = useState({});
    const [productOptions, setProductOptions] = useState([]);
    const [makeProductOptions, setMakeProductOptions] = useState([]);
    const [productOptionsModal, setProductOptionsModal] = useState(false);
    const [addRowInOptionValue, setAddRowInOptionValue] = useState({})
    const [addRowInOptionSelectValue, setAddRowInOptionSelectValue] = useState({})
    const [addRowInOption, setAddRowInOption] = useState({})

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

    // console.log('addRowInOptionValue', addRowInOptionValue)
    const removeItemFromVariantList = (singleOptions, singleRowData) => {

        const removeItemFrom = addRowInOption[singleOptions];

        if (removeItemFrom && removeItemFrom.includes(singleRowData)) {
            // Remove item from addRowInOption
            const remainingItems = removeItemFrom.filter(item => item !== singleRowData);
            addRowInOption[singleOptions] = remainingItems;

            // Remove item from addRowInOptionValue
            const removedFrom = addRowInOptionValue[singleOptions];
            const remainingItem = {};

            for (let key in removedFrom) {
                if (key !== singleRowData) {
                    remainingItem[key] = removedFrom[key];
                }
            }

            addRowInOptionValue[singleOptions][singleRowData] = remainingItem;
            setComponentRender(prevState => !prevState);
        }
    };



    const submitAddProductForm = (data) => {
        let files = [];

        photos?.map(singlePhotos => {
            files.push(singlePhotos?.file)

        })

        data.product_type = type;
        data.unit_id = unitType?.value;
        data.barcode_type = barcodeType?.value;
        data.brand_id = brandValue?.value;
        data.category_id = parentCategory?.id;
        data.model_id = singleModel?.value;
        data.note = note;
        data.tax_type = taxType?.value;
        data.measurement_unit = measurementUnit?.value;
        data.weight_unit = weightUnit?.value;
        data.howManyProduct = selectedProductForCombo?.length;
        data.options = addRowInOptionValue;
        data.alert_quantity = allStoredValue.alert_quantity;
        data.opening_stock_quantity = allStoredValue.opening_stock_quantity;
        data.purchase_price = allStoredValue.purchase_price;
        data.selling_price = allStoredValue.selling_price;
        data.min_selling_price = allStoredValue.min_selling_price;
        data.tax = allStoredValue.tax;
        data.has_serial_key = data?.has_serial_key === true ? 1 : 0;
        data.photos = JSON.stringify(photos);
        data.sku = baseProductSKU;


        if (data.product_type === 'Variant'){
            data.variant_sku = JSON.stringify(variantFormValue);
        }

        function createFormData(data) {
            const formData = new FormData();

            for (const key in data) {
                if(key === 'photos'){
                    for (let i = 0; i < photos.length; i++) {
                        formData.append('images', files[i]);
                    }
                } else if(key === 'options') {
                    formData.append('options', JSON.stringify(data[key]));
                }else{
                    if (data.hasOwnProperty(key) && data[key] !== undefined && data[key] !== null) {
                        formData.append(key, data[key]);
                    }
                }
            }

            return formData;
        }
        const formData = createFormData(data);
        console.log('data', data);

        axios.post('/inventory-management/products/add', formData)
            .then(info => {
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
                if(e?.response?.data?.body?.message?.errno == 1062){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Can not duplicate product sku`
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
                                                    // placeholder={"Select an option"}
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
                                        </div>
                                    </div>
                                </div>

                                {type !== "Service" ? (
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row row-cols-md-2">
                                            {type === "Single" || type === "Variant" || type === "Combo" ? (
                                                <div className="pb-3">
                                                    <Select
                                                        name={"measurement_unit"}
                                                        labelName={"Size unit"}
                                                        // placeholder={"Select size unit"}
                                                        previous={measurementUnit}
                                                        options={[
                                                            {value: "Inch", label: "Inch"},
                                                            {value: "Cm", label: "Cm"},
                                                        {value: "mm", label: "mm"}]}
                                                    setValue={setMeasurementUnit}
                                                    cngFn={handleChangeForUpdateMeasurementUnit}
                                                    />
                                                </div>
                                            ) : ( "")}

                                            {type === "Single" || type === "Variant" || type === "Combo" ? (
                                                <div className="pb-3">
                                                    <Select
                                                        name={"weight_unit"}
                                                        labelName={"Weight unit"}
                                                        // placeholder={"Select size unit"}
                                                        previous={weightUnit}
                                                        options={[
                                                            {value: "Gram (g)", label: "Gram (g)"},
                                                            {value: "Kilogram (kg)", label: "Kilogram (kg)"}]}
                                                    setValue={setWeightUnit}
                                                    cngFn={handleChangeForUpdateWeightUnit}
                                                    />
                                                </div>
                                            ) : ( "")}
                                        </div>
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
                                                            defaultValue={0}
                                                            validation={{...register('p_height', {
                                                                    required: 'This field is required',
                                                                    pattern: {
                                                                        value: /^[0-9]+$/,
                                                                        message: 'Use only number',
                                                                    },
                                                                })}}
                                                            performOnValue={(e) => clearErrors(["p_height"])}
                                                            error={errors.p_height}
                                                        />
                                                        {errors.p_height && <span style={{fontSize: '10px'}}>{errors.p_height.message}</span>}
                                                    </div>
                                                ) : ( "" )}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Width"}
                                                            inputName={"width"}
                                                            inputType={"number"}
                                                            defaultValue={0}
                                                            placeholder={"width"}
                                                            validation={{...register('p_width', {
                                                                    required: 'This field is required',
                                                                    pattern: {
                                                                        value: /^[0-9]+$/,
                                                                        message: 'Use only number',
                                                                    },
                                                                })}}
                                                            performOnValue={(e) => clearErrors(["p_width"])}
                                                            error={errors.p_width}
                                                        />
                                                        {errors.p_width && <span style={{fontSize: '10px'}}>{errors.p_width.message}</span>}
                                                    </div>
                                                ) : ( "" )}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Length"}
                                                            inputName={"length"}
                                                            defaultValue={0}
                                                            inputType={"number"}
                                                            placeholder={"Length"}
                                                            validation={{...register('p_length', {
                                                                    required: 'This field is required',
                                                                    pattern: {
                                                                        value: /^[0-9]+$/,
                                                                        message: 'Use only number',
                                                                    },
                                                                })}}
                                                            performOnValue={(e) => clearErrors(["p_length"])}
                                                            error={errors.p_length}
                                                        />
                                                        {errors.p_length && <span style={{fontSize: '10px'}}>{errors.p_length.message}</span>}
                                                    </div>
                                                ) : ('')}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Weight"}
                                                            inputName={"weight"}
                                                            inputType={"number"}
                                                            defaultValue={0}
                                                            placeholder={"weight"}
                                                            validation={{...register('p_weight', {
                                                                    required: 'This field is required',
                                                                    pattern: {
                                                                        value: /^[0-9]+$/,
                                                                        message: 'Use only number',
                                                                    },
                                                                })}}
                                                            performOnValue={(e) => clearErrors(["p_weight"])}
                                                            error={errors.p_weight}
                                                        />
                                                        {errors.p_weight && <span style={{fontSize: '10px'}}>{errors.p_weight.message}</span>}
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
                                                            defaultValue={0}
                                                            placeholder={"height"}
                                                            validation={{...register('package_height', {
                                                                    required: 'This field is required',
                                                                    pattern: {
                                                                        value: /^[0-9]+$/,
                                                                        message: 'Use only number',
                                                                    },
                                                                })}}
                                                            performOnValue={(e) => clearErrors(["package_height"])}
                                                            error={errors.package_height}
                                                        />
                                                        {errors.package_height && <span style={{fontSize: '10px'}}>{errors.package_height.message}</span>}
                                                    </div>
                                                ) : ( "" )}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Width"}
                                                            inputName={"width"}
                                                            inputType={"number"}
                                                            defaultValue={0}
                                                            placeholder={"width"}
                                                            validation={{...register('package_width', {
                                                                    required: 'This field is required',
                                                                    pattern: {
                                                                        value: /^[0-9]+$/,
                                                                        message: 'Use only number',
                                                                    },
                                                                })}}
                                                            performOnValue={(e) => clearErrors(["package_width"])}
                                                            error={errors.package_width}
                                                        />
                                                        {errors.package_width && <span style={{fontSize: '10px'}}>{errors.package_width.message}</span>}
                                                    </div>
                                                ) : ( "" )}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Length"}
                                                            inputName={"length"}
                                                            inputType={"number"}
                                                            defaultValue={0}
                                                            placeholder={"Length"}
                                                            validation={{...register('package_length', {
                                                                    required: 'This field is required',
                                                                    pattern: {
                                                                        value: /^[0-9]+$/,
                                                                        message: 'Use only number',
                                                                    },
                                                                })}}
                                                            performOnValue={(e) => clearErrors(["package_length"])}
                                                            error={errors.package_length}
                                                        />
                                                        {errors.package_length && <span style={{fontSize: '10px'}}>{errors.package_length.message}</span>}
                                                    </div>
                                                ) : ('')}
                                                {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                    <div>
                                                        <Input
                                                            labelName={"Weight"}
                                                            inputName={"weight"}
                                                            inputType={"number"}
                                                            defaultValue={0}
                                                            placeholder={"weight"}
                                                            validation={{...register('package_weight', {
                                                                    required: 'This field is required',
                                                                    pattern: {
                                                                        value: /^[0-9]+$/,
                                                                        message: 'Use only number',
                                                                    },
                                                                })}}
                                                            performOnValue={(e) => clearErrors(["package_weight"])}
                                                            error={errors.package_weight}
                                                        />
                                                        {errors.package_weight && <span style={{fontSize: '10px'}}>{errors.package_weight.message}</span>}
                                                    </div>
                                                ) : ('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ) : ( "" )}

                                <div>
                                    <ProductImage photos={photos} setPhotos={setPhotos}></ProductImage>
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
                                                                clearErrors={clearErrors}
                                                                labelName={"Product Name"}
                                                                inputName={"product-name"}
                                                                inputType={"text"}
                                                                placeholder={"Product Name"}
                                                                validation={{...register('name', {
                                                                        required: 'This field is required',
                                                                        pattern: {
                                                                            value: /^[A-Za-z\s]+$/,
                                                                            message: 'Use only alphabet',
                                                                        },
                                                                    })}}
                                                                performOnValue={(e) => clearErrors(["name"])}
                                                                error={errors.name}

                                                            />
                                                            {errors.name && <span style={{fontSize: '10px'}}>{errors.name.message}</span>}
                                                        </div>
                                                    ) : ( "" )}
                                                    {type !== "Variant" ? (
                                                    <div className={"mt-3"}>
                                                        {/*<Input*/}
                                                        {/*    disabled={'disabled'}*/}
                                                        {/*    labelName={"Product Sku"}*/}
                                                        {/*    inputName={"product-sku"}*/}
                                                        {/*    placeholder={"Product-Sku"}*/}
                                                        {/*    defaultValue={baseProductSKU}*/}
                                                        {/*    inputType={"text"}*/}
                                                        {/*    validation={{...register('sku', {*/}
                                                        {/*            required: 'This field is required',*/}
                                                        {/*            pattern: {*/}
                                                        {/*                value: /^[A-Za-z0-9_-]+$/,*/}
                                                        {/*                message: 'Use only alphabet and number',*/}
                                                        {/*            },*/}
                                                        {/*        })}}*/}
                                                        {/*    performOnValue={(e) => clearErrors(["sku"])}*/}
                                                        {/*    error={errors.name}*/}
                                                        {/*/>*/}

                                                        <TextField
                                                            disabled={true}
                                                            variant='outlined'
                                                            fullWidth
                                                            autoComplete="off"
                                                            size='small'
                                                            type={'text'}
                                                            value={`${baseProductSKU}`}
                                                            label={'SKU'}

                                                            sx={{
                                                                '& .MuiFormLabel-root': {
                                                                    // fontSize: { xs: '.7rem', md: '.8rem' },
                                                                    fontWeight: 400,
                                                                    fontSize: 12,
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
                                                        {errors.sku && <span style={{fontSize: '10px'}}>{errors.sku.message}</span>}
                                                    </div>
                                                    ) : ( "" )}
                                                    {type === "Single" ? (
                                                    <div>
                                                        <Input
                                                            name={"hsn"}
                                                            labelName={"HSN"}
                                                            inputType={"text"}
                                                            placeholder={"HSN"}
                                                            validation={{...register('hsn', {
                                                                    required: 'This field is required',
                                                                    pattern: {
                                                                        value: /^[A-Za-z0-9`!@#$%^&*]+$/,
                                                                        message: 'Use only alphabet, number and characters',
                                                                    },
                                                                })}}
                                                            performOnValue={(e) => clearErrors(["hsn"])}
                                                            error={errors.name}
                                                        />
                                                        {errors.hsn && <span style={{fontSize: '10px'}}>{errors.hsn.message}</span>}
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
                                                                labelName={"select-unit"}
                                                                previous={unitType}
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
                                                                labelName={"Select Brand"}
                                                                previous={brandValue}
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
                                                                labelName={"Select Model"}
                                                                placeholder={"Select Model"}
                                                                previous={singleModel}
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
                                                            labelName={"Barcode Type"}
                                                            placeholder={"Select Barcode Type"}
                                                            previous={barcodeType}
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
                                                                defaultValue={0}
                                                                label={'Alert Quantity'}
                                                                {...register('alert_quantity', {
                                                                        required: 'This field is required',
                                                                        pattern: {
                                                                            value: /^[0-9]+$/,
                                                                            message: 'Use only number',
                                                                        },
                                                                    })}
                                                                onChange={e => {
                                                                    allStoredValue.alert_quantity= e.target.value
                                                                    setAllStoredValue(allStoredValue)
                                                                    clearErrors(["alert_quantity"])
                                                                }}
                                                                sx={{
                                                                    '& .MuiFormLabel-root': {
                                                                        fontSize: { xs: '.7rem', md: '.8rem' },
                                                                        fontWeight: 400,
                                                                        // fontSize: ({ defaultValue }) => (defaultValue ? 12 : 12),
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
                                                            {errors.alert_quantity && <span style={{fontSize: '10px'}}>{errors.alert_quantity.message}</span>}
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
                                                                defaultValue={0}
                                                                {...register('opening_stock_quantity', {
                                                                        required: 'This field is required',
                                                                        pattern: {
                                                                            value: /^[0-9]+$/,
                                                                            message: 'Use only number',
                                                                        },
                                                                    })}
                                                                label={'Opening stock quantity'}
                                                                onChange={e => {
                                                                    allStoredValue.opening_stock_quantity= e.target.value
                                                                    setAllStoredValue(allStoredValue)
                                                                    clearErrors(["opening_stock_quantity"])
                                                                }}

                                                                sx={{
                                                                    '& .MuiFormLabel-root': {
                                                                        // fontSize: { xs: '.7rem', md: '.8rem' },
                                                                        fontWeight: 400,
                                                                        fontSize: ({ defaultValue }) => (defaultValue ? 12 : 16),
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
                                                            {errors.opening_stock_quantity && <span style={{fontSize: '10px'}}>{errors.opening_stock_quantity.message}</span>}
                                                        </div>
                                                        ) : ( "" )}

                                                        {type === "Single" || type === "Variant" || type === "Service" ? (
                                                        <div className={"mt-3"}>
                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type={'number'}
                                                                label={'Purchase Price'}
                                                                defaultValue={0}
                                                                {...register('purchase_price', {
                                                                        required: 'This field is required',
                                                                        pattern: {
                                                                            value: /^[0-9]+$/,
                                                                            message: 'Use only number',
                                                                        },
                                                                    })}
                                                                onChange={e => {
                                                                    allStoredValue.purchase_price= e.target.value
                                                                    setAllStoredValue(allStoredValue)
                                                                    clearErrors(["purchase_price"])
                                                                }}
                                                                sx={{
                                                                    '& .MuiFormLabel-root': {
                                                                        // fontSize: { xs: '.7rem', md: '.8rem' },
                                                                        fontWeight: 400,
                                                                        fontSize: ({ defaultValue }) => (defaultValue ? 12 : 16),
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
                                                            {errors.purchase_price && <span style={{fontSize: '10px'}}>{errors.purchase_price.message}</span>}
                                                        </div>
                                                        ) : ( "" )}

                                                        {type === 'Combo' ? (
                                                            <div className={"mt-3"}>
                                                                <TextField
                                                                    readonly={true}
                                                                    variant='outlined'
                                                                    fullWidth
                                                                    autoComplete="off"
                                                                    size='small'
                                                                    type={'number'}
                                                                    label={'Purchase Price'}
                                                                    value={totalComboPrice}
                                                                    {...register('purchase_price', {
                                                                        required: 'This field is required',
                                                                        pattern: {
                                                                            value: /^[0-9]+$/,
                                                                            message: 'Use only number',
                                                                        },
                                                                    })}
                                                                    onChange={e => {
                                                                        allStoredValue.purchase_price= e.target.value
                                                                        setAllStoredValue(allStoredValue)
                                                                        clearErrors(["purchase_price"])
                                                                    }}
                                                                    sx={{
                                                                        '& .MuiFormLabel-root': {
                                                                            // fontSize: { xs: '.7rem', md: '.8rem' },
                                                                            fontWeight: 400,
                                                                            fontSize: ({ defaultValue }) => (defaultValue ? 12 : 16),
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
                                                                {errors.purchase_price && <span style={{fontSize: '10px'}}>{errors.purchase_price.message}</span>}
                                                            </div>
                                                        ) : ( "" )}
                                                    </div>
                                                    <div className="row row-cols-2">
                                                        { type == "Single" || type === "Combo" || type === "Variant" || type === "Service" ? (
                                                            <div className={"mt-3"}>
                                                                <TextField
                                                                    variant='outlined'
                                                                    fullWidth
                                                                    autoComplete="off"
                                                                    size='small'
                                                                    type={'number'}
                                                                    label={'Margin on selling Price'}
                                                                    defaultValue={0}
                                                                    // placeholder={'placeholder'}
                                                                    {...register('margin_on_selling_price', {
                                                                        required: 'This field is required',
                                                                        pattern: {
                                                                            value: /^[0-9]+$/,
                                                                            message: 'Use only number',
                                                                        },
                                                                    })}
                                                                    onChange={e => {
                                                                        clearErrors(["margin_on_selling_price"])
                                                                    }}
                                                                    sx={{
                                                                        '& .MuiFormLabel-root': {
                                                                            // fontSize: { xs: '.7rem', md: '.8rem' },
                                                                            fontWeight: 400,
                                                                            fontSize: ({ defaultValue }) => (defaultValue ? 12 : 16),
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
                                                                {errors.selling_price && <span style={{fontSize: '10px'}}>{errors.selling_price.message}</span>}
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
                                                                    defaultValue={0}
                                                                    // placeholder={'placeholder'}
                                                                    {...register('selling_price', {
                                                                        required: 'This field is required',
                                                                        pattern: {
                                                                            value: /^[0-9]+$/,
                                                                            message: 'Use only number',
                                                                        },
                                                                    })}
                                                                    onChange={e => {
                                                                        allStoredValue.selling_price= e.target.value
                                                                        setAllStoredValue(allStoredValue)
                                                                        clearErrors(["selling_price"])
                                                                    }}
                                                                    sx={{
                                                                        '& .MuiFormLabel-root': {
                                                                            // fontSize: { xs: '.7rem', md: '.8rem' },
                                                                            fontWeight: 400,
                                                                            fontSize: ({ defaultValue }) => (defaultValue ? 12 : 16),
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
                                                                {errors.selling_price && <span style={{fontSize: '10px'}}>{errors.selling_price.message}</span>}
                                                            </div>
                                                        ) : ( "" )}
                                                    </div>
                                                    <div className="row row-cols-2">
                                                        {type == "Single" || type == "Combo" || type == "Variant" ? (
                                                            <div className={"mt-3"}>
                                                                <TextField
                                                                    variant='outlined'
                                                                    fullWidth
                                                                    autoComplete="off"
                                                                    size='small'
                                                                    type={'number'}
                                                                    label={'Margin on min Selling Price'}
                                                                    defaultValue={0}
                                                                    // placeholder={'placeholder'}
                                                                    {...register('margin_on_min_selling_price', {
                                                                        required: 'This field is required',
                                                                        pattern: {
                                                                            value: /^[0-9]+$/,
                                                                            message: 'Use only number',
                                                                        },
                                                                    })}
                                                                    onChange={e => {
                                                                        clearErrors(["margin_on_min_selling_price"])
                                                                    }}

                                                                    sx={{
                                                                        '& .MuiFormLabel-root': {
                                                                            // fontSize: { xs: '.7rem', md: '.8rem' },
                                                                            fontWeight: 400,
                                                                            fontSize: ({ defaultValue }) => (defaultValue ? 12 : 16),
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
                                                                {errors.min_selling_price && <span style={{fontSize: '10px'}}>{errors.min_selling_price.message}</span>}
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
                                                                    label={'Min Selling Price'}
                                                                    defaultValue={0}
                                                                    // placeholder={'placeholder'}
                                                                    {...register('min_selling_price', {
                                                                        required: 'This field is required',
                                                                        pattern: {
                                                                            value: /^[0-9]+$/,
                                                                            message: 'Use only number',
                                                                        },
                                                                    })}
                                                                    onChange={e => {
                                                                        allStoredValue.min_selling_price= e.target.value
                                                                        setAllStoredValue(allStoredValue)
                                                                        clearErrors(["min_selling_price"])
                                                                    }}

                                                                    sx={{
                                                                        '& .MuiFormLabel-root': {
                                                                            // fontSize: { xs: '.7rem', md: '.8rem' },
                                                                            fontWeight: 400,
                                                                            fontSize: ({ defaultValue }) => (defaultValue ? 12 : 16),
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
                                                                {errors.min_selling_price && <span style={{fontSize: '10px'}}>{errors.min_selling_price.message}</span>}
                                                            </div>
                                                        ) : ( "" )}
                                                    </div>
                                                    <div className="row row-cols-2">
                                                        {type == "Single" || type == "Combo" || type === "Variant" || type === "Service" ? (
                                                        <div className="mt-3">
                                                            <TextField
                                                                variant='outlined'
                                                                fullWidth
                                                                autoComplete="off"
                                                                size='small'
                                                                type={'number'}
                                                                label={'Tax'}
                                                                value={allStoredValue.tax}
                                                                defaultValue={0}
                                                                // placeholder={'placeholder'}
                                                                {...register('tax', {
                                                                        required: 'This field is required',
                                                                        pattern: {
                                                                            value: /^[0-9]+$/,
                                                                            message: 'Use only number',
                                                                        },
                                                                    })}
                                                                onChange={e => {
                                                                    allStoredValue.tax= e.target.value
                                                                    setAllStoredValue(allStoredValue)
                                                                    clearErrors(["tax"])
                                                                    // setComponentRender(componentRender)
                                                                }}

                                                                sx={{
                                                                    '& .MuiFormLabel-root': {
                                                                        // fontSize: { xs: '.7rem', md: '.8rem' },
                                                                        fontWeight: 400,
                                                                        fontSize: ({ defaultValue }) => (defaultValue ? 12 : 16),
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
                                                            {errors.tax && <span style={{fontSize: '10px'}}>{errors.tax.message}</span>}
                                                        </div>
                                                        ) : ( "" )}

                                                        {type == "Single" || type == "Combo" || type === "Variant" || type === "Service" ? (
                                                        <div>
                                                            <Select
                                                                placeholder={"Tax Type"}
                                                                // previous={taxType}
                                                                labelName={' '}
                                                                options={[{value: "percent", label: "Percent"}, {value: "value", label: "Value"}]}
                                                                setValue={setTaxType}
                                                                cngFn={handleChangeTaxType}
                                                            />
                                                        </div>
                                                        ) : ( "" )}

                                                        {type == "Single" || type == "Combo" || type === "Variant" || type === "Service" ? (
                                                            <div class="checkbox checkbox-dark ms-2">
                                                                <input id="inline-1" type="checkbox" {...register("has_serial_key")}/>
                                                                <label for="inline-1" style={{color: "gray"}}>Has Serial Key</label>
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

                                <div className="px-3 w-100">
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
                                                                    validation={{...register(`quantity_${index}`, {
                                                                            required: 'This field is required',
                                                                            pattern: {
                                                                                value: /^[A-Za-z0-9`!@#$%^&*]+$/,
                                                                                message: 'Use only alphabet, number and characters',
                                                                            },
                                                                        })}}
                                                                    performOnValue={(e) => clearErrors([`quantity_${index}`])}
                                                                    error={errors?.[`quantity_${index}`]}
                                                                />
                                                                {errors?.[`quantity_${index}`] && <span style={{fontSize: '10px'}}>{errors?.[`quantity_${index}`]?.message}</span>}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <Input
                                                                    inputName={"price"}
                                                                    inputType={"number"}
                                                                    placeholder={"0"}
                                                                    validation={{...register(`price_${index}`, {
                                                                            required: 'This field is required',
                                                                            pattern: {
                                                                                value: /^[A-Za-z0-9`!@#$%^&*]+$/,
                                                                                message: 'Use only alphabet, number and characters',
                                                                            },
                                                                        })}}
                                                                    performOnValue={(e) => clearErrors([`price_${index}`])}
                                                                    error={errors?.[`price_${index}`]}
                                                                />
                                                                {errors?.[`price_${index}`] && <span style={{fontSize: '10px'}}>{errors?.[`price_${index}`]?.message}</span>}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <Input
                                                                    inputName={"tax"}
                                                                    inputType={"number"}
                                                                    placeholder={"0"}
                                                                    validation={{...register(`tax_${index}`, {
                                                                            required: 'This field is required',
                                                                            pattern: {
                                                                                value: /^[A-Za-z0-9`!@#$%^&*]+$/,
                                                                                message: 'Use only alphabet, number and characters',
                                                                            },
                                                                        })}}
                                                                    performOnValue={(e) => clearErrors([`tax_${index}`])}
                                                                    error={errors?.[`tax_${index}`]}
                                                                />
                                                                {errors?.[`tax_${index}`] && <span style={{fontSize: '10px'}}>{errors?.[`tax_${index}`]?.message}</span>}
                                                            </div>
                                                        </td>
                                                        <td className="text-end" style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
                                                            <div style={{border: 'none', backgroundColor: 'white', marginTop: '22px', marginBottom: '6px', cursor: "pointer" }} onClick={() => removeItemFromProductList(singleData?.id, index)}>
                                                                <Trash2 size={17} style={{color: 'red'}}></Trash2>
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
                            <SelectComboVariant previousSKU={previousSKU} setPreviousSKU={setPreviousSKU} variantFormValue={variantFormValue} setVariantFormValue={setVariantFormValue} allStoredValue={allStoredValue} register={register} unregister={unregister}></SelectComboVariant>
                        ) : ( "")}
                    </div>
                    <div className="card">
                        <div>
                            <Container fluid={true}>
                                <h4 className="card-title pt-3 pb-2 border-bottom">Products Options</h4>
                                <Accordion defaultActiveKey="0">
                                    <div className="default-according" id="accordion">
                                        {
                                            makeProductOptions?.map(singleOptions =>
                                                <>
                                                    <Card>
                                                        <CardHeader as={Card.Header} onClick={() => accordionToggle(singleOptions?.value)} style={{cursor: 'pointer'}}>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p style={{marginBottom: 0, fontSize: "14px", fontWeight: "bold"}}>
                                                                    {singleOptions?.label}
                                                                </p>
                                                                <div style={{border: 'none', backgroundColor: 'white', marginTop: '22px', marginBottom: '6px', cursor: "pointer" }} onClick={() => removeOptions(singleOptions?.value)}>
                                                                    <Trash2 style={{fontSize: '15px', color: 'red'}}></Trash2>
                                                                </div>
                                                            </div>
                                                        </CardHeader>
                                                        <Collapse isOpen={parseInt(isOpen) === parseInt(singleOptions?.value)}>
                                                            <CardBody className="p-3">
                                                                {
                                                                    addRowInOption[singleOptions?.value]?.length > 0 ?
                                                                        <>
                                                                            <div className="d-flex justify-content-between">
                                                                                <p className="w-100 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Label</p>
                                                                                <p className="w-100 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Price</p>
                                                                                <p className="w-100 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Price Type</p>
                                                                                <p className="w-25 text-center m-2" style={{fontWeight: 'bold', fontSize: '13px'}}>Action</p>
                                                                            </div>
                                                                            <div>
                                                                                {
                                                                                    addRowInOption[singleOptions?.value]?.map((singleRowData, rowIndex) =>
                                                                                        <div className="d-flex justify-content-between" key={rowIndex} style={{marginTop: "10px"}}>
                                                                                            <div className="w-100 mx-2">
                                                                                                <TextField
                                                                                                    variant='outlined'
                                                                                                    fullWidth
                                                                                                    autoComplete="off"
                                                                                                    size='small'
                                                                                                    type="text"
                                                                                                    placeholder={'Name'}
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
                                                                                            <div className="w-100 mx-2">
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
                                                                                                    setValue={setPriceType}
                                                                                                    previous={priceType}
                                                                                                    cngFn={(selected) => handelOptionsSelectData('added_price_type', selected, singleOptions?.value, singleRowData)}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="w-25 mx-2" style={{ display: "flex", justifyContent: "center", alignItems: 'center'}}>
                                                                                                <div onClick={() => removeItemFromVariantList(singleOptions?.value, singleRowData)} style={{border: 'none', backgroundColor: 'white', cursor: "pointer" }}>
                                                                                                    <Trash2 size={17}></Trash2>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </>
                                                                        : ''
                                                                }
                                                                <div className="d-flex justify-content-end">
                                                                    <button onClick={() => addNewRowForOptionValues(singleOptions?.value)} className="btn btn-outline-primary btn-xs mx-3 mt-1" type="button">Add new item</button>
                                                                </div>
                                                            </CardBody>
                                                        </Collapse>
                                                    </Card>
                                                </>
                                            )
                                        }
                                    </div>
                                </Accordion>
                                <div class="d-flex justify-content-between align-items-center mb-2 mt-3">
                                    <button onClick={() => toggle()} className="btn btn-secondary btn-sm" type="button">Add new option</button>
                                    <div className="d-flex gap-2">
                                        <div style={{width: '200px', marginBottom: 0, paddingBottom: 0}}>
                                            <Select
                                                name={"option"}
                                                // labelName={"Barcode Type"}
                                                placeholder={"Select Barcode Type"}
                                                options={productOptions}
                                                setValue={setSelectedProductOptions}
                                                cngFn={handleChangeForProductType}
                                            />
                                        </div>
                                        <button onClick={() => globalOptions()} className="btn btn-secondary btn-sm" type="button">Add global options</button>
                                    </div>
                                </div>
                            </Container>
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
