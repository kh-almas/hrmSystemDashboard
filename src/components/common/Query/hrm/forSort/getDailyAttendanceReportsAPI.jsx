import axios from "../../../../../axios";

const getDailyAttendanceReportsAPI = (selectedCompany = '', selectedBranch =  '', dateFrom = "", dateTo = "") => {
    return axios.get(`/hrm-system/reports/date-wise/attendance?startdate=${dateFrom}&enddate=${dateTo}&setcompany=${selectedCompany}&setbranch=${selectedBranch}`);
}

export default getDailyAttendanceReportsAPI;