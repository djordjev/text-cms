import { Link } from '@remix-run/react';
import { IconEdit } from '@tabler/icons-react';
import classnames from 'classnames';
import { FC, Fragment } from 'react';

import { Text } from '~/components/viewer/Text';
import { FileVariation } from '~/types';
import { ConditionAndChain, ConditionDescriptor } from '~/types/condition';

export interface VariationProps {
  className?: string;
  fileId?: number;
  variation: FileVariation;
}

const Variation: FC<VariationProps> = (props) => {
  const { className, fileId, variation } = props;

  // Hooks

  // Setup
  const { condition, id, name, text } = variation;

  // Styles
  const classes = classnames(
    'u-card u-shadow-xl u-mb-5x u-bg-base-300 u-p-3xs',
    className
  );

  // Handlers

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

  const renderEdit = () => {
    if (!fileId) return null;
    const to = `/editor/${fileId}/${variation.id}`;

    return (
      <Link className="u-link u-link-primary" to={to}>
        <IconEdit className="u-inline" /> Edit
      </Link>
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

        {renderEdit()}
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
