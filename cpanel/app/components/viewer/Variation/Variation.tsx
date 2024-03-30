import { Link, useFetcher } from '@remix-run/react';
import { IconArrowsMove, IconEdit, IconTrash } from '@tabler/icons-react';
import classnames from 'classnames';
import { FC, Fragment } from 'react';

import { Text } from '~/components/viewer/Text';
import { BUTTON_ACTION } from '~/constants';
import { FileVariation } from '~/types';
import { ConditionAndChain, ConditionDescriptor } from '~/types/condition';

export interface VariationProps {
  className?: string;
  draggable?: boolean;
  fileId?: number;
  variation: FileVariation;
}

const Variation: FC<VariationProps> = (props) => {
  const { className, draggable, fileId, variation } = props;

  // Hooks
  const fetcher = useFetcher();

  // Setup
  const { condition, id, name, text } = variation;

  // Styles
  const classes = classnames(
    'u-card u-shadow-xl u-mb-5x u-bg-base-300 u-p-3xs',
    className
  );

  // Handlers
  const onDelete = () => {
    const data = {
      [BUTTON_ACTION]: 'delete',
      fileId: fileId ?? '',
      variation: id
    };

    fetcher.submit(data, { method: 'DELETE' });
  };

  // Markup
  const renderDescriptor = (descriptor: ConditionDescriptor, index: number) => {
    const [name, operator, value] = descriptor;
    return (
      <Fragment key={index}>
        <span>
          {name} {operator} {value}
        </span>
        <span className="u-font-bold u-text-secondary-content last:u-hidden">
          {' '}
          AND{' '}
        </span>
      </Fragment>
    );
  };

  const renderAndChain = (andChain: ConditionAndChain, index: number) => {
    return (
      <Fragment key={index}>
        <div>{andChain.map(renderDescriptor)}</div>
        <div className="u-divider last:u-hidden u-my-1xs">OR</div>
      </Fragment>
    );
  };

  const renderConditions = () => {
    if (!condition) {
      return (
        <span className="u-text-info u-font-bold u-inline-block">Always</span>
      );
    }

    return <div>{condition.map(renderAndChain)}</div>;
  };

  const renderActions = () => {
    if (!fileId) return null;
    const to = `/editor/${fileId}/${variation.id}`;

    if (draggable) {
      return <IconArrowsMove aria-label="move" />;
    }

    return (
      <div className="u-flex u-gap-1x">
        <fetcher.Form method="DELETE">
          <button
            className="u-link u-link-primary"
            onClick={onDelete}
            type="button"
          >
            <IconTrash className="u-inline" /> Delete
          </button>
        </fetcher.Form>
        <Link className="u-link u-link-primary" to={to}>
          <IconEdit className="u-inline" /> Edit
        </Link>
      </div>
    );
  };

  return (
    <div className={classes} key={id}>
      <div className="u-mb-1x u-flex">
        <div className="u-flex-1">
          <span className="u-italic">Variation Name: </span>
          <h4 className="u-text-secondary-content u-font-bold u-inline">
            {name}
          </h4>
        </div>

        {renderActions()}
      </div>

      <div className="u-flex u-mb-1x">
        <span className="u-mr-3x u-italic">Conditions:</span>
        {renderConditions()}
      </div>

      <div>
        <h5 className="u-italic u-mb-2xs">Text:</h5>
        <Text text={JSON.stringify(text)} />
      </div>
    </div>
  );
};

export { Variation };
