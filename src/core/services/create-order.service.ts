import { client } from "@/core/services/client.service"

const createOrder = async () => {
  return await client({
    data: '',
    method: 'POST',
    url: 'order/createPO'
  })
    .then( response => {
      console.log(response.data.message)
    })
    .catch( error => {
      console.log(error)
    })
}

export default createOrder