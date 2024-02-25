import type { TPromocode } from '@/types/api/promocode';

type TParams = {
  price: string
  parameterPriceDiff?: string | number
  count: number
  promocode?: TPromocode | null
}
export function getTotalPrice({
  price,
  parameterPriceDiff = 0,
  count,
  promocode,
}: TParams) {
  const finalCount = count;
  let finalCostPerThousand = parseFloat(price) + +parameterPriceDiff;
  let finalPrice;

  if (promocode && promocode.type === 'percent') {
    finalCostPerThousand *= 1 - +promocode.count / 100;
  }

  finalPrice = (finalCostPerThousand / 1000) * finalCount;

  if (promocode && promocode.type === 'count') {
    finalPrice -= parseFloat(promocode.count);
  }

  if (finalCount <= 0 || finalCostPerThousand <= 0 || finalPrice <= 0) {
    return 0;
  }

  return finalPrice;
}
