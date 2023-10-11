import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import AddDepartmentModal from "../../../../common/modal/Form/AddDepartmentModal";
import Select from "../../../../common/modal/Select";
import AddSectionModal from "../../../../common/modal/Form/AddSectionModal";
import Input from "../../../../common/modal/Input";
import axios from "../../../../../axios";
import Swal from "sweetalert2";


const EmployeeContact = ({setProcessData, setIconWithTab, processData, contactData, toggle}) => {
    const {register, reset, handleSubmit, formState: {errors},} = useForm();
    const [contact, setContact] = useState([]);
    const [contactID, setContactID] = useState(0);
    const [editContactData, setEditContactData] = useState([]);
    const [isDeleted, setIsDelete] = useState(false);

    // useEffect(() => {
    //     reset()
    // }, [contactData]);


    useEffect(() => {
        if(contact.length > 0)
        {
            setProcessData({ ...processData, contact: contact });
        }

    }, [contact])

    useEffect(() => {
        setContact(contactData);
    }, [contactData])

    // console.log(editContactData);

    useEffect( () => {
        setContact([...contact]);
        reset();
    }, [isDeleted])

    const EmployeeContactInformation = data => {

        if(contactID > 0){
            data.id = contactID;
            setContactID(0);
        }
        // console.log("asdkfvhnsdkfjlgs", data)
        setContact(preData => [data, ...preData]);
        // setEditContactData([]);
        reset();
        setEditContactData([]);
    }

    const editContact = ({id, item}) => {
        setEditContactData(contact[id]);
        setContactID(item.id);
        contact.splice(id, 1);
        setIsDelete(!isDeleted);
    }

    const deleteContact = ({id, item}) => {
        // delete contact[id];
        contact.splice(id, 1);
        axios.delete(`/hrm-system/employee/contact/${item.id}`)
            .then(info => {
                if(info?.status == 200)
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Contact is deleted',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                toggle();
            })
            .catch(e => {
                // console.log(e);
                if(e?.response?.data?.body?.message?.sqlState === "23000")
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Can not delete shift, if there have any attendance in this shift`,
                    })
                }
                // if (!empty(e?.response?.data?.body?.message?.details[0].message))
                // {
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Oops...',
                //         text: `${e?.response?.data?.body?.message?.details[0].message}`,
                //     })
                // }
            })
        setIsDelete(!isDeleted);
    }

    const handleMainForm = () => {
        setProcessData(previousData => [...previousData, contact]);
        // setIconWithTab("4");
    }

    return (
        <>
            <form onSubmit={handleSubmit(EmployeeContactInformation)} className="mt-3">
                <div className="row row-cols-3">
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Contact Type"}
                                inputName={"contact_type"}
                                inputType={"text"}
                                placeholder={"Enter contact type"}
                                validation={{
                                    ...register("contact_type"),
                                }}
                                defaultValue={editContactData?.contact_type}
                                error={errors.contact_type}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Address"}
                                inputName={"address"}
                                inputType={"text"}
                                placeholder={"Enter Address"}
                                validation={{
                                    ...register("address"),
                                }}
                                defaultValue={editContactData?.address}
                                error={errors.address}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Division"}
                                inputName={"division"}
                                inputType={"text"}
                                placeholder={"Enter division"}
                                validation={{
                                    ...register("division"),
                                }}
                                defaultValue={editContactData?.division}
                                error={errors.division}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <Input
                                labelName={"District"}
                                inputName={"district"}
                                inputType={"text"}
                                placeholder={"Enter district"}
                                validation={{
                                    ...register("district"),
                                }}
                                defaultValue={editContactData?.district}
                                error={errors.district}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Country"}
                                inputName={"country"}
                                inputType={"text"}
                                placeholder={"Enter country"}
                                validation={{
                                    ...register("country"),
                                }}
                                defaultValue={editContactData?.country}
                                error={errors.country}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <Input
                                labelName={"Post Code"}
                                inputName={"post_code"}
                                inputType={"post_code"}
                                placeholder={"Enter post code"}
                                validation={{
                                    ...register("post_code"),
                                }}
                                defaultValue={editContactData?.post_code}
                                error={errors.post_code}
                            />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary mt-2" style={{ marginBottom: "30px"}} type="submit">
                        Add Contact
                    </button>
                </div>
            </form>

            <div className="table-responsive">
                <table className="table">
                    <thead className=" table-border">
                    <tr>
                        <th scope="col">{"Contact Type"}</th>
                        <th scope="col">{"Address"}</th>
                        <th scope="col">{"Division"}</th>
                        <th scope="col">{"District"}</th>
                        <th scope="col">{"Country"}</th>
                        <th scope="col">{"Post Code"}</th>
                        <th scope="col">{"Action"}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        contact?.map((item, index) =>
                            <tr key={index}>
                                <td>{item?.contact_type }</td>
                                <td>{item?.address }</td>
                                <td>{item?.division }</td>
                                <td>{item?.district }</td>
                                <td>{item?.country }</td>
                                <td>{item?.post_code }</td>
                                <td>
                                    <button onClick={() => editContact({ id: index, item: { id: item.id } })} className="btn me-2" style={{backgroundColor: "skyblue", color: "#ffffff", padding: "4px 7px", borderRadius: "5px"}}>
                                        <i className="icofont icofont-pencil-alt-5  rounded" style={{backgroundColor: "skyblue", color: "#ffffff",}}></i>
                                    </button>
                                    <button onClick={() => deleteContact({ id: index, item: { id: item.id } })} className="btn" style={{backgroundColor: "#ff3a6e", color: "#ffffff", padding: "4px 7px", borderRadius: "5px"}}>
                                      <i className="icofont icofont-trash rounded" style={{backgroundColor: "#ff3a6e", color: "#ffffff",}}></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                {/*<div className="d-flex justify-content-end">*/}
                {/*    <button className="btn btn-primary mt-2"*/}
                {/*            style={{width: "max-content", marginLeft: "auto", marginBottom: "30px"}}*/}
                {/*            type="button" onClick={()=> handleMainForm()}>*/}
                {/*        Next*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </>
    );
};

export default EmployeeContact;