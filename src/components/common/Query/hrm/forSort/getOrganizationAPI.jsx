import axios from "../../../../../axios";

const getShiftAPI = (page = '', item= '', searchData = '') => {
    // const searchData = SearchData ? `%${SearchData}%` : '';
    // console.log(page, item, searchData);
    return axios.get(`/hrm-system/organization/?page=${page}&item=${item}&search=${searchData}`);
}

export default getShiftAPI;