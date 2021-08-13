import router from "@/router"
import axios from "axios"
import { environment } from "@/environments/environment"

export async function loginUser(emailInput: string, passwordInput: string) {
    const loginData = {
        "email": emailInput,
        "password": passwordInput
    }

    await axios({
        method: "POST",
        url: environment.baseUrl + "/login",
        data: loginData
    })
        .then(function (response) {
            console.log(response.data.isSuccessful)
            if (response.data.isSuccessful) {
                router.push("/home")
            }
            else if (!response.data.isSuccessful) {
                router.push("/login")
            }
        })
        .catch(function (error) {
            console.log("Error on Authentication");
        })
}

export function signUpUser(firstName: string, lastName: string, middleName: string, email: string, password: string, role: string) {
    const signUpData = {
        "firstName": firstName,
        "middleName": middleName,
        "lastName": lastName,
        "email": email,
        "password": password
    }
    axios({
        method: "POST",
        url: environment.baseUrl + "/register",
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
            console.log("Error on Authentication");
        })
}