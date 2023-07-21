import * as yup from 'yup';

export const schema = yup.object().shape({
  city: yup.string().required('Select a city from the list'),
  startDate: yup.number().required('Start date is a required field'),
  endDate: yup.number().required('End date is a required field'),
});
