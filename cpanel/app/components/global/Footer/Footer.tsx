export interface FooterProps {}

const Footer = () => {
  return (
    <footer className="u-footer u-footer-center u-p-2x u-bg-base-300 u-text-base-content">
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
