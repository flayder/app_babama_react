export function getFormatPriceString(price: string | number) {
  return typeof price === 'string' ? price.replace(',', '.') : price.toString();
}
