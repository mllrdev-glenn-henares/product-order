import IOrderDetail from "@/core/interfaces/order-detail.interface"
import { client } from "./client.service"

const USER = "user";
const ORDER = "order"
const edit = async (orderDetails: IOrderDetail, orderID: number) => { 

    return await client({
        data: orderDetails,
        method: "PUT",
        url: `${USER}/${ORDER}/${orderID}/orderDetails`
    })
        .then(function (response) {
            console.log(response.data)
            if (response.data.isSuccessful) {
                return true
            }
            else {
                return false
            }
        })
        .catch(() => { return false })
}