import { client } from "@/shared/services/client.service"
import IUserRoles from "@/shared/interface/user-roles.interface";
import IGetAllOrdersResponse from "@/modules/purchase-order/interface/order/responses/get-all-orders.interface";
import IGetOrderByIdResponse from "@/modules/purchase-order/interface/order/responses/get-order-by-id.interface";
import IGetAllOrdersByUserIdResponse from "@/modules/purchase-order/interface/order/responses/get-all-orders-by-user-id.interface";
import ICreateOrderRequest from "@/modules/purchase-order/interface/order/requests/create-order.interface";
import IUpdateOrderRequest from "@/modules/purchase-order/interface/order/requests/update-order.interface";


const getAdminAll = async () => {
  return await client({
    method: 'GET',
    url: 'admin/api/v1/orders/all'
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

const getApproverAll = async () => {
  return await client({
    method: 'GET',
    url: 'approver/api/v1/orders/all'
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

const getRequestorAllByUser = async () => {
  return client({
    method: 'GET',
    url: 'requestor/api/v1/orders/user'
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

const getAdminById = async (id: string) => {
  return await client({
    method: 'GET',
    url: `admin/api/v1/orders/${id}/order-details`
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

const getApproverById = async (id: string) => {
  return await client({
    method: 'GET',
    url: `approver/api/v1/orders/${id}/order-details`
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

const getRequestorById = async (id: string) => {
  return await client({
    method: 'GET',
    url: `requestor/api/v1/orders/${id}/order-details`
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


const requestorCreate = async (order: ICreateOrderRequest) => {
  return await client({
    data: order,
    method: 'POST',
    url: 'requestor/api/v1/orders/create-purchase-order'
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
    url: 'requestor/api/v1/orders/update-purchase-order'
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
    url: 'approver/api/v1/orders/order-status'
  })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

const deletePurchaseOrder = async(id: string) => {
  return await client({
    method: 'DELETE',
    url: `requestor/api/v1/orders/${id}/purchase-order`
  })
  .then(() => {
    return true;
  })
  .catch(() => {
    return false
  })
}


export const orderService: IUserRoles = {
  admin: {
    getAdminAll,
    getAdminById,
  },

  requestor: {
    requestorCreate,
    getRequestorById,
    getRequestorAllByUser,
    updateOrder,
    deletePurchaseOrder,
  },
  approver: {
    getApproverAll,
    getApproverById,
    updateOrderStatus,
  },
}

