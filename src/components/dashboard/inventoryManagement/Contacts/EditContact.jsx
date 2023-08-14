import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import Breadcrumb from "../../../common/breadcrumb";
import Input from "../../../common/modal/Input";
import Select from "../../../common/modal/Select";
import CkEditorComponent from "../../../common/modal/CkEditorComponent";
import Submitbtn from "../../../common/button/Submitbtn";

const EditContact = () => {
    const [type, setType] = useState("Supplier");

    const handleTypeChange = (type) => {
        setType(type);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <Breadcrumb parent="Inventory management" title="Edit Contact" />
            <div className="card p-30">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row row-cols-1 row-cols-lg-3 ">
                        <div>
                            <label
                                style={{ fontSize: "14px" }}
                                htmlFor="exampleFormControlSelect9"
                            >
                                Product-Type
                            </label>
                            <select
                                onChange={(e) => handleTypeChange(e.target.value)}
                                style={{ fontSize: "13px" }}
                                name="product-type"
                                className="form-control digits"
                                id="exampleFormControlSelect9"
                            >
                                <option value="Supplier">Supplier</option>
                                <option value="Customer">Customer</option>
                            </select>
                        </div>
                        {type === "Supplier" || type === "Customer" ? (
                            <div>
                                <Input
                                    labelName={"Name"}
                                    inputName={"name"}
                                    inputType={"text"}
                                    placeholder={"Name"}
                                    validation={{
                                        ...register("name", { required: true }),
                                    }}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        {type === "Supplier" || type === "Customer" ? (
                            <div>
                                <Input
                                    labelName={"Profile Picture"}
                                    inputName={"profilePicture"}
                                    inputType={"file"}
                                    placeholder={"Profile Picture"}
                                    validation={{
                                        ...register("profilePicture", { required: true }),
                                    }}
                                />
                            </div>
                        ) : (
                            ""
                        )}

                        {type === "Supplier" || type === "Customer" ? (
                            <div>
                                <div>
                                    <Input
                                        labelName={"Business Name"}
                                        inputName={"business-name"}
                                        placeholder={"Business Name"}
                                        inputType={"text"}
                                        validation={{
                                            ...register("business-name", { required: true }),
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type === "Supplier" || type === "Customer" ? (
                            <div>
                                <div>
                                    <Input
                                        labelName={"Tax Number"}
                                        inputName={"tex-number"}
                                        inputType={"text"}
                                        placeholder={"0"}
                                        validation={{
                                            ...register("tex-number", { required: true }),
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type === "Supplier" || type === "Customer" ? (
                            <div>
                                <div>
                                    <Input
                                        labelName={"Openning Balance"}
                                        inputName={"opennibg-balance"}
                                        inputType={"text"}
                                        placeholder={"Openning Balance"}
                                        validation={{
                                            ...register("opennibg-balance", { required: true }),
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type === "Supplier" || type === "Customer" ? (
                            <div>
                                <div>
                                    <Input
                                        labelName={"Pay Term"}
                                        inputName={"pay-term"}
                                        inputType={"text"}
                                        placeholder={"Pay Term"}
                                        validation={{
                                            ...register("pay-term", { required: true }),
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type == "Supplier" || type === "Customer" ? (
                            <div style={{ position: "relative" }}>
                                <div>
                                    <Select
                                        name={"pay-term-condition"}
                                        labelName={"Pay-Term-Condition"}
                                        placeholder={"Select condition"}
                                        options={["Days", "Months"]}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type == "Supplier" || type === "Customer" ? (
                            <div>
                                <div>
                                    <Input
                                        labelName={"Email"}
                                        inputName={"email"}
                                        inputType={"email"}
                                        placeholder={"Email"}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type == "Customer" ? (
                            <div>
                                <div>
                                    <Input
                                        labelName={"Credit Limit"}
                                        inputName={"credit limit"}
                                        inputType={"text"}
                                        placeholder={"Credit Limit"}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type == "Supplier" || type === "Customer" ? (
                            <div>
                                <div>
                                    <Input
                                        labelName={"Mobile"}
                                        inputName={"mobile"}
                                        inputType={"text"}
                                        placeholder={"Mobile"}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type == "Supplier" || type === "Customer" ? (
                            <div>
                                <div>
                                    <Input
                                        labelName={"Alternate Contact No"}
                                        inputName={"alternate-contact-no"}
                                        inputType={"text"}
                                        placeholder={"Alternate Contact No"}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type == "Supplier" || type === "Customer" ? (
                            <div>
                                <div>
                                    <Select
                                        name={"country"}
                                        labelName={"Country"}
                                        placeholder={"Select country"}
                                        options={["Bangladesh", "Australia"]}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type == "Supplier" || type === "Customer" ? (
                            <div>
                                <div>
                                    <Select
                                        name={"state"}
                                        labelName={"State"}
                                        placeholder={"Select State"}
                                        options={[""]}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type == "Supplier" || type === "Customer" ? (
                            <div>
                                <div>
                                    <Select
                                        name={"city"}
                                        labelName={"City"}
                                        placeholder={"Select City"}
                                        options={[""]}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {type == "Supplier" || type === "Customer" ? (
                            <div>
                                <Input
                                    labelName={"Address"}
                                    inputName={"address"}
                                    inputType={"text"}
                                    placeholder={"Address"}
                                    validation={{ ...register("address", { required: true }) }}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="row row-cols-1 row-cols-lg-1 mb-2">
                        <CkEditorComponent label={"Note"} />
                    </div>
                    <Submitbtn name={"Update Contact"} />
                </form>
            </div>
        </>
    );
};

export default EditContact;