/**
 * Format currency utility for Nigerian Naira (NGN).
 * The backend stores currency amounts as integer kobo (1 NGN = 100 kobo).
 */

/**
 * Converts kobo integer to formatted Naira string.
 * @param {number} kobo - Amount in kobo (integer)
 * @param {Object} [options]
 * @param {boolean} [options.showDecimals=false] - Whether to show .00 decimal places
 * @returns {string} e.g. "₦5,000" or "₦5,000.00"
 */
export function formatCurrency(kobo, options = {}) {
  const { showDecimals = false } = options;
  if (kobo == null || isNaN(kobo)) return '₦0';

  const naira = Math.round(kobo) / 100;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(naira);
}

/**
 * Converts kobo to plain Naira number.
 * @param {number} kobo
 * @returns {number}
 */
export function koboToNaira(kobo) {
  if (kobo == null || isNaN(kobo)) return 0;
  return Math.round(kobo) / 100;
}

/**
 * Converts Naira input to integer kobo.
 * @param {number|string} naira
 * @returns {number} integer kobo
 */
export function nairaToKobo(naira) {
  if (naira == null || isNaN(Number(naira))) return 0;
  return Math.round(Number(naira) * 100);
}
