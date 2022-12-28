export const getDiscount = (price, discount) => ((100 - discount) / 100) * price;

export const formatCurrency = number =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
