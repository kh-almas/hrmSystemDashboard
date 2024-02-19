import TextField from "@mui/material/TextField";
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
}) => {
  const [hasKey, setHasKey] = useState("");
  const [Key, setKey] = useState("");
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

  useEffect(() => {
    const hasKey = generateUniqueKey(15);
    setHasKey(hasKey);
    setFormData({ ...formData, hasSerialKey: hasKey });
  }, []);

  const handleHasKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSerialKeys([...serialKeys, event.target.value]);
      setHasKey("");
    }
  };

  console.log("serialKeys", serialKeys);

  const handleDeleteKey = (index, event) => {
    event.preventDefault();
    const updatedKeys = [...serialKeys];
    updatedKeys.splice(index, 1);
    setSerialKeys(updatedKeys);
  };

  return (
    <>
      <BaseModal title={sku?.label} dataModal={modal} dataToggle={toggle}>
        <form>
          <div
            // style={{ flexWrap: "wrap" }}
            className="d-flex gap-2 align-items-center justify-content-center "
          >
            {serialKeys.map((key, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-content-center  bg-dark text-light rounded gap-2  mt-3 px-1"
                style={{ height: "35px" }}
              >
                <p className="m-0">{key}</p>
                <p
                  className="m-0"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleDeleteKey(index, e)}
                >
                  X
                </p>
              </div>
            ))}

            <TextField
              variant="outlined"
            //   fullWidth
              autoComplete="off"
              size="small"
              type={"text"}
              label={"hasSerialKey"}
              value={hasKey}

              onChange={(e) => setHasKey(e.target.value)}
              onKeyDown={handleHasKey}
              sx={{
                minWidth:350,
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
