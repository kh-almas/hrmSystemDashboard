import axios from "../../../../../axios";

const getManualAttendanceAPI = (url, page = '', item= '', searchData = '', selectedBranch = '', selectedCompany = '', startDate = '', endDate = '', datewise = '') => {
    // const searchData = SearchData ? `%${SearchData}%` : '';
    // console.log(page, item, searchData);
    // return axios.get(`${url}?${page ? `page=${page}` : ''}${item ? `&item=${item}` : ''}${searchData ? `&search=${searchData}` : ''}${selectedBranch ? `&branch=${selectedBranch}` : ''}${selectedCompany ? `&company=${selectedCompany}` : ''}${startDate ? `&startdate=${startDate}` : ''}${endDate ? `&enddate=${endDate}` : ''}${datewise ? `&singledays=${datewise}` : ''}`);
    return axios.get(`${url}?page=${page}&item=${item}&search=${searchData}&branch=${selectedBranch}&company=${selectedCompany}&startdate=${startDate}&enddate=${endDate}&singledays=${datewise}`);
}

export default getManualAttendanceAPI;