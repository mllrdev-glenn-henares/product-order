import { Method } from "axios";

interface IClientRequest {
  method: Method;
  url: string;
  // We want to accept any data type here to make this generic.
  data?: any;
}

export default IClientRequest