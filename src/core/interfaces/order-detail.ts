import IItem from "@/core/interfaces/item";
import IPurchaseOrder from "@/core/interfaces/purchase-order"

interface IOrderDetail {
  item: IItem[],
  supplier: string,
  purchaseDate: Date,
  grandTotal: number,
  description: string
}

export default IOrderDetail