import { getFormatPriceString } from '@/helpers/price/getFormatPriceString';

type TOptions = Parameters<typeof Intl.NumberFormat>[1]

export function getCurrencyFormatPrice(value: string | number, options?: TOptions): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'symbol',
    useGrouping: false,
    ...options,
  }).format(Number(getFormatPriceString(value)));
}
