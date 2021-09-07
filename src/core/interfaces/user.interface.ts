import UserRole from "@/core/enums/user-role.enum";

interface IUser {
    id: number;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    role: UserRole;
    exp: number;
    iat: number;
}

export default IUser
