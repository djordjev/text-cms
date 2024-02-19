import classnames from 'classnames';
import { FC } from 'react';

export interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = (props) => {
  const { className } = props;

  // Styles
  const classes = classnames(
    'u-footer u-footer-center u-p-2x u-bg-base-300 u-text-base-content',
    className
  );

  return (
    <footer className={classes}>
      <aside className="u-block">
        <p className="u-inline-block">Copyright © 2024 - Djordje Vukovic</p>
        <div className="u-mx-2xs u-inline">/</div>
        <a
          href="https://github.com/djordjev/text-cms"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </aside>
    </footer>
  );
};

export { Footer };
