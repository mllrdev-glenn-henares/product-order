import environment from "@/environments/environment";
import axios from "axios";
import IClientRequest from "../interfaces/client-request.interface";


export function client(request: IClientRequest) {
  return axios({
    method: request.method,
    url: `${environment.baseUrl}/api/${request.url}`,
    data: request.data,
  })
}