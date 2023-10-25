import axios from "../../../../../axios";

const getEmployeeMovementReportsAPI = (selectedEmployee = '', dateFrom = "", dateTo = "") => {
    // const url =`/hrm-system/reports/date-wise/attendance?startdate=${dateFrom}&enddate=${dateTo}&setcompany=${selectedCompany}&setbranch=${selectedBranch}`
    // console.log(url);
    return axios.get(`/hrm-system/reports/employee-movement/report?startdate=${dateFrom}&enddate=${dateTo}&employee=${selectedEmployee}`);
}

export default getEmployeeMovementReportsAPI;