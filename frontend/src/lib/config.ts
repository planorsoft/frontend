export const isDevelopment = () => {
    return location.hostname.includes("localhost");
};
export const baseURL = isDevelopment() ? "https://planor-backend.azurewebsites.net/api" : "http://localhost:5050/api";


