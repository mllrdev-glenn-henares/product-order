import IItem from "../item.interface";

interface IOrder {
  orderId: string;
  requestor: string;
  orderItems: IItem[];
  supplier: string;
  purchaseDate: Date;
  grandTotal: number;
  description: string;
}

export default IOrder