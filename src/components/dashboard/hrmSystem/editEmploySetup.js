import React, {useEffect, useState} from "react";
import Breadcrumb from "../../common/breadcrumb";
import {Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import EmployeeCompanyInformation from "./employee/update/employeeCompanyInformation";
import EmployeeContact from "./employee/update/employeeContact";
import EmployeeSkilles from "./employee/update/employeeSkilles";
import BasicInformation from "./employee/update/basicInformation";
import axios from "../../../axios";
import getEmployeeAPI from "../../common/Query/hrm/forSort/getEmployeeAPI";
import {useParams} from "react-router-dom";

const EditEmploySetup = () => {
    const {id} = useParams();
    // console.log(id);
    const [IconWithTab, setIconWithTab] = useState('1');
    const [processData, setProcessData] = useState({});
    const [employeeData, setEmployeeData] = useState({});
    const [contactData, setContactData] = useState({});
    // const [processDatas, setProcessDatas] = useState({});
    const [isChange, setIsChange] = useState(false);
    const checkData = [];
    console.log("this is fine", processData);
    useEffect(() => {
        axios.get(`/hrm-system/employee/${id}`)
            .then(info => {
                // console.log(info?.data?.body?.data);
                setEmployeeData(info?.data?.body?.data?.data);
                setContactData(info?.data?.body?.data?.contact);
                // console.log(info?.data?.body?.data?.data);
            })
            .catch(e => {
                console.log(e);
            })
    }, [isChange])

    const toggle = () => {
        setIsChange(!isChange)
    }


    return (
        <div>
            <Breadcrumb parent="HRM System" title="Edit Employee" id="#EMP0000001"/>
            <div>
                <Card>
                    <CardBody>
                        <Nav tabs>
                            <NavItem>
                                <NavLink href="#javascript" onClick={() => setIconWithTab("1")} className={IconWithTab === '1' ? 'active' : ''}><i className="icofont icofont-ui-home"></i>Basic Information</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#javascript" onClick={() => setIconWithTab("2")} className={IconWithTab === '2' ? 'active' : ''}><i className="icofont icofont-man-in-glasses"></i>Company Information</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#javascript" onClick={() => setIconWithTab("3")} className={IconWithTab === '3' ? 'active' : ''}><i className="icofont icofont-contacts"></i>Contact</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#javascript" onClick={() => setIconWithTab("4")} className={IconWithTab === '4' ? 'active' : ''}><i className="icofont icofont-contacts"></i>Skills</NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={IconWithTab}>
                            <TabPane className="fade show" tabId="1">
                                <BasicInformation employeeData={employeeData} processData={processData} setProcessData={setProcessData} setIconWithTab={setIconWithTab}></BasicInformation>
                            </TabPane>
                            <TabPane tabId="2">
                                <EmployeeCompanyInformation employeeData={employeeData} processData={processData} setProcessData={setProcessData} setIconWithTab={setIconWithTab}></EmployeeCompanyInformation>
                            </TabPane>
                            <TabPane tabId="3">
                                <EmployeeContact toggle={toggle} contactData={contactData} processData={processData} setProcessData={setProcessData} setIconWithTab={setIconWithTab}></EmployeeContact>
                            </TabPane>
                            <TabPane tabId="4">
                                <EmployeeSkilles toggle={toggle} employeeData={employeeData} processData={processData} setProcessData={setProcessData} setIconWithTab={setIconWithTab}></EmployeeSkilles>
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default EditEmploySetup;
