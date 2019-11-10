export interface User{
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    companyId: Number
}

export interface UserHeader{
    company:string,
    userName:string
}