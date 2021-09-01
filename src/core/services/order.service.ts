import { client } from "@/core/services/client.service"
import IPurchaseOrder from "@/core/interfaces/purchase-order.interface"
import IOrderDetail from "@/core/interfaces/order-detail.interface";

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

export const orderService = {
  getAllOrder: getAllOrder,
  getUserOrder: getUserOrder,
  createOrder: createOrder
}