import IItem from "../../item.interface";

interface ICreateOrderRequest {
  items: IItem[];
  supplier: string;
  purchaseDate: Date;
  grandTotal: number;
  description: string;
}

export default ICreateOrderRequest