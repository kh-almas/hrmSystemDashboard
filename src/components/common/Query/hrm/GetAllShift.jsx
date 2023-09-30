import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllShift = () => {
    const {status: allShiftStatus = '', refetch: allShiftReFetch, data: allShift = [], error: allShiftError} = useQuery({
        queryKey: ['allShift'],
        queryFn: async () => {
            return axios.get(`/hrm-system/shift`)
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allShiftStatus === 'error') {
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

    return [allShiftStatus, allShiftReFetch, allShift, allShiftError];
};

export default GetAllShift;