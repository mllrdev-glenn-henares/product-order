import PurchaseStatus from "../../../enums/status.enum"

interface IUpdateOrderStatusRequest {
  id: string;
  status: PurchaseStatus;

}

export default IUpdateOrderStatusRequest