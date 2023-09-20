import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../axios";
import Swal from "sweetalert2";

const GetAllRole = () => {
    const {status: allRoleStatus = '', refetch: allRoleReFetch, data: allRole = [], error: allRoleError} = useQuery({
        queryKey: ['allRole'],
        queryFn: async () => {
            return axios.get('/roles/3/3')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allRoleStatus === 'error') {
        return Swal.fire({
            title: 'Something is wrong.',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
          `
        })
    }

    return [allRoleStatus, allRoleReFetch, allRole, allRoleError];
};

export default GetAllRole;