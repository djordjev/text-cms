import { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { isRouteErrorResponse, useRouteError } from 'react-router';

const ErrorBoundary: ErrorBoundaryComponent = () => {
  // Hooks
  const error = useRouteError();

  // Setup
  const isResponse = isRouteErrorResponse(error);

  const title = isResponse
    ? `${error.status} ${error.statusText}`
    : 'Something went wrong :(';

  return (
    <div className="u-card u-shadow-xl u-bg-base-300 u-p-6x u-mx-auto u-inline-block u-self-start">
      <h1 className="u-text-error u-text-3xl u-mb-1x">{title}</h1>
      <p className="u-text-md u-uppercase u-font-bold">
        Please refresh or try again later!
      </p>
    </div>
  );
};

export { ErrorBoundary };
