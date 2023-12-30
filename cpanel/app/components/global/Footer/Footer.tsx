import classnames from "classnames";

const Footer = () => {
  // Styles
  const classes = classnames(
    "u-flex u-flex-col u-items-center u-border-t u-border-solid u-pt-2xs",
    "u-border-b-primary-700 u-text-primary-300 u-text-primary-300 u-opacity-40"
  );

  return (
    <div className={classes}>
      <div className="u-text-black">Created by Djordje Vukovic</div>
      <a
        href="https://github.com/djordjev/text-cms"
        rel="noreferrer"
        target="_blank"
      >
        GitHub
      </a>
    </div>
  );
};

export { Footer };
