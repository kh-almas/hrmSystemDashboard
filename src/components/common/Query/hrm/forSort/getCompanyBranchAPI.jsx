import axios from "../../../../../axios";

const getCompanyBranchAPI = (page = '', item= '', searchData = '') => {
    // const searchData = SearchData ? `%${SearchData}%` : '';
    // console.log(page, item, searchData);
    return axios.get(`/hrm-system/branch?page=${page}&item=${item}&search=${searchData}`);
}

export default getCompanyBranchAPI;