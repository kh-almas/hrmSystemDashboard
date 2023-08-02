import React from "react";
import Default from "../components/dashboard/defaultCompo/default";
import Ecommerce from "../components/dashboard/ecommerce";
import Project from "../components/dashboard/project/project";
import ServerComponent from "../components/dashboard/server/serverComponent";
import University from "../components/dashboard/university";

// sample page
import CompanyPolicy from "../components/dashboard/hrmSystem/CompanyPolicy";
import DocumentSetup from "../components/dashboard/hrmSystem/DocumentSetup";
import EmployeesAssetSetup from "../components/dashboard/hrmSystem/EmployeesAssetSetup";
import EventSetup from "../components/dashboard/hrmSystem/EventSetup";
import Attendance from "../components/dashboard/hrmSystem/ManageLeaveSetup/Attendance";
import ManageLeave from "../components/dashboard/hrmSystem/ManageLeaveSetup/ManageLeave";
import ManageMeeting from "../components/dashboard/hrmSystem/ManageMeeting";
import Appraisal from "../components/dashboard/hrmSystem/PerformanceSetup/Appraisal";
import GoalTracking from "../components/dashboard/hrmSystem/PerformanceSetup/GoalTracking";
import ManageIndicator from "../components/dashboard/hrmSystem/PerformanceSetup/ManageIndicator";
import Jobs from "../components/dashboard/hrmSystem/RecruitmentSetup/Jobs";
import ManageTrainer from "../components/dashboard/hrmSystem/TrainingSetup/ManageTrainer";
import ManageTraining from "../components/dashboard/hrmSystem/TrainingSetup/ManageTraining";
import EditEmploySetup from "../components/dashboard/hrmSystem/editEmploySetup";
import EmployeSetup from "../components/dashboard/hrmSystem/employeSetup";
import Announcement from "../components/dashboard/hrmSystem/hrAdminSetup/Announcement";
import Award from "../components/dashboard/hrmSystem/hrAdminSetup/Award";
import Complaints from "../components/dashboard/hrmSystem/hrAdminSetup/Complaints";
import Holiday from "../components/dashboard/hrmSystem/hrAdminSetup/Holiday";
import HolidayCalender from "../components/dashboard/hrmSystem/hrAdminSetup/HolidayCalender";
import Promotion from "../components/dashboard/hrmSystem/hrAdminSetup/Promotion";
import Resignation from "../components/dashboard/hrmSystem/hrAdminSetup/Resignation";
import Termination from "../components/dashboard/hrmSystem/hrAdminSetup/Termination";
import Transfer from "../components/dashboard/hrmSystem/hrAdminSetup/Transfer";
import Trip from "../components/dashboard/hrmSystem/hrAdminSetup/Trip";
import Warning from "../components/dashboard/hrmSystem/hrAdminSetup/Warning";
import LeaveType from "../components/dashboard/hrmSystem/hrmSystemSetup/LeaveType";
import ManageAllowanceOption from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageAllowanceOption";
import ManageAwardType from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageAwardType";
import ManageBranch from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageBranch";
import ManageCompetencies from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageCompetencies";
import ManageDeductionOption from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageDeductionOption";
import ManageDepartment from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageDepartment";
import ManageDesignation from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageDesignation";
import ManageDocumentType from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageDocumentType";
import ManageGoalType from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageGoalType";
import ManageJobCategory from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageJobCategory";
import ManageJobStage from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageJobStage";
import ManageLoanOption from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageLoanOption";
import ManagePayslipType from "../components/dashboard/hrmSystem/hrmSystemSetup/ManagePayslipType";
import ManagePerformanceType from "../components/dashboard/hrmSystem/hrmSystemSetup/ManagePerformanceType";
import MeetingCalender from "../components/dashboard/MeetingCalender";
import ManageTerminationType from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageTerminationType";
import ManageTrainingType from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageTrainingType";
import Payslip from "../components/dashboard/hrmSystem/payrollSetup/payslip";
import SalaryDetails from "../components/dashboard/hrmSystem/payrollSetup/salaryDetails";
import SetSalary from "../components/dashboard/hrmSystem/payrollSetup/setSalary";
import Sale from "../components/dashboard/inventoryManagement/sales/Sale";
import SaleReturn from "../components/dashboard/inventoryManagement/sales/SaleReturn";
import SupportTicket from "../components/support-ticket/supportTicket";


export const routes = [
  {
    path: `${process.env.PUBLIC_URL}/dashboard/default`,
    Component: <Default />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/ecommerce`,
    Component: <Ecommerce />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/university`,
    Component: <University />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/server`,
    Component: <ServerComponent />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/project`,
    Component: <Project />,
  },
  // hrm system
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/employee`,
    Component: <EmployeSetup />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/salary`,
    Component: <SetSalary />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/edit`,
    Component: <EditEmploySetup />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/salary-details`,
    Component: <SalaryDetails />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/payslip`,
    Component: <Payslip />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-leave`,
    Component: <ManageLeave />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-attendance`,
    Component: <Attendance />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-indicator`,
    Component: <ManageIndicator />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-appraisal`,
    Component: <Appraisal />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/goal-tracking`,
    Component: <GoalTracking />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-training`,
    Component: <ManageTraining />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-trainer`,
    Component: <ManageTrainer />,
  },

  {
    path: `${process.env.PUBLIC_URL}/support-ticket/supportTicket`,
    Component: <SupportTicket />,
  },

  //Recruitment Setup
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/recruitment-jobs`,
    Component: <Jobs />,
  },

    //hr admin setup
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/award`, Component: <Award /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/transfer`, Component: <Transfer /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/resignation`, Component: <Resignation /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/trip`, Component: <Trip /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/promotion`, Component: <Promotion /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/complaints`, Component: <Complaints /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/warning`, Component: <Warning /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/termination`, Component: <Termination /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/announcement`, Component: <Announcement /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/holiday`, Component: <Holiday /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/holiday-calender`, Component: <HolidayCalender /> },


  //hr admin setup
  { path: `${process.env.PUBLIC_URL}/dashboard/admin/event/setup`, Component: <EventSetup /> },

  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-branch`,
    Component: <ManageBranch />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-department`,
    Component: <ManageDepartment />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-designation`,
    Component: <ManageDesignation />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/leave-type`,
    Component: <LeaveType />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-document`,
    Component: <ManageDocumentType />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-payslip-type`,
    Component: <ManagePayslipType />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-allowance-option`,
    Component: <ManageAllowanceOption />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-loan-option`,
    Component: <ManageLoanOption />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-deduction-option`,
    Component: <ManageDeductionOption />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-goal-type`,
    Component: <ManageGoalType />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-training-type`,
    Component: <ManageTrainingType />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-award-type`,
    Component: <ManageAwardType />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-termination-type`,
    Component: <ManageTerminationType />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-job-category`,
    Component: <ManageJobCategory />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-job-stage`,
    Component: <ManageJobStage />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-performance-type`,
    Component: <ManagePerformanceType />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-competencies`,
    Component: <ManageCompetencies />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-meeting`,
    Component: <ManageMeeting />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/manage-meeting-calender`,
    Component: <MeetingCalender />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/employees-asset-setup`,
    Component: <EmployeesAssetSetup />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/document-setup`,
    Component: <DocumentSetup />,
  },
  {
    path: `${process.env.PUBLIC_URL}/hrm/dashboard/company-policy`,
    Component: <CompanyPolicy />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/sale`,
    Component: <Sale />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/sale-return`,
    Component: <SaleReturn />,
  },
];
