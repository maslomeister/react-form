export const phoneNumberFormat = (phoneNumber: string): string => {
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");

  if (number.length < 6) return number.replace(/(\b[0-9])([0-9]+)/, "$1-$2");
  if (number.length < 8) return number.replace(/(\b[1-9])(\d{4})([0-9]+)/, "$1-$2-$3");
  if (number.length <= 11) return number.replace(/(\b[1-9])(\d{4})(\d{2})([0-9]+)/, "$1-$2-$3-$4");
  return number.replace(/(\b[1-9])(\d{4})(\d{2})(\d{2})/, "$1-$2-$3-$4");
};
