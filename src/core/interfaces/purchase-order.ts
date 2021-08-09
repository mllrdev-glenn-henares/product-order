import PurchaseStatus from '@/core/enums/status.enum'
import PurchaseAction from '@/core/enums/action.enum'
interface IPurchaseOrder {
    purchaseOrderNumber: string,
    description: string,
    date: Date,
    status: PurchaseStatus.APPROVED | PurchaseStatus.PENDING | PurchaseStatus.DECLINED | PurchaseStatus.CLOSE,
    action: PurchaseAction
}

export default IPurchaseOrder