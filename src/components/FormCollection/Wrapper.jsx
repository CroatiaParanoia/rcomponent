import { useMemo } from "react";

const Wrapper = ({ className, ...otherProps }) => {
  const realClassName = useMemo(() => {
    return [className, "form-item__wrapper"].join(" ");
  }, [className]);

  return <div className={realClassName} {...otherProps}></div>;
};

export default Wrapper;
