import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from 'sweetalert2'

const GetManualAttendance = () => {
    const {status, refetch, data: manualAttendance = [], error} = useQuery({
        queryKey: ['allManualAttendance'],
        queryFn: async () => {
            const response = axios.get('/hrm-system/manual-attendance')
            return response;
        }
    });

    // if (status === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (status === 'error') {
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

    return [status, refetch, manualAttendance, error];
};

export default GetManualAttendance;