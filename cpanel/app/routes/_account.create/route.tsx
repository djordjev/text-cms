import type { MetaFunction } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { IconKey, IconMail } from '@tabler/icons-react';
import { FC } from 'react';

import { ErrorList } from '~/components/global/ErrorList';

import { action } from './action';
export interface AccountCreateProps {}

export const meta: MetaFunction = () => {
  return [
    { title: 'TextCMS Sign Up' },
    { name: 'description', content: 'Create a new account' }
  ];
};

const AccountCreate: FC<AccountCreateProps> = () => {
  // Data
  const data = useActionData<typeof action>();

  // Styles
  const classesInput = `u-input u-input-bordered u-flex u-items-center u-gap-2 u-mb-3xs`;
  const classesHeading = `u-uppercase u-tracking-wide u-font-bold u-text-center u-mb-3x`;

  return (
    <div>
      <h1 className={classesHeading}>Create a new account</h1>
      <ErrorList errors={data?.errors} />
      <Form className="u-mb-3xs" method="POST">
        <label className={classesInput}>
          <IconMail aria-label="username" className="u-mr-2x" />
          <input
            className="u-grow"
            name="username"
            placeholder="Username"
            type="text"
          />
        </label>
        <label className={classesInput}>
          <IconKey aria-label="password" className="u-mr-2x" />
          <input
            className="u-grow"
            name="password"
            placeholder="Password"
            type="password"
          />
        </label>

        <label className={classesInput}>
          <IconKey aria-label="repeat password" className="u-mr-2x" />
          <input
            className="u-grow"
            name="passwordRepeat"
            placeholder="Repeat password"
            type="password"
          />
        </label>

        <button className="u-btn u-btn-outline u-w-full u-uppercase">
          Sign Up
        </button>
      </Form>

      <p>
        Already have an account? Log in{' '}
        <Link className="u-link" to="/login">
          here
        </Link>
      </p>
    </div>
  );
};

export { action };
export default AccountCreate;
