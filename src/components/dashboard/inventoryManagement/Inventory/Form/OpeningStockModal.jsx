import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BaseModal from "../../../../common/modal/BaseModal";

const OpeningStockModal = ({
  modal,
  setModal,
  toggle,
  sku,
  formData,
  setFormData,
  setQuantity,
  quantity,
}) => {
  const [hasKey, setHasKey] = useState("");
  const [serialKeys, setSerialKeys] = useState([]);

  function generateUniqueKey(count) {
    let timestamp = new Date().getTime().toString();
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    characters += timestamp;
    let code = "";

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }

  // if (formData.hasSerialKey == 1) {
  //   const hasKey = generateUniqueKey(15);
  //   setHasKey(hasKey);
  //   setFormData({ ...formData, hasSerialKey: hasKey });
  // }

  useEffect(() => {
    //   if (sku?.hasSerialKey == 1) {
    //     let generatedKeys = [];
    //     for (let i = 0; i < quantity; i++) {
    //       const hasKey = generateUniqueKey(15);
    //       generatedKeys.push(hasKey);
    //     }
    //     setSerialKeys(generatedKeys);
    //   }
    // }, [sku?.hasSerialKey, quantity]);

    if (sku?.hasSerialKey === 1) {
      let generatedKeys = [];
      for (let i = 0; i < quantity; i++) {
        const hasKey = generateUniqueKey(15);
        generatedKeys.push(hasKey);
      }
      setSerialKeys(generatedKeys);
      setFormData(prevState => ({ ...prevState, hasSerialKey: generatedKeys }));
    }
  }, [sku?.hasSerialKey, quantity, setFormData]);

  const handleHasKey = (event) => {
    if (event.target.value == "") {
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (serialKeys.length < quantity) {
        setSerialKeys([...serialKeys, event.target.value]);
        setFormData({ ...formData, hasSerialKey: serialKeys });
        setHasKey("");
      } else {
        return alert("You've reached the maximum number of serial keys!");
      }
    }
  };

  // setFormData(prevState => ({ ...prevState, hasSerialKey: serialKeys }));

  const handleDeleteKey = (index, event) => {
    event.preventDefault();
    const updatedKeys = [...serialKeys];
    updatedKeys.splice(index, 1);
    setSerialKeys(updatedKeys);
  };

  const product = sku?.label;
  const productName = product.split(" > ")[0];

  console.log("serialKeys", serialKeys);
  return (
    <>
      <BaseModal title={productName} dataModal={modal} dataToggle={toggle}>
        <form>
          {sku.hasSerialKey == 0 && (
            <>
              <div className="row row-cols-1 row-cols-lg-2">
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
                      setFormData({ ...formData, batchNo: e.target.value });
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

                {sku?.hasExpired ? (
                  <>
                    {" "}
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                        <DatePicker
                          label="Manufacture date"
                          slotProps={{ textField: { size: "small" } }}
                          value={dayjs(formData?.manufactureDate)}
                          onChange={(newValue) => {
                            // setDate(moment(newValue.$d).format("YYYY-MM-DD"));
                            setFormData({
                              ...formData,
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

                      {/* {errors.date && (
                        <span style={{ fontSize: "10px", color: "red" }}>
                          {errors.date.message}
                        </span>
                      )} */}
                    </div>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                        <DatePicker
                          label="Expire Date"
                          slotProps={{ textField: { size: "small" } }}
                          value={dayjs(formData?.expireDate)}
                          onChange={(newValue) => {
                            // setDate(moment(newValue.$d).format("YYYY-MM-DD"));
                            setFormData({
                              ...formData,
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

                      {/* {errors.date && (
                        <span style={{ fontSize: "10px", color: "red" }}>
                          {errors.date.message}
                        </span>
                      )} */}
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
                      setFormData({ ...formData, qty: e.target.value });
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
              </div>
            </>
          )}

          {sku.hasSerialKey == 1 && (
            <>
              <div className="row row-cols-1 row-cols-lg-2">
                {sku?.hasBatch ? (
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
                        setFormData({ ...formData, batchNo: e.target.value });
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
                {sku?.hasExpired ? (
                  <>
                    {" "}
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                        <DatePicker
                          label="Manufacture date"
                          slotProps={{ textField: { size: "small" } }}
                          value={dayjs(formData?.manufactureDate)}
                          onChange={(newValue) => {
                            // setDate(moment(newValue.$d).format("YYYY-MM-DD"));
                            setFormData({
                              ...formData,
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

                      {/* {errors.date && (
                        <span style={{ fontSize: "10px", color: "red" }}>
                          {errors.date.message}
                        </span>
                      )} */}
                    </div>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                        <DatePicker
                          label="Expire Date"
                          slotProps={{ textField: { size: "small" } }}
                          value={dayjs(formData?.expireDate)}
                          onChange={(newValue) => {
                            // setDate(moment(newValue.$d).format("YYYY-MM-DD"));
                            setFormData({
                              ...formData,
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

                      {/* {errors.date && (
                        <span style={{ fontSize: "10px", color: "red" }}>
                          {errors.date.message}
                        </span>
                      )} */}
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
                      setFormData({ ...formData, qty: e.target.value });
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
                <div>
                  <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    type={"text"}
                    label={"hasSerialKey"}
                    value={hasKey}
                    // onChange={(e) => setHasKey(e.target.value)}
                    // onKeyDown={handleHasKey}
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
              </div>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {serialKeys.map((key, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-center  bg-dark text-light rounded  px-2 gap-3"
                    style={{ height: "35px" }}
                  >
                    <p className="m-0">{key}</p>
                    <p
                      className="m-0"
                      style={{ cursor: "pointer", color: "orange" }}
                      onClick={(e) => handleDeleteKey(index, e)}
                    >
                      X
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {sku.hasSerialKey == 2 && (
            <>
              <div className="row row-cols-1 row-cols-lg-2">
                {sku?.hasBatch ? (
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
                        setFormData({ ...formData, batchNo: e.target.value });
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
                {sku?.hasExpired ? (
                  <>
                    {" "}
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                        <DatePicker
                          label="Manufacture date"
                          slotProps={{ textField: { size: "small" } }}
                          value={dayjs(formData?.manufactureDate)}
                          onChange={(newValue) => {
                            // setDate(moment(newValue.$d).format("YYYY-MM-DD"));
                            setFormData({
                              ...formData,
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

                      {/* {errors.date && (
                        <span style={{ fontSize: "10px", color: "red" }}>
                          {errors.date.message}
                        </span>
                      )} */}
                    </div>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/*<DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />*/}
                        <DatePicker
                          label="Expire Date"
                          slotProps={{ textField: { size: "small" } }}
                          value={dayjs(formData?.expireDate)}
                          onChange={(newValue) => {
                            // setDate(moment(newValue.$d).format("YYYY-MM-DD"));
                            setFormData({
                              ...formData,
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

                      {/* {errors.date && (
                        <span style={{ fontSize: "10px", color: "red" }}>
                          {errors.date.message}
                        </span>
                      )} */}
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
                    value={quantity}
                    // {...register("qty", {
                    //   required: "This field is required",
                    // })}
                    onChange={(e) => {
                      setFormData({ ...formData, qty: e.target.value });
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
                {/* {errors.qty && (
          <span style={{ fontSize: "10px", color: "red" }}>
            {errors.qty.message}
          </span>
        )} */}
              </div>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {serialKeys.map((key, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-center  bg-dark text-light rounded  px-2 gap-3"
                    style={{ height: "35px" }}
                  >
                    <p className="m-0">{key}</p>
                    <p
                      className="m-0"
                      style={{ cursor: "pointer", color: "orange" }}
                      onClick={(e) => handleDeleteKey(index, e)}
                    >
                      X
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="d-flex justify-content-center align-items-center mt-5">
            <Button
              onClick={() => setModal(!modal)}
              className="me-2 btn btn-pill btn-info btn-air-info btn-info-gradien px-4"
            >
              Submit
            </Button>
          </div>
        </form>
      </BaseModal>
    </>
  );
};

export default OpeningStockModal;
