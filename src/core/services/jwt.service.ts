import jwtDecode from "jwt-decode"
import IUser from "@/core/interfaces/user.interface";

const token = sessionStorage.getItem('token') as string
function getTokenProperties() {
  const payload: IUser = JSON.parse(JSON.stringify(jwtDecode(token)))
  console.log(payload);
  return payload
}

export default getTokenProperties