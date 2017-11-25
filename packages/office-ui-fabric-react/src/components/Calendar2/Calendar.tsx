import * as React from 'react';
import { CalendarBase } from './Calendar.base';
import { CalendarDay } from './CalendarDay';
import { CalendarDayPicker } from './CalendarDayPicker';
import { CalendarMonth } from './CalendarMonth';
import { CalendarMonthPicker } from './CalendarMonthPicker';
import { getStyles } from './Calendar.styles';
import { ICalendarDayPickerProps } from './CalendarDayPicker.types';
import { ICalendarMonthPickerProps } from './CalendarMonthPicker.types';
import { ICalendarProps } from './Calendar.types';
import { styled } from '../../Styling';

export const Calendar = styled(
  CalendarBase,
  getStyles,
  props => ({
    dayPickerAs: (dayPickerProps: ICalendarDayPickerProps) => (
      <CalendarDayPicker
        dayAs={ CalendarDay }
        { ...dayPickerProps }
      />),
    monthPickerAs: (monthPickerProps: ICalendarMonthPickerProps) => (
      <CalendarMonthPicker
        monthAs={ CalendarMonth }
        { ...monthPickerProps }
      />)
  })
);