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