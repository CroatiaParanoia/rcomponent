import Text from "./Text";
import Wrapper from "./Wrapper";
import { withWrapper } from "./formElementWrapper";

let formMapping = {
  Text,
  Wrapper,
};

export const setFormMapping = (newFormMapping) => {
  formMapping = {
    ...formMapping,
    ...withWrapper(newFormMapping),
  };
};

export const getFormElementByName = (name) => {
  return formMapping[name];
};
