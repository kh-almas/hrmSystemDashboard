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
            path: "/dashboard/hrm/jobs",
          },
          {
            title: "Job Create",
            type: "link",
            path: "/dashboard/hrm/jobs/create",
          },
          {
            title: "Job Application",
            type: "link",
            path: "/dashboard/hrm/jobs/application",
          },
          {
            title: "Job Candidate",
            type: "link",
            path: "/dashboard/hrm/jobs/candidates",
          },
          {
            title: "Job On-boarding",
            type: "link",
            path: "/dashboard/hrm/jobs/on-boarding",
          },
          {
            title: "Custom Question",
            type: "link",
            path: "/dashboard/hrm/jobs/custom/question",
          },
          {
            title: "Interview Schedule",
            type: "link",
            path: "/dashboard/hrm/jobs/interview/schedule",
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
            path: "/dashboard/hrm/sale",
          },
          {
            title: "Sale Return",
            type: "link",
            path: "/dashboard/hrm/sale-return",
          },
        ],
      },
      {
        title: "Contacts",
        type: "sub",
        children: [
          {
            title: "Add Contacts ",
            type: "link",
            path: "/dashboard/hrm/add-contacts",
          },
          {
            title: "Supplier",
            type: "link",
            path: "/dashboard/hrm/supplier",
          },
          {
            title: "Customer",
            type: "link",
            path: "/dashboard/hrm/customer",
          },
          {
            title: "Settings",
            type: "link",
            path: "/dashboard/hrm/settings",
          },
        ],
      },
      {
        title: "Products",
        type: "sub",
        children: [
          {
            title: "Product List",
            type: "link",
            path: "/dashboard/hrm/products",
          },
          {
            title: "Service",
            type: "link",
            path: "dashboard/hrm/services",
          },
          {
            title: "Add Product",
            type: "link",
            path: "/dashboard/hrm/add-product",
          },
          {
            title: "Category",
            type: "link",
            path: "/dashboard/hrm/category",
          },
          {
            title: "Brand",
            type: "link",
            path: "/dashboard/hrm/brand",
          },
          {
            title: "Model",
            type: "link",
            path: "/dashboard/hrm/model",
          },
          {
            title: "Unit Type",
            type: "link",
            path: "/dashboard/hrm/unit-type",
          },
          {
            title: "Variant",
            type: "link",
            path: "/dashboard/hrm/variant",
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
            path: "/dashboard/hrm/inventory/stock",
          },
          {
            title: "Receive Your Product",
            type: "link",
            path: "/dashboard/hrm/inventory/product/receive",
          },
          {
            title: "Product Costing(Sales)",
            type: "link",
            path: "/dashboard/hrm/inventory/product-costing",
          },
          {
            title: "Stock Transfer",
            type: "link",
            path: "/dashboard/hrm/inventory/stock-transfer",
          },
          {
            title: "Stock List",
            type: "link",
            path: "/dashboard/hrm/inventory/stock-list",
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
          {
            title: "Stock Adjustment",
            type: "link",
            path: "/base/tabs/tab-line",
          },
          { title: "Product Info", type: "link", path: "/base/tabs/tab-line" },
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
            path: "/dashboard/hrm/purchase/purchase_order",
          },
          {
            title: "Stock Alert List",
            type: "link",
            path: "/dashboard/hrm/purchase/stock-alert-list",
          },
          {
            title: "Purchase Return List",
            type: "link",
            path: "/dashboard/hrm/purchase/purchase-return-list",
          },
          {
            title: "C&F",
            type: "link",
            path: "/dashboard/hrm/purchase/c&f",
          },
        ],
      },

      {
        path: "/hrm/dashboard/quotation",
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
            path: "/dashboard/admin/make-a-transfer",
          },
          {
            title: "Transfered Lists",
            type: "link",
            path: "/dashboard/admin/transfered-lists",
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
            path: "/dashboard/location/branch",
          },
          {
            title: "Warehouse",
            type: "link",
            path: "/dashboard/location/warehouse",
          },
        ],
      },
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
