interface Name {
    firstName: string;
    middleName: string;
    lastName: string;
}

interface User extends Name {
    email: string;
    password: string;
}