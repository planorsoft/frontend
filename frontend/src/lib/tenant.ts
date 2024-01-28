import { getTenantByName } from "@/containers/Identity/service";
import { isDevelopment } from "./config";

export function getTenant() {
  const subdomain = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : "";
  if (subdomain === 'www') {
    return "";
  }

  if (subdomain === 'app') {
    return "";
  }

  if (subdomain === "") {
    return "";
  }

  getTenantByName(subdomain).then((tenant) => {
    if (tenant === null) {
      replaceSubdomain('app');
    }
  }).catch((error) => {
    console.log(error);
    replaceSubdomain('app');
  })

  return subdomain;
}

export function setTenant(tenant: string, redirect: string) {
  if (isDevelopment()) {
    window.location.assign(`http://${tenant}.localhost:3030${redirect}`);
  } else {
    window.location.assign(`http://${tenant}.planorsoft.com${redirect}`);
  }
  localStorage.setItem('tenant', tenant);
}


const replaceSubdomain = (subdomain: string) => {
  const host = window.location.href;
  const slashSplit = host.split('//');
  const dotSplit = host.split('.');

  if (dotSplit.length < 2) {
    return;
  }

  const result = slashSplit[0] + `//${subdomain}.` + dotSplit[1];
  window.location.assign(result);
}