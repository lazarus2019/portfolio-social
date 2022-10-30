import Moment from "moment";
const dateFormatter = (date) => {
  return Moment(date).format("D MMM YYYY");
};

export const fromNowDateFormatter = (date) => {
  return Moment(date).fromNow();
};

export default dateFormatter;
