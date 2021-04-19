export const updateOptions = (template, name, partTemplateItem = {}) => {
  return template.map((item, index) => {
    if (item.name !== name && !item.children) return item;

    if (item.children) {
      return {
        ...item,
        children: updateOptions(item.children, name, partTemplateItem),
      };
    }

    if (typeof partTemplateItem === 'function') {
      return partTemplateItem(item, index, template);
    }
    return {
      ...item,
      ...partTemplateItem,
      config: { ...item.config, ...(partTemplateItem.config || {}) },
    };
  });
};

export const updateConfig = (template, name, config) => {
  return updateOptions(template, name, (templateItem, templateIndex) => {
    const oldConfig = templateItem;
    let newConfig = { ...oldConfig, ...config };
    if (typeof config === 'function') {
      newConfig = config(oldConfig, templateItem, templateIndex);
    }

    return {
      ...templateItem,
      config: newConfig,
    };
  });
};

export const getTemplateItemByName = (template, name) => {
  let res = null;

  updateOptions(template, name, (templateItem) => {
    res = templateItem;
    return templateItem;
  });

  return res;
};
