export function getTenant() {
  const subdomain = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : "";
  
  if (subdomain === 'www') {
    return "";
  }

  return subdomain;
}

export function setTenant(tenant : string) {
  localStorage.setItem('tenant', tenant);
}