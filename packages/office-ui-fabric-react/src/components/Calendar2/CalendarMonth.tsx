import * as React from 'react';
import { styled } from '../../Styling';
import { ICalendarMonthProps } from './CalendarMonth.types';
import { CalendarMonthBase } from './CalendarMonth.base';
import { getStyles } from './CalendarMonth.styles';

export const CalendarMonth = styled(
  CalendarMonthBase,
  getStyles
);