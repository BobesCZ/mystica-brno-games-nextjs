export const isCzechDateValid = (dateString: string) => {
  const regex = /(0?[1-9]|[12][0-9]|3[01])\. ?(0?[1-9]|1[0-2])\. ?20[0-9]{2}/;

  return regex.test(dateString);
};

export const getDateFromCzechDate = (dateString?: string): Date => {
  if (!dateString || !isCzechDateValid(dateString)) {
    return new Date(0);
  }

  const [d, m, y] = dateString.split('.');
  const date = new Date(`${m}/${d}/${y}`);

  return date;
};
