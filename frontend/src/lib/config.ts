export const isDevelopment = location.hostname === "localhost" ? false : true;
export const baseURL = isDevelopment ? "http://localhost:5050/api" : "http://20.107.139.16/api";
