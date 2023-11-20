import axios from "../../../../axios";

const getInventoryUnitType = () => {
    return axios.get(`/inventory-management/unit-type/all`);
}

export default getInventoryUnitType;