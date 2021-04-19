const formElementWrapper = (Component) => {
  const formElement = (props) => {
    return <Component {...props} />;
  };

  formElement.hasWrapper = true;

  return formElement;
};

const hasFormElementWrapper = (formElement) => {
  return !!formElement.hasWrapper;
};

export const withWrapper = (formMapping = {}) => {
  return Object.keys(formMapping).reduce((res, key) => {
    const formElement = formMapping[key];
    if(!hasFormElementWrapper(formElement)) {
      res[key] = formElementWrapper(formElement);
    }
    return res;
  }, {});
};

export default formElementWrapper;
