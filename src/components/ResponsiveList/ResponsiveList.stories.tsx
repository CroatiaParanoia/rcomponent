import React, { useEffect, useRef } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import ResponsiveList, {
  ResponsiveListProps,
  ResponsiveListItem,
} from "./ResponsiveList";

export default {
  title: "Example/ResponsiveList",
  component: ResponsiveList,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta;

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Template: Story<ResponsiveListProps> = (args) => {
  const container = useRef<HTMLDivElement>(null!);

  useEffect(() => {}, [container]);

  return (
    <div ref={container} className="test">
      <ResponsiveList {...args}>
        {
          arr.map((item, index) => {
            return <ResponsiveListItem index={index}>
              {item} - 2333
            </ResponsiveListItem>
          })
        }
      </ResponsiveList>
    </div>
  );
};

export const Normal = Template.bind({});
Normal.args = {};
