import { client } from "@/core/services/client.service"
import IPurchaseOrder from "../interfaces/purchase-order/purchase-order.interface";
import IPurchaseOrderResponse from "../interfaces/purchase-order/purchase-order-reponse.interface";
import IUserRoles from "../interfaces/user-roles.interface";

const getAll = async () => { // approver / admin
  return await client({
    data: '',
    method: 'GET',
    url: 'order/all'
  })
    .then( response => {
      const orders: Array<IPurchaseOrderResponse['admin']> = response.data;
      return orders
    })
    .catch( error => {
      console.log(error)
      return null
    })
}

const getAllByUser = async () => {
  return client({
    data: '',
    method: 'GET',
    url: 'order/user'
  })
    .then( response => {
      const orders: Array<IPurchaseOrderResponse['simple']> = response.data;
      return orders
    })
    .catch( error =>{
      console.log(error)
      return null
    })
}

const create = async (order: IPurchaseOrder) => {
  return await client({
    data: order,
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

export const orderService: IUserRoles = {
  admin: {
    getAll
  },

  requestor: {
    create,
    getAllByUser
  },
  approver: {
    getAll
  }
}

