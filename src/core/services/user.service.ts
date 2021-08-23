import axios from "axios"
import environment from "@/environments/environment"
import IUser from "@/core/interfaces/user.interface"
import ILoginDetails from "@/core/interfaces/login-details.interface"
import ILoginResponse from "@/core/interfaces/login-response.interface"
import ISignUpResponse from "@/core/interfaces/sign-up-response.interface"


export async function login(loginDetails: ILoginDetails) {
    return await axios({
        method: "POST",
        url: environment.baseUrl + "/api/user/login",
        data: loginDetails,
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

export async function signUp(signUpDetails: IUser) {
    return await axios({
        method: "POST",
        url: environment.baseUrl + "/api/user/sign-up",
        data: signUpDetails
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
        .catch(function (error) {
            return false
        })
}