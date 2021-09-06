import environment from "@/environments/environment";
import axios from "axios";
import SessionStorageKey from "@/core/enums/session-storage-key.enum";
import IClientRequest from "@/core/interfaces/client-request.interface";
import IError from "../interfaces/error.interface";

const token = sessionStorage.getItem(SessionStorageKey.TOKEN)
export function client(request: IClientRequest) {
  return axios({
    method: request.method,
    url: `${environment.baseUrl}/api/${request.url}`,
    data: request.data,
    headers: {
      'Authorization': token
    }
  }).then(response => {
    console.log(response);
    const error: IError = response.data
    if (error.errorCode) {
      throw error;
    }

    return response
  });
}