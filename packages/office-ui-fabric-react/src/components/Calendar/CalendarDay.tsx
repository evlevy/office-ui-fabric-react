import * as React from 'react';
import { CalendarDayBase } from './CalendarDay.base';
import { getStyles } from './CalendarDay.styles';
import { ICalendarDayProps } from './CalendarDay.types';
import { styled } from '../../Styling';

export const CalendarDay = styled(
  CalendarDayBase,
  getStyles
);