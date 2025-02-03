export const formatString = (str: string) => {
    return str
      .trim()
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '');
  };