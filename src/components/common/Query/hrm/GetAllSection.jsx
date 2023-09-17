import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllSection = () => {
    const {status: allSectionStatus = '', refetch: allSectionReFetch, data: allSection = [], error: allSectionError} = useQuery({
        queryKey: ['allSection'],
        queryFn: async () => {
            return axios.get('/hrm-system/section/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allSectionStatus === 'error') {
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

    return [allSectionStatus, allSectionReFetch, allSection, allSectionError];
};

export default GetAllSection;