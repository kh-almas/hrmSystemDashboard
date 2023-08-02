import { Box, Headphones, Home } from "react-feather";

export const MENUITEMS = [
  {
    title: "Dashboard",
    icon: Home,
    type: "sub",
    badgeType: "primary",
    active: false,
    children: [{ path: "/dashboard/default", title: "Default", type: "link" }],
  },
  {
    title: "HRM System",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      {
        path: "/dashboard/hrm/employee",
        title: "Employee Setup ",
        type: "link",
      },
      {
        title: "Payroll Setup",
        type: "sub",
        children: [
          {
            title: "Set salary",
            type: "link",
            path: "/dashboard/hrm/salary",
          },
          { title: "Payslip", type: "link", path: "/dashboard/hrm/payslip" },
        ],
      },
      {
        title: "Leave Management Setup",
        type: "sub",
        children: [
          {
            title: "Manage Leave",
            type: "link",
            path: "/dashboard/hrm/manage-leave",
          },
          {
            title: "Attendance",
            type: "link",
            path: "/dashboard/hrm/manage-attendance",
          },
        ],
      },
      {
        title: "Performance Setup",
        type: "sub",
        children: [
          {
            title: "Indicator",
            type: "link",
            path: "/dashboard/hrm/manage-indicator",
          },
          {
            title: "Appraisal",
            type: "link",
            path: "/dashboard/hrm/manage-appraisal",
          },
          {
            title: "Goal Tracking",
            type: "link",
            path: "/dashboard/hrm/goal-tracking",
          },
        ],
      },
      {
        title: "Training Setup",
        type: "sub",
        children: [
          {
            title: "Training List",
            type: "link",
            path: "/dashboard/hrm/manage-training",
          },
          {
            title: "Trainer",
            type: "link",
            path: "/dashboard/hrm/manage-trainer",
          },
        ],
      },
      //Recruitment Setup
      {
        title: "Recruitment Setup",
        type: "sub",
        children: [
          {
            title: "Jobs",
            type: "link",
            path: "/dashboard/hrm/recruitment-jobs",
          },
          { title: "Job Create", type: "link", path: "/base/tabs/tab-line" },
          {
            title: "Job Application",
            type: "link",
            path: "/base/tabs/tab-line",
          },
          { title: "Job Candidate", type: "link", path: "/base/tabs/tab-line" },
          {
            title: "Job On-boarding",
            type: "link",
            path: "/base/tabs/tab-line",
          },
          {
            title: "Custom Question",
            type: "link",
            path: "/base/tabs/tab-line",
          },
          {
            title: "Interview Schedule",
            type: "link",
            path: "/base/tabs/tab-line",
          },
          { title: "Career", type: "link", path: "/base/tabs/tab-line" },
        ],
      },
      {
        title: "HR Admin Setup",
        type: "sub",
        children: [
          {
            title: "Award",
            type: "link",
            path: "/dashboard/admin/award",
          },
          {
            title: "Transfer",
            type: "link",
            path: "/dashboard/admin/transfer",
          },
          {
            title: "Resignation",
            type: "link",
            path: "/dashboard/admin/resignation",
          },
          {
            title: "Trip",
            type: "link",
            path: "/dashboard/admin/trip",
          },
          {
            title: "Promotion",
            type: "link",
            path: "/dashboard/admin/promotion",
          },
          {
            title: "Complaints",
            type: "link",
            path: "/dashboard/admin/complaints",
          },
          {
            title: "Warning",
            type: "link",
            path: "/dashboard/admin/warning",
          },
          {
            title: "Termination",
            type: "link",
            path: "/dashboard/admin/termination",
          },
          {
            title: "Announcement",
            type: "link",
            path: "/dashboard/admin/announcement",
          },
          {
            title: "Holidays",
            type: "link",
            path: "/dashboard/admin/holiday",
          },
        ],
      },
      {
        path: "/dashboard/admin/event/setup",
        title: "Event Setup",
        type: "link",
      },
      {
        path: "/hrm/dashboard/manage-meeting",
        title: "Meeting",
        type: "link",
      },
      {
        path: "/hrm/dashboard/employees-asset-setup",
        title: "Employees Asset Setup ",
        type: "link",
      },
      {
        path: "/hrm/dashboard/document-setup",
        title: "Document Setup",
        type: "link",
      },
      {
        path: "/hrm/dashboard/company-policy",
        title: "Company policy",
        type: "link",
      },
      {
        path: "/hrm/dashboard/manage-branch",
        title: "HRM System Setup",
        type: "link",
      },
    ],
  },
  {
    title: "Inventory Management",
    icon: Box,
    type: "sub",
    active: false,
    children: [           
      {
        title: "Project",
        type: "sub",
        children: [
          {
            title: "Default Team",
            type: "link",
            path: "/dashboard/hrm/salary",
          }          
        ],
      },
      {
        title: "Sale",
        type: "sub",
        children: [
          {
            title: "Sale",
            type: "link",
            path: "/dashboard/hrm/sale",
          },
          { title: "Sale Return", type: "link", path: "/dashboard/hrm/sale-return" },
        ],
      },
      {
        title: "Contacts",
        type: "sub",
        children: [
          {
            title: "Add Contacts ",
            type: "link",
            path: "/dashboard/hrm/manage-indicator",
          },
          { title: "Supplier", type: "link", path: "/dashboard/hrm/manage-appraisal" },
          { title: "Customer", type: "link", path: "/dashboard/hrm/goal-tracking" },
          { title: "Settings", type: "link", path: "/dashboard/hrm/goal-tracking" },
        ],
      },
      {
        title: "Products",
        type: "sub",
        children: [
          {
            title: "Product List",
            type: "link",
            path: "/dashboard/hrm/manage-training",
          },
          { title: "Service", type: "link", path: "/dashboard/hrm/manage-trainer" },
          { title: "Add Product", type: "link", path: "/dashboard/hrm/manage-trainer" },
          { title: "Category", type: "link", path: "/dashboard/hrm/manage-trainer" },
          { title: "Brand", type: "link", path: "/dashboard/hrm/manage-trainer" },
          { title: "Model", type: "link", path: "/dashboard/hrm/manage-trainer" },
          { title: "Unit Type", type: "link", path: "/dashboard/hrm/manage-trainer" },
          { title: "Variant", type: "link", path: "/dashboard/hrm/manage-trainer" }
        ],
      },
      {
        title: "Inventory",
        type: "sub",
        children: [
          { title: "Add Opening Stock", type: "link", path: "/dashboard/hrm/recruitment-jobs" },
          { title: "Recieve Your Product", type: "link", path: "/base/tabs/tab-line" },
          {
            title: "Product Costing(Sales)",
            type: "link",
            path: "/base/tabs/tab-line",
          },
          { title: "Stock Transfer", type: "link", path: "/base/tabs/tab-line" },
          {
            title: "Stock List",
            type: "link",
            path: "/base/tabs/tab-line",
          },
          {
            title: "Stock Report",
            type: "link",
            path: "/base/tabs/tab-line",
          },
          {
            title: "Product Movement",
            type: "link",
            path: "/base/tabs/tab-line",
          },
          { title: "Stock Adjustment", type: "link", path: "/base/tabs/tab-line" },
          { title: "Product Info", type: "link", path: "/base/tabs/tab-line" },
        ],
      },
      {
        title: "Purchase",
        type: "sub",
        children: [
          {
            title: "Purchase Order",
            type: "link",
            path: "/dashboard/admin/award"
          },
          {
            title: "Stock Alert List",
            type: "link",
            path: "/dashboard/admin/transfer"
          },
          {
            title: "Purchase Return List",
            type: "link",
            path: "/dashboard/admin/resignation"
          },
          {
            title: "C&F",
            type: "link",
            path: "/dashboard/admin/trip"
          }
        ],
      },
      {
        path: "/hrm/dashboard/manage-branch",
        title: "Quotation",
        type: "link",
      },
      {
        title: "Transfer",
        type: "sub",
        children: [
          {
            title: "Make A Transfer",
            type: "link",
            path: "/dashboard/admin/award"
          },
          {
            title: "Transfered Lists",
            type: "link",
            path: "/dashboard/admin/transfer"
          }
        ],
      },
      {
        title: "Location",
        type: "sub",
        children: [
          {
            title: "Branch",
            type: "link",
            path: "/dashboard/admin/award"
          },
          {
            title: "Warehouse",
            type: "link",
            path: "/dashboard/admin/transfer"
          }
        ],
      }
    ],
  },



  {
    path: "http://support.pixelstrap.com/help-center",
    title: "Raise Support",
    icon: Headphones,
    type: "exteral_link",
    active: false,
  },
];