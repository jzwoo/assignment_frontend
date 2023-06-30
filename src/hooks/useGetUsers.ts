import {useEffect, useState} from "react";
import {User} from "../api/types";
import {axiosUsers} from "../api/api";

const useGetUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosUsers.get<User[]>("/api/v1/users").then((res) => {
            if (res.status === 200) {
                setUsers(res.data);
            }
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            setLoading(false);
        })
    }

    const clearUsers = () => {
        setUsers([]);
    };

    return {loading, users, getUsers, clearUsers};
}

export default useGetUsers;