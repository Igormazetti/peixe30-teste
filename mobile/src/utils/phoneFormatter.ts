export const formatPhoneNumber = (number: string) => {
  const cleaned = ('' + number).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return number;
};

export const parsePhoneNumber = (number: string) => {
  const cleaned = ('' + number).replace(/\D/g, '');
  return cleaned;
};
