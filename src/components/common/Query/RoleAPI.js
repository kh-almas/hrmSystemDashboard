import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../axios";


const RoleAPI = (page = '', item= '', searchData = '') => {
    // const searchData = SearchData ? `%${SearchData}%` : '';
    console.log(page, item, searchData);
    return axios.get(`http://localhost:5000/roles?page=${page}&item=${item}&search=${searchData}`);
}

export default RoleAPI;