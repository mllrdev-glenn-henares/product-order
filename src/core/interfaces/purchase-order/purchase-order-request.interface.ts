import PurchaseStatus from "@/core/enums/status.enum";
import IUserRoles from "@/core/interfaces/purchase-order/purchase-order.interface"

interface IChangePurchaseStatus {
  id: string,
  orderDetails: {
    status: PurchaseStatus;
  }
}
interface IEditItems {
  orderItemId: number,
  itemId: number,
  quantity: number,
  name: string,
  unitPrice: number,
  subTotal: number
}
interface IEditPurchaseOrder {
    orderId: string,
    description: string,
    purchaseDate: Date,
    supplier: string,
    orderItems: IEditItems[],
    grandTotal: number
}
export default interface IPurchaseOrderRequest extends IUserRoles {
  admin: IChangePurchaseStatus,
  approver: IChangePurchaseStatus,
  requestor: IEditPurchaseOrder 
  IEditItems: IEditItems
}