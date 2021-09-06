import PurchaseStatus from "@/core/enums/status.enum";
import IUserRoles from "@/core/interfaces/purchase-order/purchase-order.interface"

interface IChangePurchaseStatus {
  id: string,
  orderDetails: {
    status: PurchaseStatus;
    
  }
}

export default interface IPurchaseOrderRequest extends IUserRoles {
  admin: IChangePurchaseStatus,
  approver: IChangePurchaseStatus, 
}