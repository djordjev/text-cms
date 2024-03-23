import { IconAlertCircle } from '@tabler/icons-react';
import classnames from 'classnames';
import { FC } from 'react';

export interface ErrorListProps {
  className?: string;
  errors?: string[];
}

const ErrorList: FC<ErrorListProps> = (props) => {
  const { className, errors } = props;

  // Styles
  const classes = classnames('u-alert u-alert-error u-mb-3x', className);

  // Markup
  const renderErrors = () => {
    if (!errors) return null;

    return errors.map((e) => <div key={e}>{e}</div>);
  };

  // Short-circuit
  if (!errors?.length) return null;

  return (
    <div role="alert" className={classes}>
      <IconAlertCircle />
      <div>{renderErrors()}</div>
    </div>
  );
};

export { ErrorList };
