import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllWeekday = () => {
    const {status: allWeekdayStatus = '', refetch: allWeekdayReFetch, data: allWeekday = [], error: allWeekdayError} = useQuery({
        queryKey: ['allWeekday'],
        queryFn: async () => {
            return axios.get('/hrm-system/weekday/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allWeekdayStatus === 'error') {
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

    return [allWeekdayStatus, allWeekdayReFetch, allWeekday, allWeekdayError];
};

export default GetAllWeekday;