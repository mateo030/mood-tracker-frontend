export const checkMaxValue = (param: string, value: number) => {
  if (param.length > value) {
    return true;
  }
  return false;
};

export const checkMinValue = (param: string, value: number) => {
  if (param.length < value) {
    return true;
  }
  return false;
};

//TODO: Add more complex logic for password validation
