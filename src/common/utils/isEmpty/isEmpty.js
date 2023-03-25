const isEmpty = (arg) => {
  if (Array.isArray(arg) && arg.length === 0) return true;
  if (typeof arg === 'object' && Object.keys(arg).length === 0) return true;
  if (typeof arg === 'string' && arg.trim().length === 0) return true;
  if (typeof arg === 'number' && arg === 0) return true;
  if (typeof arg === 'boolean' && arg === false) return true;
  if (arg === null) return true;
  if (arg === undefined) return true;
  return false;
};

export default isEmpty;
