import axios from "axios"

const apiUrl = 'http://localhost:8081/api'
const apiLoginUrl = apiUrl + '/user/login'
const apiSignupUrl = apiUrl + '/user/sign-up'

export default { apiUrl, apiLoginUrl, apiSignupUrl}
