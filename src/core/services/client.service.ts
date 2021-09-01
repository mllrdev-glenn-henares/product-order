import environment from "@/environments/environment";
import axios from "axios";
import IClientRequest from "../interfaces/client-request.interface";

const token = sessionStorage.getItem('token')
export function client(request: IClientRequest) {
  return axios({
    method: request.method,
    url: `${environment.baseUrl}/api/${request.url}`,
    data: request.data,
    headers: {
      'Authorization': token
    }
  })
}