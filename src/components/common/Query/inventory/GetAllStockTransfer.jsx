import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllStockTransfer = () => {
    const {status: getAllStockTransferStatus = '', refetch: getAllStockTransferReFetch, data: getAllStockTransferData = [], error: getAllStockTransferError} = useQuery({
        queryKey: ['GetAllStockTransfer'],
        queryFn: async () => {
            return axios.get('/inventory-management/stock/opening/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (getAllStockTransferStatus === 'error') {
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

    return [getAllStockTransferStatus, getAllStockTransferReFetch, getAllStockTransferData, getAllStockTransferError];
};

export default GetAllStockTransfer;