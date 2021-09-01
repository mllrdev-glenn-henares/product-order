import { client } from "@/core/services/client.service"
import IOrderDetail from "@/core/interfaces/order-detail.interface"

const createOrder = async (orderDetails: IOrderDetail) => {
  return await client({
    data: orderDetails,
    method: 'POST',
    url: 'order/createPO'
  })
    .then( response => {
      console.log(response.data.message)
    })
    .catch( error => {
      console.log(error)
    })
}

export default createOrder