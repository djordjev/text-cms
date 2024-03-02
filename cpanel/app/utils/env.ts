const readEnvVariable = <T = string>(name: string) => {
  const vars = process.env;

  const val = vars[name];
  if (!val) throw new Error(`Variable ${name} not supplied`);

  return val as T;
};

export { readEnvVariable };
