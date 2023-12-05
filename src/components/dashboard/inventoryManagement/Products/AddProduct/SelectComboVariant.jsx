import React, {useEffect, useState} from 'react';
import axios from "../../../../../axios";
import SelectProductInCreateProductForm
    from "../../../../common/component/form/inventory/product/selectProductInCreateProductForm";
import Input from "../../../../common/modal/Input";
import Select from "../../../../common/modal/Select";

const SelectComboVariant = ({register, unregister, returnedValueFromVariantValueSelect, setReturnedValueFromVariantValueSelect}) => {
    const [valueForSelect, setValueForSelect] = useState({value: "Single", label: "Single"});


    const [allDataForVariantDropdown, setAllDataForVariantDropdown] = useState([]);
    const [allDataForVariantValueDropdown, setAllDataForVariantValueDropdown] = useState([]);
    const [formatAllDataForVariantValueDropdown, setFormatAllDataForVariantValueDropdown] = useState({});
    const [selectedVariantForVariant, setSelectedVariantForVariant] = useState([]);
    // console.log(selectedVariantForVariant);
    const [variantValueItem, setVariantValueItem] = useState([])

    const [addRowInVariant, setAddRowInVariant] = useState([0])



    console.log(addRowInVariant)
    const addNewRow = () => {
        if (selectedVariantForVariant?.length > 0){
            setAddRowInVariant(prev => [...prev, addRowInVariant.length])
        }
    }

    const handleSelectChange = (selected, rowIndex, variantId) => {
        console.log('rowIndex', addRowInVariant[0], rowIndex)
        // returnedValueFromVariantValueSelect.rowIndex.variantId = select
        // returnedValueFromVariantValueSelect[rowIndex] = '';
        if (!returnedValueFromVariantValueSelect[rowIndex]){
            returnedValueFromVariantValueSelect[rowIndex] = {};
        }

        returnedValueFromVariantValueSelect[rowIndex][variantId] = selected || {};
        console.log('returnedValueFromVariantValueSelect', returnedValueFromVariantValueSelect);
        // // console.log("check",selected, variantId);
        // // console.log("data",allDataForVariantValueDropdown);
        // setValueForSelect(selected);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setAllDataForVariantValueDropdown([])
                const response = await axios.get(`/inventory-management/variant/value`);
                // console.log(response?.data?.body?.data);
                response?.data?.body?.data?.map(item => {
                    const set_data = {
                        value: item.id,
                        label: item.value,
                        variant_id: item.variant_id,
                        variant_name: item.variant_name
                    }
                    setAllDataForVariantValueDropdown(prev => [...prev, set_data]);
                })



                // setAllDataForVariantValueDropdown(response?.data?.body?.data);
                // console.log(response?.data?.body?.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    }, []);

    useEffect(() => {
        allDataForVariantDropdown?.map(singleData => {
            const filterData = allDataForVariantValueDropdown?.filter(value => parseInt(singleData?.id) === parseInt(value?.variant_id));
            // console.log('filterData', filterData)
            formatAllDataForVariantValueDropdown[singleData?.id] = filterData;
        })
    }, [allDataForVariantDropdown, allDataForVariantValueDropdown]);

    // console.log(formatAllDataForVariantValueDropdown)


    const columns = [
        {
            accessorKey: 'name_s',
            header: 'Variant Name',
        },
    ];


    const [selectedDataKeyForProductList, setSelectedDataKey] = useState([]);
    const [showProductList, setShowProductList] = useState(false);
    const getSelectedData = (data) => {
        if(!selectedDataKeyForProductList.includes(data.id)){
            selectedDataKeyForProductList.push(data.id);
            setSelectedVariantForVariant(prev => [...prev, data]);
        }

        setShowProductList(false);
    }



    const removeItemFromVariantList = (id) => {
        // console.log('addRowInVariant', addRowInVariant)
        //
        // console.log('addRowInVariant.indexOf(id)',addRowInVariant.indexOf(parseInt(id)));
        if(addRowInVariant?.includes(id)){
            // addRowInVariant?.
            const remainingID =  addRowInVariant.splice(addRowInVariant.indexOf(id), 1);
            console.log('addRowInVariant.indexOf(id)',addRowInVariant.indexOf(id));
            // setAddRowInVariant(remainingID)
            delete returnedValueFromVariantValueSelect[id];
            setReturnedValueFromVariantValueSelect(returnedValueFromVariantValueSelect);
            unregister(`variant_sku_${id}`);
            unregister(`variant_alert_quantity_${id}`);
            unregister(`variant_purchase_price_${id}`);
            unregister(`variant_selling_price_${id}`);
        }
    }

    return (
        <>
            <div className="">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title mb-0">Choose Variant</h4>
                    </div>

                    <div className="px-3">
                        {/*<DropdownTable4 setSelectedVariantForVariant={setSelectedVariantForVariant}></DropdownTable4>*/}
                        {/*<DropdownTable3></DropdownTable3>*/}
                        <SelectProductInCreateProductForm data={allDataForVariantDropdown} selectedDataKey={selectedDataKeyForProductList} show={showProductList} setShow={setShowProductList} getSelectedData={getSelectedData} columns={columns}></SelectProductInCreateProductForm>
                    </div>


                    <div className="mt-4">
                        {
                            selectedVariantForVariant?.length > 0 ?
                            <div className="card">
                                <div className="d-flex justify-content-between">
                                    {
                                        selectedVariantForVariant?.map((singleVariantData, index) =>
                                            <div key={index} className="w-100 text-center">
                                                <h6 className="m-2">{singleVariantData?.name_s}</h6>
                                            </div>
                                        )
                                    }
                                    <h6 className="w-100 text-center m-2">SKU</h6>
                                    <h6 className="w-100 text-center m-2">Alert Quantity</h6>
                                    <h6 className="w-100 text-center m-2">Purchase Price</h6>
                                    <h6 className="w-100 text-center m-2">Selling Price</h6>
                                    <h6 className="w-25 text-center m-2">Action</h6>
                                </div>
                                <div>
                                {
                                    addRowInVariant?.map((singleRowData, rowIndex) =>
                                        <div className="d-flex justify-content-between" key={rowIndex}>
                                            {
                                                selectedVariantForVariant?.map((singleVariantData,index) =>
                                                    <div key={index} className="w-100 m-2">
                                                        {/*{console?.log('selectedVariantForVariant', singleData?.id)}*/}
                                                            <Select
                                                                // register={register}
                                                                // labelName={singleData?.name_s}
                                                                placeholder={"Select an option"}
                                                                options={formatAllDataForVariantValueDropdown[singleVariantData?.id]}
                                                                cngFn={(selected) => handleSelectChange(selected, singleRowData, singleVariantData?.id)}
                                                                // previous={returnedValueFromVariantValueSelect?.[rowIndex]?.[singleData?.variant_id]}
                                                                // previous={{value: "value", label: 'label'}}
                                                                // validation={{
                                                                //     ...register(`${singleVariantData?.name_s}_${singleRowData}`),
                                                                // }}
                                                            />
                                                        {/*{console.log('formatAllDataForVariantValueDropdown', returnedValueFromVariantValueSelect)}*/}
                                                    </div>
                                                )
                                            }

                                            <div className="w-100 m-2" style={{paddingTop: '5px'}}>
                                                <Input
                                                    inputName={"sku"}
                                                    inputType={"text"}
                                                    placeholder={"sku_01"}
                                                    validation={{
                                                        ...register(`variant_sku_${singleRowData}`),
                                                    }}
                                                />
                                            </div>
                                            <div className="w-100 m-2" style={{paddingTop: '5px'}}>
                                                <Input
                                                    inputName={"alert_quantity"}
                                                    inputType={"number"}
                                                    placeholder={"0"}
                                                    validation={{
                                                        ...register(`variant_alert_quantity_${singleRowData}`),
                                                    }}
                                                />
                                            </div>
                                            <div className="w-100 m-2" style={{paddingTop: '5px'}}>
                                                <Input
                                                    inputName={"purchase_price"}
                                                    inputType={"number"}
                                                    placeholder={"0"}
                                                    validation={{
                                                        ...register(`variant_purchase_price_${singleRowData}`),
                                                    }}
                                                />
                                            </div>
                                            <div className="w-100 m-2" style={{paddingTop: '5px'}}>
                                                <Input
                                                    inputName={"selling_price"}
                                                    inputType={"number"}
                                                    placeholder={"0"}
                                                    validation={{
                                                        ...register(`variant_selling_price_${singleRowData}`),
                                                    }}
                                                />
                                            </div>
                                            <div className="text-end w-25 m-2" style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
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
                        <button onClick={() => addNewRow()} className="btn btn-outline-primary btn-xs" type="button">Add new item</button>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectComboVariant;