import IItem from "../../item.interface";

interface IItemRequest {
  orderItemId: number,
  itemId: number,
  quantity: number,
  name: string,
  unitPrice: number,
  subTotal: number
}

interface IUpdateOrderRequest {
  orderId: string,
  description: string,
  purchaseDate: Date,
  supplier: string,
  orderItems: IItem[],
  grandTotal: number
}

export default IUpdateOrderRequest