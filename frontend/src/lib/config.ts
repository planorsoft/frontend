export const isDevelopment = location.hostname === "localhost";
export const baseURL = isDevelopment ? "http://localhost:5050/api" : "https://planor-backend.azurewebsites.net/api";


