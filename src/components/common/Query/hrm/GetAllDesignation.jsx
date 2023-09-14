import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";
import Designation from "../../../dashboard/hrmSystem/companyInfo/Designation";

const GetAllDesignation = () => {
    const {status: allDesignationStatus = '', refetch: allDesignationReFetch, data: allDesignation = [], error: allDesignationError} = useQuery({
        queryKey: ['allDesignation'],
        queryFn: async () => {
            return axios.get('/hrm-system/designation/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allDesignationStatus === 'error') {
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

    return [allDesignationStatus, allDesignationReFetch, allDesignation, allDesignationError];
};

export default GetAllDesignation;