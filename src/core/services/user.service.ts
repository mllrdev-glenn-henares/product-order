import ILoginRequest from "@/core/interfaces/login/login-request.interface"
import ILoginResponse from "@/core/interfaces/login/login-response.interface"
import ISignUpResponse from "@/core/interfaces/signup/sign-up-response.interface"
import { client } from "./client.service"
import ISignUpRequest from "@/core/interfaces/signup/sign-up-request.interface"

const USER = "user";

const login = async (loginDetails: ILoginRequest) => {
    return await client({
        data: loginDetails,
        method: "POST",
        url: `${USER}/login`

    })
        .then(function (response) {
            const loginResponse: ILoginResponse = response.data;
            if (response.data.isSuccessful) {
                sessionStorage.setItem('token', 'Bearer ' + response.data.token)
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
        url: `${USER}/sign-up`

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