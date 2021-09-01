import PurchaseStatus from "@/core/enums/status.enum";
import IUserRoles from "../user-roles.interface";
import IPurchaseOrder from "./purchase-order.interface";

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

