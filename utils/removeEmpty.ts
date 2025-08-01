export const removeEmpty = (obj: Record<string, any>) => {
  const newObj: Record<string, any> = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
