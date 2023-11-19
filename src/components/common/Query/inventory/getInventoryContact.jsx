import axios from "../../../../axios";

const getInventoryContact = (type = '') => {
    return axios.get(`/inventory-management/contacts/all/${type}`);
}

export default getInventoryContact;