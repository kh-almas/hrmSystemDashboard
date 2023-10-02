import axios from "../../../../../axios";

const getEmployeeAPI = (page = '', item= '', searchData = '') => {
    // const searchData = SearchData ? `%${SearchData}%` : '';
    // console.log(page, item, searchData);
    return axios.get(`/hrm-system/employee?page=${page}&item=${item}&search=${searchData}`);
}

export default getEmployeeAPI;