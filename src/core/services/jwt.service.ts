import jwtDecode from "jwt-decode"
import IUser from "@/core/interfaces/user.interface";
import SessionStorageKey from "@/core/enums/session-storage-key.enum";

const userPayload: string  = sessionStorage.getItem(SessionStorageKey.USER)!!;
function getUserFromPayload() {
  const user: IUser = JSON.parse(JSON.stringify(jwtDecode(userPayload)))
  return user
}

export default getUserFromPayload