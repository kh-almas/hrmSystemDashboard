import axios from "../../../../axios";

const getInventoryContact = () => {
    return axios.get(`/inventory-management/variant/all`);
}

export default getInventoryContact;