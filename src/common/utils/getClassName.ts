type TActionsConfig = {
  [key: string]: (arg: any) => string;
};

type TTypesConfig = {
  [key: string]: (arg: any) => boolean;
};

const actionsConfig: TActionsConfig = {
  string: (arg: string) => arg,
  object: (arg: Record<string, any>) =>
    Object.keys(arg)
      .filter((key) => arg[key])
      .join(' ')
      .trim(),
  array: (arg: any[]) => arg.join(' ').trim(),
};

const typesConfig: TTypesConfig = {
  string: (arg: any): arg is string => typeof arg === 'string',
  object: (arg: any): arg is Record<string, any> =>
    typeof arg === 'object' && !Array.isArray(arg),
  array: (arg: any): arg is any[] => Array.isArray(arg),
};

const mapConfigs = (arg: any) => {
  const argType = Object.keys(typesConfig).find((key) => typesConfig[key](arg));
  return actionsConfig[argType!](arg);
};

const getClassName = (...args: any[]) =>
  args
    .filter(Boolean)
    .map((arg) => mapConfigs(arg))
    .join(' ')
    .trim();

export default getClassName;
