import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllLeaveApproval = () => {
    const {status: allApprovalStatus = '', refetch: allApprovalReFetch, data: allApproval = [], error: allApprovalError} = useQuery({
        queryKey: ['allApproval'],
        queryFn: async () => {
            return axios.get('/hrm-system/leave-approval/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allApprovalStatus === 'error') {
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

    return [allApprovalStatus, allApprovalReFetch, allApproval, allApprovalError];
};

export default GetAllLeaveApproval;