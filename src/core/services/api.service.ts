import router from "@/router"
import { config } from "@vue/test-utils"
import axios from "axios"
import apiLoginUrl from "@/core/models/api-urls"

export function loginUser(emailInput: string, passwordInput: string) {
    const loginData = {
        "email": emailInput,
        "password": passwordInput
    }

    axios({
        method: "POST",
        url: apiLoginUrl.toString(),
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