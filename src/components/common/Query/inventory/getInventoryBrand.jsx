import axios from "../../../../axios";

const getInventoryBrand = () => {
    return axios.get(`/inventory-management/brand/all`);
}

export default getInventoryBrand;