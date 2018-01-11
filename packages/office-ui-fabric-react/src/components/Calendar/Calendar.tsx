import * as React from 'react';
import { CalendarBase } from './Calendar.base';
import { getStyles } from './Calendar.styles';
import { ICalendarProps } from './Calendar.types';
import { styled } from '../../Styling';

export const Calendar = styled(
  CalendarBase,
  getStyles
);