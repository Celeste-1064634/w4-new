import { createContext } from "react";

export const UserContext = createContext({
    "token": '',
    "firstName": '',
    "lastName": '',
    "fullName": '',
    "email": '',
});