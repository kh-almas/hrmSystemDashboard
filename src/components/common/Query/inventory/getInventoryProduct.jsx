import axios from "../../../../axios";

const getInventoryModel = () => {
    return axios.get(`/inventory-management/model/all`);
}

export default getInventoryModel;