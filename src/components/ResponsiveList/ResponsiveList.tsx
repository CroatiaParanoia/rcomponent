import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import useResponsiveList from "./useResponsiveList";

import "./list.css";

export interface ResponsiveListProps {
  defaultItemWidth?: number;
  itemMarginRight?: number;
  itemMarginBottom?: number;
}

const responsiveListContext = createContext({
  containerWidth: 0,
  defaultItemWidth: 0,
  proposeItemWidth: 0,
  itemCountOfLine: 0,
  itemMarginBottom: 0,
  itemMarginRight: 0,
});

function getProposeItemWidth({
  containerWidth = 800,
  defaultItemValue = 250,
  maxItemWidth = 300,
  minItemWidth = 200,
  itemMarginRightValue = 12,
  itemMarginBottomValue = 12,
}) {
  // const

  const itemCountOfLine = Math.floor(containerWidth / defaultItemValue);
  const restPxOfItemWidth = containerWidth - itemCountOfLine * defaultItemValue;
  const totalMarginRightValue = (itemCountOfLine - 1) * itemMarginRightValue;
  const restPxOfClearMarginRight = restPxOfItemWidth - totalMarginRightValue;
  let currentItemWidth = Math.floor(
    defaultItemValue + restPxOfClearMarginRight / itemCountOfLine
  );

  if (currentItemWidth > maxItemWidth) {
    currentItemWidth = maxItemWidth;
  }

  return { proposeItemWidth: currentItemWidth, itemCountOfLine };
}
getProposeItemWidth({ containerWidth: 800 });
// 800 , 200 + 20, 200 + 20
const ResponsiveList: React.FC<ResponsiveListProps> = ({
  children,
  defaultItemWidth = 250,
  itemMarginBottom = 12,
  itemMarginRight = 12,
}) => {
  const [container, containerWidth] = useResponsiveList();

  const [layoutInfo, setLayoutInfo] = useState(() => {
    return getProposeItemWidth({
      containerWidth,
      defaultItemValue: defaultItemWidth,
    });
  });

  const contextValue = useMemo(() => {
    return {
      containerWidth,
      defaultItemWidth,
      proposeItemWidth: layoutInfo.proposeItemWidth,
      itemCountOfLine: layoutInfo.itemCountOfLine,
      itemMarginBottom,
      itemMarginRight,
    };
  }, [
    containerWidth,
    layoutInfo,
    defaultItemWidth,
    itemMarginBottom,
    itemMarginRight,
  ]);


  useEffect(() => {
    const layoutInfo = getProposeItemWidth({
      containerWidth,
    });

    setLayoutInfo(layoutInfo);
  }, [containerWidth]);

  return (
    <responsiveListContext.Provider value={contextValue}>
      <div ref={container} className="list">
        {children}
      </div>
    </responsiveListContext.Provider>
  );
};

export interface ResponsiveListItemProps {
  className?: string;
  style?: React.CSSProperties;
  index: number;
}

export const ResponsiveListItem: React.FC<ResponsiveListItemProps> = ({
  children,
  className = "",
  style = {},
  index,
}) => {
  const { itemCountOfLine, proposeItemWidth, itemMarginRight } = useContext(
    responsiveListContext
  );

  const currentMarginRight = useMemo(() => {
    if ((index + 1) % itemCountOfLine) {
      return itemMarginRight;
    }
    return 0;
  }, [index, itemCountOfLine, itemMarginRight]);

  return (
    <div
      className={`list-item ${className}`}
      style={{
        ...style,
        width: proposeItemWidth,
        marginRight: currentMarginRight,
      }}
    >
      {children} - {index} marginRight: {currentMarginRight}
    </div>
  );
};

export default ResponsiveList;
