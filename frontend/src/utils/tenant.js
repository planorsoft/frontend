export function getTenant() {
  // first lookup localstorage
  let subdomain =  localStorage.getItem('tenant');

  // if localstorage is empty
  if (subdomain) {
    return subdomain;
  }

  // lookup the url
  subdomain = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : "";
  
  // if subdomain is www, return empty string
  if (subdomain === 'www') {
    return "";
  }

  return subdomain;
}

export function setTenant(tenant) {
  localStorage.setItem('tenant', tenant);
}