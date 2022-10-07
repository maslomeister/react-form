export const phoneNumberFormat = (phoneNumber: string): string => {
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");

  if (number.length < 3) return number.replace(/(\b[0-9])/, "$1");
  if (number.length < 7) return number.replace(/(\b[0-9])(\d{4})/, "$1-$2");
  if (number.length < 9) return number.replace(/(\b[1-9])(\d{4})(\d{2})/, "$1-$2-$3");
  return number.replace(/(\b[1-9])(\d{4})(\d{2})(\d{2})/, "$1-$2-$3-$4");
};
