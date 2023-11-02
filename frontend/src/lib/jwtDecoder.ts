import jwtDecode from "jwt-decode";

export default function jwtDecoder(jwt? : string) : {
    email: string,
    exp: number,
    roles: Array<string>,
} {
    if (!jwt) {
        jwt = localStorage.getItem("token");
    }
    
    const decoded = jwtDecode(jwt);

    delete decoded["nbf"];
    delete decoded["aud"];
    delete decoded["iss"];

    return decoded;
}