export function makeTimeString(time) {
  return new Date(time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'});
}