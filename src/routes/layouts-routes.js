import React from "react";
import Default from "../components/dashboard/defaultCompo/default";
import Ecommerce from "../components/dashboard/ecommerce";
import Project from "../components/dashboard/project/project";
import ServerComponent from "../components/dashboard/server/serverComponent";
import University from "../components/dashboard/university";

// sample page
import EmployeSetup from "../components/dashboard/hrmSystem/employeSetup";
import SetSalary from "../components/dashboard/hrmSystem/payrollSetup/setSalary";
import SupportTicket from "../components/support-ticket/supportTicket";

export const routes = [
  { path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <Default /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/ecommerce`, Component: <Ecommerce /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/university`, Component: <University /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/server`, Component: <ServerComponent /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/project`, Component: <Project /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/employee`, Component: <EmployeSetup /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/salary`, Component: <SetSalary /> },

  { path: `${process.env.PUBLIC_URL}/support-ticket/supportTicket`, Component: <SupportTicket /> },
];
