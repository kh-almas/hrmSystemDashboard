import React from "react";
import Default from "../components/dashboard/defaultCompo/default";
import Ecommerce from "../components/dashboard/ecommerce";
import Project from "../components/dashboard/project/project";
import ServerComponent from "../components/dashboard/server/serverComponent";
import University from "../components/dashboard/university";

// sample page

import Attendance from "../components/dashboard/hrmSystem/ManageLeaveSetup/Attendance";
import ManageLeave from "../components/dashboard/hrmSystem/ManageLeaveSetup/ManageLeave";
import Appraisal from "../components/dashboard/hrmSystem/PerformanceSetup/Appraisal";
import GoalTracking from "../components/dashboard/hrmSystem/PerformanceSetup/GoalTracking";
import ManageIndicator from "../components/dashboard/hrmSystem/PerformanceSetup/ManageIndicator";
import Jobs from "../components/dashboard/hrmSystem/RecruitmentSetup/Jobs";
import ManageTrainer from "../components/dashboard/hrmSystem/TrainingSetup/ManageTrainer";
import ManageTraining from "../components/dashboard/hrmSystem/TrainingSetup/ManageTraining";
import EditEmploySetup from "../components/dashboard/hrmSystem/editEmploySetup";
import EmployeSetup from "../components/dashboard/hrmSystem/employeSetup";
import Payslip from "../components/dashboard/hrmSystem/payrollSetup/payslip";
import SalaryDetails from "../components/dashboard/hrmSystem/payrollSetup/salaryDetails";
import SetSalary from "../components/dashboard/hrmSystem/payrollSetup/setSalary";
import SupportTicket from "../components/support-ticket/supportTicket";


export const routes = [
  { path: `${process.env.PUBLIC_URL}/dashboard/default`, Component: <Default /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/ecommerce`, Component: <Ecommerce /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/university`, Component: <University /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/server`, Component: <ServerComponent /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/project`, Component: <Project /> },
  // hrm system 
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/employee`, Component: <EmployeSetup /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/salary`, Component: <SetSalary /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/edit`, Component: <EditEmploySetup /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/salary-details`, Component: <SalaryDetails /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/payslip`, Component: <Payslip /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-leave`, Component: <ManageLeave /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-attendance`, Component: <Attendance /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-indicator`, Component: <ManageIndicator /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-appraisal`, Component: <Appraisal /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/goal-tracking`, Component: <GoalTracking /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-training`, Component: <ManageTraining /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-trainer`, Component: <ManageTrainer /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/hrm/recruitment-jobs`, Component: <Jobs /> },
  


  { path: `${process.env.PUBLIC_URL}/support-ticket/supportTicket`, Component: <SupportTicket /> },
];
