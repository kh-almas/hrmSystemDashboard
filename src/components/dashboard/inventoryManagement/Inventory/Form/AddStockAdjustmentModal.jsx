import React, {useEffect, useState} from 'react';
import BaseModal from "../../../../common/modal/BaseModal";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import moment from "moment/moment";
import {Button} from "react-bootstrap";

const AddStockAdjustmentModal = ({modal, setModal, toggle, sku, productFormData, setProductFormData, setQuantity, quantity, addProductInfo, serialKeys, setSerialKeys}) => {
    const [hasKey, setHasKey] = useState("");


    function generateUniqueKey(count) {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }

        return code;
    }

    // if (productFormData.has_serial_key == 1) {
    //   const hasKey = generateUniqueKey(15);
    //   setHasKey(hasKey);
    //   setProductFormData({ ...productFormData, has_serial_key: hasKey });
    // }

    useEffect(() => {
        //   if (sku?.has_serial_key == 1) {
        //     let generatedKeys = [];
        //     for (let i = 0; i < quantity; i++) {
        //       const hasKey = generateUniqueKey(15);
        //       generatedKeys.push(hasKey);
        //     }
        //     setSerialKeys(generatedKeys);
        //   }
        // }, [sku?.has_serial_key, quantity]);

        if (sku?.hasSerialKey === 1) {
            let generatedKeys = [];
            for (let i = 0; i < quantity; i++) {
                const hasKey = generateUniqueKey(15);
                generatedKeys.push(hasKey);
            }
            setSerialKeys(generatedKeys);
            setProductFormData((prevState) => ({
                ...prevState,
                hasSerialKey: generatedKeys,
            }));
        }
    }, [sku?.hasSerialKey, quantity, setProductFormData]);

    const handleHasKey = (event) => {
        if (event.target.value == "") {
            return;
        }
        if (event.key === "Enter") {
            event.preventDefault();
            if (serialKeys.length < quantity) {
                setSerialKeys([...serialKeys, event.target.value]);

                setProductFormData({
                    ...productFormData,
                    hasSerialKey: [...serialKeys, event.target.value],
                });

                setHasKey("");
            } else {
                return alert("You've reached the maximum number of serial keys!");
            }
        }
    };

    // setProductFormData(prevState => ({ ...prevState, has_serial_key: serialKeys }));

    const handleDeleteKey = (index, event) => {
        event.preventDefault();
        const updatedKeys = [...serialKeys];
        updatedKeys.splice(index, 1);
        setSerialKeys(updatedKeys);
        setProductFormData({ ...productFormData, hasSerialKey: updatedKeys });
    };

    const product = sku?.label;
    const productName = product?.split(" > ")[0];

    return (
        <>
            <BaseModal title={productName} dataModal={modal} dataToggle={toggle}>
                <div>
                    <div className="row row-cols-1 row-cols-lg-2">
                        {sku?.hasBatch == '1' ? (
                            <div>
                                <TextField
                                    readOnly
                                    variant="outlined"
                                    fullWidth
                                    autoComplete="off"
                                    size="small"
                                    type="text"
                                    // value={batchNo}

                                    label="Batch no"
                                    onChange={(e) => {
                                        // setQuantity(e.target.value);
                                        setProductFormData({...productFormData, batchNo: e.target.value});
                                        // clearErrors(["qty"]);
                                    }}
                                    sx={{
                                        marginTop: 2,
                                        "& .MuiFormLabel-root": {
                                            fontWeight: 400,
                                            fontSize: 12,
                                        },
                                        "& label": {
                                            fontSize: 12,
                                        },
                                        "& label.Mui-focused": {
                                            color: "#1c2437",
                                            fontSize: 16,
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            height: 35,
                                            backgroundColor: "white",
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#979797",
                                                borderWidth: "1px",
                                            },
                                        },
                                    }}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        {sku?.hasExpired == '1' ? (
                            <>
                                {" "}
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                                        <DatePicker
                                            label="Manufacture date"
                                            slotProps={{textField: {size: "small"}}}
                                            value={dayjs(productFormData?.manufactureDate)}
                                            onChange={(newValue) => {
                                                // setDate(moment(newValue.$d).format("YYYY-MM-DD"));
                                                setProductFormData({
                                                    ...productFormData,
                                                    manufactureDate: moment(newValue.$d).format(
                                                        "YYYY-MM-DD"
                                                    ),
                                                });
                                            }}
                                            sx={{
                                                width: "100%",
                                                marginTop: 2,
                                                "& label": {
                                                    fontSize: 12,
                                                },
                                                "& label.Mui-focused": {
                                                    fontSize: 16,
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                                        <DatePicker
                                            label="Expire Date"
                                            slotProps={{textField: {size: "small"}}}
                                            value={dayjs(productFormData?.expireDate)}
                                            onChange={(newValue) => {
                                                // setDate(moment(newValue.$d).format("YYYY-MM-DD"));
                                                setProductFormData({
                                                    ...productFormData,
                                                    expireDate: moment(newValue.$d).format(
                                                        "YYYY-MM-DD"
                                                    ),
                                                });
                                            }}
                                            sx={{
                                                width: "100%",
                                                marginTop: 2,
                                                "& label": {
                                                    fontSize: 12,
                                                },
                                                "& label.Mui-focused": {
                                                    fontSize: 16,
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </>
                        ) : (
                            ""
                        )}

                        <div>
                            <TextField
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                size="small"
                                type={"number"}
                                label={"Quantity"}
                                defaultValue={quantity}
                                // {...register("qty", {
                                //   required: "This field is required",
                                // })}
                                onChange={(e) => {
                                    setQuantity(e.target.value);
                                    setProductFormData({...productFormData, qty: e.target.value});
                                    // clearErrors(["qty"]);
                                }}
                                sx={{
                                    marginTop: 2,
                                    "& .MuiFormLabel-root": {
                                        fontWeight: 400,
                                        fontSize: 12,
                                    },
                                    "& label": {
                                        fontSize: 12,
                                    },
                                    "& label.Mui-focused": {
                                        color: "#1c2437",
                                        fontSize: 16,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        height: 35,
                                        backgroundColor: "white",
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#979797",
                                            borderWidth: "1px",
                                        },
                                    },
                                }}
                            />
                        </div>
                        {sku?.hasSerialKey == '2' ? (
                            <div>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    autoComplete="off"
                                    size="small"
                                    type={"text"}
                                    label={"hasSerialKey"}
                                    value={hasKey}
                                    onChange={(e) => setHasKey(e.target.value)}
                                    onKeyDown={handleHasKey}
                                    sx={{
                                        marginTop: 2,
                                        "& .MuiFormLabel-root": {
                                            fontWeight: 400,
                                            fontSize: 12,
                                        },
                                        "& label": {
                                            fontSize: 12,
                                        },
                                        "& label.Mui-focused": {
                                            color: "#1c2437",
                                            fontSize: 16,
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            height: 35,
                                            backgroundColor: "white",
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#979797",
                                                borderWidth: "1px",
                                            },
                                        },
                                    }}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="d-flex flex-wrap gap-2 mt-3">
                        {serialKeys.map((key, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-center justify-content-center  bg-dark text-light rounded  px-2 gap-3"
                                style={{height: "35px"}}
                            >
                                <p className="m-0">{key}</p>
                                {sku?.hasSerialKey == '2' ? (
                                    <p
                                        className="m-0"
                                        style={{cursor: "pointer", color: "orange"}}
                                        onClick={(e) => handleDeleteKey(index, e)}
                                    >
                                        X
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-center align-items-center mt-5">
                        <Button
                            onClick={() => {
                                setModal(!modal);
                                addProductInfo();
                            }}
                            className="me-2 btn btn-pill btn-info btn-air-info btn-info-gradien px-4"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </BaseModal>
        </>
    );
};

export default AddStockAdjustmentModal;