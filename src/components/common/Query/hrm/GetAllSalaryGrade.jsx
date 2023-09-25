import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllSalaryGrade = () => {
    const {status: allSalaryGradeStatus = '', refetch: allSalaryGradeReFetch, data: allSalaryGrade = [], error: allSalaryGradeError} = useQuery({
        queryKey: ['allSalaryGrade'],
        queryFn: async () => {
            return axios.get('/hrm-system/salary-grade/')
        }
    });

    // if (allSalaryStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allSalaryGradeStatus === 'error') {
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

    return [allSalaryGradeStatus, allSalaryGradeReFetch, allSalaryGrade, allSalaryGradeError];
};

export default GetAllSalaryGrade;