const dateConverter = (date: string) => {
  const dateObject = new Date(date);
  if(!dateObject || !dateObject.getDate()) return null;
  const dateFormatted = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
  return dateFormatted;
};

export default dateConverter;
