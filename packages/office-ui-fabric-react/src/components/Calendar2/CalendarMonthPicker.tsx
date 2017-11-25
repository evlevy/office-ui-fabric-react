import * as React from 'react';
import { CalendarMonth } from './CalendarMonth';
import { CalendarMonthPickerBase } from './CalendarMonthPicker.base';
import { getStyles } from './CalendarMonthPicker.styles';
import { ICalendarMonthPickerProps } from './CalendarMonthPicker.types';
import { styled } from '../../Styling';

export const CalendarMonthPicker = styled(
  CalendarMonthPickerBase,
  getStyles,
  props => ({
    monthAs: CalendarMonth
  })
);