import IItem from "@/core/interfaces/item";
import IPurchaseOrder from "@/core/interfaces/purchase-order"

interface IOrderDetail {
  item: IItem[],
  supplier: string,
  purchaseDate: Date,
  grandTotal: number,
  description: IPurchaseOrder['description']
}

export default IOrderDetail