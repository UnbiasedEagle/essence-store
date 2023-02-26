export const showError = (name, errors) => {
  const exist = errors.find((err) => err.param === name);

  if (exist) {
    return exist.msg;
  }

  return null;
};

export const getDiscountPrice = (price, discount) => {
  const percentage = discount / 100;
  const discountedPrice = price - price * percentage;
  return discountedPrice;
};
