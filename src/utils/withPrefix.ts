import clsx from "clsx";

export const prefix = "";

export const withPrefix = (...inputs: clsx.ClassValue[]): string => {
  return clsx(...inputs)
    .split(" ")
    .map((item) => {
      if (item) {
        if (prefix > "") {
          let updatedItem = item.replace(new RegExp(`${prefix}:`, "g"), "");
          updatedItem = updatedItem.replace(/--color-/g, `--${prefix}-color-`);
          return `${prefix}:${updatedItem}`;
        }
        return item;
      }
      return item;
    })
    .join(" ");
};
