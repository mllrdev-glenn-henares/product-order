import IOrder from "../order.interface"


export interface IItemResponse {
  orderItemId: number;
  itemId: number;
  quantity: number;
  name: string;
  unitPrice: number;
  subTotal: number;
}

interface IGetOrderByIdResponse {
  orderId: string;
  requestor: string;
  description: string;
  purchaseDate: Date;
  supplier: string;
  orderItems: IItemResponse[];
  grandTotal: number;
}
export default IGetOrderByIdResponse