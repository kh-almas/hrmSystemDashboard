import axios from "../../../../../axios";

const getMatchineInfoAPI = (page = '', item= '', searchData = '') => {
    return axios.get(`hrm-system/machine/info?page=${page}&item=${item}&search=${searchData}`);
}

export default getMatchineInfoAPI;