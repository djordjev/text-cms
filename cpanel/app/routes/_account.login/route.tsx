import type { MetaFunction } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { IconKey, IconMail } from '@tabler/icons-react';
import { FC } from 'react';

export interface AccountCreateProps {}

export const meta: MetaFunction = () => {
  return [
    { title: 'TextCMS Login' },
    { name: 'description', content: 'Log in to your account' }
  ];
};

const AccountCreate: FC<AccountCreateProps> = () => {
  // Styles
  const classesInput = `u-input u-input-bordered u-flex u-items-center u-gap-2 u-mb-3xs`;
  const classesHeading = `u-uppercase u-tracking-wide u-font-bold u-text-center u-mb-3x`;

  return (
    <div>
      <h1 className={classesHeading}>Log in to your account</h1>
      <Form className="u-mb-3xs">
        <label className={classesInput}>
          <IconMail aria-label="username" className="u-mr-2x" />
          <input type="text" className="u-grow" placeholder="Username" />
        </label>
        <label className={classesInput}>
          <IconKey aria-label="password" className="u-mr-2x" />
          <input type="password" className="u-grow" placeholder="Password" />
        </label>

        <button className="u-btn u-btn-outline u-w-full u-uppercase">
          Log In
        </button>
      </Form>

      <p>
        Create a new account{' '}
        <Link className="u-link" to="/create">
          here
        </Link>
      </p>
    </div>
  );
};

export default AccountCreate;
