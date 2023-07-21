// Edit time display to '00' format
export const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};
