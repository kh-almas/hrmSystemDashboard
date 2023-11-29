import { Box, Headphones, Home } from "react-feather";

export const MENUITEMS = [
  // {
  //   title: "Dashboard",
  //   icon: Home,
  //   type: "sub",
  //   badgeType: "primary",
  //   active: false,
  //   children: [{ path: "/dashboard/default", title: "Default", type: "link" }],
  // },
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
        title: "Attendance",
        type: "sub",
        children: [
          {
            title: "Shift",
            type: "link",
            path: "/dashboard/hrm/shift",
          },
          {
            title: "Machine Info",
            type: "link",
            path: "/dashboard/hrm/machine-info",
          },
          {
            title: "Manual Attendance",
            type: "link",
            path: "/dashboard/hrm/attendance/manual",
          },
          {
            title: "Shift Schedule",
            type: "link",
            path: "/dashboard/hrm/shift/schedule",
          },
          // {
          //   title: "employee Shift",
          //   type: "link",
          //   path: "/dashboard/hrm/employee/shift/",
          // },
          {
            title: "Attendance",
            type: "link",
            path: "/dashboard/hrm/attendance",
          },
        ],
      },
        //company info
      {
        title: "Company Information",
        type: "sub",
        children: [
          {
            title: "Organization",
            type: "link",
            path: "/dashboard/hrm/organization",
          },
          {
            title: "Company",
            type: "link",
            path: "/dashboard/hrm/company",
          },
          {
            title: "Branch",
            type: "link",
            path: "/dashboard/hrm/branch",
          },
          {
            title: "Department",
            type: "link",
            path: "/dashboard/hrm/department",
          },
          {
            title: "Designation",
            type: "link",
            path: "/dashboard/hrm/designation",
          },
          {
            title: "Section",
            type: "link",
            path: "/dashboard/hrm/section",
          },
          {
            title: "Holiday",
            type: "link",
            path: "/dashboard/hrm/holiday",
          },
          {
            title: "Weekday",
            type: "link",
            path: "/dashboard/hrm/weekday",
          },
          // {
          //   title: "Project",
          //   type: "link",
          //   path: "/dashboard/hrm/project",
          // },
        ],
      },
      // {
      //   title: "Payroll Setup",
      //   type: "sub",
      //   children: [
      //     {
      //       title: "Set salary",
      //       type: "link",
      //       path: "/dashboard/hrm/salary",
      //     },
      //     { title: "Payslip", type: "link", path: "/dashboard/hrm/payslip" },
      //   ],
      // },
      // {
      //   title: "Leave Management Setup",
      //   type: "sub",
      //   children: [
      //     {
      //       title: "Leave Type",
      //       type: "link",
      //       path: "/dashboard/hrm/leave-type",
      //     },
      //     {
      //       title: "Application",
      //       type: "link",
      //       path: "/dashboard/hrm/leave-application",
      //     },
      //     {
      //       title: "Leave Setup",
      //       type: "link",
      //       path: "/dashboard/hrm/leave-setup",
      //     },
      //     {
      //       title: "Employee Leave",
      //       type: "link",
      //       path: "/dashboard/hrm/Employee-leave",
      //     },
      //     {
      //       title: "Leave Approval",
      //       type: "link",
      //       path: "/dashboard/hrm/Employee-leave/approval",
      //     },
      //   ],
      // },
      {
        title: "Reports",
        type: "sub",
        children: [
          {
            title: "Date wise Attendance",
            type: "link",
            path: "/dashboard/hrm/attendance/datewise",
          },
          {
            title: "Employee Movements",
            type: "link",
            path: "/dashboard/hrm/employee/movements",
          },
          // {
          //   title: "Leave",
          //   type: "link",
          //   path: "/dashboard/hrm/employee/leave",
          // },
          // {
          //   title: "Manual Attendance",
          //   type: "link",
          //   path: "/dashboard/hrm/attendance/manual/report",
          // },
          {
            title: "Employee wise Attendance",
            type: "link",
            path: "/dashboard/hrm/attendance/single",
          },
          {
            title: "Employee Summary Report",
            type: "link",
            path: "/dashboard/hrm/summary/report",
          },
        ],
      },
      {
        title: "User Registration",
        type: "link",
        path: "/dashboard/user/resignation",
      },
      {
        title: "Table",
        type: "link",
        path: "/dashboard/table",
      },
      {
        title: "Dropdown",
        type: "link",
        path: "/dashboard/dropdown",
      },
      {
        title: "Dropdown2",
        type: "link",
        path: "/dashboard/dropdown2",
      },
      {
        title: "Dropdown3",
        type: "link",
        path: "/dashboard/dropdown3",
      },
      {
        title: "Tree view",
        type: "link",
        path: "/dashboard/treeview",
      },
      {
        title: "Tree view2",
        type: "link",
        path: "/dashboard/treeview2",
      },
      {
        title: "input",
        type: "link",
        path: "/dashboard/input",
      },
      {
        title: "Image Uploader",
        type: "link",
        path: "/dashboard/image/uploader",
      },
      // {
      //   title: "Performance Setup",
      //   type: "sub",
      //   children: [
      //     {
      //       title: "Indicator",
      //       type: "link",
      //       path: "/dashboard/hrm/manage-indicator",
      //     },
      //     {
      //       title: "Appraisal",
      //       type: "link",
      //       path: "/dashboard/hrm/manage-appraisal",
      //     },
      //     {
      //       title: "Goal Tracking",
      //       type: "link",
      //       path: "/dashboard/hrm/goal-tracking",
      //     },
      //   ],
      // },
      // {
      //   title: "Training Setup",
      //   type: "sub",
      //   children: [
      //     {
      //       title: "Training List",
      //       type: "link",
      //       path: "/dashboard/hrm/manage-training",
      //     },
      //     {
      //       title: "Trainer",
      //       type: "link",
      //       path: "/dashboard/hrm/manage-trainer",
      //     },
      //   ],
      // },
      // //Recruitment Setup
      // {
      //   title: "Recruitment Setup",
      //   type: "sub",
      //   children: [
      //     {
      //       title: "Jobs",
      //       type: "link",
      //       path: "/dashboard/hrm/jobs",
      //     },
      //     {
      //       title: "Job Create",
      //       type: "link",
      //       path: "/dashboard/hrm/jobs/create",
      //     },
      //     {
      //       title: "Job Application",
      //       type: "link",
      //       path: "/dashboard/hrm/jobs/application",
      //     },
      //     {
      //       title: "Job Candidate",
      //       type: "link",
      //       path: "/dashboard/hrm/jobs/candidates",
      //     },
      //     {
      //       title: "Job On-boarding",
      //       type: "link",
      //       path: "/dashboard/hrm/jobs/on-boarding",
      //     },
      //     {
      //       title: "Custom Question",
      //       type: "link",
      //       path: "/dashboard/hrm/jobs/custom/question",
      //     },
      //     {
      //       title: "Interview Schedule",
      //       type: "link",
      //       path: "/dashboard/hrm/jobs/interview/schedule",
      //     },
      //     {
      //       title: "Career",
      //       type: "link",
      //       path: "dashboard/hrm/recruitment/career",
      //     },
      //   ],
      // },
      // {
      //   title: "HR Admin Setup",
      //   type: "sub",
      //   children: [
      //     {
      //       title: "Award",
      //       type: "link",
      //       path: "/dashboard/admin/award",
      //     },
      //     {
      //       title: "Transfer",
      //       type: "link",
      //       path: "/dashboard/admin/transfer",
      //     },
      //     {
      //       title: "Resignation",
      //       type: "link",
      //       path: "/dashboard/admin/resignation",
      //     },
      //     {
      //       title: "Trip",
      //       type: "link",
      //       path: "/dashboard/admin/trip",
      //     },
      //     {
      //       title: "Promotion",
      //       type: "link",
      //       path: "/dashboard/admin/promotion",
      //     },
      //     {
      //       title: "Complaints",
      //       type: "link",
      //       path: "/dashboard/admin/complaints",
      //     },
      //     {
      //       title: "Warning",
      //       type: "link",
      //       path: "/dashboard/admin/warning",
      //     },
      //     {
      //       title: "Termination",
      //       type: "link",
      //       path: "/dashboard/admin/termination",
      //     },
      //     {
      //       title: "Announcement",
      //       type: "link",
      //       path: "/dashboard/admin/announcement",
      //     },
      //     {
      //       title: "Holidays",
      //       type: "link",
      //       path: "/dashboard/admin/holiday",
      //     },
      //   ],
      // },
      // {
      //   path: "/dashboard/admin/event/setup",
      //   title: "Event Setup",
      //   type: "link",
      // },
      // {
      //   path: "/dashboard/hrm/manage-meeting-calender",
      //   title: "Meeting",
      //   type: "link",
      // },
      // {
      //   path: "/dashboard/hrm/employees-asset-setup",
      //   title: "Employees Asset Setup ",
      //   type: "link",
      // },
      // {
      //   path: "/dashboard/hrm/document-setup",
      //   title: "Document Setup",
      //   type: "link",
      // },
      // {
      //   path: "/dashboard/hrm/roles",
      //   title: "Roles",
      //   type: "link",
      // },
      // {
      //   path: "/dashboard/hrm/company-policy",
      //   title: "Company policy",
      //   type: "link",
      // },
      // {
      //   path: "/dashboard/hrm/hrm-system-setup/manage-branch",
      //   title: "HRM System Setup",
      //   type: "link",
      // },
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
            path: "/dashboard/inventory-management/default-team",
          },
        ],
      },
      {
        title: "Sale",
        type: "sub",
        children: [
          {
            title: "Sale",
            type: "link",
            path: "/dashboard/inventory-management/sale/sales",
          },
          {
            title: "Sale Return",
            type: "link",
            path: "/dashboard/inventory-management/sale/return",
          },
        ],
      },
      {
        title: "Contacts",
        type: "sub",
        children: [
          {
            title: "Supplier",
            type: "link",
            path: "/dashboard/inventory-management/contacts/supplier",
          },
          {
            title: "Customer",
            type: "link",
            path: "/dashboard/inventory-management/contacts/customer",
          },
          {
            title: "Settings",
            type: "link",
            path: "/dashboard/inventory-management/contacts/settings",
          },
        ],
      },

      //products
      {
        title: "Products",
        type: "sub",
        children: [
          {
            title: "Product List",
            type: "link",
            path: "/dashboard/inventory-management/products",
          },
          {
            title: "Service",
            type: "link",
            path: "/dashboard/inventory-management/products/services",
          },
          {
            title: "Add Product",
            type: "link",
            path: "/dashboard/inventory-management/products/add-product",
          },
          {
            title: "Category",
            type: "link",
            path: "/dashboard/inventory-management/products/category",
          },
          {
            title: "Brand",
            type: "link",
            path: "/dashboard/inventory-management/products/brand",
          },
          {
            title: "Model",
            type: "link",
            path: "/dashboard/inventory-management/products/model",
          },
          {
            title: "Unit Type",
            type: "link",
            path: "/dashboard/inventory-management/products/unit-type",
          },
          {
            title: "Variant",
            type: "link",
            path: "/dashboard/inventory-management/products/variant",
          },
        ],
      },
      //inventory
      {
        title: "Inventory",
        type: "sub",
        children: [
          {
            title: "Add Opening Stock",
            type: "link",
            path: "/dashboard/inventory-management/inventory/add-opening-stock",
          },
          {
            title: "Receive Your Product",
            type: "link",
            path: "/dashboard/inventory-management/inventory/product-receive",
          },
          {
            title: "Product Costing(Sales)",
            type: "link",
            path: "/dashboard/inventory-management/inventory/product-costing",
          },
          {
            title: "Stock Transfer",
            type: "link",
            path: "/dashboard/inventory-management/inventory/stock-transfer",
          },
          {
            title: "Stock List",
            type: "link",
            path: "/dashboard/inventory-management/inventory/stock-list",
          },
          {
            title: "Stock Report",
            type: "link",
            path: "/dashboard/inventory-management/inventory/stock-report",
          },
          {
            title: "Product Movement",
            type: "link",
            path: "/dashboard/inventory-management/inventory/product-movement",
          },
          {
            title: "Stock Adjustment",
            type: "link",
            path: "/dashboard/inventory-management/inventory/stock-adjustment",
          },
          {
            title: "Product Info",
            type: "link",
            path: "/dashboard/inventory-management/inventory/product-info",
          },
        ],
      },

      //Purchase
      {
        title: "Purchase",
        type: "sub",
        children: [
          {
            title: "Purchase Order",
            type: "link",
            path: "/dashboard/inventory-management/purchase/order",
          },
          {
            title: "Stock Alert List",
            type: "link",
            path: "/dashboard/inventory-management/purchase/stock-alert-list",
          },
          {
            title: "Purchase Return List",
            type: "link",
            path: "/dashboard/inventory-management/purchase/return-list",
          },
          {
            title: "C&F",
            type: "link",
            path: "/dashboard/inventory-management/purchase/c&f",
          },
        ],
      },

      {
        path: "/dashboard/inventory-management/quotation",
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
            path: "/dashboard/inventory-management/transfer/make-transfer",
          },
          {
            title: "Transfered Lists",
            type: "link",
            path: "/dashboard/inventory-management/transfer/transfered-list",
          },
        ],
      },

      {
        title: "Location",
        type: "sub",
        children: [
          {
            title: "Branch",
            type: "link",
            path: "/dashboard/inventory-management/location/branch",
          },
          {
            title: "Warehouse",
            type: "link",
            path: "/dashboard/inventory-management/location/warehouse",
          },
        ],
      },
    ],
  },
  //
  // {
  //   title: "Accounts",
  //   icon: Box,
  //   type: "sub",
  //   active: false,
  //   children: [
  //
  //     {
  //       title: "Expense Lists",
  //       type: "link",
  //       path: "/dashboard/accounts/expense-lists",
  //     },
  //     {
  //       title: "Income Lists",
  //       type: "link",
  //       path: "/dashboard/accounts/income-lists",
  //     },
  //     {
  //       title: "Bank Accounts",
  //       type: "link",
  //       path: "/dashboard/accounts/bank-accounts",
  //     },
  //     {
  //       title: "Opening Balance",
  //       type: "link",
  //       path: "/dashboard/accounts/opening-balance",
  //     },
  //     {
  //       title: "Chart Of Accounts",
  //       type: "link",
  //       path: "/dashboard/accounts/chart-of-accounts",
  //     },
  //     {
  //       title: "Report",
  //       type: "sub",
  //       children: [
  //         {
  //           title: "Transactions",
  //           type: "link",
  //           path: "/dashboard/accounts/report/transactions",
  //         },
  //         {
  //           title: "Statement",
  //           type: "link",
  //           path: "/dashboard/accounts/report/statement",
  //         },
  //         {
  //           title: "Profit & Loss",
  //           type: "link",
  //           path: "/dashboard/accounts/report/profit-loss",
  //         },
  //         {
  //           title: "Account Balance",
  //           type: "link",
  //           path: "/dashboard/accounts/report/account-balance",
  //         },
  //         {
  //           title: "Income By Customer",
  //           type: "link",
  //           path: "/dashboard/accounts/report/income-by-customer",
  //         },
  //         {
  //           title: "Expense By Supplier",
  //           type: "link",
  //           path: "/dashboard/accounts/report/expense-by-supplier",
  //         },
  //         {
  //           title: "Sales Tax",
  //           type: "link",
  //           path: "/dashboard/accounts/report/sales-tax",
  //         },
  //       ],
  //     }
  //   ],
  // },
  //
  // {
  //   path: "http://support.pixelstrap.com/help-center",
  //   title: "Raise Support",
  //   icon: Headphones,
  //   type: "exteral_link",
  //   active: false,
  // },
];
