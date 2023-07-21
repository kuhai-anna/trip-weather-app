import PropTypes from 'prop-types';
import css from './Section.module.css';

export const Section = ({ tag, mainTitle, accentWord, title, children }) => {
  let sectionContent;

  switch (tag) {
    case 'header':
      sectionContent = (
        <header className={css.header}>
          <div className={css.container}>{children}</div>
        </header>
      );
      break;
    case 'main':
      sectionContent = <main className={css.main}>{children}</main>;
      break;
    case 'footer':
      sectionContent = (
        <footer className={css.footer}>
          <div className={css.container}>{children}</div>
        </footer>
      );
      break;
    default:
      sectionContent = (
        <section className={css.section}>
          <div className={css.container}>
            {mainTitle ? (
              <h1 className={css.mainTitle}>
                {mainTitle} <span className={css.accentWord}>{accentWord}</span>
              </h1>
            ) : (
              <h2 className={css.sectionTitle}>{title}</h2>
            )}
            {children}
          </div>
        </section>
      );
      break;
  }

  return sectionContent;
};

Section.propTypes = {
  tag: PropTypes.string,
  mainTitle: PropTypes.string,
  accentWord: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
};
