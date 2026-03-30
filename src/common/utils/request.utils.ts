export const getSingleString = (
  value: string | string[] | undefined
): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

export const getSingleNumber = (
  value: string | string[] | undefined
): number | undefined => {
  const parsedValue = getSingleString(value);

  if (!parsedValue) {
    return undefined;
  }

  const numberValue = Number(parsedValue);

  return Number.isNaN(numberValue) ? undefined : numberValue;
};

export const getSingleBoolean = (
  value: string | string[] | undefined
): boolean | undefined => {
  const parsedValue = getSingleString(value);

  if (parsedValue === undefined) {
    return undefined;
  }

  if (parsedValue === 'true') {
    return true;
  }

  if (parsedValue === 'false') {
    return false;
  }

  return undefined;
};