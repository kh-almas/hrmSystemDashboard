import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllEmployeeGrade = () => {
    const {status: allEmployeeGradeStatus = '', refetch: allEmployeeGradeReFetch, data: allEmployeeGrade = [], error: allEmployeeGradeError} = useQuery({
        queryKey: ['allEmployeeGrade'],
        queryFn: async () => {
            return axios.get('/hrm-system/employee-grade/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allEmployeeGradeStatus === 'error') {
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

    return [allEmployeeGradeStatus, allEmployeeGradeReFetch, allEmployeeGrade, allEmployeeGradeError];
};

export default GetAllEmployeeGrade;