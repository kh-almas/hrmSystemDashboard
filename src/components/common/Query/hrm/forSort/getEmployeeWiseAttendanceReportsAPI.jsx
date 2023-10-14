import axios from "../../../../../axios";

const getEmployeeWiseAttendanceReportsAPI = (selectedEmployee = '', dateFrom = "", dateTo = "") => {
    // const url =`/hrm-system/reports/date-wise/attendance?startdate=${dateFrom}&enddate=${dateTo}&setcompany=${selectedCompany}&setbranch=${selectedBranch}`
    // console.log(url);
    return axios.get(`/hrm-system/reports/employee-wise/attendance/report?startdate=${dateFrom}&enddate=${dateTo}&employee=${selectedEmployee}`);
}

export default getEmployeeWiseAttendanceReportsAPI;