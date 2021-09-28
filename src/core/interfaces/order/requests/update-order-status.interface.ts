import PurchaseStatus from "@/core/enums/status.enum";

interface IUpdateOrderStatusRequest {
  id: string;
  status: PurchaseStatus;

}

export default IUpdateOrderStatusRequest