import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllLeaveType = () => {
    const {status: allLeaveTypeStatus = '', refetch: allLeaveTypeReFetch, data: allLeaveType = [], error: allLeaveTypeError} = useQuery({
        queryKey: ['allLeaveType'],
        queryFn: async () => {
            return axios.get('/hrm-system/leave-type/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allLeaveTypeStatus === 'error') {
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

    return [allLeaveTypeStatus, allLeaveTypeReFetch, allLeaveType, allLeaveTypeError];
};

export default GetAllLeaveType;