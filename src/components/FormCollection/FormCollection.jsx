import { Form } from "antd";
import FormCollectionContext from "./context";
import FormItems from "./FormItems";

const FormCollection = ({ options, children, form, ...otherProps }) => {
  const [innerForm] = Form.useForm(form);

  return (
    <FormCollectionContext.Provider value={{ form: innerForm }}>
      <Form {...otherProps} form={innerForm}>
        {options ? <FormItems options={options} /> : null}
        {children}
      </Form>
    </FormCollectionContext.Provider>
  );
};

FormCollection.useForm = (...args) => {
  return Form.useForm(...args);
};

export default FormCollection;
