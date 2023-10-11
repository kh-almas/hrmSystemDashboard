import axios from "../../../../../axios";

const getDesignationAP = (page = '', item= '', searchData = '') => {
    // const searchData = SearchData ? `%${SearchData}%` : '';
    // console.log(page, item, searchData);
    return axios.get(`/hrm-system/designation?page=${page}&item=${item}&search=${searchData}`);
}

export default getDesignationAP;