import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllDepartment = () => {
    const {status: allDepartmentStatus = '', refetch: allDepartmentReFetch, data: allDepartment = [], error: allDepartmentError} = useQuery({
        queryKey: ['allDepartmentssssss'],
        queryFn: async () => {
            return axios.get('/hrm-system/department')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allDepartmentStatus === 'error') {
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

    return [allDepartmentStatus, allDepartmentReFetch, allDepartment, allDepartmentError];
};

export default GetAllDepartment;