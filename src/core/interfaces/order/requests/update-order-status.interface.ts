import PurchaseStatus from "@/core/enums/status.enum";

interface IUpdateOrderStatusRequest {
  id: string,
  orderDetails: {
    status: PurchaseStatus;
  }
}

export default IUpdateOrderStatusRequest