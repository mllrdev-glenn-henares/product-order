import { client } from "@/core/services/client.service"
import IPurchaseOrder from "@/core/interfaces/purchase-order.interface"

const getAllOrder = async () => {
  return await client({
    data: '',
    method: 'GET',
    url: 'order/all'
  })
    .then( response => {
      const orders: Array<IPurchaseOrder> = response.data;
      return orders
    })
    .catch( error => {
      console.log(error)
      return null
    })
}

export default getAllOrder