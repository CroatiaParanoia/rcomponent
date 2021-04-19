import { useMemo } from "react";

const Text = ({ className, text, ...otherProps }) => {
  const realClassName = useMemo(() => {
    return [className, "form-item__text"].join(" ");
  }, [className]);

  return (
    <span className={realClassName} {...otherProps}>
      {text}
    </span>
  );
};

export default Text;
