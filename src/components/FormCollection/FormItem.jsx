import { Form } from "antd";
import { useCallback, useContext, useMemo } from "react";
import { getFormElementByName } from "./formMapping";
import context from "./context";
const Item = Form.Item;

const FormItem = ({ template, ...otherProps }) => {
  const { element, config, name, render, ...otherTemplate } = template;

  const { form } = useContext(context);

  const isWrapper = useMemo(() => {
    return element === "Wrapper";
  }, [element]);

  const isText = useMemo(() => {
    return element === "Text";
  }, [element]);

  const renderChild = useCallback(
    (children) => {
      if (typeof render === "function") {
        return () => {
          const value = form.getFieldValue(name);
          return render(value, template, form);
        };
      }

      const Component = getFormElementByName(element);

      return <Component {...config}>{children}</Component>;
    },
    [element, config, name, form, template, render]
  );

  const renderFormItem = useCallback(
    (children) => {
      const realName = typeof children === "function" ? undefined : name;
      return (
        <Item name={realName} {...otherTemplate} {...otherProps}>
          {children}
        </Item>
      );
    },
    [name, otherTemplate, otherProps]
  );

  const renderFormItems = useCallback(() => {
    const { content } = template;

    if (!Array.isArray(content)) {
      throw new Error(`'content' is required in Wrapper!`);
    }

    const children = content.map((item) => {
      return <FormItem template={item} />;
    });
    const wrapper = renderChild(children);

    return renderFormItem(wrapper);
  }, [template, renderChild, renderFormItem]);

  if (isWrapper) {
    return renderFormItems();
  }

  const children = renderChild();

  if (isText) {
    return children;
  }

  return renderFormItem(children);
};

export default FormItem;
