import axios from "../../../../../axios";

const getDepartmentAPI = (page = '', item= '', searchData = '') => {
    // const searchData = SearchData ? `%${SearchData}%` : '';
    // console.log(page, item, searchData);
    return axios.get(`/hrm-system/department?page=${page}&item=${item}&search=${searchData}`);
}

export default getDepartmentAPI;