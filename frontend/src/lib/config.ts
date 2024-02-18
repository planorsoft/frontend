export const isDevelopment = () => {
    return location.hostname.includes("localhost");
};

export const baseURL = isDevelopment() ? "http://localhost:5050/api" : "https://planor-be.azurewebsites.net/api";

export const setVersion = (version: string) => {
    localStorage.setItem("version", version);
}

export const getVersion = () => {
    return localStorage.getItem("version");
}

export const checkVersion = () => {
    if (isVersionChanged()) {
        localStorage.clear();
        setVersion(version);
    }
}

const isVersionChanged = () => {
    return getVersion() !== version;
}

export const version = "1.0.0";

