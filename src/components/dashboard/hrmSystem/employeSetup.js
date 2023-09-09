import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Breadcrumb from "../../common/breadcrumb";
import CommonSearchComponet from "../../common/salaryCard/CommonSearchComponet";

const EmployeSetup = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const token = "Bearer " + document.cookie.split(';').find(cookie => cookie.includes('token')).split('=')[1];
        fetch('https://dashboard-hrm-system-backend.vercel.app/hrm-system/employee/', {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            },
        })
            .then(res => res.json())
            .then(info => {
                console.log(info);
                setData(info.body.data);
            })
    }, [])

    const setCookie = () => {
        document.cookie = 'exampleCookie=Hello, World; path=/'}
    const getCookie = () => {
        // const cookies = document.cookie.split(';');
        const cookieValue = document.cookie.split(';').find(cookie => cookie.includes('token')).split('=')[1];
        if (cookieValue) {
            alert(`Cookie Value: ${cookieValue}`);
        }
        else {
            alert('Cookie not found');
        }
    }

    return (
        <>
            <Breadcrumb parent="HRM System" title="Manage Employee"/>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card" style={{padding: "20px"}}>
                            <div>
                                <button onClick={getCookie}>get</button>
                            </div>
                            <CommonSearchComponet/>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className=" table-border">
                                    <tr>
                                        <th scope="col">{"Employee Id"}</th>
                                        <th scope="col">{"Name"}</th>
                                        <th scope="col">{"Email"}</th>
                                        <th scope="col">{"Branch"}</th>
                                        <th scope="col">{"Department"}</th>
                                        <th scope="col">{"Desigmation"}</th>
                                        <th scope="col">{"Date Of Joining"}</th>
                                        <th scope="col">{"Last Login"}</th>
                                        <th scope="col">{"Action"}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data?.map((item, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{}</td>
                                                    <td>{""}</td>
                                                    <td>{""}</td>
                                                    <td>{""}</td>
                                                    <td>{""}</td>
                                                    <td>{""}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center">
                                                            <Link to="/dashboard/hrm/edit">
                                                                <i
                                                                    style={{
                                                                        backgroundColor: "skyblue",
                                                                        color: "#ffffff",
                                                                    }}
                                                                    className="icofont icofont-pencil-alt-5  rounded m-r-15 p-2"
                                                                ></i>
                                                            </Link>
                                                            <Link to="/dashboard/hrm/employee">
                                                                {" "}
                                                                <i
                                                                    style={{
                                                                        backgroundColor: "#ff3a6e",
                                                                        color: "#ffffff",
                                                                    }}
                                                                    className="icofont icofont-trash rounded p-2"
                                                                ></i>
                                                            </Link>
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
