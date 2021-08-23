import router from "@/router"
import axios from "axios"
import environment from "@/environments/environment"
import IUser from "@/core/interfaces/user.interface"
import ILoginDetails from "@/core/interfaces/login-details.interface"

export async function loginUser(emailInput: string, passwordInput: string) {
    const loginData: ILoginDetails = {
        "email": emailInput,
        "password": passwordInput
    }
    let loginSuccess = false;
    await axios({
        method: "POST",
        url: environment.baseUrl + "/api/user/login",
        data: loginData
    })
        .then(function (response) {
            console.log(response.data.isSuccessful)
            if (response.data.isSuccessful) {
                sessionStorage.setItem('token', 'Bearer ' + response.data.token)
                loginSuccess = true
            }
            else if (!response.data.isSuccessful) {
                router.push("/login")
            }
        })
        .catch(function (error) {
            console.log("Error on Authentication")
        })
        return loginSuccess
}

export function signUpUser(firstName: string, lastName: string, middleName: string, email: string, password: string, role: string) {
    const signUpData: IUser = {
        "firstName": firstName,
        "middleName": middleName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "role": role
    }
    axios({
        method: "POST",
        url: environment.baseUrl + "/api/user/sign-up",
        data: signUpData
    })
        .then(function (response) {
            console.log(response.data.isSuccessful)
            if (response.data.isSuccessful) {
                router.push("/login")
            }
            else if (!response.data.isSuccessful) {
                router.push("/register")
            }
        })
        .catch(function (error) {
            console.log("Error on Authentication")
        })
}