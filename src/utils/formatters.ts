export const formatPrice = (price: number, currency = 'SAR', lang: 'ar' | 'en' = 'ar'): string => {
  const formattedNumber = new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US').format(price);
  const currencySymbol = lang === 'ar' ? 'ر.س' : currency;
  return lang === 'ar' ? `${formattedNumber} ${currencySymbol}` : `${currencySymbol} ${formattedNumber}`;
};

export const formatDate = (dateString: string, lang: 'ar' | 'en' = 'ar'): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};
