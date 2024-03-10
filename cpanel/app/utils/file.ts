import { FileVariation } from '~/types';
import {
  ConditionAndChain,
  ConditionDescriptor,
  ConditionGroup,
  ConditionOperator
} from '~/types/condition';
import { CustomElement } from '~/types/editor';

const isHome = (name: string) => {
  return name.toLowerCase() === 'finder';
};

const isFile = (name: string) => {
  return name.endsWith('.txt');
};

const isFolder = (name: string) => {
  return !isFile(name);
};

const getPathFromSegments = (segments: string[], segment: string) => {
  const index = segments.indexOf(segment);

  if (index < 1) return '/finder';

  const mapped = segments.slice(0, index + 1).map((segment) => {
    if (isHome(segment)) return 'finder';

    return segment;
  });

  const joined = mapped.join('/');

  return `/${joined}`;
};

const parseDescriptor = (descriptor: unknown): ConditionDescriptor => {
  const msg = 'incorrect descriptor format';

  if (!Array.isArray(descriptor)) throw new Error(msg);
  if (descriptor.length !== 3) throw new Error(msg);

  const [name, operator, value] = descriptor;

  if (typeof name !== 'string') throw new Error(msg);
  if (typeof value !== 'string') throw new Error(msg);
  if (typeof operator !== 'string') throw new Error(msg);

  const operators = ['=', '>', '>=', '<', '<=', 'in'];
  const isValid = operators.includes(operator);

  if (!isValid) throw new Error(msg);

  return [name, operator as ConditionOperator, value];
};

const parseAndChain = (andChain: unknown): ConditionAndChain => {
  if (!Array.isArray(andChain)) throw new Error('incorrect and chain format');

  return andChain.map(parseDescriptor);
};

const parseConditions = (str?: string): ConditionGroup | null => {
  if (!str) return null;

  const parsed = JSON.parse(str);

  if (!Array.isArray(parsed)) return null;

  try {
    return parsed.map(parseAndChain);
  } catch {
    return null;
  }
};

const parseText = (text: string): CustomElement[] => {
  if (!text) throw new Error('invalid text format');

  const parsed = JSON.parse(text);

  if (!Array.isArray(parsed)) throw new Error('invalid text format');

  return parsed.map((v) => {
    const descendant: CustomElement = { ...v };

    return descendant;
  });
};

const parseFileVariations = (str: string): FileVariation[] | null => {
  if (!str) return null;

  const parsed = JSON.parse(str);

  if (!Array.isArray(parsed)) return null;

  const hasFields = parsed.every((e) => e.name && e.id && e.text);

  if (!hasFields) return null;

  return parsed.map((i) => {
    const variation: FileVariation = {
      condition: i.condition,
      id: i.id,
      name: i.name,
      text: i.text
    };

    return variation;
  });
};

export {
  getPathFromSegments,
  isFile,
  isFolder,
  isHome,
  parseConditions,
  parseFileVariations,
  parseText
};
