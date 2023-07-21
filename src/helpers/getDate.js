import { addLeadingZero } from './addLeadingZero';

// Get date from timestamp in milliseconds
export const getDate = timestamp => {
  const newDate = new Date(timestamp);
  const day = addLeadingZero(newDate.getDate());
  const month = addLeadingZero(newDate.getMonth() + 1);
  const year = addLeadingZero(newDate.getFullYear());

  return {
    day,
    month,
    year,
  };
};
