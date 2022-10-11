export function numberToMonetary(number) {
  if (!number) return;
  const numCheck = /^[0-9,]/.test(number);
  if (!numCheck && number) return;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
