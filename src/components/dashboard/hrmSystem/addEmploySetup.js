import React, {useEffect, useState} from "react";
import Breadcrumb from "../../common/breadcrumb";
import {Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import EmployeeCompanyInformation from "./employee/employeeCompanyInformation";
import EmployeeContact from "./employee/employeeContact";
import EmployeeSkilles from "./employee/employeeSkilles";
import BasicInformation from "./employee/basicInformation";

const AddEmploySetup = () => {
    const [IconWithTab, setIconWithTab] = useState('1');
    const [processData, setProcessData] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    // console.log("this is fine", processData);
    return (
        <div>
            <Breadcrumb parent="HRM System" title="Add Employee" id="#EMP0000001"/>
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
                                <BasicInformation processData={processData} setProcessData={setProcessData} setIconWithTab={setIconWithTab}></BasicInformation>
                            </TabPane>
                            <TabPane tabId="2">
                                <EmployeeCompanyInformation processData={processData} setProcessData={setProcessData} setIconWithTab={setIconWithTab}></EmployeeCompanyInformation>
                            </TabPane>
                            <TabPane tabId="3">
                                <EmployeeContact processData={processData} setProcessData={setProcessData} setIconWithTab={setIconWithTab}></EmployeeContact>
                            </TabPane>
                            <TabPane tabId="4">
                                <EmployeeSkilles  processData={processData} setProcessData={setProcessData} setIconWithTab={setIconWithTab}></EmployeeSkilles>
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AddEmploySetup;
