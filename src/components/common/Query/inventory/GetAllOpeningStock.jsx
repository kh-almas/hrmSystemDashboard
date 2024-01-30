import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllOpeningStock = () => {
    const {status: allOpeningStockStatus = '', refetch: allOpeningStockReFetch, data: allOpeningStockData = [], error: allOpeningStockError} = useQuery({
        queryKey: ['allOpeningStock'],
        queryFn: async () => {
            return axios.get('/inventory-management/stock/opening/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (allOpeningStockStatus === 'error') {
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

    return [allOpeningStockStatus, allOpeningStockReFetch, allOpeningStockData, allOpeningStockError];
};

export default GetAllOpeningStock;