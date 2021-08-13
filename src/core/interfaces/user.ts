interface IName {
    firstName: string;
    middleName: string;
    lastName: string;
}

interface IUser extends IName {
    email: string;
    password: string;
}