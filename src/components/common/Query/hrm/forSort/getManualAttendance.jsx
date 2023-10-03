import axios from "../../../../../axios";

const getManualAttendanceAPI = (url, page = '', item= '', searchData = '', selectedBranch = '', selectedCompany = '') => {
    // const searchData = SearchData ? `%${SearchData}%` : '';
    // console.log(page, item, searchData);
    return axios.get(`${url}?page=${page}&item=${item}&search=${searchData}&branch=${selectedBranch}&company=${selectedCompany}`);
}

export default getManualAttendanceAPI;