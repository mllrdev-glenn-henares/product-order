interface IJWTResponse {
    id: number;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    role: string;
    exp: number;
    iat: number;
}

export default IJWTResponse