import {useEffect} from "react";
import useUser from "./useUser";
import {axiosUsers} from "../api/api";

const useAxiosUsersPrivate = () => {
    const {user} = useUser();

    useEffect(() => {
        const requestIntercept = axiosUsers.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${user.accessToken}`;
                }

                return config;
            }, (err) => Promise.reject(err)
        );

        return () => {
            axiosUsers.interceptors.request.eject(requestIntercept);
        }
    }, [user]);

    return axiosUsers;
}

export default useAxiosUsersPrivate;