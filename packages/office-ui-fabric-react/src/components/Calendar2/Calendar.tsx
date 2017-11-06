import * as React from 'react';
import { styled } from '../../Styling';
import { ICalendarProps } from './Calendar.types';
import { CalendarBase } from './Calendar.base';
import { CalendarDayPicker } from './CalendarDayPicker';
import { ICalendarDayPickerProps } from './CalendarDayPicker.types';
import { CalendarDay } from './CalendarDay';
import { getStyles } from './Calendar.styles';

export const Calendar = styled(
  CalendarBase,
  getStyles,
  props => ({
    dayPickerAs: (dayPickerProps: ICalendarDayPickerProps) => <CalendarDayPicker dateAs={ CalendarDay } { ...dayPickerProps } />
  })
);