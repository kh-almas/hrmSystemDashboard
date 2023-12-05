import React from "react";
import Default from "../components/dashboard/defaultCompo/default";
import Ecommerce from "../components/dashboard/ecommerce";
import Project from "../components/dashboard/project/project";
import ServerComponent from "../components/dashboard/server/serverComponent";
import University from "../components/dashboard/university";

// sample page
import ManualAttendance from "../components/dashboard/hrmSystem/attendance/ManualAttendance";
import MeetingCalender from "../components/dashboard/MeetingCalender";
import CompanyPolicy from "../components/dashboard/hrmSystem/CompanyPolicy";
import DocumentSetup from "../components/dashboard/hrmSystem/DocumentSetup";
import EmployeesAssetSetup from "../components/dashboard/hrmSystem/EmployeesAssetSetup";
import EventSetup from "../components/dashboard/hrmSystem/EventSetup";
import EmployeeLeave from "../components/dashboard/hrmSystem/ManageLeaveSetup/EmployeeLeave";
import ManageMeeting from "../components/dashboard/hrmSystem/ManageMeeting";
import Appraisal from "../components/dashboard/hrmSystem/PerformanceSetup/Appraisal";
import GoalTracking from "../components/dashboard/hrmSystem/PerformanceSetup/GoalTracking";
import ManageIndicator from "../components/dashboard/hrmSystem/PerformanceSetup/ManageIndicator";
import Application from "../components/dashboard/hrmSystem/RecruitmentSetup/Application";
import Candidates from "../components/dashboard/hrmSystem/RecruitmentSetup/Candidates";
import CreateJob from "../components/dashboard/hrmSystem/RecruitmentSetup/CreateJob";
import Jobs from "../components/dashboard/hrmSystem/RecruitmentSetup/Jobs";
import OnBoarding from "../components/dashboard/hrmSystem/RecruitmentSetup/OnBoarding";
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
import ManageTerminationType from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageTerminationType";
import ManageTrainingType from "../components/dashboard/hrmSystem/hrmSystemSetup/ManageTrainingType";
import Payslip from "../components/dashboard/hrmSystem/payrollSetup/payslip";
import SalaryDetails from "../components/dashboard/hrmSystem/payrollSetup/salaryDetails";
import SetSalary from "../components/dashboard/hrmSystem/payrollSetup/setSalary";
import AddContacts from "../components/dashboard/inventoryManagement/Contacts/AddContacts";
import Supplier from "../components/dashboard/inventoryManagement/Contacts/Supplier";
import Sale from "../components/dashboard/inventoryManagement/sales/Sale";
import SaleReturn from "../components/dashboard/inventoryManagement/sales/SaleReturn";
import SupportTicket from "../components/support-ticket/supportTicket";

import Customer from "../components/dashboard/inventoryManagement/Contacts/Customer";
import Settings from "../components/dashboard/inventoryManagement/Contacts/Settings";
import AddProduct from "../components/dashboard/inventoryManagement/Products/AddProduct/AddProduct";
import ComboProduct from "../components/dashboard/inventoryManagement/Products/ProductList/ComboProduct";
import Products from "../components/dashboard/inventoryManagement/Products/ProductList/Products";
import Service from "../components/dashboard/inventoryManagement/Products/Service/Service";

import UploadCSV from "../components/common/UploadCSV";
import LeaveApplication from "../components/dashboard/hrmSystem/ManageLeaveSetup/LeaveApplication";
import LeaveSetup from "../components/dashboard/hrmSystem/ManageLeaveSetup/LeaveSetup";
import Career from "../components/dashboard/hrmSystem/RecruitmentSetup/Career";
import CustomQuestion from "../components/dashboard/hrmSystem/RecruitmentSetup/CustomQuestion";
import InterviewSchedule from "../components/dashboard/hrmSystem/RecruitmentSetup/InterviewSchedule";
import EmployeeSummeryReport from "../components/dashboard/hrmSystem/Reports/EmployeeSummeryReport";
import DailyAttendanceReportPDf from "../components/dashboard/hrmSystem/Reports/DailyAttendnaceReport/DailyAttendanceReportPDf";
import DateWiseAttendanceReport from "../components/dashboard/hrmSystem/Reports/DateWiseAttendanceReport";
import DateWiseAttendanceReportPDf from "../components/dashboard/hrmSystem/Reports/DateWiseAttendnaceReport/DateWiseAttendanceReportPDf";
import EmployMovementReportPDf from "../components/dashboard/hrmSystem/Reports/EmployMovementReport/EmployMovementReportPDf";
import EmployWiseAttendanceReportPDf from "../components/dashboard/hrmSystem/Reports/EmployWiseAttendanceReport/EmployWiseAttendanceReportPDf";
import EmployeeMovement from "../components/dashboard/hrmSystem/Reports/EmployeeMovement";
import EmployeeWiseAttendanceReport from "../components/dashboard/hrmSystem/Reports/EmployeeWiseAttendanceReport";
import LeaveReport from "../components/dashboard/hrmSystem/Reports/LeaveReport";
import LeaveReportPDf from "../components/dashboard/hrmSystem/Reports/LeaveReport/LeaveReportPDf";
import ManualAttendanceReport from "../components/dashboard/hrmSystem/Reports/ManualAttendanceReport";
import ManualAttendanceReportPDf from "../components/dashboard/hrmSystem/Reports/ManualAttendanceReport/ManualAttendanceReportPDf";
import Attendance from "../components/dashboard/hrmSystem/attendance/Attendance";
import Shift from "../components/dashboard/hrmSystem/attendance/Shift";
import ShiftSchedule from "../components/dashboard/hrmSystem/attendance/ShiftSchedule";
import EditContact from "../components/dashboard/inventoryManagement/Contacts/EditContact";
import SupplierPurchaseProductList from "../components/dashboard/inventoryManagement/Contacts/SupplierPurchaseProductList";
import ViewContact from "../components/dashboard/inventoryManagement/Contacts/ViewContact";
import OpeningStock from "../components/dashboard/inventoryManagement/Inventory/OpeningStock";
import ProductCosting from "../components/dashboard/inventoryManagement/Inventory/ProductCosting";
import ProductInformation from "../components/dashboard/inventoryManagement/Inventory/ProductInformation";
import ProductMovement from "../components/dashboard/inventoryManagement/Inventory/ProductMovement";
import ReceiveYourProduct from "../components/dashboard/inventoryManagement/Inventory/ReceiveYourProduct";
import StockAdjustments from "../components/dashboard/inventoryManagement/Inventory/StockAdjustments";
import StockList from "../components/dashboard/inventoryManagement/Inventory/StockList";
import StockReport from "../components/dashboard/inventoryManagement/Inventory/StockReport";
import StockTransfer from "../components/dashboard/inventoryManagement/Inventory/StockTransfer";
import Branch from "../components/dashboard/inventoryManagement/Location/Branch";
import Warehouse from "../components/dashboard/inventoryManagement/Location/Warehouse";
import Brand from "../components/dashboard/inventoryManagement/Products/Brand/Brand";
import Category from "../components/dashboard/inventoryManagement/Products/Category/Category";
import Model from "../components/dashboard/inventoryManagement/Products/Model/Model";
import UnitType from "../components/dashboard/inventoryManagement/Products/UnitType/UnitType";
import Variant from "../components/dashboard/inventoryManagement/Products/Variant/Variant";
import DefaultTeam from "../components/dashboard/inventoryManagement/Project/DefaultTeam";
import AddPurchaseOrder from "../components/dashboard/inventoryManagement/Purchase/AddPurchaseOrder";
import CAndF from "../components/dashboard/inventoryManagement/Purchase/CAndF";
import CreatePurchaseReturn from "../components/dashboard/inventoryManagement/Purchase/CreatePurchaseReturn";
import PurchaseOrder from "../components/dashboard/inventoryManagement/Purchase/PurchaseOrder";
import PurchaseReturnList from "../components/dashboard/inventoryManagement/Purchase/PurchaseReturnList";
import StockAlertList from "../components/dashboard/inventoryManagement/Purchase/StockAlertList";
import Quotation from "../components/dashboard/inventoryManagement/Quotation/Quotation";
import MakeATransfer from "../components/dashboard/inventoryManagement/Transfer/MakeATransfer";
import TransferedLists from "../components/dashboard/inventoryManagement/Transfer/TransferedLists";
import AddSale from "../components/dashboard/inventoryManagement/sales/AddSale";
import Payment from "../components/dashboard/inventoryManagement/sales/Payment";
import SaleSelectOrderDetails from "../components/dashboard/inventoryManagement/sales/SaleSelectOrderDetails";
import SaleSelectReturn from "../components/dashboard/inventoryManagement/sales/SaleSelectReturn";
import SalesList from "../components/dashboard/inventoryManagement/sales/SalesList";
// Accounts
import AddExpense from "../components/dashboard/Accounts/AddExpense";
import AddIncome from "../components/dashboard/Accounts/AddIncome";
import BankAccounts from "../components/dashboard/Accounts/BankAccounts";
import ChartOfAccounts from "../components/dashboard/Accounts/ChartOfAccounts";
import ExpenseLists from "../components/dashboard/Accounts/ExpenseLists";
import IncomeLists from "../components/dashboard/Accounts/IncomeLists";
import OpeningBalance from "../components/dashboard/Accounts/OpeningBalance";
import AccountBalance from "../components/dashboard/Accounts/Report/AccountBalance";
import ExpenseBySupplier from "../components/dashboard/Accounts/Report/ExpenseBySupplier";
import IncomeByCustomer from "../components/dashboard/Accounts/Report/IncomeByCustomer";
import ProfitAndLoss from "../components/dashboard/Accounts/Report/ProfitAndLoss";
import SalesTax from "../components/dashboard/Accounts/Report/SalesTax";
import Statement from "../components/dashboard/Accounts/Report/Statement";
import Transactions from "../components/dashboard/Accounts/Report/Transactions";
import Organaization from "../components/dashboard/hrmSystem/companyInfo/Organaization";
import Company from "../components/dashboard/hrmSystem/companyInfo/Company";
import CompanyBranch from "../components/dashboard/hrmSystem/companyInfo/CompanyBranch";
import Department from "../components/dashboard/hrmSystem/companyInfo/Department";
import Designation from "../components/dashboard/hrmSystem/companyInfo/Designation";
import AddEmploySetup from "../components/dashboard/hrmSystem/addEmploySetup";
import LeaveApproval from "../components/dashboard/hrmSystem/ManageLeaveSetup/LeaveApproval";
import EmployeeShift from "../components/dashboard/hrmSystem/attendance/EmployeeShift";
import Section from "../components/dashboard/hrmSystem/companyInfo/Section";
import CompanyHoliday from "../components/dashboard/hrmSystem/companyInfo/CompanyHoliday";
import Weekday from "../components/dashboard/hrmSystem/companyInfo/Weekday";
import CompanyProject from "../components/dashboard/hrmSystem/companyInfo/CompanyProject";
import Role from "../components/dashboard/Role";
import MachineInfo from "../components/dashboard/hrmSystem/attendance/MachineInfo";
import CreateUser from "../components/dashboard/user/CreateUser";
import MaterialReactTableExample from "../components/common/component/material-react-table-example";
import DropdownTable from "../components/common/component/DropdownTable";
import DropdownTable2 from "../components/common/component/DropdownTable2";
import TreeViewExample from "../components/common/component/TreeViewExample";
import TreeViewExample2 from "../components/common/component/TreeViewExample2";
import Input from "../components/common/modal/Input";
import InputTest from "../components/common/component/InputTest";
import DropdownTable3 from "../components/common/component/DropdownTable3";
import MultipleImageUploader from "../components/common/component/imageUpload/MultipleImageUploader";

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
  ,

  //update sidebar from here
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/shift`,
    Component: <Shift />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/machine-info`,
    Component: <MachineInfo />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/attendance/manual`,
    Component: <ManualAttendance />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/attendance`,
    Component: <Attendance />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/shift/schedule`,
    Component: <ShiftSchedule />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/employee/shift/`,
    Component: <EmployeeShift />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/organization`,
    Component: <Organaization />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/company`,
    Component: <Company />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/branch`,
    Component: <CompanyBranch />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/department`,
    Component: <Department />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/designation`,
    Component: <Designation />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/section`,
    Component: <Section />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/holiday`,
    Component: <CompanyHoliday />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/weekday`,
    Component: <Weekday />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/project`,
    Component: <CompanyProject />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/salary`,
    Component: <SetSalary />,
  },


    //employee
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/employee`,
    Component: <EmployeSetup />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/employee/edit/:id`,
    Component: <EditEmploySetup />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/employee/add`,
    Component: <AddEmploySetup />,
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
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/leave-type`,
    Component: <LeaveType />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/leave-application`,
    Component: <LeaveApplication />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/leave-setup`,
    Component: <LeaveSetup />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/Employee-leave`,
    Component: <EmployeeLeave />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/Employee-leave/approval`,
    Component: <LeaveApproval />,
  },

  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/summary/report`,
    Component: <EmployeeSummeryReport />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/summary/report/pdf`,
    Component: <DailyAttendanceReportPDf />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/attendance/datewise`,
    Component: <DateWiseAttendanceReport />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/attendance/datewise/pdf`,
    Component: <DateWiseAttendanceReportPDf />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/employee/movements`,
    Component: <EmployeeMovement />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/employee/movements/pdf`,
    Component: <EmployMovementReportPDf />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/employee/leave`,
    Component: <LeaveReport />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/employee/leave/pdf`,
    Component: <LeaveReportPDf />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/attendance/manual/report`,
    Component: <ManualAttendanceReport />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/attendance/manual/report/pdf`,
    Component: <ManualAttendanceReportPDf />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/attendance/single`,
    Component: <EmployeeWiseAttendanceReport />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/attendance/single/pdf`,
    Component: <EmployWiseAttendanceReportPDf />,
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
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/jobs`,
    Component: <Jobs />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/jobs/create`,
    Component: <CreateJob />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/jobs/application`,
    Component: <Application />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/jobs/candidates`,
    Component: <Candidates />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/jobs/on-boarding`,
    Component: <OnBoarding />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/jobs/custom/question`,
    Component: <CustomQuestion />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/jobs/interview/schedule`,
    Component: <InterviewSchedule />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/recruitment/career`,
    Component: <Career />,
  },

  //hr admin setup
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/award`,
    Component: <Award />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/transfer`,
    Component: <Transfer />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/resignation`,
    Component: <Resignation />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/user/resignation`,
    Component: <CreateUser />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/table`,
    Component: <MaterialReactTableExample />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/dropdown`,
    Component: <DropdownTable />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/dropdown2`,
    Component: <DropdownTable2 />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/dropdown3`,
    Component: <DropdownTable3 />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/treeview`,
    Component: <TreeViewExample />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/treeview2`,
    Component: <TreeViewExample2 />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/input`,
    Component: <InputTest />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/image/uploader`,
    Component: <MultipleImageUploader />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/trip`,
    Component: <Trip />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/promotion`,
    Component: <Promotion />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/complaints`,
    Component: <Complaints />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/warning`,
    Component: <Warning />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/termination`,
    Component: <Termination />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/announcement`,
    Component: <Announcement />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/holiday`,
    Component: <Holiday />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/holiday-calender`,
    Component: <HolidayCalender />,
  },

  //hr admin setup
  {
    path: `${process.env.PUBLIC_URL}/dashboard/admin/event/setup`,
    Component: <EventSetup />,
  },

  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/hrm-system-setup/manage-branch`,
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
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/manage-meeting-calender`,
    Component: <MeetingCalender />,
  },

  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/employees-asset-setup`,
    Component: <EmployeesAssetSetup />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/document-setup`,
    Component: <DocumentSetup />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/roles`,
    Component: <Role />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/hrm/company-policy`,
    Component: <CompanyPolicy />,
  },

  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/default-team`,
    Component: <DefaultTeam />,
  },

  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/sale/sales`,
    Component: <Sale />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/sale/select-payment`,
    Component: <Payment />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/sale/select-return`,
    Component: <SaleSelectReturn />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/sale/select-order-details`,
    Component: <SaleSelectOrderDetails />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/sale/add-sale`,
    Component: <AddSale />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/sale/sales-list`,
    Component: <SalesList />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/sale/return`,
    Component: <SaleReturn />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/contacts/add-contacts/:product_type`,
    Component: <AddContacts />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/contacts/edit-contacts/:id`,
    Component: <EditContact />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/contacts/view-contacts/:id`,
    Component: <ViewContact />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/supplier/purchase-porduct-list/2`,
    Component: <SupplierPurchaseProductList />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/contacts/supplier`,
    Component: <Supplier />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/contacts/customer`,
    Component: <Customer />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/contacts/settings`,
    Component: <Settings />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/products`,
    Component: <Products />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/products`,
    Component: <ComboProduct />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/products/services`,
    Component: <Service />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/products/add-product`,
    Component: <AddProduct />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/products/category`,
    Component: <Category />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/products/brand`,
    Component: <Brand />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/products/model`,
    Component: <Model />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/products/unit-type`,
    Component: <UnitType />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/products/variant`,
    Component: <Variant />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/inventory/add-opening-stock`,
    Component: <OpeningStock />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/inventory/product-receive`,
    Component: <ReceiveYourProduct />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/inventory/product-costing`,
    Component: <ProductCosting />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/inventory/stock-transfer`,
    Component: <StockTransfer />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/inventory/stock-list`,
    Component: <StockList />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/inventory/stock-report`,
    Component: <StockReport />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/inventory/product-movement`,
    Component: <ProductMovement />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/inventory/stock-adjustment`,
    Component: <StockAdjustments />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/inventory/product-info`,
    Component: <ProductInformation />,
  },

  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/purchase/order`,
    Component: <PurchaseOrder />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/purchase/add-purchase-order`,
    Component: <AddPurchaseOrder />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/purchase/purchase-return/list`,
    Component: <CreatePurchaseReturn />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/purchase/stock-alert-list`,
    Component: <StockAlertList />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/purchase/return-list`,
    Component: <PurchaseReturnList />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/purchase/c&f`,
    Component: <CAndF />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/quotation`,
    Component: <Quotation />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/transfer/make-transfer`,
    Component: <MakeATransfer />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/transfer/transfered-list`,
    Component: <TransferedLists />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/location/branch`,
    Component: <Branch />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/inventory-management/location/warehouse`,
    Component: <Warehouse />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/csv/upload`,
    Component: <UploadCSV />,
  },
  // Accounts
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/add-expense`,
    Component: <AddExpense />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/expense-lists`,
    Component: <ExpenseLists />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/income-lists`,
    Component: <IncomeLists />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/add-income`,
    Component: <AddIncome />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/bank-accounts`,
    Component: <BankAccounts />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/opening-balance`,
    Component: <OpeningBalance />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/chart-of-accounts`,
    Component: <ChartOfAccounts />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/report/transactions`,
    Component: <Transactions />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/report/statement`,
    Component: <Statement />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/report/profit-loss`,
    Component: <ProfitAndLoss />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/report/account-balance`,
    Component: <AccountBalance />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/report/income-by-customer`,
    Component: <IncomeByCustomer />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/report/expense-by-supplier`,
    Component: <ExpenseBySupplier />,
  },
  {
    path: `${process.env.PUBLIC_URL}/dashboard/accounts/report/sales-tax`,
    Component: <SalesTax />,
  },
];
