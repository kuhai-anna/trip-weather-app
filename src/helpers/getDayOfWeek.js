export const getDayOfWeek = date => {
  const dateObject = new Date(date);
  const dayOfWeek = dateObject.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  return dayOfWeek;
};
