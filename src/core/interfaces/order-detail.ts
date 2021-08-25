import IItem from "@/core/interfaces/item";
interface IOrderDetail {
  item: IItem[],
  supplier: string,
  purchaseDate: Date,
  grandTotal: number,
  description: string
}

export default IOrderDetail