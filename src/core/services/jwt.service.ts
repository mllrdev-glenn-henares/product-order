import jwtDecode from "jwt-decode";
import IJWTResponse from "@/core/interfaces/jwt-response.interface";

const token = sessionStorage.getItem("token")!;
const payload: IJWTResponse= JSON.parse(JSON.stringify(jwtDecode(token)))

export function getTokenProperties() {
    console.log(payload)
    return payload
}

export function isAuthenticated() {
    if (Date.now() >= payload.exp *1000) {
        return false
    }
    sessionStorage.removeItem('token')
    return true
}