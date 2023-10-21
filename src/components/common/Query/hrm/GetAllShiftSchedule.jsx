import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllShiftSchedule = () => {
//     const {status: allShiftScheduleStatus = '', refetch: allShiftScheduleReFetch, data: allShiftSchedule = [], error: allShiftScheduleError} = useQuery({
//         queryKey: ['allShiftSchedule'],
//         queryFn: async () => {
//             return axios.get('/hrm-system/shift-schedule/')
//         }
//     });
//
//     // if (allEmployeeStatus === 'loading') {
//     //     return <span>Loading...</span>
//     // }
//
//     if (allShiftScheduleStatus === 'error') {
//         return Swal.fire({
//             title: 'Something is wrong.',
//             width: 600,
//             padding: '3em',
//             color: '#716add',
//             background: '#fff url(/images/trees.png)',
//             backdrop: `
//                 rgba(0,0,123,0.4)
//                 url("/images/nyan-cat.gif")
//                 left top
//                 no-repeat
//           `
//         })
//     }
//
//     return [allShiftScheduleStatus, allShiftScheduleReFetch, allShiftSchedule, allShiftScheduleError];
};

export default GetAllShiftSchedule;