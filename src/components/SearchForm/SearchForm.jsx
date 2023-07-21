import { useDispatch, useSelector } from 'react-redux';
import { IconContext } from 'react-icons';
import { GrSearch } from 'react-icons/gr';
import { selectFilter } from 'redux/filter/selectors';
import { changeFilter } from 'redux/filter/filterSlice';
import css from './SearchForm.module.css';

export const SearchForm = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilter);

  const onFilterContacts = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };

  return (
    <div className={css.inputWrapper}>
      <IconContext.Provider
        value={{
          size: '17px',
        }}
      >
        <GrSearch className={css.iconSearch} />
      </IconContext.Provider>
      <input
        className={css.searchInput}
        type="text"
        placeholder="Search your trip"
        value={filterValue}
        onChange={onFilterContacts}
      />
    </div>
  );
};
