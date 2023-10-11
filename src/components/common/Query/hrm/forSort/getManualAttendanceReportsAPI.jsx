import axios from "../../../../../axios";

const getManualAttendanceReportsAPI = () => {
    return axios.get(`/hrm-system/reports/manual/attendance`);
}

export default getManualAttendanceReportsAPI;