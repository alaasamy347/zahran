export const covertToSlug = (id, title) => {
  const renderedID = id ? "-" + id : "";
  return title ? title.replace(/ /g, "-").toLowerCase() + renderedID : "";
};

export const checkExistInCart = (cart, item) => {
  const existedItem = cart?.find((el) => el.id === item.id);
  if (existedItem) return existedItem.quantity;
  return null;
};
