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
          { title: "Attendance", type: "link", path: "/dashboard/hrm/manage-attendance" },
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
          { title: "Appraisal", type: "link", path: "/dashboard/hrm/manage-appraisal" },
          { title: "Goal Tracking", type: "link", path: "/dashboard/hrm/goal-tracking" },
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
          { title: "Trainer", type: "link", path: "/dashboard/hrm/manage-trainer" },
        ],
      },
      {
        title: "Recruitment Setup",
        type: "sub",
        children: [
          { title: "Jobs", type: "link", path: "/dashboard/hrm/recruitment-jobs" },
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
            path: "/dashboard/admin/award"
          },
          {
            title: "Transfer",
            type: "link",
            path: "/dashboard/admin/transfer"
          },
          {
            title: "Resignation",
            type: "link",
            path: "/dashboard/admin/resignation"
          },
          {
            title: "Trip",
            type: "link",
            path: "/dashboard/admin/trip"
          },
          {
            title: "Promotion",
            type: "link",
            path: "/dashboard/admin/promotion"
          },
          {
            title: "Complaints",
            type: "link",
            path: "/dashboard/admin/complaints"
          },
          {
            title: "Warning",
            type: "link",
            path: "/dashboard/admin/warning"
          },
          {
            title: "Termination",
            type: "link",
            path: "/dashboard/admin/termination"
          },
          {
            title: "Announcement",
            type: "link",
            path: "/dashboard/admin/announcement"
          },
          {
            title: "Holidays",
            type: "link",
            path: "/dashboard/admin/holiday"
          },
        ],
      },
      {
        path: "/base/dropdownComponent",
        title: "Event Setup",
        type: "link",
      },
      {
        path: "/base/dropdownComponent",
        title: "Meeting",
        type: "link",
      },
      {
        path: "/base/dropdownComponent",
        title: "Employees Asset Setup ",
        type: "link",
      },
      {
        path: "/base/dropdownComponent",
        title: "Document Setup",
        type: "link",
      },
      {
        path: "/base/dropdownComponent",
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
    path: "http://support.pixelstrap.com/help-center",
    title: "Raise Support",
    icon: Headphones,
    type: "exteral_link",
    active: false,
  },
];
