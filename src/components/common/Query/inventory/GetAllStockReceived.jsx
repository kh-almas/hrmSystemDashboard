import {useQuery} from "@tanstack/react-query";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const GetAllStockReceived = () => {
    const {status: getAllStockReceivedStatus = '', refetch: getAllStockReceivedReFetch, data: getAllStockReceivedData = [], error: getAllStockReceivedError} = useQuery({
        queryKey: ['GetAllStockReceived'],
        queryFn: async () => {
            return axios.get('/inventory-management/stock/opening/')
        }
    });

    // if (allEmployeeStatus === 'loading') {
    //     return <span>Loading...</span>
    // }

    if (getAllStockReceivedStatus === 'error') {
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

    return [getAllStockReceivedStatus, getAllStockReceivedReFetch, getAllStockReceivedData, getAllStockReceivedError];
};

export default GetAllStockReceived;