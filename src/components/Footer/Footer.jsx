import { IconContext } from 'react-icons';
import { FaLinkedinIn } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import css from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={css.footerWrapper}>
      <p className={css.footerText}>&copy; 2023 | Developed by Anna Kuhai</p>
      <a
        className={css.footerLink}
        href="https://github.com/kuhai-anna"
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="GitHub link"
      >
        <IconContext.Provider
          value={{
            size: '16px',
          }}
        >
          <AiFillGithub />
        </IconContext.Provider>
      </a>
      <a
        className={css.footerLink}
        href="https://www.linkedin.com/in/anna-kuhai/"
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="LinkedIn link"
      >
        <IconContext.Provider
          value={{
            size: '16px',
          }}
        >
          <FaLinkedinIn />
        </IconContext.Provider>
      </a>
    </div>
  );
};
