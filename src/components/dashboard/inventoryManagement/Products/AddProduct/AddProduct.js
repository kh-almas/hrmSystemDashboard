import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
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
import AutoComplete from "../../../../common/modal/AutoComplete";
import MultipleImageUploader from "../../../../common/component/imageUpload/MultipleImageUploader";
import SelectComboVariant from "./SelectComboVariant";
import Swal from "sweetalert2";

const AddProduct = () => {
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
        console.log('photos',photos);
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

    const submitAddProductForm = (data) => {
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
        // console.log('returnedValueFromVariantValueSelect', returnedValueFromVariantValueSelect)
        console.log('data', data)

        axios.post('/inventory-management/products/add', data)
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
                    reset();
                    // toggle();
                }
                // reFetch();
            })
            .catch(e => {
                console.log(e)
                if(e?.response?.data?.body?.message?.errno == 1062){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Can not duplicate branch name`
                    })
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${e?.response?.data?.body?.message?.details[0].message}`
                    })
                }
            })
    }


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

    return (
        <div>
            <Breadcrumb parent="Inventory management" title="Add New Product"/>
            <div className="container-fluid">
                <form onSubmit={handleSubmit(submitAddProductForm)}>
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
                                        </div>
                                    </div>
                                </div>

                                {type !== "Variant" && type !== "Service" ? (
                                <div className="card">
                                    <div>
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


                                            <h6 className="mb-0">Product size</h6>
                                            {type == "Single" || type == "Combo" ? (
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
                                            {type == "Single" || type == "Combo" ? (
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
                                            {type == "Single" || type == "Combo" ? (
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
                                        </div>
                                    </div>
                                    <div>
                                        <div className="card-body">
                                            <h6 className="mb-0">Package size</h6>
                                            {type == "Single" || type == "Combo" ? (
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
                                            {type == "Single" || type == "Combo" ? (
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
                                            {type == "Single" || type == "Combo" ? (
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

                                        </div>
                                    </div>
                                </div>
                                ) : ( "" )}

                                <div className="card">
                                    <div className="card-body">
                                        <div className="col-sm-12">
                                            <div>
                                                <div>
                                                    <MultipleImageUploader photos={photos} setPhotos={setPhotos}></MultipleImageUploader>

                                                    {/*<form className="dropzone dropzone-primary" id="multiFileUpload"*/}
                                                    {/*      action="/upload.php">*/}
                                                    {/*    <ToastContainer/>*/}
                                                    {/*    <div className="dz-message needsclick">*/}
                                                    {/*        <Dropzone*/}
                                                    {/*            getUploadParams={getUploadParams}*/}
                                                    {/*            onChangeStatus={handleChangeStatus}*/}
                                                    {/*            onSubmit={handleImgSubmit}*/}
                                                    {/*            accept="image/*"*/}
                                                    {/*        />*/}
                                                    {/*    </div>*/}
                                                    {/*</form>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                {type !== "Variant" ? (
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">

                                                    <div className="row row-cols-3">
                                                        {type == "Single" || type == "Combo" ? (
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
                                ) : ( "" )}

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
                                                            placeholder={"Select Barcode"}
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
                                                <div>
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
                                    {type !== "Service" ? (
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div>
                                                    <div className="row row-cols-3">

                                                        {type == "Single" || type == "Combo" ? (
                                                        <div>
                                                            <Input
                                                                labelName={"Alert Quantity"}
                                                                inputName={"alert-quantity"}
                                                                inputType={"number"}
                                                                validation={{
                                                                    ...register("alert_quantity"),
                                                                }}
                                                            />
                                                        </div>
                                                        ) : ( "" )}

                                                        {type == "Single" || type == "Combo" ? (
                                                        <div>
                                                            <Input
                                                                labelName={"Opening stock quantity"}
                                                                inputName={"opening_stock_quantity"}
                                                                inputType={"number"}
                                                                validation={{
                                                                    ...register("opening_stock_quantity"),
                                                                }}
                                                            />
                                                        </div>
                                                        ) : ( "" )}

                                                        {type === "Single" || type === "Combo" || type !== "Service" ? (
                                                        <div>
                                                            <Input
                                                                labelName={"Purchase Price"}
                                                                inputName={"purchase-price"}
                                                                inputType={"number"}
                                                                placeholder={"0"}
                                                                validation={{
                                                                    ...register("purchase_price"),
                                                                }}
                                                            />
                                                        </div>
                                                        ) : ( "" )}

                                                        {type == "Single" || type === "Combo" || type !== "Service" ? (
                                                        <div>
                                                            <Input
                                                                labelName={"Selling Price*"}
                                                                inputName={"selling-price"}
                                                                inputType={"number"}
                                                                placeholder={"0"}
                                                                validation={{
                                                                    ...register("selling_price"),
                                                                }}
                                                            />
                                                        </div>
                                                        ) : ( "" )}

                                                        {type === "Combo" ? (
                                                        <div>
                                                            <Input
                                                                labelName={"Other currency price"}
                                                                inputName={"other_currency_price"}
                                                                inputType={"number"}
                                                                placeholder={"0"}
                                                                validation={{
                                                                    ...register("other_currency_price"),
                                                                }}
                                                            />
                                                        </div>
                                                        ) : ( "" )}

                                                        {type == "Single" || type == "Combo" ? (
                                                        <>
                                                            <div>
                                                                <Input
                                                                    labelName={"Other Charges"}
                                                                    inputName={"other_charges"}
                                                                    inputType={"number"}
                                                                    placeholder={"Other Charges"}
                                                                    validation={{
                                                                        ...register("other_charges"),
                                                                    }}
                                                                />
                                                            </div>
                                                        </>
                                                        ) : ( "" )}

                                                        {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                        <div>
                                                            <Input
                                                                labelName={"Tax"}
                                                                inputName={"tax"}
                                                                inputType={"number"}
                                                                placeholder={"0"}
                                                                validation={{
                                                                    ...register("tax"),
                                                                }}
                                                            />
                                                        </div>
                                                        ) : ( "" )}

                                                        {type == "Single" || type == "Combo" || type === "Variant" ? (
                                                        <div>
                                                            <Select
                                                                labelName={"Tax Type"}
                                                                previous={taxType}
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
                                    ) : ( "" )}
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
                                    {/*<DropdownTable4 setSelectedProductForCombo={setSelectedProductForCombo}></DropdownTable4>*/}
                                    {/*<DropdownTable3></DropdownTable3>*/}
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
                                                                {console.log(singleData)}
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
                            <SelectComboVariant returnedValueFromVariantValueSelect={returnedValueFromVariantValueSelect} setReturnedValueFromVariantValueSelect={setReturnedValueFromVariantValueSelect} register={register} unregister={unregister}></SelectComboVariant>
                        ) : ( "")}
                    </div>
                    <Submitbtn name={"Add Product"}/>
                </form>
            </div>



            <AddUnitTypeModal modal={unit} toggle={unitToggle} reFetch={isUnitTypeDirty}></AddUnitTypeModal>
            <AddCategoryModal isChange={isChange} modal={category} toggle={categoryToggle} reFetch={isDarty}></AddCategoryModal>
            <AddBrandModal modal={brand} toggle={brandToggle} reFetch={isBranchDirty}></AddBrandModal>
            <AddModelModal modal={model} toggle={modelToggle} reFetch={isModelDirty}></AddModelModal>
        </div>
    );
};

export default AddProduct;
