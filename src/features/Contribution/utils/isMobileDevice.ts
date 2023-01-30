export function isMobileDevice() {
  return navigator.maxTouchPoints || 'ontouchstart' in document.documentElement;
}
