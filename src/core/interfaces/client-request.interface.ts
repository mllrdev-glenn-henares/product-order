import { Method } from "axios";

interface IClientRequest {
  method: Method,
  url: String,
  // We want to accept any data type here to make this generic.
  data: any
}

export default IClientRequest