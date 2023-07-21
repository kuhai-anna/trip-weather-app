import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import { IconContext } from 'react-icons';
import { AiOutlineCalendar, AiOutlineDown } from 'react-icons/ai';
import { addTrips } from 'redux/trips/tripsSlice';
import { schema } from 'utils/schema';
import { cities } from 'constants/cities';
import css from './CreateTripForm.module.css';
import 'flatpickr/dist/flatpickr.css';

// <Field type="datetime-local" id="datetime" name="datetime"></Field>

const initialValues = {
  city: '',
  startDate: '',
  endDate: '',
};

// Parameters object for dates
const options = {
  enableTime: true,
  time_24hr: true,
  minDate: 'today',
  maxDate: new Date().fp_incr(15),
  minuteIncrement: 1,
};

export const CreateTripForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const onFormSubmit = ({ city, startDate, endDate }, { resetForm }) => {
    dispatch(addTrips(city, startDate, endDate));
    resetForm();
    onClose();
  };

  return (
    <>
      <h3 className={css.formTitle}>Create trip</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={schema}
      >
        <Form>
          <div className={css.formElement}>
            <label className={css.label} htmlFor="city">
              <span className={css.asterisk}>* </span>City
            </label>
            <div className={css.inputWrapper}>
              <Field className={css.selectInput} as="select" name="city">
                <option className={css.inputOption} value="" disabled>
                  Please select a city
                </option>
                {cities.map(city => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </Field>
              <IconContext.Provider
                value={{
                  size: '14px',
                }}
              >
                <AiOutlineDown className={css.inputIcon} />
              </IconContext.Provider>
            </div>

            <ErrorMessage
              className={css.errorMessage}
              name="city"
              component="div"
            />
          </div>

          <div className={css.formElement}>
            <label className={css.label} htmlFor="startDate">
              <span className={css.asterisk}>* </span>Start date
            </label>
            <div className={css.inputWrapper}>
              <Field className={css.input} id="startDate" name="startDate">
                {({ field, form }) => (
                  <Flatpickr
                    className={css.input}
                    name="startDate"
                    options={options}
                    value={field.value}
                    onChange={date => {
                      form.setFieldValue('startDate', date[0]?.getTime());
                    }}
                    placeholder="Select date"
                  />
                )}
              </Field>
              <IconContext.Provider
                value={{
                  size: '14px',
                }}
              >
                <AiOutlineCalendar className={css.inputIcon} />
              </IconContext.Provider>
            </div>
            <ErrorMessage
              className={css.errorMessage}
              name="startDate"
              component="div"
            />
          </div>

          <div className={css.formElement}>
            <label className={css.label} htmlFor="endDate">
              <span className={css.asterisk}>* </span>End date
            </label>
            <div className={css.inputWrapper}>
              <Field className={css.input} id="endDate" name="endDate">
                {({ field, form }) => (
                  <Flatpickr
                    className={css.input}
                    name="endDate"
                    options={options}
                    value={field.value}
                    onChange={date => {
                      form.setFieldValue('endDate', date[0]?.getTime());
                    }}
                    placeholder="Select date"
                  />
                )}
              </Field>
              <IconContext.Provider
                value={{
                  size: '14px',
                }}
              >
                <AiOutlineCalendar className={css.inputIcon} />
              </IconContext.Provider>
            </div>
            <ErrorMessage
              className={css.errorMessage}
              name="endDate"
              component="div"
            />
          </div>

          <ul className={css.buttonList}>
            <li>
              <button className={css.cancelBtn} type="reset">
                Cancel
              </button>
            </li>
            <li>
              <button className={css.saveBtn} type="submit">
                Save
              </button>
            </li>
          </ul>
        </Form>
      </Formik>
    </>
  );
};

CreateTripForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
