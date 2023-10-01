import axios from "../../../axios";


const RoleAPI = (page = '', item= '', searchData = '') => {
    // const searchData = SearchData ? `%${SearchData}%` : '';
    console.log(page, item, searchData);
    return axios.get(`/roles?page=${page}&item=${item}&search=${searchData}`);
}

export default RoleAPI;