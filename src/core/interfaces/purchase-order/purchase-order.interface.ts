import IItem from "@/core/interfaces/item.interface";

interface IPurchaseOrder {
  item: IItem[],
  supplier: string,
  purchaseDate: Date,
  grandTotal: number,
  description: string
}

export default IPurchaseOrder