import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllTax = () => {
    const {status: allTaxStatus = '', refetch: allTaxReFetch, data: allTaxData = [], error: allTaxError} = useQuery({
        queryKey: ['allTax'],
        queryFn: async () => {
            return axios.get('/inventory-management/product/tax/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allTaxStatus === 'error') {
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

    return [allTaxStatus, allTaxReFetch, allTaxData, allTaxError];
};

export default GetAllTax;