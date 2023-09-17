import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllEmployeeShift = () => {
    const {status: allEmployeeShiftStatus = '', refetch: allEmployeeShiftReFetch, data: allEmployeeShift = [], error: allEmployeeShiftError} = useQuery({
        queryKey: ['allEmployeeShift'],
        queryFn: async () => {
            return axios.get('/hrm-system/employee-shift/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allEmployeeShiftStatus === 'error') {
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

    return [allEmployeeShiftStatus, allEmployeeShiftReFetch, allEmployeeShift, allEmployeeShiftError];
};

export default GetAllEmployeeShift;