type TActionsConfig = {
  [key: string]: (arg: unknown) => string | boolean | undefined;
};

type TTypesConfig = {
  [key: string]: (arg: unknown) => boolean;
};

const actionsConfig: TActionsConfig = {
  string: (arg: unknown) => arg as string,
  object: (arg: unknown) => {
    if (typeof arg === 'object' && arg !== null && !Array.isArray(arg)) {
      return Object.keys(arg)
        .filter((key) => (arg as Record<string, unknown>)[key])
        .join(' ')
        .trim();
    }
    return '';
  },
  array: (arg: unknown) => (arg as unknown[]).join(' ').trim(),
};

const typesConfig: TTypesConfig = {
  string: (arg: unknown): arg is string => typeof arg === 'string',
  object: (arg: unknown): arg is Record<string, unknown> =>
    typeof arg === 'object' && !Array.isArray(arg),
  array: (arg: unknown): arg is unknown[] => Array.isArray(arg),
};

const mapConfigs = (arg: unknown) => {
  const argType = Object.keys(typesConfig).find((key) => typesConfig[key](arg));
  return actionsConfig[argType!](arg);
};

const getClassName = (...args: unknown[]) =>
  args
    .filter(Boolean)
    .map((arg) => mapConfigs(arg))
    .join(' ')
    .trim();

export { getClassName };
