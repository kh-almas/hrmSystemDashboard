import axios from "../../../../axios";

const getInventoryContact = (type = '', page = '', item= '', searchData = '') => {
    return axios.get(`/inventory-management/contacts/all/${type}?page=${page}&item=${item}&search=${searchData}`);
}

export default getInventoryContact;