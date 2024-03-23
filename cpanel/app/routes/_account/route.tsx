import { Outlet } from '@remix-run/react';
import { FC } from 'react';

export interface AccountProps {}

const Account: FC<AccountProps> = () => {
  return (
    <div className="u-flex u-items-center u-justify-center u-w-full">
      <div className="u-card u-shadow-xl u-card-bordered u-bg-secondary u-text-secondary-content md:u-w-4/12">
        <div className="u-card-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Account;
