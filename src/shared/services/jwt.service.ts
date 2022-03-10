import jwtDecode from "jwt-decode"
import IUser from "@/modules/user/interface/user.interface";
import SessionStorageKey from "@/shared/enums/session-storage-key.enum";

const userPayload: string  = sessionStorage.getItem(SessionStorageKey.USER)!!;
function getUserFromPayload() {
  const user: IUser = JSON.parse(JSON.stringify(jwtDecode(userPayload)))
  return user
}

export default getUserFromPayload
