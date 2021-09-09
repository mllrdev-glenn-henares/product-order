import PurchaseStatus from "@/core/enums/status.enum";

interface IOrderSimple {
  id: string,
  supplier: string,
  description: string,
  createdAt: Date | string,
  status: PurchaseStatus
}

export default IOrderSimple