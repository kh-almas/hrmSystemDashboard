import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllHoliday = () => {
    const {status: allHolidayStatus = '', refetch: allHolidayReFetch, data: allHoliday = [], error: allHolidayError} = useQuery({
        queryKey: ['allHoliday'],
        queryFn: async () => {
            return axios.get('/hrm-system/holiday/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allHolidayStatus === 'error') {
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

    return [allHolidayStatus, allHolidayReFetch, allHoliday, allHolidayError];
};

export default GetAllHoliday;