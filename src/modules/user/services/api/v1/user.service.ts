import ILoginRequest from "@/modules/user/interface/login/login-request.interface"
import ILoginResponse from "@/modules/user/interface/login/login-response.interface"
import ISignUpResponse from "@/modules/user/interface/signup/sign-up-response.interface"
import ISignUpRequest from "@/modules/user/interface/signup/sign-up-request.interface"
import SessionStorageKey from "@/shared/enums/session-storage-key.enum"
import { client } from "@/shared/services/client.service"

const USER = "users";

const login = async (loginDetails: ILoginRequest) => {
    return await client({
        data: loginDetails,
        method: "POST",
        url: `api/v1/${USER}/login`

    })
        .then(function (response) {
            const loginResponse: ILoginResponse = response.data;
            if (response.data.isSuccessful) {
                sessionStorage.setItem(SessionStorageKey.TOKEN, `Bearer ${response.data.token}`)
                sessionStorage.setItem(SessionStorageKey.USER, response.data.token)
                return true
            }
            return false
        })
        .catch(function (error) {
            return false
        })
}

const signUp = async (signUpDetails: ISignUpRequest) => {
    return await client({
        data: signUpDetails,
        method: "POST",
        url: `api/v1/${USER}/sign-up`

    })
        .then(function (response) {
            const singUpResponse: ISignUpResponse = response.data
            console.log(response.data)
            if (response.data.isSuccessful) {
                return true
            }
            else {
                return false
            }
        })
        .catch(() => { return false })
}

export const userService = {
    login: login,
    signUp: signUp
}