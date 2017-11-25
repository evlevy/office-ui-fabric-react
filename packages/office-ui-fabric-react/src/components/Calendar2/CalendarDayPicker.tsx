import * as React from 'react';
import { styled } from '../../Styling';
import { ICalendarDayPickerProps } from './CalendarDayPicker.types';
import { CalendarDayPickerBase } from './CalendarDayPicker.base';
import { getStyles } from './CalendarDayPicker.styles';
import { CalendarDay } from './CalendarDay';

export const CalendarDayPicker = styled(
  CalendarDayPickerBase,
  getStyles,
  props => ({
    dayAs: CalendarDay
  })
);