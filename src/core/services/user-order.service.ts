import IPurchaseOrder from "@/core/interfaces/purchase-order.interface"
import { client } from "@/core/services/client.service"

const getUserOrder = async () => {
  return client({
    data: '',
    method: 'GET',
    url: 'order/user'
  })
    .then( response => {
      const orders: Array<IPurchaseOrder> = response.data;
      return orders
    })
    .catch( error =>{
      console.log(error)
      return null
    })
}

export default getUserOrder