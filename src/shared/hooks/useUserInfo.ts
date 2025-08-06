import useSWR from "swr";

export const USER_INFO_KEY = 'user_info';

const fetcher = () => fetch('/api/user').then((res) => res.json())

export const useUserInfo = () => {
    return useSWR(USER_INFO_KEY, fetcher)
}
