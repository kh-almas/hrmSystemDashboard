import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetEmployee = () => {
    const {status: allEmployeeStatus = '', refetch: allEmployeeReFetch, data: allEmployee = [], error: allEmployeeError} = useQuery({
        queryKey: ['allEmployee'],
        queryFn: async () => {
            return axios.get('/hrm-system/employee/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allEmployeeStatus === 'error') {
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

    return [allEmployeeStatus, allEmployeeReFetch, allEmployee, allEmployeeError];
};

export default GetEmployee;