interface IName {
    firstName: string;
    lastName: string;
}

interface IUser extends IName {
    email: string;
    password: string;
}