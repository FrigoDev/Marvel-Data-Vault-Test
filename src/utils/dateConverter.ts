import moment from "moment";

const dateConverter = (date: string) => {
  const dateMoment = moment(date.replace(/^-/, ""));
  const dateFormatted = dateMoment.format("DD/MM/YYYY");
  return dateFormatted;
};
export default dateConverter;
