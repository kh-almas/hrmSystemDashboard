import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllLeaveApplication = () => {
    const {status: allLeaveApplicationStatus = '', refetch: allLeaveApplicationReFetch, data: allLeaveApplication = [], error: allLeaveApplicationError} = useQuery({
        queryKey: ['allLeaveApplication'],
        queryFn: async () => {
            return axios.get('/hrm-system/leave-application/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allLeaveApplicationStatus === 'error') {
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

    return [allLeaveApplicationStatus, allLeaveApplicationReFetch, allLeaveApplication, allLeaveApplicationError];
};

export default GetAllLeaveApplication;