import PurchaseStatus from "../../enums/status.enum";

interface IOrderSimple {
  id: string;
  supplier: string;
  description: string;
  grandTotal: number;
  createdAt: Date | string;
  status: PurchaseStatus;
}

export default IOrderSimple