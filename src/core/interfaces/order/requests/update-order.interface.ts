export interface IItemRequest {
  orderItemId: number;
  itemId: number;
  quantity: number;
  name: string;
  unitPrice: number;
  subTotal: number;
}

interface IUpdateOrderRequest {
  orderId: string;
  requestor: string;
  description: string;
  purchaseDate: Date;
  supplier: string;
  orderItems: IItemRequest[];
  grandTotal: number;
}

export default IUpdateOrderRequest