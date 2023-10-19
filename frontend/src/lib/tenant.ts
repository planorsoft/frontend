export function getTenant() {
  const subdomain = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : "";
  if (subdomain === 'www') {
    return "";
  }

  return subdomain;
}

export function setTenant(tenant : string, redirect : string) {
  window.location.assign(`http://${tenant}.localhost:3030${redirect}`);
  localStorage.setItem('tenant', tenant);
}