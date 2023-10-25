import axios from "../../../../../axios";

const getDailyAttendanceReportsAPI = (selectedCompany = '', selectedBranch =  '', dateFrom = "", dateTo = "", selectedDepartment = "") => {
    return axios.get(`/hrm-system/reports/date-wise/attendance?startdate=${dateFrom}&enddate=${dateTo}&setcompany=${selectedCompany}&setbranch=${selectedBranch}&setdepartment=${selectedDepartment}`);
}

export default getDailyAttendanceReportsAPI;