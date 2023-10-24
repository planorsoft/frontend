import { isDevelopment } from "./config";

export function getTenant() {
  const subdomain = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : "";
  if (subdomain === 'www') {
    return "";
  }

  if (subdomain === 'app') {
    return "";
  }

  return subdomain;
}

export function setTenant(tenant : string, redirect : string) {
  if (isDevelopment) {
    window.location.assign(`http://${tenant}.localhost:3030${redirect}`);
  } else {
    window.location.assign(`http://${tenant}.planorsoft.com${redirect}`);
  }
  localStorage.setItem('tenant', tenant);
}