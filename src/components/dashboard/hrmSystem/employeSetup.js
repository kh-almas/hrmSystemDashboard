import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Breadcrumb from "../../common/breadcrumb";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";
import GetEmployeeSetup from "../../common/Query/hrm/GetEmployeeSetup";
import Swal from "sweetalert2";
import axios from "../../../axios";

const EmployeSetup = () => {
    const [data, setData] = useState([]);
    const [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError] = GetEmployeeSetup();
    console.log(allEmployee?.data?.body?.data);
    useEffect(() => {
        setData(allEmployee?.data?.body?.data);
    }, [allEmployee])

    const deleteEmployee = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/hrm-system/employee/${id}`)
                    .then(info => {
                        if(info?.status == 200)
                        {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        allEmployeeReFetch();
                    })
                    .catch(e => {
                        console.log(e);
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
            }
        })
    }

    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Employee"/>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginBottom: "20px",
                }}
            >
                <Link
                    to={"/dashboard/hrm/employee/add"}
                    className="btn btn-pill btn-info btn-air-info btn-air-info"
                    style={{ padding: "7px 13px", borderRadius: "5px" }}
                >
                    <i className="fa fa-plus"></i>
                </Link>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card" style={{padding: "20px"}}>
                            <CommonSearchComponet/>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className=" table-border">
                                    <tr>
                                        <th scope="col">{"Employee Id"}</th>
                                        <th scope="col">{"Name"}</th>
                                        <th scope="col">{"Phone"}</th>
                                        <th scope="col">{"Branch"}</th>
                                        <th scope="col">{"Department"}</th>
                                        <th scope="col">{"Desigmation"}</th>
                                        <th scope="col">{"Date Of Joining"}</th>
                                        <th scope="col">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data?.map((item, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.phone}</td>
                                                    <td>{item?.branch_id}</td>
                                                    <td>{item?.department_id}</td>
                                                    <td>{item?.designation_id}</td>
                                                    <td>{item?.joining_date}</td>
                                                    <td>
                                                        <div>
                                                            <Link to={`/dashboard/hrm/employee/edit/${item?.id}`} className="me-2">
                                                                <i
                                                                    style={{backgroundColor: "skyblue", color: "#ffffff",padding: "10px 13px", borderRadius: "5px"}}
                                                                    className="icofont icofont-pencil-alt-5"
                                                                ></i>
                                                            </Link>

                                                            <button onClick={() => deleteEmployee(item.id)} className="btn" style={{backgroundColor: "#ff3a6e", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                                                                <i className="icofont icofont-trash rounded" style={{backgroundColor: "#ff3a6e", color: "#ffffff",}}></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <p className="p-l-10 p-t-10">Showing 1 to 1 of 1 entries</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeSetup;
