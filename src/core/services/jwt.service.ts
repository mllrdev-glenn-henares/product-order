import jwtDecode from "jwt-decode"
import IUser from "@/core/interfaces/user.interface";

const userPayload: string  = sessionStorage.getItem('user')!!;
function getUserFromPayload() {
  const user: IUser = JSON.parse(JSON.stringify(jwtDecode(userPayload)))
  return user
}

export default getUserFromPayload