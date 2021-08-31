import PurchaseStatus from '@/core/enums/status.enum'
interface IPurchaseOrder {
    id: string,
    supplier: string,
    description: string,
    date: Date | string,
    status: PurchaseStatus
}

export default IPurchaseOrder