import React, {useEffect, useMemo, useState} from "react";
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
import Dropzone from 'react-dropzone-uploader';
import {ToastContainer, toast} from 'react-toastify';
// import 'react-dropzone-uploader/dist/styles.css';
import TextField from "@mui/material/TextField";
import axios from "../../../../../axios";
import Swal from "sweetalert2";
import {yupResolver} from "@hookform/resolvers/yup";

const AddProduct = () => {
    const [parentCategory, setParentCategory] = useState({});
    const [processData, setProcessData] = useState([]);
    const [type, setType] = useState("Single");
    const [unit, setUnit] = useState(false);
    const [brand, setBrand] = useState(false);
    const [category, setCategory] = useState(false);
    const [model, setModel] = useState(false);
    const [typeChange, setTypeChange] = useState({value: "Single", label: "Single"});
    const [selectedProductForCombo, setSelectedProductForCombo] = useState([]);
    const [updateSelectedProduct, setUpdateSelectProduct] = useState({});
    // const [comboProductList, setComboProductList] = useState([]);
    const [note, setNote] = useState('');
    //
    // const updateProductForCombo = () => {
    //     console.log()
    // }

    const removeItemFromProductList = (data) => {
        let processKey = {};
        const filterData = selectedProductForCombo?.filter(singleData => singleData?.id !== data)
        console.log('filterData', filterData);
        filterData?.map(singleData =>  processKey[singleData?.id] = true )
        setUpdateSelectProduct(processKey);
        setSelectedProductForCombo(filterData)
    }



    const [isChange, setIsChange] = useState(false);
    const isDarty = () => {
        setIsChange(!isChange);
    }

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
            setProcessData(outputData);
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
        setProcessData(data);
    }

    const handleTypeChange = (selected) => {
        setTypeChange(selected);
        setType(selected?.value);
    };

    const handelValueForCategory = (currentNode, selectedNodes) => {
        selectSelectedData(processData, currentNode);
    }

    const [unitType, setUnitType] = useState({});
    const handleChangeForUpdateUnitType = (selected) => {
        setUnitType(selected);
    };

    const [barcodeType, setBarcodeType] = useState({});
    const handleChangeForUpdateBarcodeType = (selected) => {
        setBarcodeType(selected);
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
    } = useForm({
        defaultValues: useMemo(()=> {
            return selectedProductForCombo;
        }, [selectedProductForCombo])
    });

    // useEffect(() => {
    //     reset();
    // }, [selectedProductForCombo]);


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
        data.howManyProduct = selectedProductForCombo?.length;
        console.log(data)

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


    // specify upload params and url for your files
    // const getUploadParams = ({meta}) => {
    //     return {url: 'https://httpbin.org/post'}
    // }
    // // called every time a file's `status` changes
    //
    // const handleChangeStatus = ({meta, file}, status) => {
    // }
    //
    // // receives array of files that are done uploading when submit button is clicked
    // const handleImgSubmit = (files, allFiles) => {
    //     allFiles.forEach(f => f.remove())
    //     toast.success("Dropzone successfully submitted !");
    // }


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
                                            <div class="pb-2 d-flex align-items-center justify-content-center">
                                                <div class="form-check form-check-inline align-items-center">
                                                    <input className="form-check-input" type="radio"
                                                           name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                                                    <label className="form-check-label" htmlFor="inlineRadio1">
                                                        Raw Material
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio"
                                                           name="inlineRadioOptions" id="inlineRadio2" value="option2"
                                                           checked={true}/>
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

                                <div className="card">
                                    <div>
                                        <div className="card-body">
                                            <h6 className="mb-0">Product size</h6>
                                            {/*{type == "Single" ? (*/}
                                            <div>
                                                <Input
                                                    labelName={"Height"}
                                                    inputName={"height"}
                                                    inputType={"text"}
                                                    placeholder={"height"}
                                                    validation={{
                                                        ...register("p_height"),
                                                    }}
                                                />
                                            </div>
                                            {/*// ) : ( "" )}*/}
                                            {/*{type == "Single" ? (*/}
                                            <div>
                                                <Input
                                                    labelName={"Width"}
                                                    inputName={"width"}
                                                    inputType={"text"}
                                                    placeholder={"width"}
                                                    validation={{
                                                        ...register("p_width"),
                                                    }}
                                                />
                                            </div>
                                            {/*// ) : ( "" )}*/}
                                            {/*{type == "Single" ? (*/}
                                            <div>
                                                <Input
                                                    labelName={"Length"}
                                                    inputName={"length"}
                                                    inputType={"text"}
                                                    placeholder={"Length"}
                                                    validation={{...register("p_length")}}
                                                />
                                            </div>
                                            {/*// ) : ('')}*/}
                                        </div>
                                    </div>
                                    <div>

                                        <div className="card-body">
                                            <h6 className="mb-0">Package size</h6>
                                            {/*{type == "Single" ? (*/}
                                            <div>
                                                <Input
                                                    labelName={"Height"}
                                                    inputName={"height"}
                                                    inputType={"text"}
                                                    placeholder={"height"}
                                                    validation={{
                                                        ...register("package_height"),
                                                    }}
                                                />
                                            </div>
                                            {/*// ) : ( "" )}*/}
                                            {/*{type == "Single" ? (*/}
                                            <div>
                                                <Input
                                                    labelName={"Width"}
                                                    inputName={"width"}
                                                    inputType={"text"}
                                                    placeholder={"width"}
                                                    validation={{
                                                        ...register("package_width"),
                                                    }}
                                                />
                                            </div>
                                            {/*) : ( "" )}*/}
                                            {/*{type == "Single" ? (*/}
                                            <div>
                                                <Input
                                                    labelName={"Length"}
                                                    inputName={"length"}
                                                    inputType={"text"}
                                                    placeholder={"Length"}
                                                    validation={{...register("package_length")}}
                                                />
                                            </div>
                                            {/*// ) : ('')}*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="col-sm-12">
                                            <div>
                                                <div>
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
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            {/*{type === "Single" ? (*/}
                                            <div className="row row-cols-3">
                                                <div>
                                                    <Input
                                                        labelName={"Product Name"}
                                                        inputName={"product-name"}
                                                        inputType={"text"}
                                                        placeholder={"Product Name"}
                                                        validation={{...register("name")}}
                                                    />
                                                </div>
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
                                                <div>
                                                    <Input
                                                        name={"hsn"}
                                                        labelName={"HSN"}
                                                        inputType={"text"}
                                                        placeholder={"HSN"}
                                                        validation={{...register("hsn")}}
                                                    />
                                                </div>
                                            </div>
                                            {/*// ) : ( "" )}*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div>
                                                <div className="row row-cols-1 row-cols-md-2">
                                                    {/*{type === "Single" || type === "Variant" ? (*/}
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
                                                    {/*) : ( "" )}*/}



                                                    {/*{type == "Single" || type === "Variant" ? (*/}
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
                                                    {/*) : ( "" )}*/}

                                                    {/*{type == "Single" || type === "Variant" ? (*/}
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
                                                    {/*) : ( "" )}*/}
                                                    {/*{type === "Single" || type === "Variant" || type === "Combo" ? (*/}
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
                                                    {/*) : ( "")}*/}
                                                </div>


                                                {/*{type == "Single" || type === "Varient" ? (*/}
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
                                                            data={processData}
                                                            onChange={handelValueForCategory}
                                                        />
                                                    </div>
                                                </div>
                                                {/*// ) : ( "" )}*/}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div>
                                                    <div className="row row-cols-3">

                                                        {/*{type == "Single" ? (*/}
                                                        <div>
                                                            <Input
                                                                labelName={"Alert Quantity"}
                                                                inputName={"alert-quantity"}
                                                                inputType={"text"}
                                                                validation={{
                                                                    ...register("alert_quantity"),
                                                                }}
                                                            />
                                                        </div>
                                                        {/*// ) : ( "" )}*/}

                                                        {/*{type === "Single" || type === "Combo" || type !== "Service" ? (*/}
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
                                                        {/*// ) : ( "" )}*/}

                                                        {/*{type == "Single" || type === "Combo" || type !== "Service" ? (*/}
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
                                                        {/*// ) : ( "" )}*/}

                                                        {/*{type === "Combo" ? (*/}
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
                                                        {/*) : ( "" )}*/}

                                                        {/*{type == "Single" ? (*/}
                                                        <>
                                                            <div>
                                                                <Input
                                                                    labelName={"Other Charges"}
                                                                    inputName={"other_charges"}
                                                                    inputType={"text"}
                                                                    placeholder={"Other Charges"}
                                                                    validation={{
                                                                        ...register("other_charges"),
                                                                    }}
                                                                />
                                                            </div>
                                                        </>
                                                        {/*// ) : ( "" )}*/}

                                                        {/*{type == "Single" || type === "Variant" ? (*/}
                                                        <div className="d-flex ">
                                                            <Input
                                                                labelName={"Tax"}
                                                                inputName={"tax"}
                                                                inputType={"number"}
                                                                placeholder={"0"}
                                                                validation={{
                                                                    ...register("tax"),
                                                                }}
                                                            />

                                                            <div
                                                                className="col-md-3 d-flex align-items-center mt-3 text-center mx-4">
                                                                <input
                                                                    className="form-control text-center rounded-4"
                                                                    type="text"
                                                                    name=""
                                                                    placeholder="%"
                                                                    value=""
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        {/*) : ( "" )}*/}

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
                        <div className="">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">Product List</h4>
                                </div>
                                {/*{type == "Combo" ? (*/}
                                <div className="px-3">
                                    <label htmlFor="exampleFormControlTextarea4" style={{fontSize: '11px'}}>
                                        Select Product
                                    </label>
                                    <SelectProductInCreateProductForm updateSelectedProduct={updateSelectedProduct} setSelectedProductForCombo={setSelectedProductForCombo}></SelectProductInCreateProductForm>
                                </div>

                                {/*// ) : ( "")}*/}
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
                                                                    id="outlined-size-small"
                                                                    defaultValue={singleData?.name}
                                                                    size="small"
                                                                    validation={{
                                                                        ...register(`product_id_${index}`,{ value: singleData?.id }),
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
                                                        <td className="text-end">
                                                            <div onClick={() => removeItemFromProductList(singleData?.id)}>
                                                                <i className="fa fa-trash"></i>
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
                    </div>
                    <Submitbtn name={"Add Product"}/>
                </form>
            </div>

            <div class="card">
                <p>hkg</p>
            </div>



            <AddUnitTypeModal modal={unit} toggle={unitToggle} reFetch={isUnitTypeDirty}></AddUnitTypeModal>
            <AddCategoryModal isChange={isChange} modal={category} toggle={categoryToggle} reFetch={isDarty}></AddCategoryModal>
            <AddBrandModal modal={brand} toggle={brandToggle} reFetch={isBranchDirty}></AddBrandModal>
            <AddModelModal modal={model} toggle={modelToggle} reFetch={isModelDirty}></AddModelModal>
        </div>
    );
};

export default AddProduct;
