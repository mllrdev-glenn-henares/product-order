import axios from "axios"
import environment from "@/environments/environment"
import IUser from "@/core/interfaces/user.interface"
import ILoginDetails from "@/core/interfaces/login-details.interface"
import ILoginResponse from "@/core/interfaces/login-response.interface"
import ISignUpResponse from "@/core/interfaces/sign-up-response.interface"
import { client } from "./client.service"
import { Method } from "axios";

const USER = "user";

const login = async (loginDetails: ILoginDetails) => {
    return await client({
        data: loginDetails,
        method: "POST",
        url: `${USER}/login`

    })
        .then(function (response) {
            const loginResponse: ILoginResponse = response.data;
            console.log(loginResponse.isSuccessful)
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

const signUp = async (signUpDetails: IUser) => {
    return await client({
        data: signUpDetails,
        method: "POST",
        url: `${USER}/signUp`

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