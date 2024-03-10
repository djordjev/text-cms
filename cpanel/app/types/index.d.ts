import { ConditionGroup } from '~/types/condition';
import { CustomElement } from '~/types/editor';

export type CreateParam = 'new-file' | 'new-folder';

export type FormValues = { [p: string]: FormDataEntryValue };

export type FileVariation = {
  condition: ConditionGroup | null;
  id: string;
  name: string;
  text: CustomElement[];
};

export type FileVariationPayload = {
  condition: string | null;
  id: string;
  name: string;
  text: string;
};
