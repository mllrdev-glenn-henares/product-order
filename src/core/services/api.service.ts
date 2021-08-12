import router from "@/router"
import axios from "axios"
import { apiLoginUrl, apiSignUpUrl } from "@/core/models/api-urls"

export function loginUser(emailInput: string, passwordInput: string) {
    const loginData = {
        "email": emailInput,
        "password": passwordInput
    }

    axios({
        method: "POST",
        url: apiLoginUrl,
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

export function signUpUser(firstName: string, lastName: string, middleName: string, email: string, password: string) {
    const signUpData = {
        "firstName": firstName,
        "middleName": middleName,
        "lastName": lastName,
        "email": email,
        "password": password
    }
    axios({
        method: "POST",
        url: apiSignUpUrl,
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