import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllSKUForSelect = () => {
    const {status: allSkuStatus = '', refetch: allSkuReFetch, data: allSku = [], error: allSkuError} = useQuery({
        queryKey: ['GetAllSKUForSelect'],
        queryFn: async () => {
            return axios.get('/inventory-management/products/list/combo/select')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allSkuStatus === 'error') {
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

    return [allSkuStatus, allSkuReFetch, allSku, allSkuError];
};

export default GetAllSKUForSelect;