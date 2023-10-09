import axios from "../../../../../axios";

const getShiftScheduleAPI = (page = '', item= '', searchData = '') => {
    // const searchData = SearchData ? `%${SearchData}%` : '';
    // console.log(page, item, searchData);
    return axios.get(`/hrm-system/shift-schedule/?page=${page}&item=${item}&search=${searchData}`);
}

export default getShiftScheduleAPI;