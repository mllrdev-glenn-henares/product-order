import environment from "@/environments/environment";
import axios from "axios";
import SessionStorageKey from "@/shared/enums/session-storage-key.enum";
import IClientRequest from "@/shared/interface/client-request.interface";
import IError from "@/shared/interface/error.interface";

const token = sessionStorage.getItem(SessionStorageKey.TOKEN)
export function client(request: IClientRequest) {
  return axios({
    method: request.method,
    url: `${environment.baseUrl}/${request.url}`,
    data: request.data,
    headers: {
      'Authorization': token
    }
  }).then(response => {
    const error: IError = response.data
    if (error.errorCode) {
      throw error;
    }

    return response
  });
}