import { client } from "@/core/services/client.service"
import IUserRoles from "@/core/interfaces/user-roles.interface";
import IGetAllOrdersResponse from "@/core/interfaces/order/responses/get-all-orders.interface";
import IGetOrderByIdResponse from "@/core/interfaces/order/responses/get-order-by-id.interface";
import IGetAllOrdersByUserIdResponse from "@/core/interfaces/order/responses/get-all-orders-by-user-id.interface";
import ICreateOrderRequest from "@/core/interfaces/order/requests/create-order.interface";
import IUpdateOrderRequest from "@/core/interfaces/order/requests/update-order.interface";

const getAll = async () => {
  return await client({
    data: '',
    method: 'GET',
    url: 'order/all'
  })
    .then(response => {
      const orders: Array<IGetAllOrdersResponse> = response.data;
      return orders
    })
    .catch(error => {
      console.log(error)
      return Array<IGetAllOrdersResponse>()
    })
}

const getById = async (id: string) => {
  return await client({
    data: '',
    method: 'GET',
    url: `order/${id}/orderDetails`
  })
    .then(response => {
      const orders: IGetOrderByIdResponse = response.data;
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
      const orders: Array<IGetAllOrdersByUserIdResponse> = response.data;
      return orders
    })
    .catch(error => {
      console.log(error)
      return Array<IGetAllOrdersByUserIdResponse>()
    })
}

const create = async (order: ICreateOrderRequest) => {
  return await client({
    data: order,
    method: 'POST',
    url: 'order/createPO'
  })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

const updateOrder = async (order: IUpdateOrderRequest) => {
  return await client({
    data: order,
    method: 'PUT',
    url: 'order/updatePurchaseOrder'
  })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

const updateOrderStatus = async (request: IUpdateOrderRequest) => {
  return await client({
    data: request,
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
    getById,
    updateOrder
  },
  approver: {
    getAll,
    updateOrderStatus
  }
}

