import jwt_decode from "jwt-decode";

import { useUserStore } from "./stores/user"

// const userStore = useUserStore()

function getToken() {
    return localStorage.getItem('user.access');
    // return userStore.getToken();
}
// setToken(access_token: any) {
//     localStorage.setItem('token', access_token);
// },

async function decodeToken(token: any) {
    // Decode the token using a JWT library or manually parse the token
    const decodedToken = await jwt_decode(token);
    // console.log(decodedToken.exp);

    return decodedToken;
}

export const isTokenExpired = async () => {
    const token = getToken();
    if (!token) return true; // Token not found, treat as expired

    const decodedToken = await decodeToken(token);
    const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    return Date.now() >= expirationTime;
}
