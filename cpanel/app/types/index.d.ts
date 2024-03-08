export type CreateParam = 'new-file' | 'new-folder';

export type FormValues = { [p: string]: FormDataEntryValue };

export type FileVariation = {
  condition?: string;
  id: string;
  name: string;
  text: string;
};

export type Payload<T> = {
  data?: T;
  error?: string;
  errors?: Record<string, string>;
};
