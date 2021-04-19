import { setFormMapping } from './formMapping';
// export const FormElementMapping = {
//   DatePicker: 'el-date-picker',
//   Input: 'a-input',
//   InputNumber: 'el-input-number',
//   Slider: 'el-slider',
//   Switch: 'el-switch',
//   Select: 'a-select-group',
//   TimePicker: 'el-time-picker',
//   Checkbox: 'a-checkbox-group',
//   Wrapper: 'a-wrapper',
//   Text: 'a-text',
//   Slot: 'Slot',
// };

export const provide = (options = {}) => {
  const { formMapping } = options;

  setFormMapping(formMapping);
};
