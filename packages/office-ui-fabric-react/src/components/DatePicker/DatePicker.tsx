import * as React from 'react';
import { DatePickerBase } from './DatePicker.base';
import { getStyles } from './DatePicker.styles';
import { IDatePickerProps } from './DatePicker.types';
import { styled } from '../../Utilities';

export const DatePicker = styled(
  DatePickerBase,
  getStyles
);