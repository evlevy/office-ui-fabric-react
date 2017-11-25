import * as React from 'react';
import { CalendarMonthBase } from './CalendarMonth.base';
import { DateRangeType } from './Calendar.types';
import { IStyle, IStyleFunction, ITheme } from '../../Styling';

export interface ICalendarMonthProps extends React.Props<CalendarMonthBase> {

  /**
   * Allows the root to be reconfigured.
   */
  as?: string;

  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>;

  componentRef?: () => void;

  className?: string;

  onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;

  onKeyDown?: (ev?: React.KeyboardEvent<HTMLElement>) => void;

  isCurrent?: boolean;

  isNavigated?: boolean;

  isInBounds?: boolean;

  highlightCurrent: boolean;
}

export interface ICalendarMonthStyleProps {
  theme: ITheme;
  className?: string;
  isCurrent: boolean;
  isDisabled: boolean;
  isHighlighted: boolean;
}

export interface ICalendarMonthStyles {
  root: IStyle;
}
