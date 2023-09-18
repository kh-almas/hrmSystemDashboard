import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllProject = () => {
    const {status: allProjectStatus = '', refetch: allProjectReFetch, data: allProject = [], error: allProjectError} = useQuery({
        queryKey: ['allBranch'],
        queryFn: async () => {
            return axios.get('/hrm-system/project/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allProjectStatus === 'error') {
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

    return [allProjectStatus, allProjectReFetch, allProject, allProjectError];
};

export default GetAllProject;