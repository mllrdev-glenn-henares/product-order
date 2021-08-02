interface PurchaseOrder {
    purchaseOrderNumber: string,
    description: string,
    date: Date,
    status: 'pending' | 'approved',
    action: 'reviewed'| 'for review'

}

export default PurchaseOrder