export function getTenant() {
  return window.location.hostname.split('.')[0];
}