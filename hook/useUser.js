import useSWR from "swr";
import jsCookie from 'js-cookie'
import axios from "axios";
import userFetcher from "../libs/credenciales";



export default function useUser() {
    const { data, mutate, error, isLoading } = useSWR("api_user", userFetcher);

    const loading = !data && !error;
    const loggedOut = error && error.status === 403;

    return {
        isLoading,
        loading,
        loggedOut,
        user: data,
        mutate

    }


}