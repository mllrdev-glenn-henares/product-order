import { client } from "@/core/services/client.service"
import IPurchaseOrder from "../interfaces/purchase-order/purchase-order.interface";
import IPurchaseOrderResponse from "../interfaces/purchase-order/purchase-order-response.interface";
import IUserRoles from "@/core/interfaces/user-roles.interface";
import IChangePurchaseStatus from "@/core/interfaces/purchase-order/purchase-order-request.interface";
import IEditPurchaseOrder from "@/core/interfaces/purchase-order/purchase-order-request.interface"
const getAll = async () => {
  return await client({
    data: '',
    method: 'GET',
    url: 'order/all'
  })
    .then(response => {
      const orders: Array<IPurchaseOrderResponse['admin']> = response.data;
      return orders
    })
    .catch(error => {
      console.log(error)
      return null
    })
}
const getOrder = async (orderId: string) => {
  return await client({
    data: '',
    method: 'GET',
    url: `order/${orderId}/orderDetails`
  })
    .then(response => {
      const orders: IPurchaseOrder = response.data;
      return orders
    })
    .catch(error => {
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
    .then(response => {
      const orders: Array<IPurchaseOrderResponse['simple']> = response.data;
      return orders
    })
    .catch(error => {
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
    .then(response => {
      console.log(response.data.message)
    })
    .catch(error => {
      console.log(error)
    })
}

const edit = async (order: IEditPurchaseOrder['requestor']) => {
  return await client({
    data: order,
    method: 'PUT',
    url: 'order/updatePurchaseOrder'
  })
    .then(response => {
      if (response.data.isSuccessful) {
        console.log(response.data)
        return true
      }
      else {
        return false
      }
    })
    .catch(error => {
      console.log(error)
      return false
    })
  return false
}

const purchaseStatusUpdate = async (statusUpdate: IChangePurchaseStatus) => {
  return await client({
    data: statusUpdate,
    method: 'PATCH',
    url: 'order/updateOrder'
  })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

export const orderService: IUserRoles = {
  admin: {
    getAll
  },

  requestor: {
    create,
    getAllByUser,
    getOrder,
    edit
  },
  approver: {
    getAll,
    purchaseStatusUpdate
  }
}

