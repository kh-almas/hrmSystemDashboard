import axios from "../../../../axios";

const getInventoryBrand = () => {
    return axios.get(`/inventory-management/category/all`);
}

export default getInventoryBrand;