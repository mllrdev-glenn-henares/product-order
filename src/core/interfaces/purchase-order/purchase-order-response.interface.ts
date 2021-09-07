import PurchaseStatus from "@/core/enums/status.enum";
import IUserRoles from "@/core/interfaces/user-roles.interface";
import IPurchaseOrder from "@/core/interfaces/purchase-order/purchase-order.interface";

interface ISimple {
  id: string,
  supplier: string,
  description: string,
  createdAt: Date | string,
  status: PurchaseStatus
}

export default interface IPurchaseOrderResponse extends IUserRoles {
  simple: ISimple,
  requestor: IPurchaseOrder,
  approver: IPurchaseOrder,
  admin: IPurchaseOrder
}

