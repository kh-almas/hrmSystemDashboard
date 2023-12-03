import React, {useEffect, useState} from 'react';
import axios from "../../../../../axios";
import SelectProductInCreateProductForm
    from "../../../../common/component/form/inventory/product/selectProductInCreateProductForm";
import Input from "../../../../common/modal/Input";
import Select from "../../../../common/modal/Select";

const SelectComboVariant = ({register, unregister}) => {
    const [valueForSelect, setValueForSelect] = useState({value: "Single", label: "Single"});


    const [allDataForVariantDropdown, setAllDataForVariantDropdown] = useState([]);
    const [allDataForVariantValueDropdown, setAllDataForVariantValueDropdown] = useState([]);
    const [selectedVariantForVariant, setSelectedVariantForVariant] = useState([]);
    console.log(selectedVariantForVariant);

    const handleSelectChange = (selected, variantId) => {
        console.log("check",selected, variantId);
        console.log("data",allDataForVariantValueDropdown);
        setValueForSelect(selected);
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

    const removeItemFromProductList = (id) => {
        if (selectedDataKeyForProductList.includes(id)){
            unregister(`product_id_${id}`);
            unregister(`quantity_${id}`);
            unregister(`price_${id}`);
            unregister(`tax_${id}`);
            const filterData = selectedVariantForVariant?.filter(singleData => singleData?.id !== id);
            setSelectedVariantForVariant(filterData);
            selectedDataKeyForProductList.splice(selectedDataKeyForProductList.indexOf(id), 1);
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


                    <div className="table-responsive mt-4">
                        {
                            // selectedVariantForVariant?.length > 0 ?
                            <table className="table card-table text-nowrap">
                                <thead className="table-border">
                                <tr>
                                    {
                                        selectedVariantForVariant?.map(singleData =>
                                            <>
                                                <th>{singleData?.name_s}</th>
                                            </>
                                        )
                                    }
                                    <th>SKU</th>
                                    <th>Alert Quantity</th>
                                    <th>Purchase Price</th>
                                    <th>Selling Price</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    // selectedVariantForVariant?.map((singleData, index) =>
                                        <tr>
                                            {/*<td>*/}
                                            {/*    <div>*/}
                                            {/*        <TextField*/}
                                            {/*            disabled*/}
                                            {/*            id="outlined-size-small"*/}
                                            {/*            value={singleData?.name_s}*/}
                                            {/*            size="small"*/}
                                            {/*            validation={{*/}
                                            {/*                ...register(`product_id_${index}`,{ value: singleData?.id }),*/}
                                            {/*            }}*/}
                                            {/*            sx={{*/}
                                            {/*                width: '100%',*/}
                                            {/*                marginTop: '16px'*/}
                                            {/*            }}*/}
                                            {/*        />*/}
                                            {/*    </div>*/}
                                            {/*</td>*/}
                                            {
                                                selectedVariantForVariant?.map((singleData,index) =>

                                                        <td key={index}>
                                                            {console?.log('selectedVariantForVariant', singleData?.id)}
                                                                <Select
                                                                    labelName={singleData?.name_s}
                                                                    placeholder={"Select an option"}
                                                                    options={allDataForVariantValueDropdown}
                                                                    cngFn={(selected) => handleSelectChange(selected, singleData?.id)}
                                                                    previous={valueForSelect}
                                                                />
                                                        </td>

                                                )
                                            }

                                            <td>
                                                <div>
                                                    <Input
                                                        inputName={"sku"}
                                                        inputType={"text"}
                                                        placeholder={"sku_01"}
                                                        validation={{
                                                            ...register(`variant_sku_`),
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <Input
                                                        inputName={"alert_quantity"}
                                                        inputType={"number"}
                                                        placeholder={"0"}
                                                        validation={{
                                                            ...register(`variant_alert_quantity_`),
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <Input
                                                        inputName={"purchase_price"}
                                                        inputType={"number"}
                                                        placeholder={"0"}
                                                        validation={{
                                                            ...register(`variant_purchase_price_`),
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <Input
                                                        inputName={"selling_price"}
                                                        inputType={"number"}
                                                        placeholder={"0"}
                                                        validation={{
                                                            ...register(`variant_selling_price_`),
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="text-end" style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
                                                <div style={{border: 'none', backgroundColor: 'white', marginTop: '22px', marginBottom: '6px', cursor: "pointer" }}>
                                                    <i className="fa fa-times" style={{fontSize: '20px'}}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    // )
                                }
                                </tbody>
                            </table>
                            // : ''
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectComboVariant;