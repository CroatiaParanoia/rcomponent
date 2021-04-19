import FormCollection, {
  FormItem,
  FormItems,
} from "./../components/FormCollection";

import { Input, Select } from "antd";
import { useCallback } from "react";

const Template = (args) => {
  const [form] = FormCollection.useForm();

  const handleOutput = useCallback(() => {
    const value = form.getFieldsValue();

    console.log(value, "value");
  }, [form]);

  return (
    <div>
      <button onClick={handleOutput}>输出</button>
      {/* <button>输出</button> */}
      <FormCollection {...args} form={form} />
    </div>
  );
};

export const Primary = Template.bind({});

FormCollection.provide({
  formMapping: {
    Input,
    Select,
  },
});

const options = [
  {
    element: "Input",
    label: "名字",
    name: "name",
    config: { placeholder: "请输入名字" },
  },
  {
    label: "render",
    // name: "renderValue",
    config: { placeholder: "请输入名字" },
    render(renderValue, template, form) {
      const name = form.getFieldValue("name");
      return <div>name的值是 {name}</div>;
    },
    dependencies: ["name"],
  },
  {
    element: "Select",
    label: "班级",
    name: "class",
    config: {
      placeholder: "请选择班级",
      options: [
        { label: "班级1", value: "1" },
        { label: "班级2", value: "2" },
        { label: "班级3", value: "3" },
      ],
    },
  },
];

Primary.args = {
  options,
};

const config = {
  title: "Example/FormCollection",
  // component: FormCollection,
  argTypes: {},
};

export default config;
