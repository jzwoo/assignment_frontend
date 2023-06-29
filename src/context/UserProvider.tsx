import {ReactNode, createContext, useState, useEffect} from "react";

interface userProviderProps {
    children?: ReactNode
}

interface User {
    name: string
    accessToken: string
}

let emptyUser = {
    name: "", accessToken: ""
}

const UserContext = createContext({
    user: emptyUser, setUser: (user: User) => {}
})

export const UserProvider = ({children}: userProviderProps) => {
    const [user, setUser] = useState<User>(emptyUser)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext

