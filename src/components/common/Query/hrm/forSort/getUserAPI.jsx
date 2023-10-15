import axios from "../../../../../axios";

const getUserAPI = () => {
    return axios.get(`/users`);
}

export default getUserAPI;