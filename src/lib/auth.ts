import { AUTH_TOKEN_KEY, USER_INFO_KEY, WALLET_MNEMONIC_KEY } from "@/config/consts";

export const setAuthToken = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

export const removeAuthToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
}

export const logoutAccount = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
    localStorage.removeItem(WALLET_MNEMONIC_KEY);
}