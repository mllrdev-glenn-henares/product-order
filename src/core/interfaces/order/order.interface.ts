import IItem from "../item.interface";

interface IOrder {
  orderId: string,
  orderItems: IItem[],
  supplier: string,
  purchaseDate: Date,
  grandTotal: number,
  description: string 
}

export default IOrder