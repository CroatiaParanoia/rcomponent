import FormItem from "./FormItem";

const FormItems = ({ options }) => {
  return (
    <div className="form-items">
      {options.map((item, index) => {
        return <FormItem template={item} key={item.name || index} />;
      })}
    </div>
  );
};

export default FormItems;
